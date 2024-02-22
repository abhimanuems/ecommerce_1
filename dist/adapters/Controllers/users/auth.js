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
const validation_1 = __importDefault(require("../../services/validation"));
const response_1 = __importDefault(require("../../services/response"));
const constant_1 = __importDefault(require("../../services/constant"));
const authGet_1 = __importDefault(require("../../data-access/repositories/auth/authGet"));
const authSave_1 = __importDefault(require("../../data-access/repositories/auth/authSave"));
const auth_1 = __importDefault(require("../../../bussiness/usecase/auth"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requestParams = req.body;
            validation_1.default.signUpValidation(requestParams, res, (validate) => __awaiter(void 0, void 0, void 0, function* () {
                if (validate) {
                    const userExists = yield authGet_1.default.getUserWithEmailId(requestParams.email);
                    if (userExists) {
                        response_1.default.successResponseWithoutData(res, "userAlreadyExists", 1);
                    }
                    else {
                        auth_1.default.signup(requestParams);
                        response_1.default.successResponseWithoutData(res, "created successfull and send otp, kindly verify it", constant_1.default.SUCCESS);
                    }
                }
            }));
        }
        catch (err) {
            return response_1.default.errorResponseWithoutData(res, "internalError", constant_1.default.INTERNAL_SERVER);
        }
    }),
    verify: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requestParams = req.body;
            validation_1.default.otpValidation(requestParams, res, (validate) => __awaiter(void 0, void 0, void 0, function* () {
                if (validate) {
                    const userExists = yield authGet_1.default.getUserWithEmailId(requestParams.email);
                    if (userExists.length == 0) {
                        return response_1.default.errorResponseWithoutData(res, "invalid email", constant_1.default.FAIL);
                    }
                    const isValid = new Date(userExists === null || userExists === void 0 ? void 0 : userExists.expiryTime) >= new Date();
                    if ((userExists === null || userExists === void 0 ? void 0 : userExists.otp) === requestParams.otp && isValid) {
                        const updateStatus = yield authSave_1.default.updateStatus(requestParams);
                        if (updateStatus)
                            return response_1.default.successResponseWithoutData(res, "otp verified", constant_1.default.CREATED);
                    }
                    else if (userExists.otp === requestParams.otp) {
                        return response_1.default.errorResponseWithoutData(res, "time expired", constant_1.default.FAIL);
                    }
                    else {
                        return response_1.default.errorResponseWithoutData(res, "invalid otp", constant_1.default.FAIL);
                    }
                }
            }));
        }
        catch (err) {
            return response_1.default.errorResponseWithoutData(res, err.message, constant_1.default.FAIL);
        }
    }),
    Login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requestParams = req.body;
            validation_1.default.loginValidation(requestParams, res, (validate) => __awaiter(void 0, void 0, void 0, function* () {
                if (validate) {
                    const userExists = yield authGet_1.default.getUserWithEmailId(requestParams.email);
                    if (userExists.length === 0) {
                        return response_1.default.errorResponseWithoutData(res, "User not exists", constant_1.default.FAIL);
                    }
                    const status = yield auth_1.default.login(requestParams, userExists);
                    if (status) {
                        return response_1.default.successResponseWithoutData(res, "login successful", constant_1.default.SUCCESS);
                    }
                    else {
                        return response_1.default.errorResponseWithoutData(res, "server error", constant_1.default.FAIL);
                    }
                }
            }));
        }
        catch (err) {
            console.error(err.message);
            return response_1.default.errorResponseWithoutData(res, err.message, constant_1.default.FAIL);
        }
    })
};
