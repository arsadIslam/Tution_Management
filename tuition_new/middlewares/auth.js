import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET; // Replace with .env later

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ status: "error", message: "Token missing!" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
        console.log(err);
        
      return res
        .status(403)
        .json({ status: "error", message: "Invalid token!" });
    }
    req.user = user;
    next();
  });
};
