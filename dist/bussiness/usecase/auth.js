"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const helper_1 = __importDefault(require("../../adapters/services/helper"));
const constant_1 = __importDefault(require("../../adapters/services/constant"));
const authSave_1 = __importDefault(require("../../adapters/data-access/repositories/auth/authSave"));
const jwt_1 = __importDefault(require("../shared/jwt"));
exports.default = {
    signup: (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        const date = new Date();
        const defaultExpiryTimeMs = 5 * 600000;
        const expiryTimeMs = process.env.OTP_EXPIRY_MINUTE
            ? parseInt(process.env.OTP_EXPIRY_MINUTE) * 60000
            : defaultExpiryTimeMs;
        const otpExpireDate = new Date(date.getTime() + expiryTimeMs);
        const OTP = helper_1.default.otpGenerator();
        console.log("otp is ", OTP);
        const HASH_PASSWORD = yield bcrypt_1.default.hash(requestParams.password, 10);
        const LOCALS = {
            username: requestParams.name,
            appName: constant_1.default.APPNAME,
            otp: OTP,
        };
        const userObj = {
            name: requestParams.name,
            email: requestParams.email,
            gender: requestParams.gender,
            expiryTime: otpExpireDate,
            otp: OTP,
            password: HASH_PASSWORD,
            mobilenumber: requestParams.mobilenumber
        };
        const result = yield helper_1.default.sendMail(requestParams.email, constant_1.default.MAIL_SUBJECT_MESSAGE_REGISTRATION, constant_1.default.newRegistration, LOCALS);
        const dataSaved = authSave_1.default.saveUser(userObj);
        return dataSaved;
    }),
    login: (requestParams, userExists) => __awaiter(void 0, void 0, void 0, function* () {
        const COMPARE_PASSWORD = yield jwt_1.default.comparePassword(requestParams.password, userExists.password);
        if (COMPARE_PASSWORD) {
            const token = jwt_1.default.createToken(requestParams._id, "user", "5h");
            return token || null;
        }
        else {
            return false;
        }
    })
};
