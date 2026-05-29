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
}