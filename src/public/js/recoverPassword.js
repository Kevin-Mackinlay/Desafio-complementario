async function postRecoverPassword(email) {
  const data = { email };
  try {
    const response = await fetch("/api/sessions/recoverPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: error.message };
  }
}

const recoverForm = document.getElementById("formCookie");

recoverForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("emailIUser").value;

  console.log("Email for password recovery:", email);

  const response = await postRecoverPassword(email);
  console.log("Recover password response:", response);

  if (response.success) {
    alert("Please check your email for the recovery link.");
  } else {
    alert(response.message);
  }
});
