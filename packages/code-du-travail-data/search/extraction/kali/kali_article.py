import xml.etree.ElementTree as ET

def explore_article(root):
	# Métadonnées en plus pouvant être affichées côté front
	start_date = root.find('META/META_SPEC/META_ARTICLE/DATE_DEBUT')
	etat = root.find('META/META_SPEC/META_ARTICLE/ETAT') # Etat juridique de l'article. Les valeurs possibles sont : ABROGE, DENONCE, MODIFIE, PERIME, REMPLACE, SOUMIS_A_EXT, VIGUEUR , VIGUEUR_ETEN , VIGUEUR_NON_ETEN
	

	# Constitution de l'URL : CID du texte (cidTexte) + CID du conteneur (idConvention) ==> URL de legifrance : 
	# https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005639882&idConvention=KALICONT000005635890
	conteneur = root.find('CONTEXTE/CONTENEUR') # Adresse physique relative du fichier Légifrance représentant conteneur @example /conteneur/KALI/CONT/00/00/07/21/55/KALICONT000007215595.xml
	texte = root.find('CONTEXTE/TEXTE')
	
	# A indexer pour la recherche Elastic Search: 
	titre_txt = root.find('CONTEXTE/TEXTE/TITRE_TXT') #Titre du texte parent
	content = root.find('BLOC_TEXTUEL/CONTENU') # Contenu textuel
	# Attention : peut être vide
	titre = root.find('META/META_SPEC/META_ARTICLE/TITRE') #Titre de l'article @example Formation, santé et sécurité au travail. 

	# Not used : maybe later ? 
	#url = root.find('META/META_COMMUN/URL') 

	# fix content :
	html_content = ET.tostring(content, encoding="unicode")
	html_content = html_content[(html_content.find("<CONTENU>")+10):(html_content.find("</CONTENU>")-1)]

	#["start_date", "etat", "conteneur", "texte", "titre_parent", "content", "titre"]
	dico_to_es = {
		"start_date":start_date.text,
		"etat":etat.text,
		"conteneur":conteneur.get("cid"),
		"texte":texte.get("cid"),
		"titre_txt":titre_txt.text,
		"titre_txt_court":titre_txt.get("c_titre_court"),
		"titre_conteneur":conteneur.get("titre"),
		"titre_num":conteneur.get("num"),
		"content":html_content,
		"titre":titre.text
	}

	#print(dico_to_es)

	return dico_to_es