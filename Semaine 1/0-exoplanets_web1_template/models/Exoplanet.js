let searchResult = null;

module.exports.list = () => {
    const stmt_all = db.prepare("SELECT * FROM exoplanet");
    return stmt_all.all();
};

module.exports.add = (name, hClass, year) => {
    const stmt_insert = db.prepare('INSERT INTO users (name, pseudo) VALUES (?, ?)');
    const info = stmt_insert.run(name, pseudo);
};

module.exports.search = (data) => {
    for (const planet of listeExoplanetes) {
        if(planet.name.toLocaleLowerCase().startsWith(data.toLocaleLowerCase())){  
            console.log("trouvé");
            searchResult = planet.name;
            break;
        } else {
            searchResult = "Non trouvé"
        }
    }
    return searchResult;
}

module.exports.findById = (id) => {
  let details = null;
  for (planet of listeExoplanetes) {
      if (planet.id === id) {
          details = planet;
          break;
      }
  }
  return details;
}