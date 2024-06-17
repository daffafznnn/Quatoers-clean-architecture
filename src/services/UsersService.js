import bcryptjs from "bcryptjs";
import UserRepository from "../repositories/implementations/sql/UserRepository.js";
import removeSensitiveFields from "../utils/removeSensitiveFields.js";

class UserService {
  async createUser(userData) {
    const { username, password, confPassword, email, role } = userData;

    if (!username || !password || !confPassword || !email) {
      throw new Error("All fields are required");
    }

    if (password !== confPassword) {
      throw new Error("Passwords do not match");
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = { username, password: hashedPassword, email, role };
    const createdUser = await UserRepository.create(user);

    return {
      message: "User successfully created",
      data: removeSensitiveFields(createdUser),
    };
  }
}

export default new UserService();