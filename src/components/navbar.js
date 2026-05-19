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
                    <span className="material-symbol">👤</span>
                </button>
             
                <button className="navbar__icon-button" aria-label="Cart">
                    <span className="material-symbol">🛒</span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;