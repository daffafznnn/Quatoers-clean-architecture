import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import removeSensitiveFields from "../utils/removeSensitiveFields.js";
import UserRepository from "../repositories/implementations/sql/UserRepository.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

class AuthService {
  async register(userData) {
    const { username, password, confPassword, email } = userData;

    if (!username || !password || !confPassword || !email) {
      throw { statusCode: 400, message: "All fields are required" };
    }

    if (password !== confPassword) {
      throw { statusCode: 400, message: "Passwords do not match" };
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = {
      username,
      password: hashedPassword,
      email,
      role: "member",
    };

    const createdUser = await UserRepository.create(user);
    const accessToken = generateAccessToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);

    // Update user object with refreshToken and save
    createdUser.refreshToken = refreshToken;
    await createdUser.save();

    const tokens = {
      accessToken,
      refreshToken,
    };

    return { data: removeSensitiveFields(createdUser), tokens };
  }

  async login(userData) {
    const { email, password } = userData;
    const user = await UserRepository.findByUserEmail(email);

    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      throw { statusCode: 403, message: "Wrong password" };
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update user object with refreshToken and save
    user.refreshToken = refreshToken;
    await user.save();

    const tokens = {
      accessToken,
      refreshToken,
    };

    return { data: removeSensitiveFields(user), tokens };
  }

  async refreshToken(token) {
    const { refreshToken } = token;
    if (!refreshToken) {
      throw { statusCode: 401, message: "Refresh token is required" };
    }

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
          reject({ statusCode: 403, message: "Invalid token" });
        }
        const newAccessToken = generateAccessToken(user);
        resolve({ accessToken: newAccessToken });
      });
    });
  }
  async logout(userId) {
    const user = await UserRepository.findByUserId(userId);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }

    user.refreshToken = null;
    await user.save();

    return { message: "User logged out successfully" };
  }
}

export default new AuthService();