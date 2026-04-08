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