import express from "express";
import { body } from 'express-validator';

import {
  deleteUser,
  getAllUsers,
  getBookingsOfUser,
  login,
  signup,
  updateUser
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/bookings/:id", getBookingsOfUser);

userRouter.post("/signup", [
  body('name').trim().not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], signup);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.post("/login", login);

export default userRouter;
