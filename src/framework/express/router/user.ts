import express from "express";
import auth from "../../../adapters/Controllers/users/auth"

const userRoute = express.Router();

userRoute.post('/signup',auth.signup);

userRoute.post('/verify',auth.verify);

userRoute.post('/login',auth.Login)
export default userRoute