import Order from "../modals/orderModal.js";
import Items from "../modals/itemModal.js";

export const createOrder = async (req, res) => {
    try {
        const { products, shippingAddress, paymentStatus } = req.body;
        const userId = req.user._id;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "No products in order" });
        }

        let totalAmount = 0;
        const orderProducts = [];

        // Validate products and calculate total
        for (const item of products) {
            const product = await Items.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }

            // Deduct stock
            product.stock -= item.quantity;
            await product.save();

            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            totalAmount += product.price * item.quantity;
        }

        const newOrder = new Order({
            user: userId,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            paymentStatus: paymentStatus || "pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("products.product", "name images price")
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "fullname email")
            .populate("products.product", "name images price")
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("user", "fullname email")
            .populate("products.product", "name images price");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};
