document.getElementById("newpassword-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  const token = document.getElementById("token").value;
  const email = document.getElementById("email").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log("Email:", email); // Log the email
  console.log("Token:", token); // Log the token
  console.log("Code:", code); // Log the code (should be the reset token from form)
  console.log("New Password:", password); // Log the new password

  const data = {
    token: code || token, // Use form code or URL token if form code is not provided
    email: email,
    newPassword: newPassword,
  };

  try {
    const response = await fetch("/api/sessions/newPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("New password response:", result);
    if (result.success) {
      alert("Password updated successfully");
      window.location.href = "/login";
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the password. Please try again.");
  }
});
