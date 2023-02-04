run:
	docker run -d \
		-p 3005:3005 \
		--name mohir-dev \
		-e PORT=3000 \
		-e POSTGRES_HOST=localhost \
		-e POSTGRES_PORT=5432 \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=salom \
		-e POSTGRES_DB=mohirdev \
		-e ACCESS_TOKEN_KEY=MyNestAccessTokenSecretKey \
		-e REFRESH_TOKEN_KEY=MyNestRefreshTokenSecretKey \
		-e ACCESS_TOKEN_TIME='30m' \
		-e REFRESH_TOKEN_TIME='30d' \
		-e PRIVATE_KEY="SECRET_KEY" \
		-e EXPIRES_TIME='1d' \
		mahmudov:platform
