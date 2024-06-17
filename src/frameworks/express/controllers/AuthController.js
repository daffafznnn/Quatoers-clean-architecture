import AuthService from "../../../services/AuthService.js";

class AuthController {
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: result.data,
        tokens: result.tokens,
      });
    } catch (error) {
      return res.status(error.statusCode || 400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        data: result.data,
        tokens: result.tokens,
      });
    } catch (error) {
      return res.status(error.statusCode || 400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const result = await AuthService.refreshToken(req.body);
      return res.status(200).json({
        status: "success",
        message: "Token refreshed successfully",
        tokens: result.accessToken,
      });
    } catch (error) {
      return res.status(error.statusCode || 400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const result = await AuthService.logout(req.userId);
      return res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (error) {
      return res.status(error.statusCode || 400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new AuthController();