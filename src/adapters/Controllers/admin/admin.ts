import { Request , Response } from "express"
import validation from "../../services/validation"
import { adminAuth } from "../../services/types";
import response from "../../services/response";
import constant from "../../services/constant";
export default {
    adminLogin : async(req :Request, res : Response)=>{
       try{
           const requestParams: adminAuth = req.body;
           validation.adminLoginValidation(requestParams, res, async (validate: boolean) => {
               if (validate) {
                
                   if (requestParams.username === process.env.adminUserName && process.env.adminPass === requestParams.password) {
                     return  response.successResponseWithoutData(res, "validated successfully", constant.SUCCESS)
                   } else {
                     return  response.errorResponseWithoutData(res, "authentication failed", constant.FAIL);
                   }
               }
           })
       }catch(err:any){
        return response.errorResponseWithoutData(res,"server error",constant.BAD_REQUEST);
       }
    }
}