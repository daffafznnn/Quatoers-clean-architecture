import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokens = (user) => {
  // Membuat token akses dengan waktu kadaluarsa 1 hari
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Membuat refresh token dengan waktu kadaluarsa 7 hari
  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;