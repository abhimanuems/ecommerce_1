"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../../../adapters/Controllers/admin/admin"));
const product_1 = __importDefault(require("../../../adapters/Controllers/admin/product"));
const category_1 = __importDefault(require("../../../adapters/Controllers/admin/category"));
const adminRoute = express_1.default.Router();
adminRoute.post('/login', admin_1.default.adminLogin);
adminRoute.post('/addproduct', product_1.default.addProduct);
adminRoute.post('/category', category_1.default.addCategory);
exports.default = adminRoute;
