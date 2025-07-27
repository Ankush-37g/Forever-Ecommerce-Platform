import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const adminAuth = asyncHandler( async (req, res, next) => {

    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer "))
    {
       throw new ApiError(401, "Authorization header missing or malformed");
    }

    const token = authHeader.replace("Bearer ", "");
 
    if(!token)
    {
        throw new ApiError(400,"Not Authorized Login Again")

    }

    const decoded_token = jwt.verify(token,process.env.JWT_SECRET)
    
    // console.log(decoded_token)

    if(decoded_token.email !== process.env.ADMIN_EMAIL)
    {
         return res.status(403).json(new ApiError(403, "Forbidden: Not an admin"));
    }

    next()
   
})

export default adminAuth