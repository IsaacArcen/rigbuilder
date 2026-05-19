
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
                    <a href="/builder" className="hero__button-primary">
                    Build your PC
                    </a>
                    {/* knapp 2 : view complete pcs */}
                    <a href="/complete-pcs" className="hero__button-secondary">
                        View Complete PCs
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;