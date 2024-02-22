"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    addProduct: (productDetails) => {
        const obj = {
            name: productDetails.name,
            price: productDetails.price,
            description: productDetails.description,
            category: productDetails.category,
            brand: productDetails.brand,
            stock: productDetails.stock,
            offerprice: productDetails.stock
        };
        return obj;
    }
};
