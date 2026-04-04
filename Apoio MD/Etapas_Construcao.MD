# 🗺️ Roadmap e Etapas de Construção do App

Este documento organiza o passo a passo de desenvolvimento do projeto, dividindo a construção em fases claras e sequenciais que respeitam a arquitetura e as regras da equipe.

---

## 📌 Fase 1: Setup, DevOps e Padronização
- [ ] Criar repositórios organizados no GitHub (Frontend e Backend separados, ou Monorepo).
- [ ] Configurar Linter (ESLint), Prettier e **Husky** (padrão de commits e bloqueio de código ruim) em ambos os projetos.
- [ ] Configurar CI básico com **GitHub Actions** (para rodar lint e testes a cada PR).
- [ ] **Backend:** Inicializar projeto Node.js + TypeScript.
- [ ] **Backend:** Configurar ambiente de container com **Docker** e Docker Compose (incluindo a imagem do **PostgreSQL**).
- [ ] **Frontend:** Inicializar projeto **Expo + TypeScript** (escolhendo React Navigation ou Expo Router).

## 🗄️ Fase 2: Desenvolvimento do Backend (API & Dados)
- [ ] Conectar e inicializar o **Prisma ORM** com o banco PostgreSQL.
- [ ] Desenhar e criar as *Migrations* refletindo o modelo de negócios (Usuários, Demandas, Status e possíveis Imagens).
- [ ] Implementar a estrutura base seguindo a regra da equipe: **Controller → Service → Repository**.
- [ ] Desenvolver módulo de Autenticação com **JWT** e criptografia de senhas (**bcrypt**).
- [ ] Desenvolver APIs de criação, leitura, atualização e exclusão (CRUD) das Demandas.
- [ ] Definir regras de permissão (Usuário comum vs. Admin/Gestor da demanda).
- [ ] Escrever testes de API utilizando **Supertest + Jest**.

## 📱 Fase 3: Desenvolvimento do Frontend (Arquitetura Visual e Telas)
- [ ] Configurar o **Styled Components** (ou StyleSheet nativo externalizado) para assegurar o fluxo de trabalho **sem CSS Inline**.
- [ ] Traduzir o Design System gerado para componentes React Native puros (Tipografia *Inter*, *Material Symbols*, Botões, Inputs, Cards).
- [ ] Estruturar a navegação principal da interface (Abas: Acompanhamento, Nova Demanda, Alertas/Notificações e Perfil).
- [ ] Criar todas as telas e fluxos de forma estática (Mockados visualmente).
- [ ] Configurar o **Zustand** para o estado global (tema, dados provisórios ou informações da sessão).

## 🔗 Fase 4: Integração, Dados e Cache
- [ ] Configurar cliente de requisições web utilizando o **Axios** (criando interceptors para passar o token JWT).
- [ ] Implementar o **React Query (TanStack Query)** para trazer a lista de demandas, realizar cache inteligente e mutações consistentes.
- [ ] Configurar o local storage com o **MMKV** para máxima performance.
- [ ] Desenvolver a lógica "Offline First" (Salvando demandas em rascunho com o MMKV se o usuário peder conexão durante a criação).
- [ ] Integrar sistema de Autenticação (Login, Cadastro).
- [ ] Integrar fluxos reais do App: Criar e Acompanhar o Status das demandas consultando o Backend.

## 🔔 Fase 5: Funcionalidades Avançadas e Refinamento
- [ ] Configurar mecanismo de upload de arquivos e imagens (AWS S3, Cloudinary ou infra própria), garantindo que as demandas tenham provas visuais.
- [ ] Configurar push notifications utilizando o **Expo Notifications + Firebase (FCM)**.
- [ ] Disparar alertas no push sempre que o status de uma demanda de interesse do usuário for alterado.
- [ ] Revisão de UX e transições seguras (Loading states, Skeletons durante chamadas React Query).

## 🚀 Fase 6: Testes Finais, Build e Distribuição
- [ ] Criar baterias de testes no frontend com **React Native Testing Library** (simulando toques do usuário real).
- [ ] Realizar Homologação (Testes manuais precisos em emuladores e dispositivos físicos).
- [ ] Cadastrar conta e projeto no **Expo Application Services (EAS)**.
- [ ] Subir as builds finais na nuvem e gerar os arquivos `.apk` (Android) e `.ipa` (iOS).
- [ ] Configurar as atualizações enxutas por **Over-The-Air (EAS Update)**, para corrigir pequenos bugs sem passar pela loja.
- [ ] Envio das builds para a Google Play Store e Apple App Store.