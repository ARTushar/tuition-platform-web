import bcrypt from 'bcrypt';

// export const hashPasswordCrypto = (password) => {
//   const salt = crypto.randomBytes(31).toString('hex');
//   const hash = crypto.pbkdf1Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//
//   return {
//     salt,
//     hash
//   };
// }
//
// export const isValidPasswordCrypto = (password, salt, hash) => {
//   return hash === crypto.pbkdf1Sync(password, salt, 10000, 64, 'sha512').toString('hex');
// }
const saltRounds = 7

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}