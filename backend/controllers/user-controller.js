import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult, body } from 'express-validator';
import jwt from 'jsonwebtoken';
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unexpected error occurred while fetching users." });
    }
};

export const signup = [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array().map(err => err.msg) });
        }

        const { name, email, password } = req.body;
        try {
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ errors: ["Email already in use"] });
            }

            const hashedPassword = bcrypt.hashSync(password, 12);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ user: newUser });
        } catch (err) {
            console.error(err);
            res.status(500).json({ errors: ["Unexpected error during the signup process"] });
        }
    }
];

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 12);
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unexpected error occurred while updating user." });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unexpected error occurred while deleting user." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'ad1085097c7415dd8c2a9277d8c6eacb66156c1cf207c689541c9eb5acdea4e5', // Replace 'yourSecretKey' with a real secret key
            { expiresIn: '4h' }
        );
        console.log("Sending login response with userId:", user._id.toString());

        res.status(200).json({
            message: "Login successful.",
            token: token,
            userId: user._id.toString() 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unexpected error occurred while logging in." });
    }
};

export const getBookingsOfUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const bookings = await Booking.find({ user: id });

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user." });
        }
        
        res.status(200).json({ bookings });
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: "Unexpected error occurred while fetching bookings." });
    }
};

