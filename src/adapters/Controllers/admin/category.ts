import { Response, Request } from "express";
import response from "../../services/response";
import constant from "../../services/constant";
import validation from "../../services/validation";
import category from "../../../bussiness/usecase/category";
import categoryUpdate from "../../data-access/repositories/category/category";
export default {
    addCategory: (req: Request, res: Response) => {
        try {
            const requestParamas: any = req.body;
            validation.categoryValidation(requestParamas, res, async (validate: boolean) => {
                if (validate) {
                    const data: any = category.categorys(requestParamas);
                    const status: boolean = await categoryUpdate.addCategory(data);
                    if (status) {
                        return response.successResponseWithoutData(res, "successfully added category", constant.SUCCESS);
                    } else {
                        return response.errorResponseWithoutData(res, "Failed to update Category", constant.FAIL);
                    }
                }
            })

        } catch (err: unknown) {
            response.errorResponseWithoutData(res, "server error", constant.BAD_REQUEST);
        }
    }
}