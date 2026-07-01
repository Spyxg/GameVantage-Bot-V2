const config = require("../config/config");

async function sendAnnouncements(client, changes) {

    if (!changes.length) return;

    const channel = await client.channels.fetch(
        config.announcementChannelId
    );

    for (const change of changes) {

        let title = "";
        let codeblock = "";
        let body = "";

        switch (change.newState) {

            case "updating":

                title = `🔄 ${change.product.shortName} - Updating`;

                codeblock = "text";

                body =
`Status:
▸ A game update has been detected.
▸ Developers are currently updating compatibility.
▸ Subscription time has been frozen.
▸ We'll announce when service is restored.`;

                break;

            case "operational":

                title = `🟢 ${change.product.shortName} - Updated`;

                codeblock = "diff";

                body =
`+ ${change.product.shortName} has been successfully updated to the latest version.
+ Downtime has been compensated.
+ Enjoy!`;

                break;

            default:
                continue;

        }

        await channel.send({

content:
`|@everyone|
# ${title}

\`\`\`${codeblock}
${body}
\`\`\``

        });

        console.log(
            `[Announcement] ${change.product.displayName} → ${change.newState}`
        );

    }

}

module.exports = {

    sendAnnouncements

};