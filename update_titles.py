#!/usr/bin/env python3
"""
Script pour modifier tous les titres des questions dans les fichiers YAML de préavis-licenciement.
Capitalise tous les titres (ancienneté, catégorie professionnelle, groupe, niveau, etc.)
"""

import os
import re
import glob


def update_title_in_file(file_path):
    """Lit un fichier YAML et capitalise tous les titres"""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        # Dictionnaire des remplacements de titres
        title_replacements = {
            "titre: ancienneté": "titre: Ancienneté",
            "titre: catégorie professionnelle": "titre: Catégorie professionnelle",
            "titre: groupe": "titre: Groupe",
            "titre: niveau": "titre: Niveau",
            "titre: coefficient": "titre: Coefficient",
            "titre: âge": "titre: Âge",
            "titre: position": "titre: Position",
            "titre: classe": "titre: Classe",
            "titre: échelon": "titre: Échelon",
            "titre: motif de rupture": "titre: Motif de rupture",
            "titre: conclusion contrat travail": "titre: Conclusion contrat travail",
        }

        updated_content = content
        modifications_made = []

        # Appliquer tous les remplacements
        for old_title, new_title in title_replacements.items():
            if old_title in updated_content:
                updated_content = updated_content.replace(old_title, new_title)
                modifications_made.append(f"{old_title} → {new_title}")

        # Écrire le contenu modifié si des changements ont été faits
        if modifications_made:
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(updated_content)

            print(f"✓ Modifié: {file_path}")
            for mod in modifications_made:
                print(f"  • {mod}")
            return True
        else:
            print(f"- Aucune modification nécessaire: {file_path}")
            return False

    except Exception as e:
        print(f"✗ Erreur lors du traitement de {file_path}: {e}")
        return False


def main():
    """Fonction principale"""
    # Chemin vers les fichiers de préavis-licenciement
    pattern = "packages/code-du-travail-modeles/src/modeles/conventions/*/preavis-licenciement.yaml"

    # Trouver tous les fichiers correspondants
    files = glob.glob(pattern)

    if not files:
        print("Aucun fichier trouvé avec le pattern:", pattern)
        return

    print(f"Traitement de {len(files)} fichiers...")
    print("=" * 50)

    modified_count = 0

    for file_path in sorted(files):
        if update_title_in_file(file_path):
            modified_count += 1

    print("=" * 50)
    print(
        f"Terminé! {modified_count} fichiers modifiés sur {len(files)} fichiers traités."
    )


if __name__ == "__main__":
    main()
