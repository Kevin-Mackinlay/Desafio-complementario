async function postLogin(email, password) {
  const data = {
    email,
    password,
  };
  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Response status:", response.status); // Log response status
    const result = await response.json();
    console.log("Result:", result); // Log response body
    return result;
  } catch (error) {
    console.error("Error:", error); // Log any caught errors
    return { success: false, message: error.message };
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log("Email:", email);
  console.log("Password:", password);

  const response = await postLogin(email, password);
  console.log("Login response:", response); // Log response from postLogin function

  if (response.success == true) {
    window.location.href = response.redirectUrl;
  } else {
    alert(response.message);
  }
});
