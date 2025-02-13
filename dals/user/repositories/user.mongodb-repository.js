import { getUserContext } from "../user.context.js";
import { verifyHash } from "#common/helpers/hash.helpers.js";
export const mongoDBRepository = {
    getUser: async (email, password) => {
        const user = await getUserContext().findOne({ email });
        return (await verifyHash(password, user?.password))
            ? {
                _id: user._id,
                email: user.email,
                role: user.role
            } : null;
    }
};
