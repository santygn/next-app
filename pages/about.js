import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="bgimage"></div>
      <div className="container">
        <h1 id="title">About
        <p id="sub">Website de una tienda fictícia creada con NextJS</p>
        </h1>
      </div>
      <Footer />
    </>
  );
}
