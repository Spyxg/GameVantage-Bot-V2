require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const config = require("./config/config");

const { updateManualStatus } = require("./services/manualStatus");
const { getStatusData } = require("./services/statusData");
const { syncProducts } = require("./services/statusSync");
const { updateStatusBoard } = require("./services/statusBoard");
const { sendAnnouncements } = require("./services/announcements");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

async function runSync() {

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Starting Battleye Sync...");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    try {

        const result = await syncProducts();

        console.log(`Products Loaded : ${result.products.length}`);
        console.log(`Changes Found   : ${result.changes.length}`);

        await updateStatusBoard(client, result);

        await sendAnnouncements(client, result.changes);

        if (result.changes.length > 0) {

            console.log("");

            for (const change of result.changes) {

                console.log(
                    `${change.product.displayName} | ${change.oldState} → ${change.newState}`
                );

            }

        }

        console.log("");
        console.log("Battleye Sync Complete");
        console.log("");

    }

    catch (err) {

        console.error("");
        console.error("Battleye Sync Failed");
        console.error(err);
        console.error("");

    }

}

client.once("clientReady", async () => {

    console.log("");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`Logged in as ${client.user.tag}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await runSync();

    setInterval(runSync, 300000);

});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName !== "status") return;

    const productId = interaction.options.getString("product");
    const status = interaction.options.getString("status");

    const result = await updateManualStatus(
        productId,
        status
    );

    if (!result.success) {

        return interaction.reply({

            content: `❌ ${result.message}`,

            ephemeral: true

        });

    }

    await updateStatusBoard(
        client,
        getStatusData()
    );

    await sendAnnouncements(
        client,
        result.changes
    );

    return interaction.reply({

        content: `✅ ${result.message}`,

        ephemeral: true

    });

});

client.login(config.discordToken);