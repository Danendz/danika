import {compare, hash, genSalt} from 'bcrypt-ts'
export const comparePasswords = (plainPassword:string, hashedPassword:string) => {
  return compare(plainPassword, hashedPassword)
}

export const hashPassword = async (pass: string) => {
  const salt = await genSalt(10)
  return hash(pass, salt)
}