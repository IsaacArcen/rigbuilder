import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { componentCategories } from "../data/componentCategories";
import { useNavigate } from "react-router-dom";
import { useBuild } from "../context/BuildContext";

//sida som kan användas för alla komponentsidor
//hömtar produkterna från backend och filtrerar efter kategori
function ComponentPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { selectComponent } = useBuild();

    const handleSelectProduct = (product) => {
  selectComponent(category, product);
  navigate("/builder");
};

    const pageData = componentCategories[category];

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    // Om kategorin inte finns behöver vi inte hämta produkter.
    if (!pageData) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    fetch(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch products");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, [category, pageData]);

  if (!pageData) {
    return (
      <section className="component-page">
        <h1>Component Not Found</h1>

        <Link to="/builder" className="component-page__back-button">
          Back to Builder
        </Link>
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

        <Link to="/builder" className="component-page__back-button">
          Back to Builder
        </Link>
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
          {loading && <p>Loading products...</p>}

          {!loading && errorMessage && <p>{errorMessage}</p>}

          {!loading && !errorMessage && products.length === 0 && (
            <p>No products found.</p>
          )}

          {!loading &&
            !errorMessage &&
            products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__image-placeholder">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    "Product Image"
                  )}
                </div>

                <div className="product-card__content">
                  <h3>{product.name}</h3>

                  <p>
                    {product.brand} · {product.specs.join(" · ")}
                  </p>

                  <div className="product-card__bottom">
                    <span>{product.price} kr</span>
                    <button type="button" onClick={() => handleSelectProduct(product)}>
                        Select
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export default ComponentPage;