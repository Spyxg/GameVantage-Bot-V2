const { EmbedBuilder } = require("discord.js");

function buildStatusEmbed({

    operational,

    updating

}) {

    return new EmbedBuilder()

        .setColor(0x7c3aed)

        .setTitle("📊 Live Product Status")

        .setDescription(

`━━━━━━━━━━━━━━━━━━━━━━
🟢 **OPERATIONAL (${operational.length})**
━━━━━━━━━━━━━━━━━━━━━━

${operational.length
    ? operational.map(product => `✅ ${product.name}`).join("\n")
    : "None"}

━━━━━━━━━━━━━━━━━━━━━━
🔄 **UPDATING (${updating.length})**
━━━━━━━━━━━━━━━━━━━━━━

${updating.length
    ? updating.map(product => `🔄 ${product.name}`).join("\n")
    : "None"}`

        )

        .setImage("https://i.imgur.com/PaFgNzQ.gif")

        .setFooter({

            text:
                `Last Updated ${new Date().toLocaleTimeString("en-US", {

                    timeZone: "America/Chicago",

                    hour: "numeric",

                    minute: "2-digit"

                })} CT • Auto Refresh Every 5 Minutes • GameVantage`

        });

}

module.exports = {

    buildStatusEmbed

};