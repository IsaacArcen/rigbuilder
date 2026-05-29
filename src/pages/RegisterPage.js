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
    
    //när anvädaren klickar på register
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            setErrorMessage("");

            //skickar ny user till backend
            //POST /api/users/register
            await register(formData);

            //registrering lyckats
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="auth-card__eyebrow">Account</p>
                <h1>Create account</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="your username"
                            />
                    </label>

                    <label>
                        Email
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="choose password"
                            />
                    </label>

                    {errorMessage && <p className="auth-form__error">{errorMessage}</p>}

                    <button type="submit" className="auth-form__button">
                        Create account
                    </button>
                </form>

                <p className="auth-form__text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
}

export default RegisterPage;