require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { REST, Routes } = require("discord.js");
const config = require("./config/config");

const commands = [];

const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    console.log(file, typeof command, command);

    commands.push(command.toJSON());

}

const rest = new REST({ version: "10" }).setToken(
    config.discordToken
);

(async () => {

    try {

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Registering Slash Commands...");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        await rest.put(

            Routes.applicationCommands(
                config.clientId
            ),

            {
                body: commands
            }

        );

        console.log(
            `Successfully registered ${commands.length} command(s).`
        );

    }

    catch (error) {

        console.error(error);

    }

})();