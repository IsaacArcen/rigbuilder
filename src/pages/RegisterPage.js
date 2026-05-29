import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

function RegisterPage() {
    const navigate = useNavigate();

    //sparar användarens input
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    //sparar felmeddelande
    const [errorMessage, setErrorMessage] = useState("");

    //uppdaterar rätt fält i formData när uiser skriver
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    
}