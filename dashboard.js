const CLIENT_ID = "1315525383801536582"; // Replace with your Discord Client ID
const REDIRECT_URI = "https://pearlism.github.io/419web/";
const AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify email guilds connections`;

const params = new URLSearchParams(window.location.hash.substring(1));
const accessToken = params.get("access_token");

if (accessToken) {
    // Fetch User Information
    fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
        .then(response => response.json())
        .then(user => {
            document.getElementById("username").textContent = `${user.username}#${user.discriminator}`;
            document.getElementById("email").textContent = user.email || "Not available";
            document.getElementById("email-verified").textContent = user.verified ? "Yes" : "No";
            document.getElementById("user-id").textContent = user.id;
            document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        })
        .catch(err => console.error("Error fetching user data:", err));

    // Fetch Guilds (Servers)
    fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
        .then(response => response.json())
        .then(guilds => {
            const serversList = document.getElementById("servers-list");
            serversList.innerHTML = ""; // Clear loading text
            guilds.forEach(guild => {
                const li = document.createElement("li");
                li.textContent = `${guild.name} (${guild.id})`;
                serversList.appendChild(li);
            });
        })
        .catch(err => console.error("Error fetching guilds:", err));

    // Fetch Location and IP
    fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(location => {
            document.getElementById("ip-address").textContent = location.ip;
            document.getElementById("country").textContent = location.country_name;
            document.getElementById("region").textContent = location.region;
            document.getElementById("isp").textContent = location.org;
        })
        .catch(err => console.error("Error fetching location data:", err));
} else {
    window.location.href = AUTH_URL;
}

// Logout
function logout() {
    alert("Logging out...");
    window.location.href = "index.html";
}
