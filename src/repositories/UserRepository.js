import User from "../models/UsersModel.js";

class UserRepository {
  async create(user) {
    return User.create(user);
  }

  async findByUserEmail(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  }
}

export default new UserRepository();