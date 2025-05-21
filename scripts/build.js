import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 1. Limpeza
execSync('rm -rf docs', { stdio: 'inherit' })

// 2. Build
execSync('quasar build', { stdio: 'inherit' })

// 3. Cópia especial
fs.copyFileSync(
  path.join(__dirname, '../src/static/404.html'),
  path.join(__dirname, '../docs/404.html')
)

// 4. Corrige paths no index.html
const indexPath = path.join(__dirname, '../docs/index.html')
let html = fs.readFileSync(indexPath, 'utf8')
html = html.replace(/\/teste-ed\//g, '/')
fs.writeFileSync(indexPath, html)