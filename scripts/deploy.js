import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Verifica se o build existe
if (!fs.existsSync(path.join(__dirname, '../dist/spa/index.html'))) {
  console.error('Erro: Execute o build primeiro!')
  process.exit(1)
}

// 2. Configurações
const REPO = 'git@github.com:tomnunes/teste-ed.git'
const BRANCH = 'main'

// 3. Executa o deploy
try {
  console.log('Iniciando deploy...')
  execSync(`
    cd dist/spa &&
    git init &&
    git add . &&
    git commit -m "Deploy automático" &&
    git remote add origin ${REPO} &&
    git push -f origin HEAD:${BRANCH}
  `, { stdio: 'inherit' })
  console.log('Deploy concluído com sucesso!')
} catch (error) {
  console.error('Erro no deploy:', error)
}