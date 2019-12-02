FROM python:3.7
WORKDIR /app

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1

RUN pip install poetry 
COPY pyproject.toml pyproject.toml 
COPY poetry.lock poetry.lock 
RUN poetry config settings.virtualenvs.create false
RUN poetry install --no-interaction
COPY . .

ENTRYPOINT poetry run uvicorn src.main:app
