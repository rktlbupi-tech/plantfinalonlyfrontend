import express from 'express';
import User from '../modals/authModal.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import itemModel from '../modals/itemModal.js';

const adminRouter = express.Router();

// Get all users
adminRouter.get('/users', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

// Block/Unblock User
adminRouter.post('/toggle-block/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === 'admin') return res.status(403).json({ message: "Cannot block an admin" });

        user.isBlocked = !user.isBlocked;
        await user.save();
        res.status(200).json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`, data: user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Approve Vendor
adminRouter.post('/approve-vendor/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role !== 'vendor') return res.status(400).json({ message: "User is not a vendor" });

        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "Vendor approved successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Approve Product
adminRouter.post('/approve-product/:id', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const product = await itemModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.isApproved = true;
        await product.save();
        res.status(200).json({ message: "Product approved successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get Pending Approvals (Vendors and Products)
adminRouter.get('/pending-approvals', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const pendingVendors = await User.find({ role: 'vendor', isVerified: false });
        const pendingProducts = await itemModel.find({ isApproved: false }).populate('seller', 'fullname');

        res.status(200).json({
            message: "Pending approvals fetched",
            data: { vendors: pendingVendors, products: pendingProducts }
        });
    } catch (error) {
    }
});

// Get Products by Vendor ID
adminRouter.get('/vendor-products/:sellerId', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
    try {
        const { sellerId } = req.params;
        const products = await itemModel.find({ seller: sellerId });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendor products", error: error.message });
    }
});

export default adminRouter;
