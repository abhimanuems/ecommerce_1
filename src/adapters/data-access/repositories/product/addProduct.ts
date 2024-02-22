import { IProduct } from "../../../../bussiness/interfaces/common";
import Product from "../../models/productModel";
export default{
    addProduct :async(productDetails : Object): Promise<boolean>=> {
        const product = new Product({ ...productDetails});
        const status =await product.save();
        console.log("statis",status);
        return !!status || true; 
    }
}