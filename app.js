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
    searchBtn.addEventListener("click", async () => {
        const query = document.getElementById("searchInput").value.trim();

        if (!query) {
            alert("Escribe algo para buscar");
            return;
        }

        try {
            console.log("Buscando:", query);

            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

            console.log("Response completa:", response);

            const data = await response.json();

            console.log("Data completa:", data);
            const isMobile = window.innerWidth <= 768;

            const limitedResults = isMobile
                ? data.data.slice(0, 3)
                : data.data.slice(0, 5);

            renderResults(limitedResults);

        } catch (error) {
            console.error("Error:", error);
        }
    });
}
const resultsContainer = document.getElementById("results");

function renderResults(animes) {
    resultsContainer.innerHTML = "";

    animes.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <h3>${anime.title}</h3>
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sin descripción"}</p>
    `;

        resultsContainer.appendChild(card);
        card.addEventListener("click", () => {
            localStorage.setItem("selectedAnime", JSON.stringify(anime));
            window.location.href = "detail.html";
        });
    });
}
const detailContainer = document.getElementById("detailContainer");

if (detailContainer) {
    const anime = JSON.parse(localStorage.getItem("selectedAnime"));

    if (anime) {
        detailContainer.innerHTML = `
      <h2>${anime.title}</h2>
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <p>${anime.synopsis || "Sin descripción"}</p>
    `;
    }
}
function goBack() {
    window.location.href = "search.html";
}