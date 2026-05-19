import accountIcon from "../assets/icons/account.svg";
import cartIcon from "../assets/icons/cart.svg";
//Navbar-komponenten

function Navbar() {
    return (
        <header className="navbar">
            <a href= "/" className="navbar__logo">
            RigBuilder
            </a>

            <nav className="navbar__links" aria-label="Main Navigation">
                <a href="/">Home</a>
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
            </nav>

            <div className="navbar__actions">
                <button className="navbar__icon-button" aria-label="Account">
                    <img src={accountIcon} alt="Account Icon" className="navbar__icon" />
                </button>
             
                <button className="navbar__icon-button" aria-label="Cart">
                    <img src={cartIcon} alt="Cart Icon" className="navbar__icon" />
                </button>
            </div>
        </header>
    );
}

export default Navbar;