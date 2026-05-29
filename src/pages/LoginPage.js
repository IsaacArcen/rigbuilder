import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../api";
import { useAuth } from "../AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    //spara det som användaren skriver
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    //sparar felmedelandet
    const [errorMessage, setErrorMessage] = useState("");

    //uppdaterar när användaren skriver i input
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };
}