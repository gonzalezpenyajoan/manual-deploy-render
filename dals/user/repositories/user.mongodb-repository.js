import { getUserContext } from "../user.context.js";
import { verifyHash } from "#common/helpers/hash.helpers.js";
import { ObjectId } from "mongodb";
export const mongoDBRepository = {
    getUser: async (email, password) => {
        const user = await getUserContext().findOne({ email });
        return (await verifyHash(password, user?.password))
            ? {
                _id: user._id,
                email: user.email,
                role: user.role
            } : null;
    },
    getUserById: async (id) => await getUserContext().findOne({
        _id: new ObjectId(id),
    }, {
        projection: {
            email: 1,
            role: 1,
        },
    }),
};
