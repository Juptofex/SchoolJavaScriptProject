//alternative vers U:/SchoolJavaScriptProject/Base_de_donnees/exoplanet.db OR C:/Users/julie/Documents/GitHub/SchoolJavaScriptProject/Base_de_donnees/exoplanet.db
const db = require('better-sqlite3')('U:/SchoolJavaScriptProject/Base_de_donnees/exoplanet.db', { verbose: console.log });

module.exports = db;