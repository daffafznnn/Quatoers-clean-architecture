import IUserRepository from "../../interfaces/IUserRepository.js";
import User from "../../../models/sql/UsersModel.js";

class UserRepositoryNoSQL extends IUserRepository {
  async create(user) {
    const createdUser = new User(user);
    return createdUser.save();
  }

  async findByUserEmail(email) {
    return User.findOne({ email });
  }
}

export default new UserRepositoryNoSQL();
