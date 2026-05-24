import { useState } from "react";
import { Link } from "react-router-dom";
import { useBuild } from "../context/BuildContext";

const componentLabels = {
    gpu: "GPU",
    cpu: "CPU",
    motherboard: "Motherboard",
    ram: "RAM",
    storage: "Storage",
    coolong: "Cooling",
    case: "Case",
    extra: "Extra",
};

//Checkoutsidan med formulär för kunduppgifter
function CheckoutPage() {

    const { build } = useBuild();

    const selectedItems = Object.entries(build).filter(([, product]) => product);

    const totalPrice = selectedItems.reduce((sum, [, product]) => {
        return sum + product.price;
    }, 0);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        paymentmethod: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const inputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    
}