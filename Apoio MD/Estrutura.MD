## IDEIA DO APP

Será um app mobile e leve.
A ideia principal é criar e acompanhar demandas enviadas com fins de molhora do estado e sociedade.

## Tecnologias Definitivas (Baseadas no Layout e Design System)

### 📱 FRONTEND (Mobile App)
- **Framework:** React Native com Expo (ideal para criar apps mobile leves de forma rápida).
- **Linguagem:** TypeScript (para maior segurança e escalabilidade).
- **Estilização:** **Styled Components** (ou `StyleSheet` nativo isolado). Remove totalmente propriedades ou classes inline do JSX, mantendo arquivos separados e componentizados (Design System sem poluição visual no código).
- **Tipografia e Ícones:** Fonte *Inter* e *Material Symbols* (definidos no guia de design).
- **Consumo de API:** Axios associado ao TanStack Query (React Query) para cache e sincronização fluida em background.
- **Estado Global:** Zustand (leve e eficaz para informações da sessão e filtros de demandas).

### 🧭 COMPORTAMENTO DO APP (Navegação & Offline)
- **Roteamento:** **React Navigation** ou **Expo Router** (organizando as abas de Criação, Acompanhamento, Alertas e Perfil).
- **Armazenamento Local:** **React Native MMKV** (extremamente rápido para guardar rascunhos de demandas e sessões offline, para o usuário iniciar demandas mesmo sem internet).
- **Notificações:** **Expo Notifications + Firebase (FCM)** (essencial para enviar avisos de mudança de *status* da demanda: "Sua demanda foi recebida", etc).

### 🖥️ BACKEND, SERVER & ARQUITETURA
- **Ambiente:** Node.js.
- **Framework:** Express.js com TypeScript.
- **Padrão de Arquitetura:** **Controller-Service-Repository** (Separa a lógica: Controladores respondem API, Serviços cuidam das regras do negócio de demandas, Repositórios conversam com o Banco). Evita lógicas misturadas e bagunçadas.
- **Autenticação e Segurança:** **JWT (JSON Web Tokens)** + bcrypt para senhas. Rotas de acompanhamento de demandas totalmente restritas e protegidas.
- **ORM (Banco de Dados):** Prisma ORM (facilita muito a manipulação do banco de dados com tipagem estática e migrations seguras).

### 🗄️ BANCO DE DADOS
- **Banco Oficial:** PostgreSQL (banco relacional é a melhor escolha para relacionar estruturalmente "Usuários", "Demandas", "Status", etc.).
- **Conteinerização:** Docker (para rodar o banco de dados de maneira isolada e ágil no desenvolvimento).

### 🚀 DEVOPS, CI/CD E DISTRIBUIÇÃO
- **Automação:** **GitHub Actions** (rodar testes e verificação de estilo antes de cada merge).
- **Build e Updates:** **EAS (Expo Application Services)** para gerar a versão `.apk` / `.ipa` e mandar atualizações diretamente para o celular do usuário (*Over-The-Air*) sem esperar aprovação das lojas.

### 🧪 TESTES & QUALIDADE
- **Frontend Testing:** React Native Testing Library (para garantir que os botões de criar demanda funcionem) + Jest.
- **Backend Testing:** Supertest + Jest (garantir as respostas das APIs).
- **Linter & Code Style:** ESLint, Prettier e Husky (Hooks do GIT que bloqueiam commits de código fora do padrão da equipe).