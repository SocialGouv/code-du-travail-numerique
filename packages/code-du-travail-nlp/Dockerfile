FROM tensorflow/tensorflow:latest-py3

RUN apt-get clean
RUN apt-get -y install python3-venv git curl unzip
ENV PYTHONIOENCODING="UTF-8"
ENV FLASK_APP api
WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./scripts ./scripts
COPY ./api ./api

ENTRYPOINT ["sh", "scripts/entrypoint.sh"]
