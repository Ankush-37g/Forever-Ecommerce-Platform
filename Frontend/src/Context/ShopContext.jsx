import { createContext ,useEffect,useState} from "react";
// import {products} from "../assets/assets"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = ({children}) =>{
    
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search,setSearch] = useState('')

    const [showSearch,setShowSearch] = useState(true)

    const [cartItems,setCartItems] = useState({})

    const [products,setProducts] = useState([])

    const [token, setToken] = useState('')
    
    const navigate = useNavigate()

    const addToCart = async (itemId,size) => {
         
        if(!size)
        {
           toast.error('Select Product Size');
           return;
        }   

        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] +=1;
            }
            else
            {
                cartData[itemId][size]=1;
            }
        }
        else
        {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if(token)
        {
           try {

              await axios.post(

                backendUrl + "/api/cart/add",
                {itemId,size},

                {
                   headers: {
                    'Authorization' : `Bearer ${token}`
                   }
                }

            )
           } catch (error) {
             
              console.log(error.response.data)
              toast.error(error.response.data.message)
           } 
        }
    }

  
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                
                    if(cartItems[items][item]>0)
                    {
                        totalCount += cartItems[items][item];
                    }
              
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity) =>{

        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if(token)
        {
           try {

              await axios.post(

                backendUrl + "/api/cart/update",

                {itemId,size,quantity},

                {
                   headers: {
                    'Authorization' : `Bearer ${token}`
                   }
                }

              )
           } catch (error) {
             
              console.log(error.response.data)
              toast.error(error.response.data.message)
           } 
        }
    }

    const getCartAmount = () =>{
        let totalAmount = 0;
        for(const items in cartItems)
        {
            let itemInfo = products.find((product) => product._id===items)

            for(const item in cartItems[items])
            {
                
                    if(cartItems[items][item]>0)
                    {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }

            }
        }
        return totalAmount;
    }
    
    const getProductsData = async () => {

        try {
           const response = await axios.get(backendUrl + '/api/product/list') 

        //    console.log(response)

           if(response.data.success)
           {
             setProducts(response.data.data)
           }
           else
           {
              toast.error(response.data.message)
           }
           
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {

        try {
            
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                {
                    headers : {
                       "Authorization" : `Bearer ${token}`
                    }
                }
            )

            if(response.data.success)
            {
                setCartItems(response.data.data)
            }
        } catch (error) {
            
            
              console.log(error.response.data)
              toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
       getProductsData()
    },[])

    useEffect(() => {

        const storedToken = localStorage.getItem('token');

        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }

    }, []);

   
    const value = {
          products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,addToCart,getCartCount,cartItems,setCartItems,updateQuantity,getCartAmount,navigate,backendUrl,token,setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider