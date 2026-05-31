import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getFavorites, addFavorite, removeFavorite, } from "../api";

//skapar context objekt
const FavoritesContext = createContext(null);

//provider komponenten ska omsluta appen i App.js
export function FavoritesProvider({ children }) {
    const { authed } = useAuth();

    //sparar produktId som backend skickar tillbaka
    const [favorites, setFavorites] = useState([]);

    //hämtar favoriter från inloggad användare
    //om han loggar ut töms listan i frontend
    useEffect(() => {
        if (!authed) {
            setFavorites([]);
            return;
        }

        const loadFavorites = async () => {
            try {
                const data = await getFavorites();
                setFavorites(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        loadFavorites();
    }, [authed]);

    //om produkt redan är favorite
    const isFavorite = (productId) => {
        return favorites.includes(productId);
    };

    //lägger till eller tar bort beroende på läget
    const toggleFavorite = async (productId) => {
        if (!authed) {
            return;
        }

        try {
            let updatedFavorites;

            if (isFavorite(productId)) {
                updatedFavorites = await removeFavorite(productId);
            } else {
                updatedFavorites = await addFavorite(productId);
            }

            setFavorites(updatedFavorites);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                toggleFavorite,
            }}
            >
                {children}
            </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}