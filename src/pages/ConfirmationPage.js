import { Link, useLocation } from "react-router-dom";

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

function ConfirmationPage() {
    const location = useLocation();

    const order = location.state?.order;

    if (!order) {
        return (
            <section className="confirmation-page">
                <div className="confirmation-card">
                    <p className="confirmation-card__eyebrow">RigBuilder Order</p>
                    <h1>No order found</h1>

                    <Link to="/builder" className="confirmation-card__button">
                        Back to Builder
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="confirmation-page">
            <div className="confirmation-card">
                <p className="confirmation-card__eyebrow">Order confirmed</p>

                <h1>Thank you for your order!</h1>

                <p>
                    Your order has been created successfully. Below is a summary of your order details:
                </p>

                <div className="confirmation-card__details">
                    <span>Order ID</span>
                    <strong>{order.id}</strong>
                </div>

                <div className="confirmation-card__items">
                    {order.items.map((product) => {
                        <article className="confirmation-item" key={product.id}>
                            <span>{componentLabels[product.category] || product.category}</span>
                            <h2>{product.name}</h2>
                            <p>{product.price} kr</p>
                        </article>
                    })}
                </div>

                <div className="confirmation-card__total">
                    <span>Total</span>
                    <strong>{order.totalPrice} kr</strong>
                </div>

                <Link to="/" className="confirmation-card__button">
                    Back to Home
                </Link>
            </div>
        </section>
    );
}

export default ConfirmationPage;