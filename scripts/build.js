import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// Obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🛠  Iniciando build customizado...')

// 1. Limpa builds anteriores
execSync('rm -rf dist', { stdio: 'inherit' })

// 2. Executa o build do Quasar
execSync('quasar build', { stdio: 'inherit' })

// 3. Copia arquivos estáticos
const staticFiles = ['404.html'] // Adicione outros se necessário
staticFiles.forEach(file => {
  const source = path.join(__dirname, '../src/static', file)
  const target = path.join(__dirname, '../dist/spa', file)
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target)
    console.log(`✓ ${file} copiado para dist/spa/`)
  }
})

console.log('Build completo com arquivos estáticos!')