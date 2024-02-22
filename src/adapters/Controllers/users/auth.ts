import { Request, Response } from "express";
import authValidation from "../../services/validation";
import response from "../../services/response";
import { signupType, otpVerify, loginDetail } from "../../services/types";
import constant from "../../services/constant";
import userRepositoryGetQuery from "../../data-access/repositories/auth/authGet";
import userRepositryPostQury from "../../data-access/repositories/auth/authSave"
import auth from "../../../bussiness/usecase/auth"


export default {
    signup: async (req: Request, res: Response) => {
        try {
            const requestParams: signupType = req.body;
            authValidation.signUpValidation(requestParams, res, async (validate: Boolean) => {
                if (validate) {
                    const userExists = await userRepositoryGetQuery.getUserWithEmailId(requestParams.email)
                    if (userExists) {
                        response.successResponseWithoutData(res, "userAlreadyExists", 1)
                    } else {
                        auth.signup(requestParams)
                        response.successResponseWithoutData(res, "created successfull and send otp, kindly verify it", constant.SUCCESS)
                    }
                }
            })
        } catch (err: any) {
            return response.errorResponseWithoutData(res, "internalError", constant.INTERNAL_SERVER)
        }
    },
    verify: async (req: Request, res: Response) => {
        try {
            const requestParams: otpVerify = req.body;
            authValidation.otpValidation(requestParams, res, async (validate: boolean) => {
                if (validate) {
                    const userExists: any = await userRepositoryGetQuery.getUserWithEmailId(requestParams.email)
                    if (userExists.length == 0) {
                        return response.errorResponseWithoutData(res, "invalid email", constant.FAIL)
                    }
                    const isValid: Boolean = new Date(userExists?.expiryTime) >= new Date();
                    if (userExists?.otp === requestParams.otp && isValid) {
                        const updateStatus: boolean = await userRepositryPostQury.updateStatus(requestParams);
                        if (updateStatus)
                            return response.successResponseWithoutData(res, "otp verified", constant.CREATED);
                    } else if (userExists.otp === requestParams.otp) {
                        return response.errorResponseWithoutData(res, "time expired", constant.FAIL)
                    } else {
                        return response.errorResponseWithoutData(res, "invalid otp", constant.FAIL)
                    }
                }
            })

        } catch (err: any) {
            return response.errorResponseWithoutData(res, err.message, constant.FAIL)
        }
    },
    Login: async (req: Request, res: Response) => {
        try {
            const requestParams: loginDetail = req.body
            authValidation.loginValidation(requestParams, res, async (validate: boolean) => {
                if (validate) {
                    const userExists: any = await userRepositoryGetQuery.getUserWithEmailId(requestParams.email)
                    if (userExists.length === 0) {
                        return response.errorResponseWithoutData(res, "User not exists", constant.FAIL)
                    }
                    const status: any = await auth.login(requestParams, userExists);
                    if (status) {
                        return response.successResponseWithoutData(res, "login successful", constant.SUCCESS)
                    } else {
                        return response.errorResponseWithoutData(res, "server error", constant.FAIL)
                    }
                }
            })
        } catch (err: any) {
            console.error(err.message)
            return response.errorResponseWithoutData(res, err.message, constant.FAIL)
        }
    }
}