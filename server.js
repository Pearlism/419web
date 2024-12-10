const rpc = require("discord-rpc");
const clientId = "1315525383801536582"; // Replace with your Discord app's client ID

rpc.register(clientId);

const client = new rpc.Client({ transport: "ipc" });

client.on("ready", () => {
    console.log("Rich Presence connected!");

    // Set the Rich Presence activity
    client.setActivity({
        details: "Landen419", // Custom message
        state: "Missin you .", // Sub-message
        largeImageKey: "logo", // Image from your Discord application assets
        largeImageText: "Your Website", // Tooltip for the image
        smallImageKey: "icon", // Optional: Small image
        smallImageText: "Visit Now!", // Tooltip for small image
        startTimestamp: Date.now(), // Optional: Start time
        buttons: [
            { label: "My Website", url: "https://landen419.com" }, // Button 1
            { label: "Join Discord", url: "https://discord.gg/aethercheats" } // Button 2
        ],
    });

    console.log("Rich Presence updated!");
});

client.login({ clientId }).catch(console.error);
