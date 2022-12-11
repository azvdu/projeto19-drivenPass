import httpStatus from "http-status";
import jwt from "jsonwebtoken";

type CreateTokenData = {
    userId: number
}

export async function verifyToken(token: string){
    const JWT_SECRET = process.env.JWT_SECRET
    jwt.verify(token, JWT_SECRET, (error) => {
        if(error){
            throw{type: httpStatus.UNAUTHORIZED, message: "token is invalid"}
        }
    })
    return jwt.decode(token) as CreateTokenData
}