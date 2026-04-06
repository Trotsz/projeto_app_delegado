# ⚙️ Guia de Configurações do Projeto (Code Quality)

Este documento documenta as escolhas e o funcionamento do ecossistema de padronização de código que foi implantado neste repositório. O objetivo é manter nosso **backend (Node)** e **frontend (Expo)** formatados da mesma maneira, prevenindo *bugs* sintáticos.

## 1. Gerenciamento da Versão do Node (NVM)
Para evitar problemas onde um dev usa a versão 18 e outro a 22 (causando falhas na resolução de pacotes e features), o projeto usa o arquivo `.nvmrc` travado na versão LTS `24.14.1`.

**Como usar:**
1. Instale o [nvm-windows](https://github.com/coreybutler/nvm-windows) (se usar Windows) ou NVM (Linux/Mac).
2. Na raiz do projeto, execute no terminal:
   ```bash
   nvm use
   ```
3. Se não tiver a versão instalada, ele avisará e você poderá rodar `nvm install 24.14.1`.

---

## 2. ESLint (Flat Config) & Prettier
Abandonamos arquivos clássicos como `.eslintrc.json`, pois foram descontinuados a partir do `eslint v10`. Em vez disso, adotamos o novo sistema do **ESLint Flat Config** usando a extensão `.mjs` (`eslint.config.mjs`).

Foram definidos dois arquivos de configuração:
- `eslint.config.mjs` (Raiz - Backend): Voltado para as regras do Node, Typescript e sintaxes ES2021.
- `app_conexao_direta/eslint.config.mjs` (Frontend - App): Voltado e encapsulado com o *plugin do Expo* para as regras nativas de React Native e Expo.

**O que ele faz automaticamente:**
- Desativa regras de formatação do próprio ESLint que conflitariam com o Prettier.
- Lança erro de lint se existirem quebras de linha fora do padrão, falta de aspas simples ou indentação errada (definida no arquivo `.prettierrc`).
- Avisa (`warn`) caso alguém injete tipos `any` soltos pelo Typescript.

**Comandos Disponíveis:**
Para conferir manualmente se seu código tem algum problema sintático:
- Backend: `npm run lint` (na raiz do projeto)
- Frontend: `npm run lint` (dentro da pasta `app_conexao_direta`)

*(Para formatar todo o código automaticamente, pode rodar `npm run format`)*

---

## 3. Pre-commit Hooks (Husky + lint-staged)
Visando impedir que código bagunçado chegue até o repositório (`main`), temos uma trava ativada no Git.

Quando você executar um `git commit`, o **Husky** ativará o **lint-staged**.
O lint-staged pegará **apenas os arquivos que você alterou e mandou para o stage (`git add .`)** e:
1. Rodará o Prettier neles (`prettier --write`).
2. Rodará a verificação do ESLint (`eslint --fix`).
3. Somente concluirá o Commit se ambos passarem com sucesso e as correções forem aplicadas perfeitamente.

**Exceções (Evite usar):**
Se por um acaso crítico for necessário forçar um commit e burlar os lints (ex: salvar trabalho rápido de fim de expediente), adicione a flag `--no-verify` no git:
```bash
git commit -m "seu commit" --no-verify
```
*(Não faça push/PR de código não verificado! O CI do GitHub Actions vai estourar erro depois!)*
