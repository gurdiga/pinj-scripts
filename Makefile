default: test

lint:
	@jshint `find . -type f \( -name '*.js' -or -name '*.json' \) ! -path '*node_modules*'`

test: lint
	@mocha --recursive --reporter dot --require './test/helpers' test/

smoke:
	echo ???

start: lint
	@foreman start

deploy:
	@git push -f heroku master

log:
	heroku logs --tail
