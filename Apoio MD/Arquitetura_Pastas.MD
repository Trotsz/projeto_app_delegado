# 📂 Arquitetura de Pastas e Estrutura do Projeto

Este documento estabelece a organização sugerida para os diretórios estruturais tanto do **Backend** quanto do **Frontend**. 

A ideia dessa arquitetura é garantir que cada arquivo tenha uma responsabilidade única, evitando "código misturado" e facilitando a localização de arquivos por qualquer membro da equipe.

---

## 🖥️ Arquitetura do Backend (Node.js + Express + Prisma)

Seguindo o padrão arquitetural **Controller → Service → Repository**, a organização dos arquivos no backend ficará da seguinte forma:

```text
📦 backend
 ┣ 📂 prisma                  # Configurações do banco de dados e schemas
 ┃ ┣ 📜 schema.prisma         # Modelagem das tabelas do banco de dados
 ┃ ┗ 📂 migrations            # Histórico de alterações estruturais do banco
 ┣ 📂 src                     # Código fonte da aplicação
 ┃ ┣ 📂 controllers           # Lida com as requisições HTTP (req, res) da API
 ┃ ┣ 📂 services              # Lógica e regras de negócio da aplicação
 ┃ ┣ 📂 repositories          # Comunicação direta com o banco de dados (via Prisma)
 ┃ ┣ 📂 routes                # Definição dos caminhos das URLs (ex: /demandas)
 ┃ ┣ 📂 middlewares           # Interceptadores (ex: validação de JWT, erros globais)
 ┃ ┣ 📂 utils                 # Funções auxiliares (ex: formatação de datas, gerador de hashes)
 ┃ ┣ 📂 types                 # Definições de tipagens TypeScript globais
 ┃ ┣ 📂 config                # Integrações iniciais (ex: env, setup do multer/s3)
 ┃ ┗ 📜 server.ts             # Ponto de entrada que inicializa o servidor Express
 ┣ 📂 tests                   # Arquivos de testes (Supertest + Jest)
 ┣ 📜 docker-compose.yml      # Configuração dos containers (PostgreSQL)
 ┣ 📜 .env                    # Variáveis de ambiente secretas
 ┣ 📜 tsconfig.json           # Configurações do TypeScript
 ┗ 📜 package.json            # Dependências do projeto do backend
```

### Regras de Fluxo no Backend:
1. O fluxo **sempre** é: `Routes` ➔ `Controller` ➔ `Service` ➔ `Repository`.
2. Nenhuma regra de negócio deve ficar no Controller. Sua única função é receber a resposta HTTP e devolver um status code baseando-se no formato de saída do `Service`.

---

## 📱 Arquitetura do Frontend (React Native + Expo)

O app foi arquitetado pensando em separar o aspecto visual das regras complexas de dados. Por se tratar de React Native e uso do **Zustand** e **React Query**, ele não deve possuir CSS misturado em meio ao código, ficando estruturado assim:

```text
📦 frontend-app
 ┣ 📂 assets                  # Arquivos estáticos (fontes da UI, imagens, ícones)
 ┣ 📂 src                     # Todo o código funcional
 ┃ ┣ 📂 components            # Itens visuais reutilizáveis em todo o app 
 ┃ ┃ ┣ 📂 Button          
 ┃ ┃ ┃ ┣ 📜 index.tsx         # O código do componente (React purista, sem inline CSS)
 ┃ ┃ ┃ ┗ 📜 styles.ts         # Styled Components do Button
 ┃ ┃ ┗ 📂 CardDemanda
 ┃ ┣ 📂 screens               # Telas completas que agrupam componentes
 ┃ ┃ ┣ 📂 Home
 ┃ ┃ ┣ 📂 Login
 ┃ ┃ ┗ 📂 NovaDemanda
 ┃ ┣ 📂 routes                # Configuração da navegação principal do Expo / React Nav
 ┃ ┣ 📂 services              # Requisições a APIs externas
 ┃ ┃ ┣ 📜 api.ts              # Configuração do Axios (com interceptors do JWT)
 ┃ ┃ ┗ 📂 queries             # Hooks do React Query para isolar buscas e mutações
 ┃ ┣ 📂 store                 # Estados globais com Zustand (ex: dados temporários/auth)
 ┃ ┣ 📂 theme                 # Arquivos contendo as variáveis mestre do Design System
 ┃ ┃ ┗ 📜 index.ts            # (Cores base, métricas, famílias tipográficas - Inter)
 ┃ ┣ 📂 hooks                 # Hooks customizados do React (reaproveitamento lógico no app)
 ┃ ┗ 📂 utils                 # Funções de suporte, masks de input e helpers
 ┣ 📜 App.tsx                 # Raiz da aplicação, carrega os providers (QueryProvider, Theme)
 ┣ 📜 app.json                # Configurações do Expo (nome, versão, splash screen)
 ┣ 📜 babel.config.js         # Transpilador
 ┗ 📜 package.json            # Dependências do App
```

### Regras de Fluxo no Frontend:
1. **Sem inline-styles:** Todo elemento visual, padding, e alocamento na tela precisa ser definido dentro da pasta do componente em seu arquivo respectivo `styles.ts`.
2. **Consultas Inteligentes:** Consultar a API nos componentes de Tela (Screens) requer obrigatoriamente a utilização do `React Query` configurado nos arquivos locais, evitando uso "na raiz" com useEffect (já que lidamos com cache e modo offline).