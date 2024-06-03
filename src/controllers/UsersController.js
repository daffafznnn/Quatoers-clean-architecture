import UserService from "../services/UserService.js";

class UserController {

  async createUserForAdmin(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      console.log("Request body:", req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error occurred" });
    }
  }

  async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Server error occurred" });
    }
  }

  async login(req, res) {
    try {
      const user = await UserService.login(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error occurred" });
    }
  }
}

export default new UserController();