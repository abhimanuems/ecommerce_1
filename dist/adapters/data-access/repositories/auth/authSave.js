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
const userModel_1 = __importDefault(require("../../models/userModel"));
exports.default = {
    saveUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new userModel_1.default(Object.assign({}, data));
            const savedUser = yield user.save();
            return !!savedUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updateStatus: (requestParams) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedData = yield userModel_1.default.updateOne({ email: requestParams.email }, { $set: { otpVerified: true } });
            return !!updatedData;
        }
        catch (err) {
            throw new Error(err.message);
        }
    })
};
