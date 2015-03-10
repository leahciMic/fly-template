#!/bin/bash
./node_modules/.bin/browserify --standalone fly-template fly-template.js > dist/fly-template.js
./node_modules/.bin/uglifyjs -m < dist/fly-template.js > dist/fly-template.min.js