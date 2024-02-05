async function postLogin(email, password) {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
 
  if (response.redirected) {
    window.location.href = response.url;
  } else {
    alert("Datos incorrectos");
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  postLogin(email, password);
});
