import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ModayAccesorios = ({ addToCart, categoryId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/category/${categoryId}/100`);
                setProducts(response.data.content);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <div className="search-product">
            <div className="containere">
                <ul className="product-list containere ">
                    {products.map((product) => (
                        <li key={product.id} className="product d-flex justify-content-between">
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
                                    <p className="product-units">Unidades disponibles: {product.unitsAvailable}</p>
                                </Link>
                            </div>
                            <div className='butoAddcarr d-flex justify-content-end'>
                                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                                    <i className="fa fa-cart-plus" aria-hidden="true"></i> Agregar al carrito
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ModayAccesorios;
