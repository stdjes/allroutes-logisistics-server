import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'
import { verifyToken } from "../utils/jwt";

dotenv.config()

const { JWT_SECRET } = process.env

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Please login" });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded as IUserPayload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Please login" });
  }
};
