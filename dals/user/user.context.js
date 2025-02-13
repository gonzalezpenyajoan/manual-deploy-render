import { dbServer } from "#core/servers/index.js";
export const getUserContext = () => dbServer.db?.collection("users");
