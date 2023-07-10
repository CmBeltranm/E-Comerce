import React, { useState } from "react";
import "./App.css";
import Header from "./common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./common/footer/Footer.jsx";
import Login from "./components/account/Login.jsx";
import Signup from "./components/account/SignUp.jsx";
import Cart from "./components/cark/Cart.jsx";
import Home from "./components/home/Home.jsx";
import ProductForm from "./components/product/ProductForm.jsx";
import Data from "./components/Data";
import Electronica from "./components/menu/Electronica.jsx";
import SearchProduct from "./components/search/SearchProduct.jsx";
import ProductModel from "./components/product/Product.jsx";

function App() {
  const [CartItem, setCartItem] = useState([]);
  const { productItems } = Data;

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Home addToCart={addToCart} productItems={productItems} />
          </Route>
          <Route path="/cark" exact>
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
              setCartItem={setCartItem}
            />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/crearProducto" exact>
            <ProductForm />
          </Route>
          <Route path="/ProductForm" exact>
            <ProductForm />
          </Route>
          <Route path="/category/Electrónica" exact>
            <Electronica categoryId={1} addToCart={addToCart} />
          </Route>
          <Route path="/ProductForm" exact>
            <ProductForm />
          </Route>
          <Route path="/search-product/:search" component={SearchProduct}>
            <SearchProduct addToCart={addToCart} />
          </Route>
          <Route path="/product/:id" exact>
            <ProductModel addToCart={addToCart} />
          </Route>
          <Route path="/category/Moda y Accesorios" exact>
            <Electronica categoryId={2} addToCart={addToCart} />
          </Route>
          <Route path="/category/Hogar y Jardín" exact>
            <Electronica categoryId={3} addToCart={addToCart} />
          </Route>
          <Route path="/category/Salud y Belleza" exact>
            <Electronica categoryId={4} addToCart={addToCart} />
          </Route>
          <Route path="/category/Deportes" exact>
            <Electronica categoryId={5} addToCart={addToCart} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
