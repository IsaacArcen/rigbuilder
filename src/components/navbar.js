import { use, useState } from "react";
import { Link } from "react-router-dom";
import { useBuild } from "../context/BuildContext";

import accountIcon from "../assets/icons/account.svg";
import cartIcon from "../assets/icons/cart.svg";
//Navbar-komponenten


const componentLabels = {
  gpu: "GPU",
  cpu: "CPU",
  motherboard: "Motherboard",
  ram: "RAM",
  storage: "Storage",
  cooling: "Cooling",
  case: "Case",
  extra: "Extra",
};

function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { build, removeComponent } = useBuild();

    const selectedItems = Object.entries(build).filter(([, product]) => product);

    const totalPrice = selectedItems.reduce((sum, [, product]) => {
        return sum + product.price;
    }, 0);

    return (
        <>
        <header className="navbar">
            <Link to="/" className="navbar__logo">
            RigBuilder
            </Link>

            <nav className="navbar__links" aria-label="Main Navigation">
                <Link to="/">Home</Link>
                <Link to="/builder">Builder</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
            </>
    )
}

export default Navbar;