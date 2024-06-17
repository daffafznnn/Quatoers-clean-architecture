import UsersService from "../../../services/UsersService.js";

class UsersController {
  async createUser(req, res) {
    try {
      const result = await UsersService.createUser(req.body);
      return res.status(201).json({
        status: "success",
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

}

export default new UsersController();