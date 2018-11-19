import re
import regex
import spacy
import json
import datetime
import pandas as pd
nlp = spacy.load('fr_core_news_sm')

from html.parser import HTMLParser

def compute_articles_tags_json(themes_file):

	code_row = "code"
	articles_row = "Articles"
	tags_rows = "tag_n"

	df = pd.read_csv(themes_file, sep='\t')


	#print(df.describe())
	df.head()
	columns = list(df.keys())
	#print(df[0:1])
	#print(df[1:2])
	#print(list(df.values()))

	articles_codes = {}
	code_tags = {}

	df = df.fillna(0)

	for index, row in df.iterrows():
		code = row[code_row]
		if(row[articles_row] != 0):
			articles = row[articles_row].split("; ")
		else:
			articles = []
		#print(row)
		tags = []

		for i in range(7, 0, -1):
			column_name = tags_rows.replace("n", str(i))
			if(row[column_name] != 0):
				tags.append(row[column_name])
				#print(column_name, row[column_name])

		for article in articles:
			articles_codes.setdefault(article, []).append(code)

		code_tags[code] = {
			"articles" : articles,
			"soustags" : tags
		}

	return articles_codes, code_tags

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_html(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def search_faq_quotation(output_json, articles_code_dict, faq_dict):

	faq_text = strip_html(faq_dict['reponse'])
	faq_details = faq_dict.get("theme", "") + faq_dict.get("branche", "")
	faq_data = {
		"themes": faq_dict.get("themes", []),
		"title": faq_dict['question'],
		"all_text": f"{faq_dict['question']} {faq_text} {faq_details}",
	}

	output_json[faq_data["title"]] = set()

	regexp = r"[LRD](\. )?[0-9]{3,6}-[0-9]{1,3}-?[0-9]{0,2}"

	regexp_fiches = r"[LRD](\. )?[0-9]{3,6}-[0-9]{1,3}-?[0-9]{0,2}(( à )[LRD]?(\. )?[0-9]{3,6}-[0-9]{1,3}-?[0-9]{0,2})?"
	
	articles = re.finditer(regexp, faq_data["all_text"], re.MULTILINE)
	for matchNum, match in enumerate(articles):
		article = match.group(0).replace(". ", "")
		#print(match.group(0), article)
		codes = articles_code_dict.get(article, [])
		for el in codes:
			if el not in output_json[faq_data["title"]]:
				output_json[faq_data["title"]].add(el)
		#print ("Match {matchNum} was found at {start}-{end}: {match}".format(matchNum = matchNum, start = match.start(), end = match.end(), match = match.group()))
	#print(articles)
	return output_json



def search_fiche_quotation(output_json, articles_code_dict, fiche_dict):

	fiche_data = {
		#"themes": val.get("themes", []),
		"tags": fiche_dict['tags'],
		"texte": fiche_dict.get('text',""),
		"refs": fiche_dict.get('refs',[]),
		"title": fiche_dict['title'],
	}
	fiche_data["all_text"] = fiche_data["texte"] + ' '.join(v["source"] for v in fiche_data["refs"])

	#print("REFS :" ,fiche_data)

	output_json[fiche_data["title"]] = set()

	regexp = r"([LRD](?:\. )?[0-9]{3,6}-[0-9]{1,3}-?[0-9]{0,2})( à [LRD]?(\. )?[0-9]{3,6}-[0-9]{1,3}-?[0-9]{0,2})?"
	
	articles_matches = re.finditer(regexp, fiche_data["all_text"], re.MULTILINE)
	for matchNum, match in enumerate(articles_matches):
		if match.group(2):
			splited_match = match.group(2).split("-")
			last_article_number = splited_match[len(splited_match)-1]
			splited_match = match.group(1).split("-")
			first_article_number = splited_match[len(splited_match)-1]
			article_root = match.group(1)[:-len(first_article_number)].replace(". ", "")
			articles = []
			for i in range(int(first_article_number), int(last_article_number)+1):
				articles.append(article_root + str(i))
		else:
			articles = [match.group(1).replace(". ", "")]
		#print(match.group(0), articles)

		for article in articles:
			codes = articles_code_dict.get(article, [])
			for el in codes:
				if el not in output_json[fiche_data["title"]]:
					output_json[fiche_data["title"]].add(el)
		#print ("Match {matchNum} was found at {start}-{end}: {match}".format(matchNum = matchNum, start = match.start(), end = match.end(), match = match.group()))
	#print(articles)
	return output_json



#########
"""
Following functions where used to search each terms of each tags in FAQs & Fiches Service Public; 
in an attempt to automatically tag a document that contains similar words than the tag does.
We then used a Scikit Learn Machine Learning model of DecisionTreeClassifier to try and seperate real vs. false tags.
This method happened to be insufficiently precise to be used in production.

Possible Iterations :
- Replace spacy lematization by NLTK stemmatization
- Apply Word-embedding (wordnet ?) on tags before performing the search so synonyms can also pop-up in articles
- Iterate on tag (themes.csv) structure in order to 
- Try other ML visualization & models (Forest Classifier ? TensorFlow ?)
"""


def custom_fuzzy_match(query_word, search_words):
	'''Matches 'query_word' in 'search_words' (a list of words) and returns true or false
	Fuzziness removed after some additionnal tests
	'''
	errors = 0# if len(query_word)<4 else (1 if len(query_word)<8 else 2)
	regexp = "(?:"+query_word+"){e<="+str(errors)+"}"
	for word in search_words:
		m = regex.search(regexp, word)
		if m is not None:
			#print("MATCHED:", query_word, word, m[0])
			return m[0]
	return False

def match_fiche_soustag(output_json, lemmasoustags_json, fiche_title, fiche_lemmawordlist, opt = 1):
	output_json[fiche_title] = {}


	#### Search for each sous-tag if it is present in fiche_lemmawordlist
	for soustag in lemmasoustags_json.keys():
		for soustag_word in lemmasoustags_json[soustag]["words"]:
			#print(soustag_word)
			#for fiche_word in fiche_lemmawordlist:
			match = custom_fuzzy_match(soustag_word, fiche_lemmawordlist)
			if (match):
				if opt:
					output_json[fiche_title].setdefault(soustag, []).append(match)
				else:
					output_json[sous_tag].setdefault(fiche_title, []).append(match)
	return output_json

def compute_sous_tags(code_tags):
	#### Get the list of unique sous-tags to look for
	sous_tags = set()
	for key in code_tags.keys():
		for sous_tag in code_tags[key]["soustags"]:
			sous_tags.add(sous_tag)
	return list(sous_tags)

def lemmatize_documents(documents_path, doc_type):
	#### Open and NLP all fiches Service Public to get a dictionnary fiche_lemmawordlist convenient to search sous-tags:
	## Takes approximately 1 min 15 sec
	with open(documents_path) as json_data:
		documents = json.load(json_data)
	document_lemmawordlist = {}
	for doc in documents:
		doc_texte = get_doc_relevant_text(doc, doc_type)
		document_lemmawordlist[get_doc_id(doc, doc_type)] = lemmatize_string(doc_texte)
	return document_lemmawordlist

def lemmatize_sous_tags(sous_tags):
	output_soustags_json = {}
	#### Tokenize and lematize sous-tags
	for sous_tag in sous_tags:
		output_soustags_json[sous_tag] = {}

		soustag_words = lemmatize_string(sous_tag)

		output_soustags_json[sous_tag]["count"] = len(soustag_words)
		output_soustags_json[sous_tag]["words"] = soustag_words
	return output_soustags_json

def lemmatize_string(text):
	nlp_text = nlp(text)
	words_set = set()

	for token in nlp_text:
		lemmatized_word = token.lemma_.lower()
		if(lemmatized_word not in words_set and token.is_alpha and not token.is_stop):
			words_set.add(lemmatized_word)
	return (list(words_set))

def get_doc_relevant_text(doc, doc_type):
	if (doc_type == "SP"):
		return doc['title'] + " " + doc.get('text',"")
	elif (doc_type == "FAQ"):
		return f"{doc['question']} {strip_html(doc['reponse'])} {doc['theme']} {doc['branche']}"

def get_doc_id(doc, doc_type):
	if (doc_type == "SP"):
		return doc['title']
	elif (doc_type == "FAQ"):
		return doc['question']

def generate_soustags(code_tags, soustags_path):
	sous_tags = compute_sous_tags(code_tags)
	print("LONGUEUR:", len(sous_tags))
	soustags_json = lemmatize_sous_tags(sous_tags)
	with open(soustags_path, 'w') as outfile:
		json.dump(soustags_json, outfile)
	return soustags_json

def potentialtags_from_soustagsmatches(code_tags, soustags_wordcount, documents_soustag, ref_doc_tag):
	output_array = []
	#### loop through documents : enrich them with tags that contain their sous_tags
	iteration_count = 0
	start = datetime.datetime.now()
	for document_title in documents_soustag.keys():
		#output_json[document_title] = {}
		iteration_count += 1
		print("ITERATION:", iteration_count, "TIME ELAPSED:", datetime.datetime.now() - start)
		print(document_title, ref_doc_tag[document_title])
		document_soustags_list = documents_soustag[document_title].keys()
		for tag in code_tags.keys():
			print("TAG:", tag, "CONTENT:", code_tags[tag])
			record_match = False
			match_dict = {}
			match_dict["doc_id"] = document_title
			match_dict["tag"] = tag
			match_dict["tag_text"] = " ".join(code_tags[tag]["soustags"])
			match_dict["total_soustag"] = len(code_tags[tag]["soustags"])
			match_dict["matched_soustag"] = 0
			#for i, soustag in enumerate(code_tags[tag]["soustags"]):
			for i in range(0,7):
				try:
					soustag = code_tags[tag]["soustags"][i]
				except IndexError: # Normal : it simply means that there is less than 7 sous_tags in this tag
					soustag = ""

				print("SOUSTAG:", i, soustag)

				match_dict["soustag_" + str(i)] = 0
				if (soustag != "" and soustag in document_soustags_list):
					print("document_soustag:", documents_soustag[document_title][soustag])
					print("soustags_wordcount:", soustags_wordcount[soustag])
					match_dict["matched_soustag"] += 1
					#match_dict["matched_positions"].append(i)
					match_percentage = len(documents_soustag[document_title][soustag]) / soustags_wordcount[soustag]["count"]
					match_dict["soustag_" + str(i)] = match_percentage
					#match_dict["matched_percentage"].append(match_percentage)
					if match_percentage > 0.7:
						record_match = True
			for i in range(0,7):
				if (match_dict["total_soustag"] - i - 1 >= 0):
					match_dict["reverse_st_" + str(i)] = match_dict["soustag_" + str(match_dict["total_soustag"] - i - 1)]
				else:
					match_dict["reverse_st_" + str(i)] = 0
			match_dict["reference_exist"] = 0
			if (int(tag) in ref_doc_tag[document_title]):
				match_dict["reference_exist"] = 1

			### At least 2 soustags must match and at least one with more than 70% of accuracy
			if (match_dict["matched_soustag"] > 1 and record_match) :
				#output_json[document_title].setdefault("tags", []).append(match_dict.copy())
				output_array.append(match_dict.copy())
	return output_array
