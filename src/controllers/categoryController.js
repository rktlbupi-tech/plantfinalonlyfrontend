
import Category from "../modals/categoryModal.js";

export const creteCategoryController = async (req, res) => {

    try {
        const { name } = req.body;
        console.log(name)
        if (!name) return res.json({ message: "Category name is required!!" })
        const alreayexistcategory = await Category.findOne({ name });
        if (alreayexistcategory) {
            return res.json({ message: "Category already exists !!" })
        }
        const data = new Category({ name });
        await data.save();
        return res.json({ message: "Category created successfully!!", });
    }
    catch (e) {
        console.log(e)
        return res.json({ message: e });
    }
}



export const getCategoryController = async (req, res) => {

    try {

        const data = await Category.find();
        return res.json({ message: "Category fetched successfully!!",data:data });
    }
    catch (e) {
        console.log(e)
        return res.json({ message: e });
    }
}


export const updateCategoryController = async (req, res) => {

    try {
        const {name } = req.body;
        const {id} = req.params;

        const updatedData = await Category.findByIdAndUpdate(id,{name:name})

        return res.json({ message: "Category updated successfully!!",data:updatedData });
    }
    catch (e) {
        console.log(e)
        return res.json({ message: e });
    }
}