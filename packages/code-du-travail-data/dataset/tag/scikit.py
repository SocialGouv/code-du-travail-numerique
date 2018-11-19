import sklearn as sk
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import numpy as np
from sklearn.tree import export_graphviz 
import graphviz

def reformat_data_and_apply_ML_model(csv_path):

	df = pd.read_csv(csv_path)
	#print(df.head())
	#print(df.describe())

	#### Keep meaningfull columns
	columns = ['reference_exist', 'total_soustag', 'matched_soustag', 'soustag_0', 'soustag_1', 'soustag_2', 'soustag_3', 'soustag_4', 'reverse_st_0', 'reverse_st_1', 'reverse_st_2', 'reverse_st_3', 'reverse_st_4']
	target_column = 'reference_exist'
	#prediction_columns = ['total_soustag', 'matched_soustag', 'soustag_0', 'soustag_1', 'soustag_2', 'soustag_3', 'soustag_4', 'reverse_st_0', 'reverse_st_1', 'reverse_st_2', 'reverse_st_3', 'reverse_st_4']
	df = df[columns]
	# could probably be removed : , 'soustag_4', 'reverse_st_0'

	#### Add meaningfull columns
	min_ = np.minimum(5, df['total_soustag'])
	df['weighted_match'] = sum(df['soustag_' + str(i)] for i in range(5)) / min_
	df['first_three'] = sum(df['soustag_' + str(i)] for i in range(3))

	#### Sample Dataframe
	# df_0 is a sample of 2000 potential tags for which we don't know if the tag is real or not.
	# As the 'potential tags' condition is very broad (fiche SP : 370.000 rows), 
	# As we estimate the total number of tags to (fiche SP : 3.000 tags) (5 tags per fiche SP)
	# 99% of potential tags should be false tags.
	df_0 = df[df["reference_exist"]==0].sample(2000) 
	df_1 = df[df["reference_exist"]==1] # fiche SP : 1005 rows match out of 1290 reference tags

	#### Fit Model
	clf = DecisionTreeClassifier(max_depth=5)
	df.fillna(0, inplace=True)
	Y = df[target_column]
	X = df.drop(target_column, axis=1)
	clf.fit(X,Y)

	#### Export Graphic Tree
	dot_data = export_graphviz(clf, filled=True, rounded=True, class_names = ["0", "1"], special_characters=True, out_file=None, feature_names=X.columns)
	#### Render Graph (useful on Jupyter)
	#graph = graphviz.Source(dot_data, format="png")
	#graph.render()


	#### Predict 'Real' or 'False' from a potential tag
	#dft = pd.read_csv("test.csv")
	#dft.fillna(0, inplace=True)
	#y = clf.predict(df[prediction_columns])
	#l = ["doc_id"]
	#l.extend(L)
	#df_res = dft[l]
	#df_res["Predicted Tag"] = y
	#### Export
	#df_res.to_csv("prediction_results.csv")
	#df_0.to_csv('csv/fichesp_byheur_0.csv')
	#df_1.to_csv('csv/fichesp_byheur_1.csv')



	