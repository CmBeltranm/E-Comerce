import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categories?pageNumber=0&pageSize=100');
                setCategories(response.data.map(category => ({ id: category.id, name: category.nombre })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="menu-links d-flex">
                <div className="d-flex gap-15 p-3">
                    {categories.map(category => (
                        <Link to={`/category/${category.name}`} key={category.id}>
                            {category.name}
                        </Link>
                    ))}
                </div>
                <div className='gap-15 p-3'>
                    <Link to="/crearProducto">
                        <span className=''>Crear Producto</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CategoryMenu;