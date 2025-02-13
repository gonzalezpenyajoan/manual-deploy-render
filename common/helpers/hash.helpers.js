import crypto from "node:crypto";
const saltLength = 32;
const hashLength = 64;
const hashSaltAndPassword = (salt, password) => new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, hashLength, (error, hashedPassword) => {
        if (error) {
            reject(error);
        }
        resolve(`${salt}:${hashedPassword.toString("hex")}`);
    });
});
export const hash = async (password) => {
    const salt = crypto.randomBytes(saltLength).toString("hex");
    return await hashSaltAndPassword(salt, password);
};
const areEquals = (hashA, hashB) => crypto.timingSafeEqual(Buffer.from(hashA, 'hex'), Buffer.from(hashB, 'hex'));
export const verifyHash = async (password, hashedPassword) => {
    const [salt, hash] = hashedPassword.split(':');
    const [, newHash] = (await hashSaltAndPassword(salt, password)).split(':');
    return areEquals(hash, newHash);
};
