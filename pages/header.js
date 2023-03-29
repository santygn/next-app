import Link from "next/link";
import Image from "next/image";
import Logo from "../public/patterson-agency-logo.png";

export default function Header() {
  return (
    <nav className="navbar">
      <Link className="links" href="/">
        <Image src={Logo} alt="Patterson Agency Logo" priority />
      </Link>
      <Link className="links" href="/catalogo">
        Catálogo
      </Link>
      <Link className="links" href="/carrito">Carrito</Link>
      <Link id="about" className="links" href="/about">
        About
      </Link>
    </nav>
  );
}
