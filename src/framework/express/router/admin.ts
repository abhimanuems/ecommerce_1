import express from "express";
import adminAuth from "../../../adapters/Controllers/admin/admin";
import product from "../../../adapters/Controllers/admin/product"
import category from "../../../adapters/Controllers/admin/category";

const adminRoute  = express.Router();

adminRoute.post('/login',adminAuth.adminLogin);

adminRoute.post('/addproduct',product.addProduct);

adminRoute.post('/category',category.addCategory)

export default adminRoute