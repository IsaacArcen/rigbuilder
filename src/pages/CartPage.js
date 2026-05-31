import { Link } from "react-router-dom";
import { useBuild } from "../context/BuildContext";

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

// Cartpage visar användarens komponenter innan checkout

function CartPage() {
    const {
        build, 
        removeComponent,
        increaseQuantity,
        decreaseQuantity, 
        clearBuild
    } = useBuild();


    const selectedItems = Object.entries(build).filter(([, product]) => product);

    const totalQuantity = selectedItems.reduce((sum, [, product]) => {
        return sum + product.quantity;
    }, 0);

    const totalPrice = selectedItems.reduce((sum, [, product]) => {
        return sum + product.price * product.quantity;
    }, 0);


return (
    <section className="cart-page">
        <div className="cart-page__header">
            <div>
                <p className="cart-page__eyebrow">RigBuilder Checkout</p>
                <h1>Your cart</h1>
                <p>Review your selected components before payment.</p>
            </div>

            <Link to="/builder" className="cart-page__back-button">
                Back to Builder
            </Link>
        </div>

        {selectedItems.length === 0 ? (
            <div className="cart-empty">
                <h2>Your cart is empty.</h2>
                <p>Choose components in the builder before continuing.</p>

                <Link to="/builder" className="cart-empty__button">
                    Go to Builder
                </Link>
            </div>
        ) : (
            <div className="cart-page__layout">
                <div className="cart-items">
                    {selectedItems.map(([category, product]) => (
                        <article className="cart-item" key={category}>
                            <div>
                                <span className="cart-item__category">
                                    {componentLabels[category] || category}
                                </span>
                                <h2>{product.name}</h2>
                                <p>
                                    {product.brand} · {product.specs.join(" · ")}
                                </p>
                            </div>

                            <div className="cart-item__side">
                                <strong>{product.price * product.quantity} kr</strong>
                                <div className="cart-item__actions">
                                    <div className="cart-item__quantity">
                                    <button
                                        type="button"
                                        aria-label={`Decrease quantity of ${product.name}`}
                                        onClick={() => decreaseQuantity(category)}
                                        >
                                            -
                                        </button>

                                        <span>{product.quantity}</span>

                                        <button
                                            type="button"
                                            aria-label={`Increase quantity of ${product.name}`}
                                            onClick={() => increaseQuantity(category)}
                                            >
                                                +
                                            </button>
                                            </div>

                                <button
                                type="button"
                                onClick={() => removeComponent(category)}
                                >
                                    Remove
                                </button>
                                </div>
                                </div>
                        </article>
                    ))}
                </div>

                <aside className="cart-summary">
                    <h2>Order summary</h2>

                    <div className="cart-summary__row">
                        <span>Components</span>
                        <strong>{totalQuantity}</strong>
                    </div>

                    <div className="cart-summary__row">
                        <span>Total</span>
                        <strong>{totalPrice} kr</strong>
                    </div>

                    <Link to="/checkout" className="cart-summary__checkout">
                        Continue to checkout
                    </Link>

                    <button
                    type="button"
                    className="cart-summary__clear"
                    onClick={clearBuild}
                    >
                        Clear cart
                    </button>
                </aside>
            </div>
        )}
    </section>
);
}

export default CartPage;