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
        </header>
    )
}