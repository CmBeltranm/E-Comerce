import React, { useState} from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";


const Header = ({ CartItem }) => {
  const [searchText, setSearchText] = useState("");
  const [login, setLogin] = useState(false);

  const history = useHistory();
  
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      history.push(`/search-product/${searchText}`);
    }
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container.xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                ¡Por compras superiores a $150.000 el envio es gratis!
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Linea:
                <a className="text-white" href="tel:+57 3043612037">
                  +57 3043612037
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center " >
            <div className="col-2">
              <h2>
                <Link to='/' className="text-white">Fashion Frenzy Style</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <input
                  type="text"
                  class="form-control py-2"
                  placeholder="Buscar Producto.."
                  aria-label="Buscar Producto..."
                  aria-describedby="basic-addon2"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  onKeyPress={handleSearch}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
            <div className="col-5 search">
              <div className="header-upper-links d-flex align-items-center justify-content-between search">
                <div >
                  <Link className="d-flex aling-items-center gap-10 text-white">
                    <div className="text-white" />
                    <i className="fas fa-heart icon-circle fa-2x"></i>
                    <p className="mb-0">
                      Favoritos
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to={login ? '/': '/login'} className="d-flex aling-items-center gap-10 text-white">
                    <i className="fa fa-user icon-circle fa-2x"></i>
                    <p className="mb-0">
                      Mi cuenta
                    </p>
                  </Link>
                </div>
                <div className="search-cart">
                  <Link to='/cark' className="d-flex aling-items-center gap-10 text-white" >
                    <i className="fas fa-cart-plus icon-circle fa-2x"></i>
                    <div className="d-flex flex-column">
                      <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom ру-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30 h-100 justify-content-end">
                <CategoryMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
