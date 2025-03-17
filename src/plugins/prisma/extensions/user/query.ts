import {customAlphabet} from "nanoid";
import {prisma} from "@/plugins/prisma";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateRandomId = customAlphabet(ALPHABET, 6)

const generateCustomId = (username: string): string => {
  return `${username}_${generateRandomId()}`;
};

prisma.$extends({
  name: 'generate user_id',
  query: {
    user: {
      async create({query, args}) {
        args.data.user_id = generateCustomId(args.data.username)

        return query(args)
      }
    }
  }
})