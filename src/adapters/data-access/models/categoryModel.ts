import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../../../bussiness/interfaces/common";

const categorySchema: Schema<ICategory> = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category: Model<ICategory> = mongoose.model<ICategory>("category", categorySchema);


export default Category;
