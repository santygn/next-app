import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup, Snackbar } from "@mui/material";

export default function Carrito() {
  const [opendto, setOpendto] = useState(false);
  const [openel, setOpenel] = useState(false);
  const [open, setOpen] = useState(false);
  const [cesta, setCesta] = useState([]);
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cesta") || "[]");
    setCesta(data);
  }, []);

  const eliminarProducto = (index) => {
    setOpenel(true);
    setTimeout(() => {
      const nuevaCesta = [...cesta];
      nuevaCesta.splice(index, 1);
      localStorage.setItem("cesta", JSON.stringify(nuevaCesta));
      setCesta(nuevaCesta);
    }, 1800);
  };

  const precioTotal = cesta.reduce(
    (total, producto) => total + producto.price,
    0
  );

  const precioTotalConDescuento = precioTotal - (precioTotal * descuento) / 100;

  const dto10 = () => {
    setDescuento(10);
    setOpendto(true);
  };

  const dto50 = () => {
    setDescuento(50);
    setOpendto(true);
  };

  const pago = () => {
    setOpen(true);
    setTimeout(() => {
      localStorage.removeItem("cesta");
      setCesta([]);
    }, 1800);
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
                  <Button
                    variant="contained"
                    onClick={() => eliminarProducto(index)}
                  >
                    Eliminar
                  </Button>
                  <Snackbar
                    open={openel}
                    autoHideDuration={1800}
                    onClose={() => setOpenel(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert severity="error" sx={{ width: "100%" }}>
                      Producto eliminado del carrito
                    </Alert>
                  </Snackbar>
                  <br />
                  <br />
                </div>
              ))}
            </div>
            <div className="extra">
              <div className="dts">
                <p>Puedes usar uno de los siguientes descuentos:</p>
                <ButtonGroup>
                  <Button
                    variant="outlined"
                    onClick={dto10}
                    disabled={descuento !== 0}
                  >
                    DTO10
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={dto50}
                    disabled={descuento !== 0}
                  >
                    DTO50
                  </Button>
                </ButtonGroup>
                <Snackbar
                  open={opendto}
                  autoHideDuration={2000}
                  onClose={() => setOpendto(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert severity="success" sx={{ width: "100%" }}>
                    Descuento aplicado
                  </Alert>
                </Snackbar>
              </div>
              <br />
              <div id="total">
                Precio Total:{" "}
                <span id="price">{precioTotalConDescuento.toFixed(2)} €</span>
                <br />
                <Button variant="contained" onClick={() => pago()}>
                  Comprar
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={1800}
                  onClose={() => setOpen(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert severity="success" sx={{ width: "100%" }}>
                    Compra realizada con éxito
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
