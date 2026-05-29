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

    //körs när användaren klickar login
    const handeSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.password) {
            setErrorMessage("Please enter username and password.");
            return;
        }

        try {
            setErrorMessage("");

            //skickar username/password till backend
            const data = await apiLogin(formData);

            //sparar jwt - token i localStorage
            login(data.accessToken);

            //skicakr användaren till builder
            navigate("/builder");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="auth-card__eyebrow">Account</p>
                <h1>Login</h1>

                <form className="auth-form" onSubmit={handeSubmit}>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="user"
                            />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                            />
                    </label>

                    {errorMessage && <p className="auth-form__error">{errorMessage}</p>}

                    <button type="submit" className="auth-form__button">
                        Login
                    </button>
                </form>

                <p className="auth-card__text">
                    No account yet? <Link to="/register">Create account</Link>
                </p>
            </div>
        </section>
    );
}

export default LoginPage;