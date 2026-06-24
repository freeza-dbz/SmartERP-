import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiErrors"
import { ApiResponse } from "../utils/ApiResponse"

const verifyJWT = asyncHandler(async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res
                .status(401)
                .json(
                    ApiError(
                        401,
                        "Unauthorized Request"
                    )
                );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return ApiError(401, "Invalid Token")
    }
})