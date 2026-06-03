import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { componentCategories } from "../data/componentCategories";
import { useNavigate } from "react-router-dom";
import { useBuild } from "../context/BuildContext";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../api";

//bilder
import gpuImage from "../assets/images/categories/gpu.png";
import cpuImage from "../assets/images/categories/cpu.png";
import motherboardImage from "../assets/images/categories/motherboard.png";
import ramImage from "../assets/images/categories/ram.png";
import storageImage from "../assets/images/categories/storage.png";
import coolingImage from "../assets/images/categories/cooling.png";
import caseImage from "../assets/images/categories/case.png";
import extraImage from "../assets/images/categories/extra.png";


// Generella bilder som används när produkten saknar en egen bild.
const categoryImages = {
  gpu: gpuImage,
  cpu: cpuImage,
  motherboard: motherboardImage,
  ram: ramImage,
  storage: storageImage,
  cooling: coolingImage,
  case: caseImage,
  extra: extraImage,
};
//sida som kan användas för alla komponentsidor
//hömtar produkterna från backend och filtrerar efter kategori
function ComponentPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { selectComponent } = useBuild();
    const { authed } = useAuth();
    const { isFavorite, toggleFavorite } = useFavorites();

    const handleSelectProduct = (product) => {
  selectComponent(category, product);
  navigate("/builder");
};

    const pageData = componentCategories[category];

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [activeBrand, setActiveBrand] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
    // Om kategorin inte finns behöver vi inte hämta produkter.
    if (!pageData) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    getProducts(category)
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

const filteredProducts = products.filter((product) => {
  const matchesBrand =
    activeBrand === "All" || product.brand === activeBrand;

  const matchesSearch =
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.specs.join(" ").toLowerCase().includes(searchTerm.toLowerCase());

  return matchesBrand && matchesSearch;
});
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

          <input
          className="component-page__search"
          type="search"
          placeholder="Search products"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button
                className={activeBrand === "All" ? "is-active" : ""}
                onClick={() => setActiveBrand("All")}
                >
                All
                </button>

                <button
                className={activeBrand === "NVIDIA" ? "is-active" : ""}
                onClick={() => setActiveBrand("NVIDIA")}
                >
                NVIDIA
                </button>

                <button
                className={activeBrand === "AMD" ? "is-active" : ""}
                onClick={() => setActiveBrand("AMD")}
                >
                AMD
                </button>

                <button
                className={activeBrand === "Intel" ? "is-active" : ""}
                onClick={() => setActiveBrand("Intel")}
                >
                Intel
                </button>
        </aside>

        <div className="component-page__products">
          {loading && <p>Loading products...</p>}

          {!loading && errorMessage && <p>{errorMessage}</p>}

          {!loading && !errorMessage && filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}

          {!loading &&
            !errorMessage &&
            filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__image-placeholder">
                    <img 
                    src={product.image || categoryImages[product.category]}
                    alt={product.name} 
                    />
                </div>

                <div className="product-card__content">
                  <h3>{product.name}</h3>

                  <p>
                    {product.brand} · {product.specs.join(" · ")}
                  </p>

                  <div className="product-card__bottom">
                    <span>{product.price} kr</span>

                    <div className="product-card__actions">
                      {authed && (
                        <button
                          type="button"
                          className={`product-card__favorite ${
                            isFavorite(product.id) ? "is-favorite" : ""
                          }`}
                          aria-label={
                            isFavorite(product.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                          }
                          onClick={() => toggleFavorite(product.id)}
                          >
                            {isFavorite(product.id) ? "★" : "☆"}
                          </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                        >
                          Select
                        </button>
                    </div>
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