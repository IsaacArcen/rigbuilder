import { useState } from "react";
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

            <div className="navbar__actions">
                <button className="navbar__icon-button" aria-label="Account">
                    <img src={accountIcon} alt="" className="navbar__icon"/>
                </button>

                <button
                    type="button"
                    className="navbar__icon-button"
                    aria-label="Open cart"
                    onClick={() => setIsCartOpen(true)}
                    >
                        <img src={cartIcon} alt="" className="navbar__icon" />

                        {selectedItems.length > 0 && (
                            <span className="navbar__cart-count">
                                {selectedItems.length}
                            </span>
                        )}
                    </button>
            </div>
        </header>

        <aside className={`cart-drawer ${isCartOpen ? "cart-drawer--open" : ""}`}>
            <button
                type="button"
                className="cart-drawer__close"
                aria-label="Close cart"
                onClick={() => setIsCartOpen(false)}
                >
                    →
                </button>

                <div className="cart-drawer__header">
                    <p>RigBuilder</p>
                    <h2>Your Build</h2>
                </div>

                {selectedItems.length === 0 ? (
                    <p className="cart-drawer__empty">No components selected.</p>
                ): (
                    <div className="cart-drawer__items">
                        {selectedItems.map(([category, product]) => (
                            <article className="cart-drawer__item" key={category}>
                                <div>
                                    <span>{componentLabels[category] || category}</span>
                                    <h3>{product.name}</h3>
                                    <p>{product.price}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeComponent(category)}
                                    >
                                        Remove
                                    </button>
                            </article>
                        ))}
                    </div>
                )}

                <div className="cart-drawer__footer">
                    <div className="cart-drawer__total">
                        <span>Total</span>
                        <strong>{totalPrice} kr</strong>
                    </div>

                    <Link
                        to="/checkout"
                        className="cart-drawer__checkout"
                        onClick={() => setIsCartOpen(false)}
                        >
                            Go to checkout
                        </Link>
                </div>
        </aside>
            </>
    );
}

export default Navbar;