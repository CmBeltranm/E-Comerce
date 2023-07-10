import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="next">
      <i className="fa fa-long-arrow-alt-right"></i>
    </button>
  </div>
);

const SamplePrevArrow = ({ onClick }) => (
  <div className="control-btn" onClick={onClick}>
    <button className="prev">
      <i className="fa fa-long-arrow-alt-left"></i>
    </button>
  </div>
);

const FlashCard = ({ addToCart, categoryid }) => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/category/${categoryid}/5`
        );
        const { content } = response.data;
        setProducts(content);
        console.log(content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categoryid]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
  };

  return (
    <>
      <Slider {...settings}>
        {products.map((product) => (
          <div className="box" key={product.id}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">{product.discount}% Off</span>
                <img src={product.cover} alt="" />
                <div className="product-like">
                  <label>{count}</label> <br />
                  <i className="fa-regular fa-heart" onClick={increment}></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="rate">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa fa-star${index < 4 ? "-half-alt" : ""}`}
                    ></i>
                  ))}
                </div>
                <div className="price">
                  <h4>${product.price}.00</h4>
                  <button onClick={() => addToCart(product)}>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FlashCard;
