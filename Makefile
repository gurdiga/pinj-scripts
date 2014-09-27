default: lint

lint:
	@jshint `find . -type f \( -name '*.js' -or -name '*.json' \) ! -path '*node_modules*'`

smoke:
	echo ???

start: lint
	@foreman start

deploy:
	@git push -f heroku master

log:
	heroku logs --tail
