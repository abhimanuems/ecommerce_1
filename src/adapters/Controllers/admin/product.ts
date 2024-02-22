import { Request, Response } from "express";
import response from "../../services/response";
import constant from "../../services/constant";
import { IProduct } from "../../../bussiness/interfaces/common";
import validation from "../../services/validation";
import product from "../../data-access/repositories/product/addProduct";
import productUsecase from "../../../bussiness/usecase/product"
export default {
    addProduct: (req: Request, res: Response) => {
        try {
            const requestParamas: IProduct = req.body;
            validation.productValidation(requestParamas, res, async (validate: boolean) => {
                if (validate) {
                    const products : Object = productUsecase.addProduct(requestParamas);
                    console.log(products)
                    const status: boolean = await product.addProduct(products);
                    if (status) {
                        return response.successResponseWithoutData(res, "product added", constant.SUCCESS);
                    } else {
                        return response.errorResponseWithoutData(res, "added failed", constant.FAIL);
                    }
                }
            })

        } catch (err: unknown) {
            console.error("eror",err)
            return response.errorResponseWithoutData(res, "server error", constant.FAIL)
        }
    }
}