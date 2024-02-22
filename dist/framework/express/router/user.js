"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../../adapters/Controllers/users/auth"));
const userRoute = express_1.default.Router();
userRoute.post('/signup', auth_1.default.signup);
userRoute.post('/verify', auth_1.default.verify);
userRoute.post('/login', auth_1.default.Login);
exports.default = userRoute;
