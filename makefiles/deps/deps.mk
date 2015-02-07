deps:
	ln --force --verbose --symbolic --target=node_modules ../app
	npm prune && npm install && npm outdated
