import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../../models/User/userModel"
import { errorMessage } from "../../utils/helpers"
import { genSalt, hash, compare } from 'bcryptjs';

const generateToken = (id, email: string, firstName: string, lastName: string) => {
    return jwt.sign({ id, email, firstName, lastName }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

export const registerUser = async (req: Request, res: Response) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body

    if (!email || !firstName || !lastName || !password) return errorMessage(400, res, "Please fill all fields!")

    const userExists = await User.exists({ email });
    if (userExists) return errorMessage(400, res, "User already exists!")

    const salt = await genSalt(10)
    const hashPassword = await hash(password, salt);

    if (password !== confirmPassword) return errorMessage(400, res, "Passwords don't match!")

    const user = await User.create({
        email,
        firstName,
        lastName,
        password: hashPassword
    })

    if (user) {
        return res.status(201).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id, user.email, user.firstName, user.lastName)
        })
    }
    errorMessage(400, res, "Invalid user data!")
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) return errorMessage(400, res, "Invalid email or password!")

    const matchPassword = await compare(password, user.password)
    if (!matchPassword) return errorMessage(400, res, "Invalid email or password!")

    return res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        token: generateToken(user._id, user.email, user.firstName, user.lastName)
    })

}

export const logoutUser = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const user = await User.findByIdAndUpdate(userId, { token: null });
        if (!user) throw new Error('User not found');
        res.status(200).json({ message: "Logout successful" });

    } catch (err) {
        console.error(err);
        errorMessage(500, res, 'Server error');
    }
}