
export const BOT_INVITE_URL = "https://discord.com/oauth2/authorize?client_id=964115363941974076&scope=applications.commands%20bot&permissions=8";
export const BOT_NAME = "TPG ｜MUSIC";
export const BOT_TAGLINE = "The next generation of Discord entertainment. High-fidelity audio and lossless streaming for your community.";
export const SUPPORT_SERVER_URL = "https://discord.gg/XqJwKFPny5";

// Dynamically generate the login URL based on the current environment
const REDIRECT_URI = encodeURIComponent(window.location.origin + window.location.pathname);
export const DISCORD_LOGIN_URL = `https://discord.com/oauth2/authorize?client_id=964115363941974076&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify+guilds`;
