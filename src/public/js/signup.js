async function postSignup(firstName, lastName, age, email, password) {
  const data = {
    firstName,
    lastName,
    age,
    email,
    password,
  };
  try {
    const response = await fetch("/api/sessions/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Response from server:", result); // Add this log
    return result;
  } catch (error) {
    console.log("Error during signup:", error); // Add this log
    return { success: false, message: "Invalid credentials" };
  }
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await postSignup(first_name, last_name, age, email, password);
  console.log("Response after form submission:", response); // Add this log
  if (response.success == true) {
    window.location.href = response.redirectUrl;
  } else {
    alert(response.message);
  }
});
