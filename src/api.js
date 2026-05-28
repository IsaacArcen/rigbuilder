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
}