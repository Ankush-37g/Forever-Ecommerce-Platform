import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';


const authUser = asyncHandler( async (req,res,next) => {
   
    const authHeader = req.header("Authorization");

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        throw new ApiError(401, "Authorization header missing or malformed")
    }

    const token = authHeader.replace("Bearer ", "");

     if(!token)
    {
        throw new ApiError(400,"Not Authorized Login Again")

    }

    const decoded_token = jwt.verify(token,process.env.JWT_SECRET)

    req.body.userId = decoded_token.id 

    next()
     
})

export default authUser