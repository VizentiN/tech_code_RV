ARG PYTHON_VERSION=3.12-slim-bullseye

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /code

WORKDIR /code

RUN pip install poetry
COPY pyproject.toml poetry.lock /code/
RUN poetry config virtualenvs.create false
RUN poetry install --only main --no-root --no-interaction
COPY . /code

RUN chmod 664 /code/db.sqlite3
RUN chown www-data:www-data /code/db.sqlite3

ENV SECRET_KEY "D4Y6jhGrq7u6spkwbXsxR396FxyrRWypPZ20XUTkiHR6w6rRGz"
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "ramengo.wsgi"]
