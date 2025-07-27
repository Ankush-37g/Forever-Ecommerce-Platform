import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import About from './Pages/About'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Home from './Pages/Home.jsx'
import Login from './pages/Login'


const router = createBrowserRouter(

   createRoutesFromElements(

        <Route path='/' element = {<App/>}>

            <Route path='' element={<Home/>}/> 

            <Route path='collection' element = {<Collection/>} />

            <Route path='about' element = {<About/>} />

            <Route path='contact' element = {<Contact/>} />

            <Route path='product/:productId' element = {<Product/>} />

            <Route path='login' element = {<Login/>} />

            <Route path='cart' element = {<Cart/>} />
            
            <Route path='orders' element = {<Orders/>} />

            <Route path='place-order' element = {<PlaceOrder/>} />

        </Route>
      
  )
)
createRoot(document.getElementById('root')).render(
 
    <StrictMode>

       <RouterProvider router={router}/>
    
    </StrictMode>,
)
