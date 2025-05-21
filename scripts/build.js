import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

execSync('rm -rf docs', { stdio: 'inherit' })

execSync('quasar build', { stdio: 'inherit' })

fs.copyFileSync(
  path.join(__dirname, '../src/static/404.html'),
  path.join(__dirname, '../docs/404.html')
)

const assetsPath = path.join(__dirname, '../docs/assets')
if (!fs.existsSync(assetsPath)) {
  console.error('Erro: Pasta assets não foi gerada!')
  process.exit(1)
}

const indexPath = path.join(__dirname, '../docs/index.html')
let html = fs.readFileSync(indexPath, 'utf8')
html = html.replace(/\/teste-ed\//g, '/')
fs.writeFileSync(indexPath, html)

console.log('Build completo')