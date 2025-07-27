
import './App.css'

import Navbar from './Components/Navbar'
import ShopContextProvider from "./Context/ShopContext"


import { Outlet } from 'react-router-dom'
import Footer from './Pages/Footer'
import SearchBar from './Components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <ShopContextProvider>

          <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] dark:bg-black dark:text-white'>
              <ToastContainer/>
              <Navbar/> 
              <SearchBar/>
              <Outlet/>
              <Footer/>   
          </div>  
                 
    </ShopContextProvider>

  )
}

export default App
