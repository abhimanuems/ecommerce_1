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
exports.default = {
    adminLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requestParams = req.body;
            validation_1.default.adminLoginValidation(requestParams, res, (validate) => __awaiter(void 0, void 0, void 0, function* () {
                if (validate) {
                    if (requestParams.username === process.env.adminUserName && process.env.adminPass === requestParams.password) {
                        return response_1.default.successResponseWithoutData(res, "validated successfully", constant_1.default.SUCCESS);
                    }
                    else {
                        return response_1.default.errorResponseWithoutData(res, "authentication failed", constant_1.default.FAIL);
                    }
                }
            }));
        }
        catch (err) {
            return response_1.default.errorResponseWithoutData(res, "server error", constant_1.default.BAD_REQUEST);
        }
    })
};
