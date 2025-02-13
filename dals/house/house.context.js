import { dbServer } from "#core/servers/db.server.js";
export const getHouseContext = () => dbServer?.db?.collection('listingsAndReviews');
