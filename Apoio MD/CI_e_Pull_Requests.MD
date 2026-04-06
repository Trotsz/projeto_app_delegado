# 🤖 Guia de CI (Integração Contínua) e Pull Requests

Para garantir a estabilidade do nosso monorepo e impedir que quebras no Banco de Dados ou na sintaxe do Frontend alcancem o ramo de produção (`main`), adotamos uma camada automática do **GitHub Actions**.

## 1. PULL_REQUEST_TEMPLATE

Toda vez que você for enviar sua _branch_ pessoal para avaliação (Merge) na `main` através do GitHub, será exibido automaticamente o texto do arquivo `.github/PULL_REQUEST_TEMPLATE.md`.
Siga os checklists rigorosamente! Ele exige que você informe o que mudou, se há dependências novas de banco e se você validou o ESLint, agilizando o code-review dos colegas.

## 2. CI Pipeline Automática (ci.yml)

Qualquer Pull Request apontado para a branch `main` ativará um robô do GitHub.

- Esse robô baixará o código na nuvem.
- Vai ler sua versão restrita no `.nvmrc` para compilar sob a mesma máquina.
- Executará `npm run lint` tanto no backend quanto no frontend.
- Caso existam falhas ou você tenha infligido regras da equipe, **o PR ficará "Vermelho" (Falha) e o merge será advertido/bloqueado.**

## 3. Configuração de Proteção da Branch no GitHub (Passo Manual do Admin)

Para que essa regra funcione 100%, o **dono do repositório** deve ir no Painel do GitHub e fazer o seguinte:

1. Vá até o repositório > **Settings** (Configurações) > **Branches**.
2. Clique em **Add branch protection rule** (Adicionar regra de proteção).
3. Em _Branch name pattern_, digite `main`.
4. Marque **Require a pull request before merging** (Exigir PR).
5. Marque **Require status checks to pass before merging** (Exigir que os checks passem).
6. Na barra de pesquisa de _status checks_, procure e adicione o job chamado `Code Quality (Lint)`.
7. Salve as mudanças.

Agora o repositório é robusto e niguém joga código incorreto em Produção sem passar pelos Actions!

---

## 4. Fluxo de Trabalho (Git Workflow): Como criar uma nova rotina e PR

Como você não deve (e muitas vezes nem conseguirá) mandar código direto para a branch `main`, sempre crie uma branch própria, seguindo o padrão de nomenclatura (ex: `feat/nova-tela`, `fix/erro-banco`, `chore/configuracoes`).

**Passo a passo (Terminal):**

1. **Garantir que a branch local base está atualizada:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Criar a sua branch de trabalho a partir da `main`:**
   ```bash
   git checkout -b <tipo>/<nome-da-tarefa>
   # Exemplo: git checkout -b feat/tabela-usuario
   ```
3. **Trabalhar na sua branch livremente!**
   Conforme for finalizando partes do seu trabalho, use o `Edit_commit.MD` para escrever um bom commit, e salve:
   ```bash
   git add .
   git commit -F "Apoio MD\Edit_commit.MD"
   ```
4. **Enviar para o GitHub (Push da branch):**
   Ao finalizar, você envia _APENAS a sua nova branch_ para a nuvem:
   ```bash
   git push origin <tipo>/<nome-da-tarefa>
   # Ou, se for a primeira vez fazendo push nesta branch:
   # git push -u origin <tipo>/<nome-da-tarefa>
   ```
5. **Abrir o Pull Request (GitHub):**
   Vá até a página do repositório no GitHub. Lá aparecerá um botão verde dizendo **"Compare & pull request"**.
   - Clique nele.
   - Preencha o documento padrão de checkboxes exibido (O nosso _Template de PR_).
   - Aguarde o robô de validação de Sintaxe da nossa CI (GitHub Actions) passar o seu código!
   - Ao receber o sinal ✅ e a aprovação de outro desenvolvedor ou de si mesmo (se for um trabalho individual que passou pela CI), clique no botão de **Merge Pull Request**.
