const db = require('better-sqlite3')('C:/Users/julie/Documents/GitHub/SchoolJavaScriptProject/Base_de_donnees/exoplanet.db', { verbose: console.log });

module.exports = db;