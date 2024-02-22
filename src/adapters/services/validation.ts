import { Response } from "express"
import Joi from "@hapi/joi";
import response from "./response"
import { otpVerify,loginDetail, adminAuth} from "./types";
import { IProduct } from "../../bussiness/interfaces/common";
import constant from "./constant";
import { error } from "console";
import { Z_UNKNOWN } from "zlib";
export default {
    signUpValidation: (requestParams: Object, res: Response, callback: Function) => {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            email: Joi.string().email().trim().required(),
            mobilenumber: Joi.string().trim().max(15).optional(),
            password: Joi.string().trim().min(8).required(),
            gender: Joi.string().trim().required()

        })
        const { error } = schema.validate(requestParams);
        if (error) {
            return response.errorResponseWithoutData(res, error.message, constant.FAIL)
        } else {
            return callback(true)
        }

    },
    otpValidation: (requestParams: otpVerify, res: Response, callback: Function) => {
        const schema = Joi.object({
            email: Joi.string().email().trim().required(),
            otp: Joi.string().trim().length(5).required()
        })
        const { error } = schema.validate(requestParams);
        if (error) {
            return response.errorResponseWithoutData(res, error.message, constant.FAIL)
        } else {
            return callback(true);
        }
    },
    loginValidation : (requestParams : loginDetail,res : Response , callback : Function)=>{
        const schema = Joi.object({
            email: Joi.string().email().trim().required(),
            password: Joi.string().trim().min(8).required(),
        })
        const {error} = schema.validate(requestParams);
        if(error){
            return response.errorResponseWithoutData(res, error.message, constant.FAIL)
        }else{
            return callback(true);
        }
    },
    adminLoginValidation :(requestParams : adminAuth, res : Response , callback : Function)=>{
        const  schema =Joi.object({
            username :Joi.string().trim().required(),
            password : Joi.string().trim().min(3).required()
        });
        const { error} = schema.validate(requestParams);
        if(error){
            return response.errorResponseWithoutData(res,error.message, constant.FAIL);
        }else{
            return callback(true);
        }
    },
    productValidation :(requestParamas :IProduct,res: Response , callback : Function )=>{
        const schema = Joi.object({
                name : Joi.string().trim().required(),
                price : Joi.string().trim().required(),
                description : Joi.string().trim().required(),
                category : Joi.string().trim().required(),
                brand :Joi.string().trim().required(),
                stock : Joi.string().trim().required(),
                offerprice: Joi.string().trim().required()
        });
        const { error } = schema.validate(requestParamas);
        if(error){
            return response.errorResponseWithoutData(res,error.message,constant.FAIL);
        }else{
            return callback(true);
        }
    },
    categoryValidation : (requestParams : Object, res : Response, callback : Function)=>{
        const schema = Joi.object({
            name : Joi.string().trim().required()
        });
        const {error} = schema.validate(requestParams);
        if(error){
            return response.errorResponseWithoutData(res,error.message,constant.FAIL);
        }else{
            return callback(true);
        }
    }
}