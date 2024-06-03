import bcryptjs from "bcryptjs";
import UserRepository from "../repositories/UserRepository.js";
import generateTokens from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

class UserService {
  async createUser(userData, res) {
    const { username, password, confPassword, email, role } = userData;

    if (!username || !password || !confPassword || !email) {
      res.status(400).json({ msg: "All fields are required"});
    }

    if (password !== confPassword) {
      res.status(400).json({ msg: "Passwords do not match"});
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = { username, password: hashedPassword, email, role };
    const createdUser = await UserRepository.create(user);
    return { msg: "User successfully created", user: createdUser };
  }

  async register(userData, res) {
    const { username, password, confPassword, email } = userData;

     if (!username || !password || !confPassword || !email) {
       res.status(400).json({ msg: "All fields are required" });
     }

     if (password !== confPassword) {
       res.status(400).json({ msg: "Passwords do not match" });
     }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = { username, password: hashedPassword, email, role: "member" };
    const createdUser = await UserRepository.create(user);
    const tokens = generateTokens(createdUser);
    return { user: createdUser, tokens };
  }

  async login(userData, res) {
    const user = await UserRepository.findByUserEmail(userData.email);
    if (user && (await bcryptjs.compare(userData.password, user.password))) {
      const tokens = generateTokens(user);
      return { user, tokens };
    }
    res.status(400).json({ msg: "Invalid credentials" });
  }
}

export default new UserService();