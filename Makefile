# Load environment variables from .env file
include .env
export

check-conn:
	chmod +x ./scripts/check-connection.sh \
	&& ./scripts/check-connection.sh

build:
	docker build -t olp .

compose-up:
	docker compose up -d