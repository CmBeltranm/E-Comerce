import React from "react"
import "./Home.css"
import SliderHome from "./Slider"
import FlashDeals from "../HomeBody/FlashDeals"

const Home = ({productItems, addToCart}) => {
  return (
    <>
      <section className='home'>
        <div className='containere d_flexz difuminado'>
          <SliderHome />
        </div>
        <div>
          
        </div>
      </section>
    </>
  )
}

export default Home
