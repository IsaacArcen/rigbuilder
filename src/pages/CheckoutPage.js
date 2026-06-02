import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBuild } from "../context/BuildContext";
import { createOrder } from "../services/api";

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

//Checkoutsidan med formulär för kunduppgifter
function CheckoutPage() {

    const { build, clearBuild } = useBuild();

    const navigate = useNavigate();

    const selectedItems = Object.entries(build).filter(([, product]) => product);

    const totalPrice = selectedItems.reduce((sum, [, product]) => {
        return sum + product.price * product.quantity;
    }, 0);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        paymentMethod: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const inputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    //användare klickar "Place Order"
    const handleSubmit = async (event) => {
        event.preventDefault();

        //if cases
        if (selectedItems.length === 0) {
            setErrorMessage("Your cart is empty.");
            return;
        }

        if (!formData.name || !formData.email || !formData.phone || !formData.paymentMethod) {
            setErrorMessage("Please fill in all customer details.");
            return;
        }
        setErrorMessage("");

        //Bygger order-objekt som skickas till backend
        const orderData = {
            customer: formData,
            items: selectedItems.map(([, product]) => product),
            totalPrice,
        };

        try {
            //createOrder skickar orderData till backend och får tillbaka orderId
            const createdOrder = await createOrder(orderData);

            clearBuild();

            navigate("/confirmation", {
                state: {
                    order: createdOrder,
                },
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="checkout-page">
            <div className="checkout-page__header">
                <div>
                    <p className="checkout-page__eyebrow">RigBuilder Checkout</p>
                    <h1>Checkout</h1>
                    <p>Fill in your details and choose a payment method.</p>
                </div>

                <Link to="/cart" className="checkout-page__back-button">
                    Back to Cart
                </Link>
            </div>

            <div className="checkout-page__layout">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Customer details</h2>

                    <label>
                        Name
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={inputChange}
                        placeholder="Your name"/>
                    </label>

                        <label>
                        Email
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputChange}
                        placeholder="Your email"/>
                    </label>

                    <label>
                        Phone
                        <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={inputChange}
                        placeholder="070 000 00 00"/>
                    </label>

                    <fieldset className="checkout-form__payment">
                        <legend>Payment Method</legend>

                        <label>
                        <input
                        type="radio"
                        name="paymentMethod"
                        value= "card"
                        checked={formData.paymentMethod === "card"}
                        onChange={inputChange}/>
                        Card
                    </label>

                    <label>
                        <input
                        type="radio"
                        name="paymentMethod"
                        value= "swish"
                        checked={formData.paymentMethod === "swish"}
                        onChange={inputChange}/>
                        Swish
                    </label>
                    </fieldset>

                    {errorMessage && (
                        <p className="checkout-form__error">{errorMessage}</p>
                    )}

                    <button type="submit" className="checkout-form__submit">
                        Place Order
                    </button>
                </form>

                <aside className="checkout-summary">
                    <h2>Order Summary</h2>

                    {selectedItems.length === 0? (
                        <p>No components selected.</p>
                    ) : (
                        <div className="checkout-summary__items">
                            {selectedItems.map(([category, product]) => (
                                <div className="checkout-summary__item" key={category}>
                                    <span>{componentLabels[category] || category}</span>
                                    <strong>{product.name}</strong>
                                    <small>{product.quantity} x {product.price} kr</small>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="checkout-summary__total">
                        <span>Total</span>
                        <strong>{totalPrice} kr</strong>
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default CheckoutPage;