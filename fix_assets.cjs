const fs = require('fs');
const file = 'd:/Projetos/conectando-se/src/data/initialProjectDetails.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace "/assets/..." with import.meta.env.BASE_URL + "assets/..."
content = content.replace(/"\/assets\//g, 'import.meta.env.BASE_URL + "assets/');

fs.writeFileSync(file, content);
console.log('Done!');
