import Category from "../../models/categoryModel";
export default {
    addCategory: async (details: Object): Promise<boolean> => {
        const category = new Category({ ...details });
        const status = await category.save();
        console.log(status)
        return !!status;
    }
}