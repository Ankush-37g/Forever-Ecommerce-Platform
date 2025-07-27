import React from 'react'
import { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function BestSeller() {

    const {products} = useContext(ShopContext)
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=> {
        setBestSeller(products.filter((product)=>(product.bestseller===true)))
    },[products])

    return (
      <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
           <Title text1={'BEST'} text2={'SELLER'}/>
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
           "Discover our bestsellers! Shop the most popular and top-rated products loved by customers. Find trending deals and must-have items today!"
           </p>
      </div>

      {/* rendering products */}
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          
          {
            bestSeller.map((item,index)=>(
              <ProductItem key={index} id = {item._id} image = {item.image} name={item.name} price ={item.price}/>
            ))
          }
       </div>
    </div>
    )
  
  
}

export default BestSeller