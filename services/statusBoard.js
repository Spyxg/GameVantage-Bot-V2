const { buildStatusEmbed } = require("../embeds/statusEmbed");
const config = require("../config/config");

let statusMessage = null;

async function updateStatusBoard(client, result) {

    const channel = await client.channels.fetch(
        config.statusChannelId
    );

    const embed = buildStatusEmbed(result);

    if (!statusMessage) {

        const messages = await channel.messages.fetch({
            limit: 25
        });

        statusMessage = messages.find(message =>
            message.author.id === client.user.id &&
            message.embeds.length > 0
        );

    }

    if (!statusMessage) {

        statusMessage = await channel.send({
            embeds: [embed]
        });

        console.log("Created status board");

    } else {

        await statusMessage.edit({
            embeds: [embed]
        });

        console.log("Updated status board");

    }

}

module.exports = {

    updateStatusBoard

};