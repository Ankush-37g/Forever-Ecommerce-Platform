import { ApiResponse } from "../utils/ApiResponse.js"
import cloudinary from 'cloudinary'
import productModel from "../models/productModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"

// Add product fn
const addProduct = asyncHandler( async (req, res) =>{
     
    const {name,description,price,category,subCategory,sizes,bestseller} = req.body

    const image1 = req.files?.image1?.[0]
    const image2 = req.files?.image2?.[0]
    const image3 = req.files?.image3?.[0]
    const image4 = req.files?.image4?.[0]

    // console.log(name,description,price,category,subCategory,sizes,bestseller)

    const images = [image1,image2,image3,image4].filter((image)=> image!== undefined)

    let imagesUrl = await Promise.all(

        images.map(async (image) => {

              let result = await cloudinary.uploader.upload(image.path,{resource_type:'image'});

              return result.secure_url


        })
    )

    const productData = {
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imagesUrl,
        date: Date.now()
    }

    // console.log(productData)

    const product = new productModel(productData);

    await product.save();

    return res
    .status(200)
    .json(new ApiResponse(200,product,"Product Added"))

     
})

const listProducts = asyncHandler( async (req, res) =>{
 
    const products = await productModel.find({}); 

    return res
    .status(200)
    .json(new ApiResponse(200,products))

     
})

const removeProduct = asyncHandler( async (req, res) =>{

    await productModel.findByIdAndDelete(req.body.id)

    return res
    .status(200)
    .json(new ApiResponse(200,"Product Removed Successfully"))
  
})

//function for single product info
const singleProduct = asyncHandler( async (req, res) =>{

    const { productId } = req.body
    
    const product = await productModel.findById(productId)

    return res
    .status(200)
    .json(new ApiResponse(200,product) )

      
})


export { listProducts,addProduct,removeProduct,singleProduct }