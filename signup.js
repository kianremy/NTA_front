// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get the values from the input fields          
        const username = document.getElementById("signup-username").value.trim();
        const password = document.getElementById("signup-password").value.trim();
        const retypePassword = document.getElementById("signup-retype-password").value.trim();

        // Validate the form
        if (username === "" || password === "" || retypePassword === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== retypePassword) {
            alert("Passwords do not match.");
            return;
        }

        // Prepare the data to be sent
        const data = {
            username: username,
            password: password,
        };

        // Send data to the server
        try {
            const response = await fetch("https://nta-back-render.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Handle the server response
            if (response.ok) {
                const result = await response.json();
                alert("Sign up successful: " + result.message); // Or handle success as needed
            } else {
                const error = await response.json();
                alert("Error: " + error.message); // Handle error response
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to sign up. Please try again.");
        }
    });
});

// Get the signup form element
const signupForm = document.getElementById('signup-form');

// Add event listener for form submission
signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('signup-username').value; // Get the username from input
    const password = document.getElementById('signup-password').value; // Get the password from input

    // Send the data to server.js
    fetch('https://nta-back-render.onrender.com/signup', { // Correct server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        // Show the appropriate alert message based on the response
        alert(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
