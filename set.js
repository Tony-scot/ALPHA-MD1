const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0JPNkRCUzhQUm1HL29sekFRb1ZxaTRvcWNqellzU1V5c2lyL3ZRd2czdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidk45WlpFc1dWaXZ6d1lYdEwyRGhxUVRlbkRFL2tvZk1LR05PYkJXalBHdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRGJsTUY1UXJFa2lzaHVMNEdFK0d3dVRhV3JmUzc5OWhSWHg0Z1NmblVzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBZElTcGZGMWZ6TC9JUWljb1VMQjdmcXZYKzVwcElJeG94N2V6bU04NFVjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtBREJWRitmRndRTXFGQkZmSWFrUU55QldLOGN3OHJBN3lTd2UyMm9Fa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlRV0JVVXpjRVlSdWdXelVkNUFjdUw1eE1ockxXdC93aEpnTlRXejY5R0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05DZEJWR2pLblVYME9lYWN0VzVMc2tLVGRCZTBPejBSYi9Qb0htbkdYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FKNUVzRmRuNWw2S3FCWWtiRS9Zd2RxcWpKbUMzdXZBcUZMdHYvbXZpOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Indid2FwaEhPVEcveXY1azA4aXYxK2lVVzdGOHB2eTBGMnNsdXA1ZVk2eUZPclIzVHVKU1gvRmJhck9JQ0pFaGFwT3B6RFNtRzZ5WVRyL0JxajU0ckJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6IitMczVLK3IyYUw5ZE1sOHFDbEowMDlKLzhuUllXOXNRYml4UlRHSDBJYTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJwY3pJdkFyUTBhWjI4ZlFmMkw0WWciLCJwaG9uZUlkIjoiMjFmMGY4YWEtYmExNy00YWExLTg0YmItYmNkNjFiNzI1ZWM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im01U0tzUFRXOGgyYjN5aDVMWlgzNFdpaFFQUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsWCtKb0g1U2twVFRCa1lIWW5Wc2dUZTRERHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiU1JUQUtDUE0iLCJtZSI6eyJpZCI6IjI1NTY3NTIzMzI0NToyNUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSTdnMkpvR0VOVGRpN1VHR0F3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidFV0Qnk2TTdJdmc2MTFtdTZycENsc3RFL3RSQlZQZ0g3STllUzZRLzV6ND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQlpJck43cERhd3hNQVE5V2QwVW9WZHZKbTBJS0FGTkp5aGdHeFBPUXUzZ3JibEY3OXBQcGNmK001RlJRYWlJam55L2w2U1Q2RkpuWVV2eWcrQWlvQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImpWZS82SFU4U1IrSVhCL3pEZzNFUzhzWFlxdHUyVTZoYmlsd3lEL3huQWR4eHBiMmUzcVhDRkxLM1hyamhKRXg1NHh5aVBVQk9EaTR5VTlScUUyb0JRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njc1MjMzMjQ1OjI1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJWTFFjdWpPeUw0T3RkWnJ1cTZRcGJMUlA3VVFWVDRCK3lQWGt1a1ArYysifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE5NTQwMTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmJ1In0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "dragon",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255675233245",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'dragon-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
