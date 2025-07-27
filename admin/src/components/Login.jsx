import { useState } from "react"
import axios from "axios"
import { backendUrl } from "../App"
import { toast } from "react-toastify"

const Login = ({setToken}) => {
   
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async (e) => {
         
        try {
            e.preventDefault();
        
            const response = await axios.post(backendUrl + '/api/user/admin' , {email,password})

            console.log(response.data.message)
         
            if(response.data.success)
            {
                // console.log(response.data.data.token)
                setToken(response.data.data.token) 
                // localStorage.setItem('token',response.data.token)
                toast.success(response.data.message)
            }
            else
            {
              toast.error(response.data.message)
            }

        } catch (error) {

            if (error.response) 
            {
              // This will log your backend's JSON error message
                console.log(error.response.data);
                toast.error(error.response.data.message);
            } else {
                // Network or other error
                toast.error("An error occurred: " + error.message);
            }

        }
  }


  return (
    <div className="flex min-h-screen bg-slate-50 justify-center items-center w-full">
        
         <div className="border border-gray-150 px-8  py-6 bg-white rounded-lg shadow-md">

             <h1 className="font-bold text-2xl mb-4">Admin Panel</h1>

             <form onSubmit={onSubmitHandler} action="" className="flex flex-col gap-4">

                  <div className="mb-3">

                      <p className="text-sm font-medium text-gray-700"> Email Address </p>

                      <input onChange={(e)=> setEmail(e.target.value)} className="border border-gray-400 px-4 py-2 rounded-md mt-2 outline-none" type="email" placeholder='Enter your email' required />

                  </div>

                  <div className="mb-3">

                      <p className="text-sm font-medium text-gray-700"> Password </p>

                      <input onChange={(e)=> setPassword(e.target.value)}  className="border border-gray-400 px-4 py-2 rounded-md mt-2 outline-none" type="password" placeholder='Enter your password' required/>

                  </div>

                  <button className="bg-black rounded-lg py-2 px-4 text-white" type="submit">
                    Login
                  </button>
             </form>
         </div>
    </div>
  )
}

export default Login