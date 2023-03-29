import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Carrito() {
  const [cesta, setCesta] = useState([]);
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cesta") || "[]");
    setCesta(data);
  }, []);

  const eliminarProducto = (index) => {
    const nuevaCesta = [...cesta];
    nuevaCesta.splice(index, 1);
    localStorage.setItem("cesta", JSON.stringify(nuevaCesta));
    setCesta(nuevaCesta);
    alert("Producto eliminado del carrito");
  };

  const precioTotal = cesta.reduce(
    (total, producto) => total + producto.price,
    0
  );

  const precioTotalConDescuento = precioTotal - (precioTotal * descuento) / 100;

  const dto10 = () => {
    setDescuento(10);
    alert("Descuento del 10% aplicado");
  };

  const dto50 = () => {
    setDescuento(50);
    alert("Descuento del 50% aplicado");
  };

  const pago = () => {
    localStorage.removeItem("cesta");
    setCesta([]);
    alert("Gracias por su compra");
    window.location.href = "/";
  };

  return (
    <>
      {cesta.length === 0 ? (
        <>
          <Head>
            <title>Carrito</title>
            <meta name="description" content="Carrito de la compra" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <div className="bgimage"></div>
          <div className="container">
            <h1 id="title">
              Cesta vacía... <br /> Añade productos desde el&nbsp;
              <Link href="/catalogo">
                <span className="enlace">catálogo➡</span>
              </Link>
            </h1>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Head>
            <title>Carrito</title>
            <meta name="description" content="Carrito de la compra" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <div className="bgimage"></div>
          <div className="container-carrito">
            <div className="productos">
              {cesta.map((product, index) => (
                <div key={index} className="art">
                  <h3 id="ptitle">{product.title}</h3>
                  <br />
                  <p id="desc">{product.description}</p>
                  <br />
                  <img src={product.image} alt={product.title} />
                  <br />
                  <p id="price">Precio: {product.price} €</p>
                  <br />
                  <button id="btn" onClick={() => eliminarProducto(index)}>
                    Eliminar
                  </button>
                  <br />
                  <br />
                </div>
              ))}
            </div>
            <div className="extra">
              <div className="dts">
                <p>Puedes usar uno de los siguientes descuentos:</p>
                <button id="btn" onClick={dto10} disabled={descuento !== 0}>
                  DTO10
                </button>
                <button id="btn" onClick={dto50} disabled={descuento !== 0}>
                  DTO50
                </button>
              </div>
              <br />
              <div id="total">
                Precio Total:{" "}
                <span id="price">{precioTotalConDescuento.toFixed(2)} €</span>
                <br />
                <button id="btnpago" onClick={() => pago()}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
