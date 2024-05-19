document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newpassword-form"); // Make sure this matches the form ID exactly

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const code = document.getElementById("code").value;
      const newPassword = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm_password").value;

      // Additional logic to verify passwords match
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Create data object to send to server
      const data = {
        token: code,
        newPassword: newPassword,
      };

      // Send data to server using fetch API
      fetch("/api/sessions/newPassword", {
        // Adjust the URL as necessary
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Password updated successfully.");
            window.location.href = "/login"; // Redirect to login page or wherever appropriate
          } else {
            alert("Failed to update password: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating password:", error);
          alert("Failed to update password. Please try again.");
        });
    });
  } else {
    console.error("Form not found. Check the ID and element existence in the HTML.");
  }
});
