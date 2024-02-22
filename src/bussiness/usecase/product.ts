import { IProduct } from "../interfaces/common";

export default{
    addProduct :(productDetails : IProduct):object=>{
        const obj :Object ={
            name : productDetails.name,
            price : productDetails.price,
            description : productDetails.description,
            category : productDetails.category,
            brand : productDetails.brand,
            stock : productDetails.stock,
            offerprice : productDetails.stock
        }
        return obj;
    }
}