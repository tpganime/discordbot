
export const CLIENT_ID = "964115363941974076";
export const CLIENT_SECRET = "buhj_bjtb096v6jETtXQRBZVtlSvc4yT"; // Note: In production, secrets belong in a backend environment.
export const BOT_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=applications.commands%20bot&permissions=8`;
export const BOT_NAME = "TPG ｜MUSIC";
export const BOT_TAGLINE = "The premier choice for crystal-clear audio and zero-latency streaming. Experience the future of Discord audio.";
export const SUPPORT_SERVER_URL = "https://discord.gg/XqJwKFPny5";

// Dynamically generate the login URL based on the current environment
const REDIRECT_URI = encodeURIComponent(window.location.origin + window.location.pathname);
export const DISCORD_LOGIN_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=identify+guilds`;
