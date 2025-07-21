#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Chemin vers le dossier des tests
const testsDir = path.join(
  __dirname,
  "src/modules/outils/preavis-licenciement/__tests__/agreements"
);

// Fonction pour corriger un fichier de test
function fixTestFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let hasChanges = false;

  // Remplacer l'import incorrect
  if (content.includes("import { DureePreavisLicenciement }")) {
    content = content.replace(
      "import { DureePreavisLicenciement }",
      "import { CalculateurPreavisLicenciement }"
    );
    hasChanges = true;
  }

  // Remplacer l'usage du composant
  if (content.includes("<DureePreavisLicenciement")) {
    content = content.replace(
      /<DureePreavisLicenciement/g,
      "<CalculateurPreavisLicenciement"
    );
    hasChanges = true;
  }

  // Remplacer describe("DureePreavisLicenciement"
  if (content.includes('describe("DureePreavisLicenciement"')) {
    content = content.replace(
      'describe("DureePreavisLicenciement"',
      'describe("CalculateurPreavisLicenciement"'
    );
    hasChanges = true;
  }

  // Corriger les props incorrectes du composant
  if (
    content.includes(
      '<CalculateurPreavisLicenciement icon={""} title={""} displayTitle={""} />'
    )
  ) {
    content = content.replace(
      /<CalculateurPreavisLicenciement icon={""} title={""} displayTitle={""} \/>/g,
      '<CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />'
    );
    hasChanges = true;
  }

  // Corriger les testIds obsolètes
  const testIdReplacements = [
    ["seriousMisconduct-non", "seriousMisconduct-false"],
    ["seriousMisconduct-oui", "seriousMisconduct-true"],
    ["disabledWorker-non", "disabledWorker-false"],
    ["disabledWorker-oui", "disabledWorker-true"],
  ];

  testIdReplacements.forEach(([oldId, newId]) => {
    if (content.includes(oldId)) {
      content = content.replace(new RegExp(oldId, "g"), newId);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Corrigé: ${path.basename(filePath)}`);
    return true;
  }

  return false;
}

// Fonction principale
function main() {
  console.log("🔧 Correction des tests de préavis de licenciement...\n");

  if (!fs.existsSync(testsDir)) {
    console.error(`❌ Dossier non trouvé: ${testsDir}`);
    process.exit(1);
  }

  const testFiles = fs
    .readdirSync(testsDir)
    .filter((file) => file.endsWith(".test.tsx"))
    .map((file) => path.join(testsDir, file));

  let totalFixed = 0;

  testFiles.forEach((filePath) => {
    try {
      if (fixTestFile(filePath)) {
        totalFixed++;
      }
    } catch (error) {
      console.error(
        `❌ Erreur lors de la correction de ${path.basename(filePath)}:`,
        error.message
      );
    }
  });

  console.log(
    `\n🎉 Correction terminée! ${totalFixed} fichier(s) corrigé(s) sur ${testFiles.length} fichier(s) traité(s).`
  );
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { fixTestFile };
