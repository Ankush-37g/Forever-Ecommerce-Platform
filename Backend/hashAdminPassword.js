import bcrypt from "bcrypt"

const hashPassword = async () =>{
     
    const hash = await bcrypt.hash("ecom123",10);

    console.log("Hashed Password: ",hash)

}

hashPassword()