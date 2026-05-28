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