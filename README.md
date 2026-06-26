# 📅 Contador de Dias

O Contador de Dias é uma aplicação mobile desenvolvido para o acompanhamento de datas e eventos, permitindo que os usuários criem e organizem suas datas importantes de forma visualmente limpa e facilitada. O sistema é focado exclusivamente na criação de contadores progressivos (tempo decorrido desde uma data) e regressivos (contagem até uma data futura). Este projeto foi desenvolvido como Projeto Integrador da disciplina de Programação para Dispositivos Móveis da faculdade, com foco na aplicação prática dos conceitos de desenvolvimento mobile aprendidos na disciplina.

## Funcionalidades:

- Sistema de autenticação (Login e Cadastro)

- Criação de contadores progressivos

- Criação de contadores regressivos

- Listagem e acompanhamento de múltiplos contadores

- Edição e exclusão de contadores

- Página de Perfil

- Interface focada na experiência do usuário mobile

## Visão geral do projeto

O projeto está dividido em duas partes principais dentro da pasta `src/`:
- **`src/day-counter`**: Aplicativo mobile desenvolvido em React Native utilizando o Expo.
- **`src/api`**: Servidor Backend desenvolvido em Node.js com TypeScript, Express, Prisma e banco de dados SQLite.

## Tecnologias utilizadas:

- **Frontend:** React Native, JavaScript, Expo
- **Backend:** Node.js, TypeScript, Express, Prisma, SQLite
- **Autenticação e segurança**: JWT, Argon2
- **Validação de dados**: Zod

## Segurança e validação no Backend
Para garantir a proteção dos dados e a integridade do sistema, no backend foi implementado as seguintes práticas:

**Autenticação e Autorização (JWT):** Utiliza middlewares para validar a identidade do usuário e garantir que ele tenha as permissões corretas para acessar rotas e modificar recursos.

**Hash de senhas (Argon2):** Protege as credenciais dos usuários aplicando um hash seguro e moderno antes do armazenamento no banco de dados, evitando salvar senhas em texto puro.

**Validação de dados (Zod):** Assegura que todos os dados recebidos pela API sigam estritamente os formatos e regras de negócio esperados, prevenindo erros de execução e injeções maliciosas.

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- Expo Go (no celular) ou um emulador (como o Android Studio).

---

## Instalação e execução

### 1. Clonando o repositório

```bash
git clone https://github.com/regimarnegreiros/day-counter.git
cd day-counter
```

### 2. Configurando e rodando o Backend (`src/api`)

O backend é a API que fornece os dados para o aplicativo.

1. Acesse a pasta da API:
```bash
cd src/api
```

2. Instale as dependências:
```bash
npm install
```

3. Configuração de Variáveis de Ambiente:
Crie um arquivo `.env` na pasta `src/api` baseado no arquivo `.env.example`.
```bash
cp .env.example .env
```
Abra o arquivo `.env` recém-criado e defina os valores das chaves de segurança. Exemplo:
- `JWT_EXPIRE_PERIOD='24h'` (Tempo de validade do Access Token)
- `JWT_REFRESH_SECRET='30'` (Quantidade de dias recomendada para rotação da chave secreta)

4. Banco de Dados:
Gere os artefatos do Prisma e execute as migrações para configurar o banco de dados SQLite:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Inicie a API:
```bash
npm run api
```

### 3. Configurando e rodando o Frontend (`src/day-counter`)

Com a API rodando, abra uma **nova aba no terminal** e configure o aplicativo.

1. A partir da raiz do projeto, acesse a pasta do frontend:
```bash
cd src/day-counter
```

2. Instale as dependências:
```bash
npm install
```

3. Configuração de Variáveis de Ambiente:
Crie um arquivo `.env` na pasta `src/day-counter` baseado no arquivo `.env.example`.
```bash
cp .env.example .env
```
Abra o `.env` e configure a variável `EXPO_PUBLIC_API_URL` apontando para a sua API local (conforme onde o app será testado):
- **Emulador Android (Padrão):** `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000`
- **Dispositivo Físico (via Wi-Fi):** `EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000`
- **iOS Simulator ou Web:** `EXPO_PUBLIC_API_URL=http://localhost:3000`

4. Inicie o servidor do Expo:
Para abrir o aplicativo e testá-lo usando o aplicativo **Expo Go** no seu celular físico (ou emuladores), execute:
```bash
npx expo start
```
Após rodar o comando, será gerado um QR Code no terminal. Você pode:
- Escanear o QR Code com o aplicativo **Expo Go** no seu celular.
- Pressionar **`a`** no terminal para abrir em um emulador Android.
- Pressionar **`i`** no terminal para abrir no simulador do iOS.

---

## Colaboradores 
O projeto conta com os seguintes colaboradores:

- Carlos Eduardo Roseno Paiva (https://github.com/carlosrosen)
- Dannyel Fontenele Ribeiro (https://github.com/DanFonR)
- Davi Roberto (https://github.com/Davi-Robert)
- Nálbert Barbosa Nascimento Bernardo (https://github.com/NateInterloper)
- Regimar de Deus Negreiros (https://github.com/regimarnegreiros)
