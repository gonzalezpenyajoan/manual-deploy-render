import { getHouseContext } from "../house.context.js";
export const mongoDBRepository = {
    getHouseList: async (page, pageSize) => {
        const skip = Boolean(page) ? (page - 1) * pageSize : 0;
        const limit = pageSize ?? 0;
        return await getHouseContext()
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();
    },
    getHouse: async (id) => {
        return await getHouseContext().findOne({ _id: id });
    },
    saveHouse: async (house) => {
        return await getHouseContext()
            .findOneAndUpdate({ _id: house._id }, { $set: house }, {
            upsert: true,
            returnDocument: 'after'
        });
    },
    deleteHouse: async (id) => {
        const { deletedCount } = await getHouseContext().deleteOne({ _id: id });
        return deletedCount === 1;
    },
    postReview: async (id, review) => {
        const { reviews } = await getHouseContext().findOneAndUpdate({ _id: id }, {
            $push: {
                reviews: {
                    _id: id,
                    date: new Date(),
                    ...review
                }
            }
        }, {
            upsert: true,
            returnDocument: 'after'
        });
        return reviews.find((r) => r._id === id);
    },
    updateHouse: async (house) => {
        return await getHouseContext().findOneAndUpdate({ _id: house._id }, { $set: house }, { returnDocument: 'after' });
    }
};
