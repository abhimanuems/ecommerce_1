import { signupType } from "../../../../bussiness/interfaces/common"
import UserSchema from "../../models/userModel"


export default {
    saveUser: async (data: any) => {
        try {
            const user = new UserSchema({ ...data })
            const savedUser = await user.save()
            return !!savedUser
        } catch (error: any) {
            throw new Error((error as Error).message)
        }
    },
    updateStatus: async (requestParams : any) => {
        try {
          const updatedData = await  UserSchema.updateOne({ email: requestParams.email }, { $set: { otpVerified: true } });
          return !!updatedData;
        } catch (err: any) {
            throw new Error((err as Error).message)
        }
    }
}