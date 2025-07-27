import { useContext,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';


function Login() {

  const [currentState, setCurrentState] = useState('Login');

  const {token,setToken, navigate,backendUrl} = useContext(ShopContext)

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')


  const onSubmitHanlder = async(event) => {

       event.preventDefault();

       try {
          
          if(currentState === 'Sign Up')
          {
              const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
              
              if(response.data.success)
              {
                setToken(response.data.data)

                localStorage.setItem('token',response.data.data)

                toast.success(response.data.message)
              }
              else{
                toast.error(response.data.message)
              }
              
          }
          else
          {
            const response = await axios.post(backendUrl + '/api/user/login', {email,password})

            if(response.data.success)
            {
               setToken(response.data.data)

               localStorage.setItem('token',response.data.data)

               toast.success("User Login Successfull")
            }
            else
            {
               toast.error(response.data.message)
            }
          }

       } 
       catch (error) 
       {

          if (error.response) {
              // This will log your backend's JSON error message
              console.log(error.response.data);
              toast.error(error.response.data.message);
          } else {
              // Network or other error
              toast.error("An error occurred: " + error.message);
          }
       }


  }
  
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHanlder} className='flex flex-col items-center m-auto mt-14 gap-4 w-[90%] sm:max-w-96 text-gray-800'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>

         <p className='prata-regular text-3xl'>{currentState}</p>

         <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>

      </div>
      
      {currentState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'/> }
      

      <input onChange={(e)=> setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email'/>

      <input onChange={(e)=> setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password'/>

      <div className='w-full flex justify-between text-sm mt[-8px]'>

        <p>Forgot your password?</p>

        {
           currentState === 'Login' 
           ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>

           : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
        }
       
      </div>

      <button className='bg-black px-8 py-2 mt-4 text-white font-light'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

      

    </form>
  )
}

export default Login