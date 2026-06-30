require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const config = require("./config/config");

const { syncProducts } = require("./services/statusSync");
const { updateStatusBoard } = require("./services/statusBoard");

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

        if (result.changes.length > 0) {

            console.log("");

            for (const change of result.changes) {

                console.log(
                    `${change.product.name} | ${change.oldState} → ${change.newState}`
                );

            }

        }

        console.log("");
        console.log("Battleye Sync Complete");
        console.log("");

    }

    catch (err) {

        console.error("Sync Failed");
        console.error(err);

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

client.login(config.discordToken);