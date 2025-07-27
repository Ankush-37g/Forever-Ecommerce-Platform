import React, { useContext ,useState ,useEffect} from 'react'
import {ShopContext} from '../context/shopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import {Link} from 'react-router-dom'
function Collection() {


  const {search,showSearch} = useContext(ShopContext)
  const {products} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(true)
  const [filterProducts,setFilterProducts] = useState([])
  const [category,setCategory] = useState([])
  const [subcategory,setSubcategory] = useState([])
  const [sortType,setSortType] = useState('relavent')


  const toggleCategory = (e)=>{

    if(category.includes(e.target.value))
    {
      setCategory(prev=>prev.filter(item=> item !==e.target.value))
    }
    else
    {
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubcategory = (e)=>{

    if(e.target.checked)
    {
      setSubcategory([...subcategory,e.target.value])
    }
    else
    {
      setSubcategory(subcategory.filter(item=> item !== e.target.value))
    }
  }

  const applyFilter = ()=>{
       let productscopy = [...products]
       
       if(search && showSearch)
       {
          productscopy = productscopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase())) 
       }
       if(category.length>0)
       {
           productscopy = productscopy.filter(item=> category.includes(item.category))
       }
       if(subcategory.length>0)
       {
              productscopy = productscopy.filter(item=> subcategory.includes(item.subCategory))
       }

       setFilterProducts(productscopy)
  }
  
  const sortProduct = () =>{
     let fpCopy = [...filterProducts]

     switch (sortType) {
        case 'low-high':
            setFilterProducts(fpCopy.sort((a,b)=> a.price - b.price))
            break;
        case 'high-low':
            setFilterProducts(fpCopy.sort((a,b)=> b.price - a.price))
            break;  
        default:
            applyFilter();
            break;
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category,subcategory,search,showSearch,products])

  useEffect(()=>{
     sortProduct()
  },[sortType,products])

  return (
    <div className='flex flex-col  sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
          {/* filter optiions */}
            <div className='min-w-60 mx-2'> 
 
                  <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} src={assets.dropdown_icon} alt="" />
                  </p>

                  {/* category filter */}
                  <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:w-50  ${showFilter ? '' : 'hidden'}`}>

                      <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

                      <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
                          </p>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
                          </p>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
                          </p>

                      </div>

                  </div>

                  {/* subcategory filter */}
                  <div className={`border border-gray-300 pl-5 py-3 my-5 sm:w-50 ${showFilter ? '' : 'hidden'}`}>

                      <p className='mb-3 text-sm font-medium'>TYPE</p>

                      <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubcategory}  /> Topwear
                          </p>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubcategory} /> Bottomwear
                          </p>

                          <p className='flex items-center gap-2'>
                              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubcategory} /> Winterwear
                          </p>

                      </div>

                  </div>

            </div>

            {/* Right Side */}
            <div >
                
                 <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                    
                    {/* Product Sort */}
                    <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                            <option value="relavent">Sort by: Relavent</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                    </select>
                 </div>

                 {/* Map Products */}
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {
                            filterProducts.map( (items,index)=>(
                             
                                <ProductItem key={index} id={items._id} image={items.image} name={items.name}   price={items.price}  />
                            
                             ))
                        }
                          
                        

                 </div>

            </div>

    </div>
  )
}

export default Collection