ci(actions): configurar pipeline de ci, templates de pr e variaveis base

**OBJETIVO**

- Criar ambiente de Integração Contínua (CI) básico para blindar o código fonte de quebras estruturais ou lintings incorretos por parte da equipe durante Pull Requests.

**O QUE FOI FEITO**

- Desenvolvido template de Pull Request (`.github/PULL_REQUEST_TEMPLATE.md`) com checklist validativo e identificação de issues.
- Adicionado GitHub Actions (`.github/workflows/ci.yml`) capaz de configurar o Node v24 automático, cache do NPM e validação do fluxo nos projetos (raiz e app).
- Adicionado guia explicativo do fluxo em `Apoio MD/CI_e_Pull_Requests.MD`.
- Adicionados os arquivos `.env` na raiz para abrigar a `DATABASE_URL` e `PORT` futuramente requeridos pelo backend.

**NOTAS ADICIONAIS**

- Conclui as dependências da Milestone 1 completando a Issue 1.4.
- Ambiente DevOps básico de pé: Código já não engaja branchs bloqueadas sem atestar qualidade.
