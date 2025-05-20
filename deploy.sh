#!/usr/bin/env sh

set -e

quasar build

cd dist/spa

# Garante que o 404.html seja copiado
cp ../../../src/static/404.html .

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:tomnunes/teste-ed.git HEAD:main

cd -