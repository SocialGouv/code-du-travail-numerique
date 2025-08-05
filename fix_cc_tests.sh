#!/bin/bash

# Mapping des CC vers leurs noms dans les YAML
declare -A cc_names=(
    ["16"]="transports routiers"
    ["44"]="industries chimiques"
    ["86"]="publicité française"
    ["176"]="industrie pharmaceutique"
    ["275"]="transport aérien personnel au sol"
    ["292"]="plasturgie"
    ["573"]="commerces de gros"
    ["675"]="habillement commerce succursales"
    ["787"]="comptables"
    ["843"]="boulangerie patisserie"
    ["1043"]="gardien concierge"
    ["1090"]="automobiles"
    ["1147"]="cabinets médicaux"
    ["1266"]="restauration collectivités"
    ["1351"]="prévention sécurité entreprise"
    ["1404"]="sedima"
    ["1480"]="journalisme"
    ["1483"]="habillement textiles commerce de détail"
    ["1486"]="bureaux études techniques"
    ["1501"]="restauration rapide"
    ["1505"]="commerces détail fruits légumes"
    ["1516"]="organismes formation"
    ["1517"]="commerces de détail non alimentaires"
    ["1518"]="éducation loisirs"
    ["1527"]="immobilier"
    ["1596"]="bâtiment ouvriers employés"
    ["1597"]="bâtiment employés ouvriers bis"
    ["1606"]="bricolage"
    ["1672"]="sociétés assurances"
    ["1702"]="ouvriers travaux public"
    ["1740"]="bâtiment région parisienne"
    ["1979"]="hôtels cafés restaurants"
    ["1996"]="pharmacie"
    ["2098"]="personnel prestation service tertiaire"
    ["2120"]="banque"
    ["2148"]="télécommunications"
    ["2216"]="commerces détail alimentation"
    ["2264"]="hospitalisation privées"
    ["2511"]="sport"
    ["2596"]="coiffure"
    ["2609"]="bâtiment etam"
    ["2614"]="travaux publics"
    ["2941"]="aide accompagnement soins services domicile"
    ["3043"]="entreprises propreté"
    ["3127"]="entreprises services à la personne"
    ["3239"]="particuliers employeurs domicile"
    ["3248"]="métallurgie"
)

for file in *.test.tsx; do
    # Extraire le numéro de CC du nom du fichier
    cc_num=$(echo "$file" | grep -o '^[0-9]*')
    
    if [[ -n "${cc_names[$cc_num]}" ]]; then
        cc_name="${cc_names[$cc_num]}"
        testid="infos.contrat salarié - convention collective - $cc_name - typeRupture"
        
        echo "Correction de $file avec testId: $testid"
        
        # Remplacer tous les fireEvent.change avec typeRupture par le bon testId
        sed -i '' 's/screen\.getByTestId("typeRupture")/screen.getByTestId("'"$testid"'")/g' "$file"
        
        # Remplacer les valeurs numériques par les valeurs texte entre quotes
        sed -i '' 's/target: { value: "[0-9]*| Démission" }/target: { value: "'\''Démission'\''" }/g' "$file"
        sed -i '' 's/target: { value: "[0-9]*| Licenciement" }/target: { value: "'\''Licenciement'\''" }/g' "$file"
        sed -i '' 's/target: { value: "[0-9]*| Rupture de la période d'\''essai" }/target: { value: "'\''Rupture de la période d'\''essai'\''" }/g' "$file"
        sed -i '' 's/target: { value: "[0-9]*| Rupture conventionnelle" }/target: { value: "'\''Rupture conventionnelle'\''" }/g' "$file"
    fi
done
