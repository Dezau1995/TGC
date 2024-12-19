PHONY: clean

build:
	docker compose -f compose.yaml --env-file .env.dev up -d

dev:
	docker compose -f compose.yaml up -d

clean:
	docker system prune -af --volumes
