docs(git): adicionar guia de fluxo de versao e branch rules

**OBJETIVO**

- Especificar o fluxo de trabalho exato no repositório ensinando os membros a criarem ramificações independentes antes de abrirem o Pull Request para a branch `main`.

**O QUE FOI FEITO**

- Editado o documento `Apoio MD/CI_e_Pull_Requests.MD` acrescentando uma nova seção inteira chamada "Fluxo de Trabalho (Git Workflow): Como criar uma nova rotina e PR".
- A seção detalha os comandos exatos de terminal correspondentes à recuperação remota de dados (`git pull origin main`), criação da branch temporária (`git checkout -b chore/alguma-coisa`), manipulação do próprio branch isolado até a subida dos dados remotos via `git push origin` para avaliação finalizada por PR visando proteção da branch default.

**NOTAS ADICIONAIS**

- Ponto complementar no escopo do DevOps. Equipe agora tem uma wiki passo a passo do fluxo Git desde a primeira linha de código, o uso de `branchs` isoladas e a construção de `Pull Requests` passando na CI.
