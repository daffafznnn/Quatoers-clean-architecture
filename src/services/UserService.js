import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import generateTokens from "../utils/jwt.js";
import dotenv from "dotenv";
import { password } from "pg/lib/defaults.js";

dotenv.config();

class UserService {
  async register(userData) {
    const { username, password, confPassword, email } = userData;

    if (password !== confPassword) {
      throw new Error("Passwords do not match");
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = { username, password: hashedPassword, email };
    const createdUser = await UserRepository.create(user);
    const tokens = generateTokens(createdUser);
    return { user: createdUser, tokens };
  }

  async login(userData) {
    const user = await UserRepository.findByUsername(userData.username);
    if (user && (await bcryptjs.compare(userData.password, user.password))) {
      const tokens = generateTokens(user);
      return { user, tokens };
    }
    throw new Error("Invalid credentials");
  }
}