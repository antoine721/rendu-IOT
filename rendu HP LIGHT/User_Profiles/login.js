const email = document.getElementById("emailLog");
const password = document.getElementById("passwordLog");
const form = document.querySelector(".Connexion")

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email.value,
        password: password.value,
        }),
    });
    const data = await response.json();
    console.log(data);
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/users_DisplayProfile.html";
    }
    else {
        alert("Invalid email or password");
    }
})