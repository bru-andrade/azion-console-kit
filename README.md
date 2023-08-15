# azion-platform-kit


## Introdução
O Azion Platform Kit é um kit de desenvolvimento front-end composto pelas tecnologias utilizadas compostas por uma gama de Tecnologias e estrutura com a finalidade de facilitar a construção de novas rotas e páginas do Real Time Manager.

## Features
1. **Multi-tenancy:** Construa conforme a sua necessidade o seu Real Time Manager consumindo os endpoints da nossa API Pública: [Azion Public API](https://api.azion.com)
2. **UI Customizável:** configure tokens de temas ou os gere automaticamente via [Builder](https://designer.primevue.org/) em seu projeto dando o look and feel de acordo com a sua necessidade.
3. **Estrutura simples:** separação em camadas dos blocks, components e serviços de forma que sejá fácil construir uma nova rota em pouquíssimo tempo.

## What is a multi-tenant application?

Applicações Multi-tenant servem multiplos clientes através de diferentes domínios & subdomínios customizados com uma codebase unificada.

## How to start
Você precisa da NodeJS acima da versão 18.* instalada em seu computador, ou uma imagem Docker com esta versão de Node ou superior.

Instalando localmente:
- Clone este repositório
- Execute ```npm install``` ou ```yarn install```
- Execute ```npm run dev``` ou ```yarn dev```

A aplicação rodará no endereço: ```http://127.0.0.1:5173``` 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Development
A estrutura segue o seguinte padrão:
```
├── App.vue
├── assets
│   └── themes
├── router
├── services
│   ├── axios
│   ├── domains-services
│   ├── edge-application-services
│   └── variables-services
├── stores
├── templates
│   ├── form-block
│   └── list-table-block
└── views
    └── EdgeApplications
        ├── List.vue
        └── Form.vue
    └── Variables
        ├── List.vue
        └── Form.vue
```

## Another stuff
### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```