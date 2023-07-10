import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SearchProduct.css";
import { Link } from "react-router-dom";

const SearchProduct = ({ addToCart }) => {
  const { search } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/products/filterByKeyword?keyword=${search}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="search-product">
      <div className="container">
        <div className="search-product-box">
          <h1>Resultado de búsqueda de "{search}"</h1>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product">
                <div className="product-image-container">
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <Link to={{
                    pathname: `/product/${product.id}`,
                    state: { product: product }
                  }}>
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <div className="product-details">
                      <p className="product-price">Precio: ${product.price}</p>
                    </div>
                  </Link>
                </div>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  <i className="fa fa-plus"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
