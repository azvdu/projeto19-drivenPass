import jwt from "jsonwebtoken";

type CreateTokenData = {
    userId: number
}

export async function decodingToken(token: string){
    const userId = jwt.decode(token) as CreateTokenData

    return userId;
}