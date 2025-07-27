import userModel from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"

const createToken = (id) =>{
     
     return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser = asyncHandler( async(req,res) => {
   
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email});

    if(!user)
    {
        throw new ApiError(400,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid user credentials")
    }

    const token = createToken(user._id)

    return res
    .status(200)
    .json(new ApiResponse(200, token, "Login successful"));

    
    
})

const registerUser = asyncHandler( async (req,res) => {
    
    const {name,email,password} = req.body;

    const isEmpty = [name,email,password].some(val => !val || val.trim()==="")

    if(isEmpty)
    {
        throw new ApiError(400,"All fields are required")
    }

    const exists = await userModel.findOne({email})

    if(exists)
    {
        throw new ApiError(400,"User already exists")
    }

    if(!validator.isEmail(email))
    {
        throw new ApiError(400,"Please enter valid email")
    }

    if(password.length < 8)
    {
        throw new ApiError(400,"Please enter strong password")
    }

    const newUser = new userModel({
        name,
        email,
        password
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    return res
    .status(201)
    .json( new ApiResponse(200,token,"User registered Successfully"))

})

const adminlogin = asyncHandler( async (req,res) => {
           
    const {email,password} = req.body

    if(!email || !password)
    {
        throw new ApiError(400,"Email and password is required");
    }
    
    if(email!== process.env.ADMIN_EMAIL)
    {
        throw new ApiError(401,"Unauthorized Access")
    }

    const validPassword = bcrypt.compare(password,process.env.ADMIN_PASSWORD_HASH)
    
    if(!validPassword)
    {
        throw new ApiError(401,"Invalid Credentials")
    }

    const token = jwt.sign(

            {role:"admin",email},

            process.env.JWT_SECRET,

            {expiresIn: "1h"}
    )

    return res
    .status(200)
    .json(new ApiResponse(200,{token},"Admin login Successfull"))
       
})

export { loginUser, registerUser, adminlogin }

