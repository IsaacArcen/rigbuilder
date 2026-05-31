import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../api";
import { useBuild } from "../context/BuildContext";

function FavoritesPage() {
    const navigate = useNavigate();
    const { authed } = useAuth();
    const { favorites, toggleFavorites } = useFavorites();
    const { selectComponent } = useBuild();

    //här sparas  hela produktobjekten efter hämtats från backend
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
}