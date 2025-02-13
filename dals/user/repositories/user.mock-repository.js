import { db } from "#dals/mock-data.js";
export const mockRepository = {
    getUser: async (email, password) => db.users.find((u) => u.email === email && u.password === password)
};
