function buildAnnouncement(change) {

    let title = "";
    let body = "";

    switch (change.newState) {

        case "updating":

            title = `🟡 ${change.product.shortName} - Updating`;

            body =
`Status:
▸ A game update has been detected.
▸ Our developers are actively working on compatibility.
▸ We'll announce when service is restored.`;

            break;

        case "operational":

            title = `🟢 ${change.product.shortName} - Updated`;

            body =
`Changelog:
▸ ${change.product.shortName} has been successfully updated to the latest version.
▸ Downtime has been compensated.
▸ Enjoy!`;

            break;

        default:
            return null;

    }

    return {

        content:
`@everyone

**${title}**

\`\`\`text
${body}
\`\`\``

    };

}

module.exports = {

    buildAnnouncement

};