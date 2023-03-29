import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function Productos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const api = await fetch("https://fakestoreapi.com/products?limit=4");
      const datos = await api.json();
      setProducts(datos);
    }
    fetchProducts();
  }, []);

  const addCesta = (product) => {
    const cesta = JSON.parse(localStorage.getItem("cesta") || "[]");
    localStorage.setItem("cesta", JSON.stringify([...cesta, product]));
    alert("Producto añadido al carrito");
  };


  return (
    <>
      <Head>
        <title>Catálogo</title>
        <meta name="description" content="Catálogo de productos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="bgimage"></div>
      <div className="container">
        <div className="productos">
          {products.map((product) => (
            <div className="art" key={product.id}>
              <h3 id="ptitle">{product.title}</h3>
              <br />
              <p id="desc">{product.description}</p>
              <br />
              <img src={product.image} alt={product.title} />
              <br />
              <p id="price">Precio: {product.price} €</p>
              <p id="rate">
                {Array.from({ length: product.rating.rate }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </p>
              <p id="rates">{product.rating.count} valoraciones</p>
              <br />
              <button id="btn" onClick={() => addCesta(product)}>
                Añadir al carrito
              </button>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
