//Bas url till backend
// react kör localhost 3000 backend kör 5000
const API_BASE = "http://localhost:5000/api";

//hämtar jwt token från localstorage
//sparas när user loggar in
function getToken() {
    return localStorage.getItem("token");
}

//kollar om användaren är inloggad
//om token finns = true, om inte = false
export function isAuthenticated() {
    return !!getToken();
}

//alla api anrop går genom denna
async function request(path, options = {}) {
    const headers = options.headers || {};

    const token = getToken();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    //säger till backend vi skickar JSON
    headers["Content-Type"] = "application/json";

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const text = await res.text();

    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const err = (data && data.message) || res.statusText || "Request failed";
        throw new Error(err);
    }

    return data;
}


//AUTH REQUESTS

//registrera en ny användare
export async function register({ username, email, password }) {
    return request("/users/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
}

//Logga in
//via username+password
export async function login({ username, password }) {
    return request("/users/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,  
        }),
    });
}

//inloggad användare
export async function getCurrentUser() {
    return request("users/current", {
        method: "GET",
    });
}

//PRODUCT REQUESTS

//Hämta produkter
//via kategori
export async function getProducts(category) {
    const query = category ? `?category=${category}` : "";

    return request(`/products${query}`, {
        method: "GET",
    });
}

//produkt via ID
export async function getProducts(id) {
    return request(`/products${id}`, {
        method: "GET",
    });
}

//ORDER REQUESTS

//skapa ny order
export async function createOrder(orderData) {
    return request("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });
}

//hämta alla orders
export async function getOrders() {
    return request("orders", {
        method: "GET",
    });
}

//AUTH FUNCTIONS

//sparar token efter login
export function saveToken(token) {
    localStorage.setItem("token", token);

    try {
        window.dispatchEvent(new Event("authChange"));
    } catch (e) {

    }
}

//Logga ut användare (radera token) 
export function logout() {
    localStorage.removeItem("token");

    try {
        window.dispatchEvent(new Event("authChange"));
    } catch (e) {
        
    }
}