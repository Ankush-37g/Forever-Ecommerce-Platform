import Navbar from "./components/Navbar"
import Sidebar from "./components/sidebar"
import { Routes,Route } from "react-router-dom"
import Add from "./pages/Add.jsx"
import List from "./pages/List.jsx"
import Orders from "./pages/Orders.jsx"
import Login from "./components/Login.jsx"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

   useEffect(()=>{
       localStorage.setItem('token',token)
   },[token])
   
   return (
      <div>
        <ToastContainer/>
        { token === "" ? <Login setToken={setToken}/>
          : <>
              <Navbar setToken={setToken}/>

              <hr />

              <div className="flex w-full">
                
                  <Sidebar/>

                  <div className="w-[70%] mx-auto my-8 text-gray-600 text-base ml-[max(5vw,25px)]">
                      <Routes>
                        
                          <Route path="/add" element={<Add token= {token}/>} />

                          <Route path="/list" element={<List token= {token}/>} />
                          
                          <Route path="/orders" element={<Orders token= {token}/>} />

                      </Routes>

                  </div>

              </div>

            </>
        }
       
      </div>
   )
}

export default App