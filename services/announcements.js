const config = require("../config/config");
const templates = require("./announcementTemplates");

async function sendAnnouncements(client, changes) {

    if (!changes.length) return;

    const channel = await client.channels.fetch(
        config.announcementChannelId
    );

    for (const change of changes) {

        let template = null;

        switch (change.newState) {

            case "updating":
                template = templates.updating(change.product);
                break;

            case "operational":
                template = templates.operational(change.product);
                break;

            default:
                continue;

        }

        const body = template.body
            .map(line => `▸ ${line}`)
            .join("\n");

        await channel.send({

            content:
`@everyone

## ${template.title}

\`\`\`text
${body}
\`\`\``

        });

        console.log(
            `Announcement sent: ${change.product.displayName}`
        );

    }

}

module.exports = {

    sendAnnouncements

};