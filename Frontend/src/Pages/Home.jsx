
import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import LatestCollection from '../Components/LatestCollection'
import NewsLetterBox from "../Components/NewsLetterBox"
import OurPolicy from "../Components/OurPolicy"
function Home() {
  return (
    <>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </>
  )
}

export default Home