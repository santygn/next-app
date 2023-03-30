import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import { Alert, Button, Snackbar } from "@mui/material";

export default function Productos() {
  const [open, setOpen] = useState(false);
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
    setOpen(true);
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
              <Button
                variant="contained"
                onClick={() => addCesta(product)}
              >
                Añadir al carrito
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  Producto añadido al carrito
                </Alert>
              </Snackbar>
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
