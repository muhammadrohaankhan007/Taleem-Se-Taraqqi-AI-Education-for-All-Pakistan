.PHONY: help up down logs ps test test-backend test-content test-mobile test-admin lint migrate-up migrate-down

help:
	@echo "Taleem Se Taraqqi Makefile"
	@echo "  make up            - Start all docker containers"
	@echo "  make down          - Stop all docker containers"
	@echo "  make test          - Run all test suites"
	@echo "  make test-backend  - Run backend unit & safety tests"
	@echo "  make test-content  - Validate JSON schemas & curriculum"
	@echo "  make test-mobile   - Run flutter mobile tests"
	@echo "  make migrate-up    - Run alembic database migrations"

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps

test: test-content test-backend

test-content:
	python tools/validate_content.py

test-backend:
	cd backend && pytest -v

test-mobile:
	cd mobile && flutter test

test-admin:
	cd admin-web && npm run test

lint:
	cd backend && ruff check .
	python tools/validate_content.py

migrate-up:
	docker compose exec backend alembic upgrade head

migrate-down:
	docker compose exec backend alembic downgrade -1
