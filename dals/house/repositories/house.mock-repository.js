import { db } from "../../mock-data.js";
import { createId } from "#common/helpers/id.helper.js";
const insertHouse = (house) => {
    const _id = createId();
    const newHouse = {
        ...house,
        _id
    };
    db.houses.push(newHouse);
    return newHouse;
};
const insertReview = (houseId, review) => {
    const house = db.houses.find((h) => h._id === houseId);
    if (!house) {
        throw new Error('Unable to find parent reference');
    }
    const newReview = {
        ...review,
        _id: createId(),
        date: new Date()
    };
    const newHouse = { ...house };
    newHouse.reviews.push(newReview);
    db.houses.map((h) => (h._id === newHouse._id ? { ...h, ...newHouse } : h));
    return newReview;
};
const updateHouse = (house) => {
    db.houses = db.houses.map((h) => (h._id === house._id ? { ...h, ...house } : h));
    return house;
};
const paginateHouseList = (houseList, page, pageSize) => {
    let paginatedHouseList = [...houseList];
    if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, paginatedHouseList.length);
        paginatedHouseList = paginatedHouseList.slice(startIndex, endIndex);
    }
    return paginatedHouseList;
};
export const mockRepository = {
    getHouseList: async (page, pageSize, countryCode) => {
        const houses = !countryCode ? db.houses : db.houses.filter((h) => h.address.country_code === countryCode);
        return paginateHouseList(houses, page, pageSize);
    },
    getHouse: async (id) => db.houses.find((h) => h._id === id),
    saveHouse: async (house) => db.houses.some((h) => h._id === house._id) ? updateHouse(house) : insertHouse(house),
    deleteHouse: async (id) => {
        const exists = db.houses.some((h) => h._id === id);
        db.houses = db.houses.filter((h) => h._id !== id);
        return exists;
    },
    postReview: async (id, review) => insertReview(id, review),
    updateHouse: async (house) => updateHouse(house)
};
