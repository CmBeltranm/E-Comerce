import React, { useState } from "react";
import "./filtros.css";

const Filtros = ({ marcas, fechas, filtrarPorMarca, filtrarPorFecha, filtrarPorPrecio }) => {
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const handleFiltrarPorMarca = (event) => {
    const marcaSeleccionada = event.target.value;
    filtrarPorMarca(marcaSeleccionada);
  };

  const handleFiltrarPorFecha = (event) => {
    const fechaSeleccionada = event.target.value;
    filtrarPorFecha(fechaSeleccionada);
  };

  const handleFiltrarPorPrecio = () => {
    filtrarPorPrecio(precioMin, precioMax);
  };

  return (
    <div className="filtros">
      <h2>Filtros:</h2>
      <div className="filtro-marca">
        <h3>Marca:</h3>
        <select onChange={handleFiltrarPorMarca}>
          <option value="">Todas</option>
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-fecha">
        <h3>Fecha:</h3>
        <select onChange={handleFiltrarPorFecha}>
          <option value="">Todas</option>
          {fechas.map((fecha) => (
            <option key={fecha} value={fecha}>
              {fecha}
            </option>
          ))}
        </select>
      </div>
      <div className="filtro-precio">
        <h3>Precio:</h3>
        <input type="number" placeholder="Desde" value={precioMin} onChange={(event) => setPrecioMin(event.target.value)} />
        <input type="number" placeholder="Hasta" value={precioMax} onChange={(event) => setPrecioMax(event.target.value)} />
        <button onClick={handleFiltrarPorPrecio}>Filtrar</button>
      </div>
    </div>
  );
};

export default Filtros;
