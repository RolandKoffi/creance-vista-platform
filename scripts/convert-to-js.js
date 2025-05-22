
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Installer les dépendances nécessaires
console.log('Installation des dépendances pour la conversion TS -> JS...');
execSync('npm install --save-dev @babel/cli @babel/core @babel/preset-react @babel/preset-typescript', { stdio: 'inherit' });

// Configuration de Babel
const babelConfig = {
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ]
};

fs.writeFileSync(path.join(process.cwd(), 'babel.config.json'), JSON.stringify(babelConfig, null, 2));

// Fonction pour convertir un fichier .tsx en .jsx
const convertTsxToJsx = (filePath) => {
  const outputPath = filePath.replace(/\.tsx$/, '.jsx');
  console.log(`Conversion de ${filePath} vers ${outputPath}`);
  
  try {
    const result = execSync(`npx babel ${filePath} --out-file ${outputPath} --extensions ".tsx"`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Nettoyer les types dans le fichier de sortie
    let content = fs.readFileSync(outputPath, 'utf8');
    content = content
      .replace(/:\s*React\.ReactNode/g, '')
      .replace(/:\s*string/g, '')
      .replace(/:\s*number/g, '')
      .replace(/:\s*boolean/g, '')
      .replace(/:\s*any/g, '')
      .replace(/:\s*.*?\[\]/g, '')
      .replace(/:\s*\{.*?\}/g, '')
      .replace(/:\s*.*? =>/g, '')
      .replace(/<.*?>/g, '');
    
    fs.writeFileSync(outputPath, content);
    return outputPath;
  } catch (error) {
    console.error(`Erreur lors de la conversion de ${filePath}:`, error);
    return null;
  }
};

// Fonction pour parcourir récursivement les répertoires
const processDirectory = (directory) => {
  const files = fs.readdirSync(directory);
  const jsxFiles = [];
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory() && !filePath.includes('node_modules')) {
      const childJsxFiles = processDirectory(filePath);
      jsxFiles.push(...childJsxFiles);
    } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
      const jsxFile = convertTsxToJsx(filePath);
      if (jsxFile) {
        jsxFiles.push(jsxFile);
      }
    }
  });
  
  return jsxFiles;
};

// Créer un répertoire 'js-version' pour stocker la version JavaScript
const jsVersionDir = path.join(process.cwd(), 'js-version');
if (!fs.existsSync(jsVersionDir)) {
  fs.mkdirSync(jsVersionDir);
}

// Copier d'abord les fichiers nécessaires
const copyDirectory = (src, dest, excludeExt = ['.ts', '.tsx']) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        copyDirectory(srcPath, destPath, excludeExt);
      }
    } else {
      const ext = path.extname(entry.name);
      if (!excludeExt.includes(ext)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
};

console.log('Copie des fichiers nécessaires vers js-version...');
copyDirectory(path.join(process.cwd(), 'src'), path.join(jsVersionDir, 'src'));
copyDirectory(path.join(process.cwd(), 'public'), path.join(jsVersionDir, 'public'));

// Copier les fichiers de configuration importants
const configFiles = ['package.json', 'vite.config.js', 'index.html', 'tailwind.config.js', 'postcss.config.js'];
configFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    const dest = path.join(jsVersionDir, file);
    fs.copyFileSync(path.join(process.cwd(), file), dest);
    
    // Modifier package.json pour supprimer les dépendances TypeScript
    if (file === 'package.json') {
      const pkg = JSON.parse(fs.readFileSync(dest, 'utf8'));
      delete pkg.devDependencies.typescript;
      delete pkg.devDependencies['@types/react'];
      delete pkg.devDependencies['@types/react-dom'];
      fs.writeFileSync(dest, JSON.stringify(pkg, null, 2));
    }
    
    // Modifier vite.config.js pour supprimer la référence à TypeScript
    if (file === 'vite.config.js' || file === 'vite.config.ts') {
      let content = fs.readFileSync(dest, 'utf8');
      content = content.replace(/import typescript.*/g, '');
      fs.writeFileSync(dest, content);
    }
  }
});

// Commencer la conversion
console.log('Conversion des fichiers TS/TSX en JS/JSX...');
const srcDir = path.join(jsVersionDir, 'src');
const jsxFiles = processDirectory(srcDir);

console.log('Conversion terminée!');
console.log(`${jsxFiles.length} fichiers ont été convertis en JavaScript.`);
console.log(`La version JavaScript du projet se trouve dans le répertoire 'js-version'.`);
console.log(`Pour l'utiliser, exécutez 'cd js-version && npm install && npm run dev'`);
