# Boilerplate
BUILD_VERSION?=$(shell git rev-parse --verify HEAD)
APP_NAME?=project-a

build: node_modules
	@echo building static site...
	npm run build

clean:
	rm -rf public node_modules

node_modules:
	npm i

.PHONY: build clean