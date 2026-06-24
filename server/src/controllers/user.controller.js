import {
    registerUser,
    loginUser
} from "../services/user.services.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAccessToken } from "../utils/jwt.js"

const register = asyncHandler(async (req, res) => {
    try {
        const user = await registerUser(req.body)

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    user,
                    "User created successfully"
                )
            )

    } catch (error) {

        return ApiError(400, error, "Error occured during user registration")

    }
})

const login = asyncHandler(async (req, res) => {

    try {
        const user = await loginUser(req.body);

        const token = generateAccessToken(user.id);

        return res
            .status(201)
            .ApiResponse(
                201,
                user,
                "User login successfull"
            )
    } catch (error) {
        return ApiError(404, error, "Error occurred during logging user")
    }
})




export {
    register,
    login
}