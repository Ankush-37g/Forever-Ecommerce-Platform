import mongoose from "mongoose";

const connectDB = async ()=>{

    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

        console.log("DB Connected")

    } catch (error) {
        
        console.log("DB connection failed",error)

        process.exit(1)
    }
 
    
}

export default connectDB