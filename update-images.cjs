const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'public/assets/image');
const srcDir = path.join(__dirname, 'src');

console.log("Image dir:", imageDir);
console.log("Src dir:", srcDir);

let files;
try {
    files = fs.readdirSync(imageDir);
} catch (e) {
    console.error("Could not read dir:", e);
    process.exit(1);
}

const webpFiles = files.filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5));
console.log("Found webp files:", webpFiles.length);

function getFiles(dir, fileList = []) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getFiles(fullPath, fileList);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const srcFiles = getFiles(srcDir);
console.log("Found src files:", srcFiles.length);

let totalReplaced = 0;

for (const file of srcFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (const name of webpFiles) {
        const pngPattern = new RegExp(`/assets/image/${name}\\.png`, 'g');
        content = content.replace(pngPattern, `/assets/image/${name}.webp`);
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
        totalReplaced++;
    }
}

console.log(`Done. Updated ${totalReplaced} files.`);
