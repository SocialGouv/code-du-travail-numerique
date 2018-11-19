#### This script applies tags automatically on sources when they quotes an article in which the tag is known

import json
from services import search_faq_quotation ,search_fiche_quotation, compute_articles_tags_json, generate_soustags, match_fiche_soustag, lemmatize_documents, potentialtags_from_soustagsmatches
from scikit import reformat_data_and_apply_ML_model
import pandas as pd
import csv, math, datetime


themes_file = "res/themes-clean.tsv"
articles_code_path = "res/articles_code.json"
code_tags_path = "res/code_tags.json"
soustags_path = "res/soustags_wordcount.json"

faq_path = "../faq.json"
fiches_sp_path = "../fiches_service_public/fiches-sp-travail.json"


output_faq_byquotation_path = 'results/faq_code_byquotation.json'
output_fichesp_byquotation_path = 'results/fichessp_code_byquotation.json'

#### Fiches SP - Tagging with Heuristic + Scikit Learn Classification
soustags_fichesp_byheur_path = 'results/fichessp_soustags_byheur.json'
#ocuments_soustag_path = "results/fichessp_soustags_byheur.json"
output_fichesp_byheur_path = 'results/fichessp_code_byheur_potential.json'
output_fichesp_byheur_csv_path = 'results/fichessp_code_byheur_potential.csv'

def generate_faq_byquotation(output_path, articles_codes_json, faq_path):
	output_json = {}

	with open(faq_path) as json_data:
		faq = json.load(json_data)
	print("FAQ :", faq)
	for val in faq:
		output_json = search_faq_quotation(output_json, articles_codes_json, val)

	for key in output_json:
		output_json[key] = list(output_json[key])
	with open(output_path, 'w') as outfile:
		json.dump(output_json, outfile)
	return output_json

def generate_fichesp_byquotation(output_path, articles_codes_json, fiches_sp_path):
	output_json = {}
	with open(fiches_sp_path) as json_data:
		fiches_sp = json.load(json_data)
	print("Fiche :", fiches_sp)
	for val in fiches_sp:
		output_json = search_fiche_quotation(output_json, articles_codes_json, val)

	for key in output_json:
		output_json[key] = list(output_json[key])
	with open(output_path, 'w') as outfile:
		json.dump(output_json, outfile)
	return output_json

def generate_fichesp_byheur_soustags(output_path, fiches_sp_path, code_tags, soustags_json):
	#### Open and NLP all fiches Service Public to get a dictionnary fiche_lemmawordlist convenient to search sous-tags:
	## Takes approximately 1 min 15 sec
	start = datetime.datetime.now()
	fiche_lemmawordlist = lemmatize_documents(fiches_sp_path, "SP")

	print("TIME ELAPSED:", datetime.datetime.now() - start)

	output_json = {}
	#### For each sous-tag, check all fiche and note in output_json when it matches at least 1 word
	## Takes approximately 0,5 sec per tag, 40 min in total
	for i, titre_fiche in enumerate(fiche_lemmawordlist.keys()):
		print("ITERATION:", i, "TIME ELAPSED:", datetime.datetime.now() - start)
		output_json = match_fiche_soustag(output_json, soustags_json, titre_fiche, fiche_lemmawordlist[titre_fiche], opt = 1)

	with open(output_path, 'w') as outfile:
		json.dump(output_json, outfile)
	return output_json

def generate_byheur_potentialtags(output_path, code_tags, soustags_wordcount, documents_soustag, ref_doc_tag):
	output_array = potentialtags_from_soustagsmatches(code_tags, soustags_wordcount, documents_soustag, ref_doc_tag)

	with open(output_path, 'w') as outfile:
		json.dump(output_array, outfile)
	return output_array

def byheur_json_to_csv(json_path, output_csv_path):
	with open(json_path) as json_data: 
		input_json = json.load(json_data)
	df = pd.DataFrame(input_json)
	#### 370.000 rows and 1000 rows where reference_exist 
	df.to_csv(output_csv_path)

	"""
	## keep only 1000 rows where reference_exist 
	short = df[df["reference_exist"]==1]
	short.to_csv(output_csv_path)
	
	## This allows to split results in X different .csv in order to reduce their size to make them more exploitable

	NUMBER_OF_SPLITS = 4
	fileOpens = [open(f""+output_csv_path+str(i)+".csv","w") for i in range(NUMBER_OF_SPLITS)]
	fileWriters = [csv.writer(v, lineterminator='\n') for v in fileOpens]
	#fileWriters[0].writeheader()
	for i,row in df.iterrows():
		fileWriters[math.floor((i/df.shape[0])*NUMBER_OF_SPLITS)].writerow(row.tolist())
	for file in fileOpens:
		file.close()
	"""

	return df

if __name__ == "__main__":

	#### Get already existing intermediate json or compute them
	try:
		with open(articles_code_path) as f:
			articles_codes_json = json.load(f)
		with open(code_tags_path) as f:
			code_tags_json = json.load(f)
	except:
		print("Article codes or Code Tags file not found - Generating Article codes...")
		articles_codes_json, code_tags_json = compute_articles_tags_json(themes_file)
		with open(articles_code_path, 'w') as outfile:
			json.dump(articles_codes_json, outfile)
		print("Generating code tags....")
		with open(code_tags_path, 'w') as outfile:
			json.dump(code_tags_json, outfile)
	try:
		with open(soustags_path) as f:
			soustags_json = json.load(f)
	except:
		print("Sous Tags file not found - Generating sous tags....")
		soustags_json = generate_soustags(code_tags_json, soustags_path)

	#### This script search law articles in each FAQ text.
	#### When an FAQ text quotes an article, we can apply the tags of this article to the FAQ 
	#ref_faq_tags = generate_faq_byquotation(output_faq_byquotation_path, articles_codes_json, faq_path)

	#### This script search law articles in each fiche Service Public (fiche SP) text & references.
	#### When a fiche SP text quotes an article, we can apply the tags of this article to the fiche SP 
	#ref_fichessp_tags = generate_fichesp_byquotation(output_fichesp_byquotation_path, articles_codes_json, fiches_sp_path)


	#### This script search soustags words in each fiche Service Public (fiche SP) title & text.
	#### When a fiche SP text matches at least a few words, we record a potential tag to the fiche SP
	#### Then, a Scikit learn model will be used to classify potential tags into Real & False tags
	## Takes approximately 0,5 sec per tag, 40 min in total
	#soustags_fichesp_byheur = generate_fichesp_byheur_soustags(soustags_fichesp_byheur_path, fiches_sp_path, code_tags_json, soustags_json)
	
	## Takes some time (10 min?)
	#fichessp_code_byheur_potential = generate_byheur_potentialtags(output_fichesp_byheur_path, code_tags_json, soustags_json, soustags_fichesp_byheur, ref_fichessp_tags)
	## Convert json to dataframe and save as csv
	#byheur_json_to_csv(output_fichesp_byheur_path, output_fichesp_byheur_csv_path)
	## Apply Scikit Learn Machine Learning model
	#reformat_data_and_apply_ML_model(output_fichesp_byheur_csv_path)

