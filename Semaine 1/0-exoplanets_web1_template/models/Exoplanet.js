let searchResult = null;
const db = require.apply('../models/db_conf.js');
const stmt_all = db.prepare("SELECT exoplanet_id AS id, unique_name AS name, hclass, discovery_year AS year, ist AS IST, pclass AS pClass FROM exoplanets");

module.exports.list = () => {
    return stmt_all.all();
};

module.exports.add = (name, hClass, year) => {
    const stmt_insert = db.prepare('INSERT INTO exoplanets (name, hclass, year) VALUES (?, ?, ?)');
    const info = stmt_insert.run(name, hClass, year);
};

module.exports.search = (data) => {
    for (const planet of stmt_all) {
        if(planet.name.toLocaleLowerCase().startsWith(data.toLocaleLowerCase())){  
            console.log("trouvé");
            searchResult = planet.name;
            break;
        } 
        else {
            searchResult = "Non trouvé";
        }
    }
    return searchResult;
};

module.exports.findById = (id) => {
  let details = null;
  for (const planet of stmt_all) {
      if (planet.id === id) {
          details = planet;
          break;
      }
  }
  return details;
};