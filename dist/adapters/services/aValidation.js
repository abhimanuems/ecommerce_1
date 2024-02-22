"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const response_1 = __importDefault(require("./response"));
const constant_1 = __importDefault(require("./constant"));
exports.default = {
    signUpValidation: (requestParams, res, callback) => {
        const schema = joi_1.default.object({
            name: joi_1.default.string().trim().required(),
            email: joi_1.default.string().email().trim().required(),
            mobilenumber: joi_1.default.string().trim().max(15).optional(),
            password: joi_1.default.string().trim().min(8).required(),
            gender: joi_1.default.string().trim().required()
        });
        const { error } = schema.validate(requestParams);
        if (error) {
            return response_1.default.errorResponseWithoutData(res, error.message, constant_1.default.FAIL);
        }
        else {
            return callback(true);
        }
    },
    otpValidation: (requestParams, res, callback) => {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().trim().required(),
            otp: joi_1.default.string().trim().length(5).required()
        });
        const { error } = schema.validate(requestParams);
        if (error) {
            return response_1.default.errorResponseWithoutData(res, error.message, constant_1.default.FAIL);
        }
        else {
            return callback(true);
        }
    },
    loginValidation: (requestParams, res, callback) => {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().trim().required(),
            password: joi_1.default.string().trim().min(8).required(),
        });
        const { error } = schema.validate(requestParams);
        if (error) {
            return response_1.default.errorResponseWithoutData(res, error.message, constant_1.default.FAIL);
        }
        else {
            return callback(true);
        }
    },
    adminLoginValidation: (requestParams, res, callback) => {
        const schema = joi_1.default.object({
            username: joi_1.default.string().trim().required(),
            password: joi_1.default.string().trim().min(3).required()
        });
        const { error } = schema.validate(requestParams);
        if (error) {
            return response_1.default.errorResponseWithoutData(res, error.message, constant_1.default.FAIL);
        }
        else {
            return callback(true);
        }
    }
};
