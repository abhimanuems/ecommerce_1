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
const response_1 = __importDefault(require("../../services/response"));
const constant_1 = __importDefault(require("../../services/constant"));
const validation_1 = __importDefault(require("../../services/validation"));
const category_1 = __importDefault(require("../../../bussiness/usecase/category"));
const category_2 = __importDefault(require("../../data-access/repositories/category/category"));
exports.default = {
    addCategory: (req, res) => {
        try {
            const requestParamas = req.body;
            validation_1.default.categoryValidation(requestParamas, res, (validate) => __awaiter(void 0, void 0, void 0, function* () {
                if (validate) {
                    const data = category_1.default.categorys(requestParamas);
                    const status = yield category_2.default.addCategory(data);
                    if (status) {
                        return response_1.default.successResponseWithoutData(res, "successfully added category", constant_1.default.SUCCESS);
                    }
                    else {
                        return response_1.default.errorResponseWithoutData(res, "Failed to update Category", constant_1.default.FAIL);
                    }
                }
            }));
        }
        catch (err) {
            response_1.default.errorResponseWithoutData(res, "server error", constant_1.default.BAD_REQUEST);
        }
    }
};
