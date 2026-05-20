import { useParams } from "react-router-dom";
import { componentCategories } from "../data/componentCategories";

//En sida som kan användas för alla komponentsidor
function ComponentPage() {
    const { category } = useParams();

    const pageData = componentCategories[category];

    if (!pageData) {
        return (
            <section className="component-page">
                <h1>Component Not Found</h1>
            </section>
        );
    }

    return (
        <section className="component-page">
            <div className="component-page__header">
                <div>
                    <p className="component-page__eyebrow">RigBuilder Components</p>
                    <h1>{pageData.title}</h1>
                    <p>{pageData.subtitle}</p>
                </div>

                <button className="component-page__back-button">
                    Back to Builder
                </button>
            </div>

            <div className="component-page__layout">
                <aside className="component-page__filters">
                    <h2>Filters</h2>

                    <button>All</button>
                    <button>NVIDIA</button>
                    <button>AMD</button>
                    <button>Intel</button>
                    <button>Budget</button>
                    <button>High-End</button>
                </aside>

                <div className="component-page__products">
                    <article className="product-card product-card--empty">
                        <div className="product-card__image-placeholder">
                            Product Image
                        </div>

                        <div className="product-card__content">
                            <h3>GPU</h3>
                            <p>Specs kommer här:</p>

                            <div className="product-card__bottom">
                                <span>0kr</span>
                                <button>Select</button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default ComponentPage;