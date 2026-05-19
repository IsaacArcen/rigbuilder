import { Link } from "react-router-dom";
//Hero

function Hero() {
    return (
        <section className="hero">
            <div className="hero__content">
                {/* huvudrubrik */}
                <h1>Build your computer.
                    <br/>
                    Your way.
                </h1>

                {/* brödtext */}
                <p>
                    Choose components yourself based of your needs and demands.
                </p>

                {/* knappar */}
                {/* knapp 1 : build your pc */}
                <div className="hero__buttons">
                    <Link to="/builder" className="hero__button hero__button-primary">
                        Build your PC
                    </Link>
                    {/* knapp 2 : view complete pcs */}
                    <Link to="/complete-pcs" className="hero__button hero__button-secondary">
                        View Complete PCs
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;