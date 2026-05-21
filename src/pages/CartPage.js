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

// Cartpage visar användarens komponenter innan checkout

function CartPage() {
    const {build, removeComponent, clearbuild} = useBuild();

    const selectedItems = Object.entries(build).filter(([, product]) => product);

    const totalPrice = selectedItems.reduce((sum, [, product]) => {
        return sum + product.price;
    })
}