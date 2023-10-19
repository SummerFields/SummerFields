const fs = require('fs');
const path = require('path');

// Dossier de départ
const rootFolder = './'; // mettre le dossier racine contenant tes fichiers

function formatJSONFiles(folder) {
    const files = fs.readdirSync(folder, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(folder, file.name);

        if (file.isDirectory()) {
            // Appel récursif pour les sous-dossiers
            formatJSONFiles(filePath);
        } else if (file.isFile() && (file.name.endsWith('.json') || file.name.endsWith('.mcmeta'))) {
            try {
                const data = fs.readFileSync(filePath, 'utf8');
                const json = JSON.parse(data);
                fs.writeFileSync(filePath, JSON.stringify(json, null, 4), 'utf8');
                // console.log(`Formatted: ${filePath}`);
            } catch (err) {
                console.error(`Error parsing ${filePath}:`, err.message);
            }
        }
    }
}

// Lancer le formatage
formatJSONFiles(rootFolder);