import mongoose, { Document, Schema, Model } from 'mongoose';
import { IProduct } from "../../../bussiness/interfaces/common"

const productSchema: Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
    brand: {
        type: String,
        required: true,
    },
    imageUrl: [
        {
            public_id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
        },
    ],
    stock: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
});


const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
