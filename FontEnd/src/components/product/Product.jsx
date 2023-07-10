import React, { useState } from "react";
import "./Product.css";
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const product = location.state.product;
  const [comments, setComments] = useState([...product.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const commentData = {
      comment: newComment,
      product: {
        id: product.id
      }
    };
    try {
      const response = await fetch("http://localhost:8080/api/v1/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...product.comments, data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setNewComment("");
      } else {
        console.error("Error al enviar el comentario");
      }
    } catch (error) {
      console.error("Error al enviar el comentario", error);
    }
  };

  return (
    <>
      <div className="container product">
        <div className="row">
          <div className="col-md-6">
            <div className="product-image-container">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              <div className="unitsAvailable">
                <p>Cantidad disponible: {product.unitsAvailable}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container comentario">
        <h2>Comentarios</h2>
        <form onSubmit={handleSubmitComment} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Ingresa tu comentario"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        <div className="comentario-box">
          {comments.map((comment, index) => (
            <div key={index} className="comentario-info">
              <div className="comment-header">
                <h3>{comment.name}</h3>
                <p>{comment.createdAt}</p>
              </div>
              <div className="comment-content">
                <p>{comment.comment}</p>
                <i className="fas fa-comment"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
