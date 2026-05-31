import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { getProducts } from "../api";
import { useBuild } from "../context/BuildContext";

