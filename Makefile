# Load environment variables from .env file
include .env
export

check-conn:
	chmod +x ./scripts/check-connection.sh \
	&& ./scripts/check-connection.sh re

build:
	docker build -t ${REGISTRY}/${APP} .

push:
	docker push ${REGISTRY}/${APP}

rm:
	docker push ${REGISTRY}/${APP}

compose-up:
	docker compose up -d