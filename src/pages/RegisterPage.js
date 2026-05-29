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

    
}