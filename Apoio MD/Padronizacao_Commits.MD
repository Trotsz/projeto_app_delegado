# 💬 Padronização de Commits (Conventional Commits)

Para mantermos o histórico do repositório limpo, rastreável e legível para toda a equipe, utilizaremos o padrão **Conventional Commits**.

Isso facilita a geração automática de *Changelogs*, ajuda a entender rapidamente o que cada modificação faz e prepara nossa base para integrações contínuas (CI/CD) mais inteligentes e bloqueios de código via **Husky / Commitlint**.

---

## 🎯 Estrutura do Commit

Cada mensagem de commit deve seguir a seguinte estrutura:

```text
<tipo>[escopo opcional]: <descrição breve>

[corpo opcional explicativo]

[rodapé opcional (ex: relacionando a uma Issue)]
```

---

## 🏷️ Tipos de Commits Permitidos

Sempre inicie a mensagem com um dos prefixos abaixo:

- **`feat`**: Criação de uma funcionalidade nova no sistema. *(ex: adicionar tela de login)*
- **`fix`**: Correção de um bug ou erro no sistema. *(ex: corrigir erro de crash na busca de demandas)*
- **`chore`**: Tarefas de manutenção, atualização de pacotes, build, ou configurações que **não afetam** o código de produção. *(ex: atualizar versão do React, configurar ESLint)*
- **`refactor`**: Refatoração de código. Mudanças estruturais que não alteram o comportamento visual nem corrigem bugs, mas melhoram a qualidade do código. *(ex: reescrever função de filtro para usar hook)*
- **`style`**: Mudanças de formatação, espaços, vírgulas, ponto e vírgula, etc. Não afeta a lógica.
- **`docs`**: Alterações apenas em documentação (arquivos `.md`, JSDoc, etc).
- **`test`**: Adição ou correção de testes (Jest, Supertest, RNTL).
- **`perf`**: Alteração de código com foco em melhorar o desempenho.
- **`ci`**: Mudanças em arquivos e scripts de integração contínua (GitHub Actions, Docker, etc).
- **`build`**: Mudanças que afetam o sistema de build ou dependências externas (EAS, npm, expo).

---

## 📝 Regras para a Descrição (Subject)

A primeira linha do commit deve ser **clara e direta**:

1. Use o **imperativo verbal** do português ou inglês (como uma ordem):
   - ✅ Certo: `feat: adicionar botão de criar demanda`
   - ❌ Errado: `feat: adicionei o botão` ou `feat: adicionando botão`
2. **Não use letras maiúsculas** no início da descrição (após os dois pontos).
3. **Não coloque ponto final** (`.`) no fim da frase.
4. Tente manter a primeira linha com, no máximo, **72 caracteres**.

---

## 🔍 O que é o Escopo? (Opcional)

O escopo ajuda a identificar qual parte do app foi alterada. Coloque entre parênteses após o tipo.

**Exemplos com Escopo:**
- `feat(auth): implementar login com JWT`
- `fix(ui): corrigir alinhamento do CardDemanda`
- `chore(deps): atualizar pacote expo-router`

---

## ✅ Exemplos de Bons Commits vs ❌ Maus Commits

### Bons Commits:
- `feat(demanda): integrar lista de demandas com React Query`
- `fix(login): corrigir erro de token expirado caindo em loop`
- `style: remover espacos em branco do arquivo global`
- `docs: adicionar readme base para o projeto backend`
- `chore: configurar regras do prettier e eslint`
- `test(api): adicionar teste para a rota de criacao de demanda`

### Maus Commits:
- `arrumei o bug da tela` *(Sem tipo, sem escopo, verbo no passado)*
- `Update arquivo.ts` *(Genérico, erro invisível no histórico)*
- `FEAT: NOVA TELA` *(Tudo maiúsculo)*
- `fix login.` *(Faltam os dois pontos e tem ponto final)*

---

## 🔗 Referenciando Issues

Se o seu commit resolve uma tarefa específica (Issue) do quadro do GitHub/Jira, é recomendável colocar isso no rodapé ou na própria mensagem.

**Exemplo fechando uma Issue do GitHub:**
```text
<tipo>(<escopo>): <resumo curto e direto em 50 caracteres>

[MOTIVAÇÃO]
- Por que esta mudança é necessária? (ex: bug relatado em produção, nova regra de negócio)

[O QUE FOI FEITO]
- Descrição técnica sucinta das alterações (ex: alterada lógica do loop, adicionado índice no DB)
- Mudanças em componentes ou dependências

[IMPACTO]
- Como isso afeta o restante do sistema?
- Existe algum efeito colateral conhecido?

[TESTES]
- Como essa mudança foi validada? (ex: testes unitários, manual no Swagger, Jest)

[NOTAS ADICIONAIS / REFERÊNCIAS]
- Closes #123 (Fecha a issue 123)
- BREAKING CHANGE: (se houver algo que quebre a compatibilidade)

```