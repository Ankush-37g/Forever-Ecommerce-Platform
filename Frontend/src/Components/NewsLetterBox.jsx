import React from 'react'

function NewsLetterBox() {

  const handleSubmit = (e)=>{
        e.preventDefault();
  }
  return (
    <div className='text-center'>

        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>

        <p className='text-gray-400 mt-3'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, odit!
        </p>
        
        <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border border-gray-400 '>

            <input className='w-full sm:flex-1 outline-none pl-3' type="email" placeholder='Enter your email' />

            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer '>SUBSCRIBE</button>

        </form>
    </div>
  )
}

export default NewsLetterBox