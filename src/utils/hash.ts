import cryptoJS from "crypto-js";

async function hashPassword(password: string) {
  return cryptoJS.SHA256(password).toString();
}

async function comparePassword(data: string, encrypted: string) {
  return cryptoJS.SHA256(data).toString() === encrypted;
}

async function generateMD5Hash(text: string) {
  return cryptoJS.MD5(text);
}

async function generateProfileImage(email: string) {
  const hash = await generateMD5Hash(email.trim().toLowerCase());
  const profileImage = `https://www.gravatar.com/avatar/${hash.toString()}?d=identicon`;
  return profileImage;
}

export { generateProfileImage, generateMD5Hash, hashPassword, comparePassword };
