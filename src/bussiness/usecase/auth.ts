import bcrypt from "bcrypt"
import { signupType, loginDetail } from "../interfaces/common";
import helper from "../../adapters/services/helper";
import constant from '../../adapters/services/constant';
import authSave from "../../adapters/data-access/repositories/auth/authSave";
import shared from "../shared/jwt"
export default {
    signup: async (requestParams: signupType) => {
        const date: Date = new Date();
        const defaultExpiryTimeMs = 5 * 600000;
        const expiryTimeMs = process.env.OTP_EXPIRY_MINUTE
            ? parseInt(process.env.OTP_EXPIRY_MINUTE) * 60000
            : defaultExpiryTimeMs;
        const otpExpireDate: Date = new Date(date.getTime() + expiryTimeMs);
        const OTP: string = helper.otpGenerator();
        console.log("otp is ", OTP)
        const HASH_PASSWORD = await bcrypt.hash(
            requestParams.password,
            10
        );
        const LOCALS = {
            username: requestParams.name,
            appName: constant.APPNAME,
            otp: OTP,
        };
        const userObj: object = {
            name: requestParams.name,
            email: requestParams.email,
            gender: requestParams.gender,
            expiryTime: otpExpireDate,
            otp: OTP,
            password: HASH_PASSWORD,
            mobilenumber: requestParams.mobilenumber

        }
        const result: any = await helper.sendMail(
            requestParams.email,
            constant.MAIL_SUBJECT_MESSAGE_REGISTRATION,
            constant.newRegistration,
            LOCALS
        )
        const dataSaved = authSave.saveUser(userObj)
        return dataSaved;

    },
    login: async (requestParams: loginDetail, userExists: any) => {
        const COMPARE_PASSWORD : boolean = await shared.comparePassword(requestParams.password,userExists.password)
        if (COMPARE_PASSWORD) {
            const token = shared.createToken(requestParams._id, "user", "5h")
            return token || null

        } else {
            return false;
        }
    }
}