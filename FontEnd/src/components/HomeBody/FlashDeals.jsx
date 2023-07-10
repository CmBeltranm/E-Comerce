import React, { useState, useEffect } from 'react';
import FlashCard from "./FlashCard"
import "./style.css"

const FlashDeals = ({ productItems,addToCart }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    const url = 'http://localhost:8080/api/v1/categories?pageNumber=0&pageSize=10';

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la respuesta de la API');
        }
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {categories.map(category => (
        <section className='flash' key={category.id}>
          <div className='containere'>
            <div className='heading f_flexz'>
              <i className='fa fa-bolt'></i>
              <h1>{category.nombre}</h1>
            </div>
            <FlashCard  addToCart={addToCart} productItems={productItems} categoryid={category.id}/>
          </div>
        </section>
      ))}
    </>
  )
}

export default FlashDeals;
