# 📝 Detalhamento de Issues e Subtarefas (Sprint Backlog)

Este documento aprofunda o arquivo de Milestones e Issues, quebrando cada Issue em **subtarefas técnicas e acionáveis**, prontas para os desenvolvedores executarem no dia a dia.

---

## 🚩 Milestone 1: Setup Inicial, Arquitetura e DevOps

### 📦 Issue 1.1: Inicialização dos Repositórios e Estrutura
- [x] Criar o projeto / repositório no GitHub (Mono-repo ou repositórios separados).
- [x] **Backend:** Rodar `npm init -y` e `npx tsc --init`.
- [ ] **Backend:** Criar a estrutura básica de pastas (ex: `src/`).
- [x] **Frontend:** Criar app base com `npx create-expo-app@latest -t expo-template-blank-typescript`.
- [x] Criar e popular os arquivos `.gitignore` para ambos os projetos.
- [x] Subir o commit inicial (`Initial commit`) para a branch `main`.

### 🧹 Issue 1.2: Configuração de Linter e Padronização de Código
- [ ] Instalar `eslint`, `prettier` e os plugins de integração no Backend e Frontend.
- [ ] Criar arquivo `.eslintrc.json` configurando regras da equipe (ex: sem `any`, aspas simples, etc).
- [ ] Criar arquivo `.prettierrc` para formatação automática.
- [ ] Rodar `npx husky-init` e instalar o `lint-staged`.
- [ ] Adicionar hook de `pre-commit` no Husky para rodar o linting automaticamente antes de cada commit.

### 🐳 Issue 1.3: Containerização de Banco de Dados
- [ ] Criar arquivo `docker-compose.yml` na raiz do Backend.
- [ ] Configurar serviço do PostgreSQL (imagem, portas, variáveis de ambiente de user/senha).
- [ ] Rodar `docker compose up -d` e testar a conexão no DBeaver (ou similar).
- [ ] Documentar o processo de inicialização no `README.md`.

### 🤖 Issue 1.4: CI Automático Básico (GitHub Actions)
- [ ] Criar diretório `.github/workflows/`.
- [ ] Adicionar arquivo `ci.yml`.
- [ ] Escrever o job completo: fazer checkout do código, instalar Node, rodar `npm install`, rodar `npm run lint`.

---

## 🚩 Milestone 2: Backend Core - Banco de Dados e API Base

### 🗄️ Issue 2.1: Configuração do ORM e Migrations Iniciais
- [ ] Instalar o Prisma ORM (`npm install prisma --save-dev` e `npx prisma init`).
- [ ] Configurar variável `DATABASE_URL` no `.env`.
- [ ] Escrever os `models` no arquivo `schema.prisma`: `User` e `Demanda` (status, titulo, descricao).
- [ ] Rodar `npx prisma migrate dev --name init_db` para gerar as tabelas.

### 🏛️ Issue 2.2: Estruturação *Controller-Service-Repository*
- [ ] Instalar Express e tipos do Express (`@types/express`).
- [ ] Criar subpastas: `src/controllers`, `src/services`, `src/repositories`, `src/routes`.
- [ ] Criar roteador principal (`index.ts` nas rotas).
- [ ] Criar endpoint simples `GET /health` de ponta a ponta (Controller -> Service -> Repo) para provar o formato.

### 🔐 Issue 2.3: Módulo de Autenticação (Login e Cadastro)
- [ ] Instalar `bcrypt` (e types) e `jsonwebtoken` (e types).
- [ ] **Repository:** Criar buscas de usuário por Email e criação de Usuário.
- [ ] **Service:** Lógica de *hash* de senhas no registro e comparação no login.
- [ ] **Service:** Geração de payload e token JWT.
- [ ] **Controller:** Expor `/auth/register` e `/auth/login`.

### 📄 Issue 2.4: Módulo de Demandas (CRUD)
- [ ] Escrever classes/funções do `DemandaRepository` (find, create, update, delete).
- [ ] Escrever lógica no `DemandaService`.
- [ ] Expor endpoints de Demanda no `DemandaController`.
- [ ] Criar *Middleware* de Autenticação para proteger as rotas de criação/edição.

### 🧪 Issue 2.5: Testes de Integração Backend
- [ ] Instalar `jest`, `ts-jest` e `supertest`.
- [ ] Configurar o `jest.config.js`.
- [ ] Escrever teste para o ciclo de Login (retorna JWT?).
- [ ] Escrever teste para rotas protegidas (Rejeita sem token?).

---

## 🚩 Milestone 3: Frontend Core - Telas e Design System

### 💅 Issue 3.1: Setup de Estilização Externa
- [ ] Escolher e instalar lib de componentes/styles (ex: instalar `styled-components` e os types).
- [ ] Criar pasta `src/styles/` ou `src/theme/`.
- [ ] Configurar paleta de cores (Theme) exportada do arquivo de direcionamento de Design.
- [ ] Adicionar e importar fontes *Inter* pelo Google Fonts / Expo Fonts.

### 🧩 Issue 3.2: Desenvolvimento da UI Library (Componentes Base)
- [ ] Criar diretório `src/components/`.
- [ ] Desenvolver `Button.tsx` e associar ao seu arquivo de estilo (sem inline).
- [ ] Desenvolver `Input.tsx`.
- [ ] Desenvolver `CardDemanda.tsx`.
- [ ] Configurar a utilização de ícones *Material Symbols*.

