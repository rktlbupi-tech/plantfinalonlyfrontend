import Items from "../modals/itemModal.js";

const addProducts = async (req, res) => {

    try {
        const { name, description, price, images, stock, category, subcategory, seller } = req.body;

        if (!name || !description || !images || !stock || !category) {
            return res.json({ message: 'All field is required!!' });
        }

        console.log(name)

        const items = new Items({
            name: name,
            description: description,
            price: price,
            images: images,
            stock: stock,
            category: category,
            subcategory: subcategory,
            seller: seller
        })

        await items.save();
        return res.json({ message: "Item created successfully!!" })
    }
    catch (e) {
        console.log(e)
        res.json({ message: "Error is occuring...", e })
    }

}

const getAllItems = async (req, res) => {
    const data = await Items.find();
    return res.json({ success: true, message: "All items fetched successfully!!", data: data })
}

const editItems = async (req, res) => {
    try {
        console.log("idididididdidijskfnksn")
        const { id } = req.params;

        console.log(id)

        const { name, description, price, images, stock, category, subcategory, seller } = req.body;

        console.log(name)

        if (!id) {
            return res.json({ message: "To edit item provide ItemId" });
        }

        console.log("sfkjslkj")

        await Items.findByIdAndUpdate(id, { name: name, description: description, price: price });


        return res.json({ message: "Edit successfully!!" })
    }
    catch (e) {
        return res.json({ message: e })
    }

}

const deleteItembyId = async (req, res) => {
    try {
        console.log("deleted call")
        const { id } = req.params;

        const notFound = await Items.findById(id);
        if(!notFound)
        {
            return res.json({message:"Item is not found with this Id."});
        }
      
        const deletedData = await Items.findByIdAndDelete(id);

        console.log("deleted call12345",deletedData)
       return res.json({ message: `Item with ${id} deleted successfully!!`, deletedData: deletedData });

    } catch (e) {
       return res.json({ error: e.message })
    }
}



export { addProducts, getAllItems, editItems, deleteItembyId };