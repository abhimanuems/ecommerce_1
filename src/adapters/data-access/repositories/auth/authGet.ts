import { ObjectId } from "mongoose";
import UserSchema from "../../models/userModel"



const userRepositoryGetQuery = {

    getUserWithEmailId: async (email: string) => {
        try {
            const user = await UserSchema.findOne({ email })
            return user || null
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
};

export default userRepositoryGetQuery;