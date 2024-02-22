import mongoose, { Document } from "mongoose";
export type signupType={
    email : string,
    password : string,
    mobilenumber : number,
    gender : string,
    name : string
} 

export type otpVerify ={
    email : string,
    otp : string
}

export type loginDetail ={
    _id : string,
    email : string,
    password  : string
}

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    category: mongoose.Types.ObjectId;
    subCategory: mongoose.Types.ObjectId;
    brand: String;
    imageUrl: { public_id: string; url: string }[];
    stock: number;
    isOnCart: boolean;
    isWishlisted: boolean;
    offerPrice: string[];
    oldPrice: number;
}

export interface ICategory extends Document {
    name : String
}

export type category ={
    name : string
}