import bcrypt from "bcrypt"
import { prisma } from "../db/index.js"
import { ApiError } from "../utils/ApiErrors.js"

const registerUser = async ({ fullName, username, email, password }) => {
    const existingUser = await prisma.users.findUnique({
        where: {
            email,
        }
    });

    if (existingUser) {
        throw new ApiError(409, "User Already Existed")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.users.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
            username,
        },
    });

    return user;
}

const loginUser = async ({ email, password }) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new ApiError(404, "Invalid Email")
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(404, "Invalid Password")
    }

    return user

}



export {
    registerUser,
    loginUser
}