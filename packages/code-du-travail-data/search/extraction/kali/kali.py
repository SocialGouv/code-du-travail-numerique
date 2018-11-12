import os
import sys
from elasticsearch import Elasticsearch
from elasticsearch import helpers
from kali_article import explore_article
#from kali_conteneur import explore_conteneur
#from kali_section_ta import explore_section_ta
#from kali_texte_struct import explore_texte_struct
#from kali_texte_version import explore_texte_version

import xml.etree.ElementTree as ET

kali_folder = 'kali'

kali_folder_article = 'kali/global/article'
kali_folder_conteneur = 'kali/global/conteneur'
kali_folder_section_ta = 'kali/global/section_ta'
kali_folder_texte_struct = 'kali/global/texte/struct'
kali_folder_texte_version = 'kali/global/texte/version'

count_xml = 0

switcher = {
  "article": explore_article#,
  #"conteneur": explore_conteneur,
  #"section_ta": explore_section_ta,
  #"texte_struct": explore_texte_struct,
  #"texte_version": explore_texte_version
}

queued_dicos = []

def explore_tree(folder, type):
	global count_xml
	global switcher

	print(count_xml)

	for item in os.listdir(folder):
		item_path = os.path.join(folder, item)
		if count_xml > 99999999:
			return
		elif os.path.isdir(item_path):
			print("FOLDER : ", item_path)
			explore_tree(item_path, type)
		else:
			count_xml += 1
			print("XML ? ", count_xml, item_path)
			tree = ET.parse(item_path)
			root = tree.getroot()

			# Get the xml parser from switcher dictionary
			xml_parser = switcher.get(type, lambda: "Invalid month")
			dico_to_es = xml_parser(root)
			dico_to_es["kali_path"] = item_path

			queue(dico_to_es)
			print(dico_to_es)


def queue(dico):
	global queued_dicos
	queued_dicos.append(dico)
	if(len(queued_dicos)>1000):
		print("INDEXING BULK OF :", len(queued_dicos))
		es_dicos = [{"_index":"kali", "_type":"Convention collective", "_source":dico} for dico in queued_dicos]
		queued_dicos = []
		bulk_elastic_search(es_dicos)

def index_remaining_queue():
	global queued_dicos
	if(len(queued_dicos)>0):
		print("INDEXING BULK OF :", len(queued_dicos))
		es_dicos = [{"_index":"kali", "_type":"Convention collective", "_source":dico} for dico in queued_dicos]
		queued_dicos = []
		bulk_elastic_search(es_dicos)

def bulk_elastic_search(es_dicos):
	esclient = Elasticsearch(['0.0.0.0'], port=9200)
	helpers.bulk(esclient, es_dicos)

###### Les textes KALI suivants n'apportent pas d'informations susceptibles de nous intéresser pour l'indexation à ce stade. 
###### Il faudra possiblement les indexer plus tard. 
# conteneur
# section_ta
# texte_struct
# texte_version

def parse_and_index_kali():
	esclient = Elasticsearch(['0.0.0.0'], port=9200)
	try:
		esclient.indices.delete(index="kali")
	except:
		pass
	# Parse Kali : 
	explore_tree(kali_folder_article, "article")
	#explore_tree(kali_folder_conteneur, "conteneur")
	#explore_tree(kali_folder_section_ta, "section_ta")
	#explore_tree(kali_folder_texte_struct, "texte_struct")
	#explore_tree(kali_folder_texte_version, "texte_version")

	index_remaining_queue()


	#Index Kali :


if __name__ == "__main__":
	parse_and_index_kali()
