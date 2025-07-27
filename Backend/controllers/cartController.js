import userModel from '../models/userModel.js'
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
// add products to user cart

const addToCart = asyncHandler( async(req ,res) => {
        
        const { userId, itemId, size } = req.body

        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData;

        if(cartData[itemId])
        {
           if(cartData[itemId][size])
              cartData[itemId][size] += 1;
           else
             cartData[itemId][size] = 1
           
        }
        else
        {
           cartData[itemId] = {}
           cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        return res.status(200).json(new ApiResponse(200,"Added to Cart"))

})


const updateCart = asyncHandler( async(req ,res) => {
    
    const { userId, itemId, size, quantity } =  req.body
    
    const userData = await userModel.findById(userId)

    let cartData = await userData.cartData
    
    cartData[itemId][size] = quantity

    await userModel.findByIdAndUpdate(userId, {cartData})

    return res.json(200, "Cart Updated")


})


const getUserCart = asyncHandler( async(req ,res) => {
    
    const { userId } = req.body

    const userData = await userModel.findById(userId)

    let cartData = userData.cartData || []
    
    return res.status(200).json(new ApiResponse(200, cartData))
})


export { addToCart, updateCart, getUserCart}