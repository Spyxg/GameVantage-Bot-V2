require("dotenv").config();

module.exports = {

    discordToken: process.env.DISCORD_TOKEN,

    clientId: process.env.CLIENT_ID,

    battleyeApiKey: process.env.BATTLEYE_API_KEY,

    statusChannelId: process.env.STATUS_CHANNEL_ID,

    announcementChannelId: process.env.ANNOUNCEMENT_CHANNEL_ID

};