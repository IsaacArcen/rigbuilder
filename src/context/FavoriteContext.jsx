import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getFavorites, addFavorite, removeFavorite, } from "../api";