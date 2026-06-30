const { SlashCommandBuilder } = require("discord.js");

module.exports = new SlashCommandBuilder()

    .setName("status")

    .setDescription("Update the status of a manual product.")

    .addStringOption(option =>
        option
            .setName("product")
            .setDescription("Select a manual product.")
            .setRequired(true)
            .addChoices(

                {
                    name: "BO7: FULL",
                    value: "bo7-full"
                },

                {
                    name: "SCUM: FULL",
                    value: "scum-full"
                },

                {
                    name: "DAYZ: FULL",
                    value: "dayz-full"
                },

                {
                    name: "EFT: FULL",
                    value: "eft-full"
                },

                {
                    name: "EFT: LITE",
                    value: "eft-lite"
                },

                {
                    name: "WAR THUNDER: FULL",
                    value: "warthunder-full"
                },

                {
                    name: "ARK: FULL",
                    value: "ark-full"
                }

            )
    )

    .addStringOption(option =>
        option
            .setName("status")
            .setDescription("Select the new status.")
            .setRequired(true)
            .addChoices(

                {
                    name: "🟢 Operational",
                    value: "operational"
                },

                {
                    name: "🔄 Updating",
                    value: "updating"
                }

            )
    );