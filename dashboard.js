const CLIENT_ID = "1315525383801536582"; // Replace with your actual client ID
const REDIRECT_URI = "https://pearlism.github.io/419web/";
const AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;

// Extract access token from URL
const params = new URLSearchParams(window.location.hash.substring(1));
const accessToken = params.get("access_token");

if (accessToken) {
    console.log("Access Token Found:", accessToken);

    // Fetch user information
    fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
        .then(response => response.json())
        .then(data => {
            console.log("User Data:", data);

            // Display user data
            document.getElementById("username").innerText = `Username: ${data.username}#${data.discriminator}`;
            document.getElementById("user-id").innerText = `User ID: ${data.id}`;

            // Set user avatar
            document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
        })
        .catch(err => {
            console.error("Error fetching user data:", err);
            document.getElementById("username").innerText = "Error loading username.";
        });
} else {
    console.error("Access token not found. Redirecting to login.");
    window.location.href = AUTH_URL;
}

// Logout function
function logout() {
    alert("Logging out...");
    window.location.href = "index.html";
}

// Initialize particles.js
particlesJS("particles", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff00ff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.1
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff00ff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        }
    },
    retina_detect: true
});
