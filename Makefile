default: test

deps:
	npm prune && npm install && npm outdated

include $(shell find makefiles -name '*.mk' | sort)

include .env
.EXPORT_ALL_VARIABLES:
