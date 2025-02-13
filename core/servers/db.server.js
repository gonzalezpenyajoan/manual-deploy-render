import { MongoClient } from 'mongodb';
let client;
const connect = async (connectionURL) => {
    client = new MongoClient(connectionURL);
    await client.connect();
    dbServer.db = client.db();
};
const disconnect = async () => {
    await client.close();
};
export let dbServer = {
    connect,
    disconnect,
    db: undefined
};
