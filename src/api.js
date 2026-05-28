//Bas url till backend
// react kör localhost 3000 backend kör 5000
const API_BASE = "http://localhost:5000/api";

//hämtar jwt token från localstorage
//sparas när user loggar in
function getToken() {
    return localStorage.getItem("token");
}