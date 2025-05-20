#!/usr/bin/env sh

# Aborta em erros
set -e

# Build
quasar build

# Navega para a pasta de output
cd dist/spa

git init
git add -A
git commit -m 'deploy'

# Publica na branch gh-pages
git push -f git@github.com:tomnunes/teste-ed.git main:gh-pages

cd -