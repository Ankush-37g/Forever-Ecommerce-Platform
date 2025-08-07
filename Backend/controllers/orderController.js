import { ApiResponse } from "../utils/ApiResponse.js"

import {ApiError} from "../utils/ApiError.js"

import { asyncHandler } from "../utils/asyncHandler.js"

import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

//global variables
const currency = 'inr'
const deliveryCharge = 10

//gateway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


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
    
      const orders = await orderModel.find({})

      return res.json(new ApiResponse(200,orders))
})

// User order data from frontend
const userOrders = asyncHandler( async (req, res)=> {
      
      const { userId } = req.body

      if(!userId)
      {
            throw new ApiError(400,"User not found")
      }

       // we will get array of orders
      const orders = await orderModel.find({userId})

      return res.json(new ApiResponse(200,orders))


})

//update order status from admin panel
const updateStatus = asyncHandler( async (req, res)=> {
      
      const { orderId, status } =  req.body

      await orderModel.findByIdAndUpdate(orderId, {status})

      return res.json(new ApiResponse(200,"Status Updated"))

})


export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}
