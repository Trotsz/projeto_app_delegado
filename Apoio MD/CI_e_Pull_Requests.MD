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
