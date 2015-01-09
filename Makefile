LESSW      = ./node_modules/.bin/watch-less
WATCHIFY   = ./node_modules/.bin/watchify
WATCH      = ./node_modules/.bin/watch
LESS       = ./node_modules/.bin/lessc
BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY     = ./node_modules/.bin/uglifyjs
TAP        = ./node_modules/.bin/tap
NAME = $(shell node -e "console.log(require('./package.json').name)")

all:
	echo "You probably want to run make publish"

publish:
	npm run _prepublish
	npm publish

# Watch browserify app root verbosely; build to begin with.
watch-js:
	${MAKE} build-js
	${WATCHIFY} -e  --standalone $(NAME) ./lib/browser.js -o static/bundle.js -d -v

# Watch less index file; build to begin with.
watch-css:
	${MAKE} build-css
	${WATCH} "${MAKE} build-css" src/style

watch:
	${MAKE} watch-js & ${MAKE} watch-css

# Pipe browserify output to uglify.
build-js:
	${BROWSERIFY} -e  --standalone $(NAME) ./lib/browser.js | ${UGLIFY} - > static/bundle.js

# Use less on index style.
build-css:
	${LESS} src/style/widget.less > static/bundle.css

build:
	${MAKE} build-js
	${MAKE} build-css

test:
	${TAP} test/*.js

.PHONY: test