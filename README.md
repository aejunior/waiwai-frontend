# Dicionário Wai-Wai (Frontend)

## 1\. Visão Geral

Bem-vindo ao frontend do projeto Dicionário Wai-Wai! Esta é uma Single Page Application (SPA) moderna construída com **Vite**, **React** e **TypeScript**.

O objetivo do projeto é fornecer uma plataforma performática e robusta para consultar, cadastrar e gerenciar verbetes do idioma Wai-Wai, incluindo fluxos de autenticação e gerenciamento de dados assíncronos.

## 2\. Tech Stack

- **Build Tool:** [Vite](https://vitejs.dev/)
- **Framework:** [React 18](https://reactjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Biblioteca de UI:** [Ant Design](https://ant.design/)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Gerenciamento de Estado (Cliente):** [Zustand](https://github.com/pmndrs/zustand)
- **Gerenciamento de Estado (Servidor):** [TanStack React Query](https://tanstack.com/query/latest)
- **Linting:** ESLint + TypeScript-ESLint

## 3\. Guia de Instalação e Execução

### 3.1. Executando Localmente

#### Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn

#### Passos

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/invicto-dev/dicionario-wai-wai-frontend-V2
    cd dicionario-wai-wai-frontend-v2
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
    ```.env
    VITE_API_URL=https://ww-hml.aejunior.dev
    ```

4.  **Executar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

### 3.2. Executando com Docker

#### Pré-requisitos

- Docker
- Docker Compose

#### Desenvolvimento

1.  **Configurar Variáveis de Ambiente:**
    Antes de iniciar o contêiner, crie um arquivo `.env` na raiz do projeto (você pode copiar o `.env.example`). Este arquivo é necessário para definir a URL da API.
    ```.env
    VITE_API_URL=https://ww-hml.aejunior.dev
    ```

2.  **Iniciar o contêiner de desenvolvimento:**
    Para iniciar o ambiente de desenvolvimento com hot-reloading:
    ```bash
    docker-compose up dev
    ```

A aplicação estará disponível em `http://localhost:5173`.

#### Produção

Para construir e iniciar a imagem de produção otimizada:

```bash
docker-compose up prod
```

A aplicação estará disponível em `http://localhost:8080`.

## 4\. Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa o linter para análise estática.
- `npm run preview`: Pré-visualiza o build de produção.
- `npm run typecheck`: Verifica erros de tipo do TypeScript.

## 5\. Estrutura do Projeto

```
dicionario-wai-wai-frontend-v2/
├── public/               # Ativos estáticos
├── src/                  # Código-fonte da aplicação
├── .dockerignore         # Arquivos a serem ignorados pelo Docker
├── .env.example          # Exemplo de variáveis de ambiente
├── Dockerfile            # Configuração para o ambiente de desenvolvimento
├── Dockerfile.prod       # Configuração para o ambiente de produção
├── docker-compose.yml    # Orquestração dos contêineres
├── package.json          # Dependências e scripts
└── vite.config.ts        # Configuração do Vite
```

## 6\. Arquitetura

### 6.1. Ponto de Entrada (`main.tsx`)
A aplicação é inicializada em `src/main.tsx`, que renderiza o componente raiz `<App />` e o envolve com um `ErrorBoundary` para tratamento de erros globais.

### 6.2. Componente Raiz (`App.tsx`)
`src/App.tsx` configura os provedores da aplicação e as rotas.
- **Provedores:** `ConfigProvider` (Ant Design), `QueryClientProvider` (React Query) e `BrowserRouter` (React Router).
- **Roteamento:** Define as rotas públicas e protegidas, utilizando um componente `ProtectedRoute` para controlar o acesso.

### 6.3. Gerenciamento de Estado
- **Estado do Servidor (React Query):** Gerencia todas as operações assíncronas com a API.
- **Estado do Cliente (Zustand):** Usado para o estado global da UI, principalmente para a autenticação.

### 6.4. Fluxo de Autenticação
O fluxo é centralizado no `authStore` e em interceptadores do Axios, garantindo que as requisições autenticadas sejam tratadas corretamente e que o usuário seja redirecionado em caso de token expirado.

## 7\. Como Contribuir

Estamos abertos a contribuições! Por favor, leia nosso [Guia de Contribuição](./CONTRIBUTING.md) para mais detalhes.

## 8\. Código de Conduta

Esperamos que todos os contribuidores sigam nosso [Código de Conduta](./CODE_OF_CONDUCT.md).

## 9\. Licença

Este projeto é licenciado sob a [Licença MIT](./LICENSE).
