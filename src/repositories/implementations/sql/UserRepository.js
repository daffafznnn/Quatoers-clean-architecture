import IUserRepository from "../../interfaces/IUserRepository.js";
import User from "../../../models/sql/UsersModel.js";

class UserRepositorySQL extends IUserRepository {
  async create(user) {
    return User.create(user);
  }

  async findByUserEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findByUserId(userId) {
    return User.findByPk(userId);
  }
}

export default new UserRepositorySQL();