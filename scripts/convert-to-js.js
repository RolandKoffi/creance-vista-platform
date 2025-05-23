
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Début de la conversion TypeScript vers JavaScript...');

// Configuration de Babel pour une conversion plus propre
const babelConfig = {
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-typescript", { 
      "isTSX": true, 
      "allExtensions": true,
      "allowDeclareFields": true
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-typescript", {
      "allowDeclareFields": true
    }]
  ]
};

// Créer le répertoire de sortie
const jsVersionDir = path.join(process.cwd(), 'js-version');
if (fs.existsSync(jsVersionDir)) {
  fs.rmSync(jsVersionDir, { recursive: true, force: true });
}
fs.mkdirSync(jsVersionDir);

console.log('📁 Copie des fichiers statiques...');

// Fonction pour copier les fichiers non-TS
const copyStaticFiles = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
        copyStaticFiles(srcPath, destPath);
      }
    } else {
      const ext = path.extname(entry.name);
      if (!['.ts', '.tsx'].includes(ext)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
};

// Copier les fichiers statiques
copyStaticFiles('.', jsVersionDir);

console.log('🔄 Conversion des fichiers TypeScript...');

// Écrire la configuration Babel
fs.writeFileSync(path.join(jsVersionDir, 'babel.config.json'), JSON.stringify(babelConfig, null, 2));

// Installer les dépendances nécessaires pour la conversion
try {
  console.log('📦 Installation des dépendances de conversion...');
  execSync('npm install --save-dev @babel/cli @babel/core @babel/preset-react @babel/preset-typescript @babel/plugin-transform-typescript', { 
    stdio: 'inherit',
    cwd: jsVersionDir
  });
} catch (error) {
  console.error('Erreur lors de l\'installation des dépendances:', error.message);
  process.exit(1);
}

// Fonction pour convertir récursivement les fichiers
const convertDirectory = (srcDir, destDir) => {
  const files = fs.readdirSync(srcDir);
  
  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const stats = fs.statSync(srcPath);
    
    if (stats.isDirectory() && !['node_modules', '.git', 'dist', 'build'].includes(file)) {
      const destDirPath = path.join(destDir, file);
      if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
      }
      convertDirectory(srcPath, destDirPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const outputExt = file.endsWith('.tsx') ? '.jsx' : '.js';
      const outputPath = path.join(destDir, file.replace(/\.tsx?$/, outputExt));
      
      try {
        console.log(`🔧 Conversion: ${srcPath} → ${outputPath}`);
        
        // Utiliser Babel pour convertir
        const result = execSync(`npx babel "${srcPath}" --out-file "${outputPath}" --extensions ".tsx,.ts"`, {
          encoding: 'utf8',
          cwd: jsVersionDir,
          stdio: 'pipe'
        });
        
        // Nettoyer le fichier converti
        if (fs.existsSync(outputPath)) {
          let content = fs.readFileSync(outputPath, 'utf8');
          
          // Supprimer les annotations de type
          content = content
            .replace(/:\s*React\.ReactNode/g, '')
            .replace(/:\s*React\.FC<[^>]*>/g, '')
            .replace(/:\s*FC<[^>]*>/g, '')
            .replace(/:\s*string\s*[;,)}\]\r\n]/g, (match) => match.replace(/:\s*string/, ''))
            .replace(/:\s*number\s*[;,)}\]\r\n]/g, (match) => match.replace(/:\s*number/, ''))
            .replace(/:\s*boolean\s*[;,)}\]\r\n]/g, (match) => match.replace(/:\s*boolean/, ''))
            .replace(/:\s*any\s*[;,)}\]\r\n]/g, (match) => match.replace(/:\s*any/, ''))
            .replace(/:\s*void\s*[;,)}\]\r\n]/g, (match) => match.replace(/:\s*void/, ''))
            .replace(/interface\s+\w+\s*\{[^}]*\}/gs, '')
            .replace(/export\s+interface\s+\w+\s*\{[^}]*\}/gs, '')
            .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
            .replace(/export\s+type\s+\w+\s*=\s*[^;]+;/g, '')
            .replace(/<[^>]*>/g, '');
          
          fs.writeFileSync(outputPath, content);
        }
        
      } catch (error) {
        console.error(`❌ Erreur lors de la conversion de ${srcPath}:`, error.message);
      }
    }
  });
};

// Convertir les fichiers source
convertDirectory('src', path.join(jsVersionDir, 'src'));

console.log('📝 Mise à jour du package.json...');

// Modifier le package.json
const packageJsonPath = path.join(jsVersionDir, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Supprimer les dépendances TypeScript
  if (pkg.devDependencies) {
    delete pkg.devDependencies.typescript;
    delete pkg.devDependencies['@types/react'];
    delete pkg.devDependencies['@types/react-dom'];
    delete pkg.devDependencies['@typescript-eslint/eslint-plugin'];
    delete pkg.devDependencies['@typescript-eslint/parser'];
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
}

// Supprimer les fichiers TypeScript de configuration
const filesToRemove = [
  'tsconfig.json',
  'tsconfig.app.json', 
  'tsconfig.node.json',
  'babel.config.json'
];

filesToRemove.forEach(file => {
  const filePath = path.join(jsVersionDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
});

console.log('✅ Conversion terminée avec succès !');
console.log('');
console.log('📋 Instructions pour utiliser la version JavaScript :');
console.log('1. cd js-version');
console.log('2. npm install');
console.log('3. npm run dev');
console.log('');
console.log('🎉 Votre application est maintenant convertie en JavaScript !');
