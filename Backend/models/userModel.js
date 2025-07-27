import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default : {}
    },

},{minimize: false})  // Keep empty objects (like cartData: {}) in the document


userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    // Agar password modify hua hai, to usko bcrypt se hash karo (10 rounds of salting)
    this.password = await bcrypt.hash(this.password, 10);

    next();
});



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel

