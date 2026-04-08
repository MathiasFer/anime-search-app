document.addEventListener("DOMContentLoaded", () => {
    // LOGIN
    const loginBtn = document.getElementById("loginBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", handleLogin);

        const passwordInput = document.getElementById("password");
        if (passwordInput) {
            passwordInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    handleLogin();
                }
            });
        }
    }

    function handleLogin() {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMsg = document.getElementById("errorMsg");

        if (!username || !password) {
            errorMsg.style.display = "block";
        } else {
            errorMsg.style.display = "none";
            window.location.href = "search.html";
        }
    }

    // SEARCH
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("results");

    if (searchBtn && searchInput && resultsContainer) {

        searchBtn.addEventListener("click", handleSearch);

        // Buscar con ENTER
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        });
    }

    async function handleSearch() {
        const query = searchInput.value.trim();

        if (!query) {
            alert("Escribe algo para buscar");
            return;
        }

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                resultsContainer.innerHTML = "<p>No se encontraron resultados</p>";
                return;
            }

            const isMobile = window.innerWidth <= 768;

            const limitedResults = isMobile
                ? data.data.slice(0, 3)
                : data.data.slice(0, 5);

            renderResults(limitedResults);

        } catch (error) {
            resultsContainer.innerHTML = "<p>Error al cargar datos</p>";
        }
    }

    function renderResults(animes) {
        resultsContainer.innerHTML = "";

        animes.forEach(anime => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
        <h3>${anime.title}</h3>
        <img src="${anime.images?.jpg?.image_url || ''}" alt="${anime.title}">
        <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sin descripción"}</p>
      `;

            card.addEventListener("click", () => {
                localStorage.setItem("selectedAnime", JSON.stringify(anime));
                window.location.href = "detail.html";
            });

            resultsContainer.appendChild(card);
        });
    }

    // DETAIL
    const detailContainer = document.getElementById("detailContainer");

    if (detailContainer) {
        const anime = JSON.parse(localStorage.getItem("selectedAnime"));

        if (anime) {
            detailContainer.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images?.jpg?.image_url || ''}" alt="${anime.title}">
        <p>${anime.synopsis || "Sin descripción"}</p>
      `;
        }
    }

});

// Volver
function goBack() {
    window.location.href = "search.html";
}