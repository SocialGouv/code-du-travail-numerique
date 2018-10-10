.PHONY: clean pylint

# Global tasks
# ============

clean:
	docker exec -t code-du-travail-data-python find . -type d -name "__pycache__" -depth -exec rm -rf '{}' \;

pylint:
	docker exec -t code-du-travail-data-python pipenv run pylint --rcfile='.pylintrc' --reports=no --output-format=colorized 'search';
