document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const errorMsg = document.getElementById("errorMsg");

            if (!username || !password) {
                errorMsg.style.display = "block";
            } else {
                errorMsg.style.display = "none";
                window.location.href = "search.html";
            }
        });
    }
});
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const query = document.getElementById("searchInput").value.trim();

        if (!query) {
            alert("Escribe algo para buscar");
            return;
        }

        console.log("Buscando:", query);
    });
}