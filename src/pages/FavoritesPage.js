import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../api";
import { useBuild } from "../context/BuildContext";

function FavoritesPage() {
    const navigate = useNavigate();
    const { authed } = useAuth();
    const { favorites, toggleFavorite } = useFavorites();
    const { selectComponent } = useBuild();

    //här sparas  hela produktobjekten efter hämtats från backend
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    //hämtar alla produkter
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        loadProducts();
    }, []);

    //favoriter innehåller bara produkt id
    // filtrerar ut motsvarande produktobjekt
    const favoriteProducts = products.filter((product) =>
        favorites.includes(product.id)
);

//lägger produkten på rätt plats i datorbygget
const handleSelectProduct = (product) => {
    selectComponent(product.category, product);
    navigate("/builder");
};

//favoritsidan måste vara loggad in
if (!authed) {
    return (
        <section className="favorites-page">
            <h1>Favorites</h1>
            <p>Please log in to see your favorite products.</p>

            <Link to="/login" className="favorites-page__button">
                Login
            </Link>
        </section>
    );
}

//om inloggad
    return (
        <section className="favorites-page">
            <div className="favorites-page__header">
                <div>
                    <p className="favorites-page__eyebrow">Saved components</p>
                    <h1>Favorites</h1>
                    <p>Review your saved products and add them to your build.</p>
                </div>

                <Link to="/builder" className="favorites-page__button">
                    Back to Builder
                </Link>
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            {!errorMessage && favoriteProducts.length === 0 && (
                <p>You have not saved any favorite products yet.</p>
            )}

            <div className="favorites-page__grid">
                {favoriteProducts.map((product) => (
                    <article className="favorite-card" key={product.id}>
                        <span className="favorite-card__category">
                            {product.category}
                        </span>

                        <h2>{product.name}</h2>
                        <p>{product.brand}</p>
                        <strong>{product.price} kr</strong>

                        <div className="favorite-card__actions">
                            <button
                                type="button"
                                onClick={() => toggleFavorite(product.id)}
                                >
                                    Remove
                                </button>

                                <button
                                    type="button"
                                    className="favorite-card__select"
                                    onClick={() =>handleSelectProduct(product)}
                                    >
                                        Select
                                    </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default FavoritesPage;