### 🧭 Issue 3.3: Configuração de Roteamento
- [ ] Instalar bibliotecas do React Navigation (`@react-navigation/native`, stack, bottom-tabs e dependências).
- [ ] Criar o arquivo `routes/AppRoutes.tsx` para as abas navegáveis.
- [ ] Criar o arquivo `routes/AuthRoutes.tsx` para a tela de login.
- [ ] Implementar a condicional de navegação visual baseada na sessão (Mockada no momento).

### 📱 Issue 3.4: Desenvolvimento das Telas Estáticas (Mock)
- [ ] Criar tela `Login.tsx`.
- [ ] Criar tela `Home.tsx` listando mocks de `CardDemanda`.
- [ ] Criar tela `NovaDemanda.tsx` com formulários.
- [ ] Criar tela `Perfil.tsx`.

### 🧠 Issue 3.5: Estado Global Local (Zustand)
- [ ] Instalar `zustand`.
- [ ] Criar store `useConfigStore.ts` para dados locais de interface do app.
- [ ] Criar store de Auth falso (`useAuthStore.ts`) para simular login e liberar a navegação para Home temporariamente.

---

## 🚩 Milestone 4: Integração de Dados, Offline e Estado

### 🔌 Issue 4.1: Cliente HTTP e Interceptors
- [ ] Instalar `axios`.
- [ ] Configurar classe base no arquivo `src/services/api.ts`.
- [ ] Adicionar interceptor global para incluir `Authorization: Bearer [TOKEN]`.

### 🔑 Issue 4.2: Fluxo de Login Real no App
- [ ] Implementar chamadas à rota `/auth/login` real no Node.js pelo formulário visual.
- [ ] Ao receber sucesso, salvar o Token usando Expo SecureStore ou MMKV.
- [ ] Atualizar o Zustand `useAuthStore.ts` com o usuário autenticado.

### 📡 Issue 4.3: Integração do React Query (Demandas)
- [ ] Instalar `@tanstack/react-query`.
- [ ] Englobar o App com o `<QueryClientProvider>`.
- [ ] Substituir mocks da `Home.tsx` por uma chamada `useQuery` de `/demandas`.
- [ ] Converter o botão do formulário de rascunhos para enviar usando `useMutation`.

### 📶 Issue 4.4: Funcionalidade Offline First (Rascunhos)
- [ ] Instalar e configurar `react-native-mmkv`.
- [ ] Na tela de Nova Demanda, salvar os campos digitados (onChange) silenciosamente via função no MMKV.
- [ ] Em inicialização (Mount) da tela, resgatar do MMKV caso a pessoa não tenha enviado da última vez.
- [ ] Excluir o valor do MMKV com sucesso na chamada à API.

---

## 🚩 Milestone 5: Features Avançadas (Imagens e Alertas)

### 📸 Issue 5.1: Backend - Upload de Imagens
- [ ] Instalar `multer` para processamento de FormData.
- [ ] Configurar rotina para salvar imagens em `temp/` ou em Cloud/S3 Bucket.
- [ ] Retornar os links propostos (URL da foto salva) para associar com o registro da *Demanda*.

### 📷 Issue 5.2: Frontend - Câmera e Galeria
- [ ] Instalar `expo-image-picker`.
- [ ] Criar botão modal para escolher "Tirar foto" ou "Abir Galeria".
- [ ] Converter a imagem capturada em JSON / FormData (incluindo path estático ou blob puro do mobile).
- [ ] Ajustar função Axios para enviar header `multipart/form-data`.

### 🔔 Issue 5.3: Push Notifications (Expo + Firebase)
- [ ] Instalar `expo-notifications` e `expo-device`.
- [ ] Codificar requisição das permissões do celular aos usuários *(App pede permissão de notificação)*.
- [ ] Adquirir o ExpoPushToken dentro de um useEffect e enviar para a API.
- [ ] API usar biblioteca do Expo SDK para disparar alertas quando uma demanda for alterada.

---

## 🚩 Milestone 6: Qualidade Final, Build e Lançamento

### 🧪 Issue 6.1: Testes Frontend (RNTL)
- [ ] Instalar `@testing-library/react-native`.
- [ ] Testar renderização de inputs no Login.
- [ ] Testar o "Caminho Feliz" (preencher input de Login e pressionar o botão aciona a função de sign-in mockada?).

### 🐛 Issue 6.2: Sessões de Homologação (QA)
- [ ] Rodar equipe testando layout em aparelhos Android antigos / limitados (avaliando performance do nativeWind/Styled).
- [ ] Garantir o SafeArea e espaçamentos no `Notch`/`Dynamic Island` dos IPhones e barras nativas.

### ☁️ Issue 6.3: Configuração do Expo Application Services (EAS)
- [ ] Fazer login via CLI `eas login`.
- [ ] Rodar comando `eas build:configure`.
- [ ] Definir perfis `preview` (para homologação em APK com time interno) e `production` (para lançamentos reais).
- [ ] Gerar APK/AAB pra testes Android (`eas build -p android --profile preview`).

### 📦 Issue 6.4: Envio às Lojas (Stores)
- [ ] Fechar certificados na loja Apple Developer e do Android Keystore.
- [ ] Gerar material gráfico e descritivo final.
- [ ] Enviar Build definitiva via EAS Submit (`eas submit -p all --latest`).