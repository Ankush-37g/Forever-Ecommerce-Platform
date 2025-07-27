import NewsLetterBox from '../Components/NewsLetterBox'
import Title from '../Components/Title'
import {assets} from '../assets/assets.js'

function Contact() {
  return (
    <div>

        <div className='text-center text-2xl pt-10 border-t'>
           <Title text1={'CONTACT'} text2={'US'}/>
        </div>

        <div className='flex flex-col md:flex-row justify-center gap-10 m-auto my-10 mb-20'>

           <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />

           <div className='flex flex-col justify-center items-start gap-6'>

                <p className='text-xl font-semibold text-gray-600'>Our Store</p>

                <div className='text-gray-500'>
                  <p>54709 Willms Station</p>
                  <p>Suite 350, Washington, USA</p>
                </div>

                <div className='text-gray-500'>
                  <p>Tel: (415) 555-0132</p>
                  <p>Email: admin@forever.com</p>
                </div>

                <p className='font-semibold text-xl text-gray-600'>Carrets at Forever</p>

                <p className='text-gray-500'>Learn more about our teams and job openings.</p>

                <div className='border border-gray-800 w-[180px] py-3 px-8 hover:bg-black hover:text-white'>
                    Explore Jobs
                </div>

           </div>

        </div>

        <NewsLetterBox/>
       
    </div>
  )
}

export default Contact