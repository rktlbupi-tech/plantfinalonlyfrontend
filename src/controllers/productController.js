import Items from "../modals/itemModal.js";

const addProducts = async (req, res) => {
    try {
        const { name, description, price, images, stock, category, subcategory } = req.body;

        if (!name || !description || !images || !stock || !category) {
            return res.status(400).json({ message: 'All fields are required!!' });
        }

        const items = new Items({
            name,
            description,
            price,
            images,
            stock,
            category,
            subcategory,
            seller: req.user._id // Assign seller from authenticated user
        });

        await items.save();
        return res.status(201).json({ message: "Item created successfully!!", data: items });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error occurred while creating item", error: e.message });
    }
}

const getAllItems = async (req, res) => {
    try {
        // Only show approved products to public, unless admin/vendor requesting their own (logic can be refined)
        // For now, public endpoint returns only approved items
        const items = await Items.find({ isApproved: true }).populate("seller", "fullname email");
        res.status(200).json({ message: "Items fetched successfully", data: items });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const editItems = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, images, stock, category, subcategory } = req.body;

        if (!id) {
            return res.status(400).json({ message: "ItemId is required" });
        }

        const item = await Items.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Check ownership or admin role
        if (item.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to edit this item" });
        }

        const updatedItem = await Items.findByIdAndUpdate(id, {
            name, description, price, images, stock, category, subcategory
        }, { new: true });

        return res.json({ message: "Edit successfully!!", data: updatedItem });
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const deleteItembyId = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Items.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found with this Id." });
        }

        // Check ownership or admin role
        if (item.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized to delete this item" });
        }

        const deletedData = await Items.findByIdAndDelete(id);
        return res.json({ message: `Item deleted successfully!!`, deletedData: deletedData });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}



export { addProducts, getAllItems, editItems, deleteItembyId };