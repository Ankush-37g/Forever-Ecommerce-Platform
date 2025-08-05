import { ApiResponse } from "../utils/ApiResponse.js"

import {ApiError} from "../utils/ApiError.js"

import { asyncHandler } from "../utils/asyncHandler.js"

import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// placing order using COD
const placeOrder = asyncHandler( async (req, res)=> {
     
     const { userId, items, amount , address } = req.body;

     const orderData = {
        userId,
        items,
        amount,
        address,
        status: "Order Placed",
        paymentMethod: "COD",
        payment : false,
        date: Date.now()
     }

     const newOrder = new orderModel(orderData)

     await newOrder.save()

     await userModel.findByIdAndUpdate(userId, { cartData:{} })

     return res.status(200).json(new ApiResponse(200,null,"Order Placed"))
})


// placing order using Stripe method
const placeOrderStripe = asyncHandler( async (req, res)=> {
    
})

//placing order using razorpay method
const placeOrderRazorpay = asyncHandler( async (req, res)=> {
    
})

//All orders data for Admin Panel
const allOrders = asyncHandler( async (req, res)=> {
    
})

// User order data from frontend
const userOrders = asyncHandler( async (req, res)=> {
      
      const { userId } = req.body

       // we will get array of orders
      const orders = await orderModel.find({userId})

      return res.json(new ApiResponse(200,orders))


})

//update order status
const updateStatus = asyncHandler( async (req, res)=> {
    
})


export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}
