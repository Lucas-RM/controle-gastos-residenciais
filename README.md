# Sistema de Controle de Gastos Residenciais

Sistema completo para gerenciamento de gastos e receitas residenciais com controle por pessoa e categoria. O projeto é composto por uma API backend desenvolvida em .NET 7.0 seguindo os princípios de Clean Architecture e SOLID, e uma interface web frontend desenvolvida em React 18 com TypeScript e Tailwind CSS.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Solução de problemas](#-solução-de-problemas)
- [Arquivos do Postman](#arquivos-do-postman)

## 🛠 Tecnologias

### Backend
- **.NET 7.0**
- **Entity Framework Core 7.0**
- **SQL Server**
- **FluentValidation**
- **Swagger/OpenAPI**

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS 3**
- **React Router DOM**
- **Axios**
- **Lucide Icons**
- **React Hot Toast**

## 📁 Estrutura do Projeto

O projeto é dividido em duas partes principais: backend e frontend, ambos seguindo princípios de Clean Architecture.

### Backend

```
backend/
├── ControleGastosResidenciais.Api/          # Camada de Apresentação (Controllers/API)
├── ControleGastosResidenciais.Application/  # Camada de Aplicação (Use Cases/Services)
├── ControleGastosResidenciais.Domain/       # Camada de Domínio (Entities/Business Rules)
└── ControleGastosResidenciais.Infrastructure/ # Camada de Infraestrutura (Data Access)
```

**Responsabilidades das Camadas (Backend):**

- **Api**: Recebe requisições HTTP, valida entrada de dados e retorna respostas formatadas
- **Application**: Implementa casos de uso, orquestra lógica de negócio e coordena operações entre camadas
- **Domain**: Define entidades do domínio, implementa regras de negócio e mantém independência de frameworks
- **Infrastructure**: Implementa persistência de dados, configura Entity Framework e gerencia contexto do banco

### Frontend

```
frontend/controle-gastos-residenciais-web/
├── src/
│   ├── components/      # Componentes React reutilizáveis (Presentation Layer)
│   ├── pages/          # Páginas/telas da aplicação (Presentation Layer)
│   ├── routes/         # Configuração de rotas
│   ├── services/       # Serviços de comunicação com API (Infrastructure Layer)
│   ├── hooks/          # Hooks customizados React (Application Layer)
│   ├── types/          # Definições de tipos TypeScript (Domain Layer)
│   ├── utils/          # Funções utilitárias puras (Domain Layer)
│   └── styles/         # Estilos globais
├── public/             # Arquivos públicos estáticos
└── index.html          # HTML principal
```

**Responsabilidades das Camadas (Frontend):**

- **Presentation (components/pages)**: Componentes visuais puros, layouts e estruturas de página
- **Application (hooks)**: Orquestração de lógica de negócio, gerenciamento de estado, integração entre UI e serviços
- **Domain (types/utils)**: Interfaces TypeScript, modelos de dados, validações, funções puras
- **Infrastructure (services)**: Chamadas HTTP, configuração de interceptors, tratamento de erros

## 📦 Pré-requisitos

### Backend
- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [Visual Studio Code](https://code.visualstudio.com/) (opcional)

### Frontend
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Configuração

### 1. Clone o repositório (se aplicável)

```bash
git clone https://github.com/Lucas-RM/controle-gastos-residenciais.git
cd controle-gastos-residenciais
```

### 2. Configuração do Backend

#### 2.1. Configure a String de Conexão

Edite o arquivo `backend/ControleGastosResidenciais.Api/appsettings.json` e ajuste a connection string conforme seu ambiente:

```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost\\SQLEXPRESS;Database=ControleGastosResidenciais;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

#### 2.2. Restaure as dependências

```bash
cd backend
dotnet restore
```

#### 2.3. Aplique as Migrations

As migrations são aplicadas automaticamente quando a aplicação é executada em modo de desenvolvimento. Se preferir aplicar manualmente:

```bash
cd ControleGastosResidenciais.Api
dotnet ef database update --project ../ControleGastosResidenciais.Infrastructure
```

### 3. Configuração do Frontend

#### 3.1. Instale as dependências

```bash
cd frontend/controle-gastos-residenciais-web
npm install
```

#### 3.2. Configure a URL da API (Opcional)

Por padrão, o frontend está configurado para usar `http://localhost:5021` como URL da API. Se necessário, você pode criar um arquivo `.env` na raiz do projeto frontend:

```env
VITE_API_URL=http://localhost:5021
```

## 🚀 Executando o Projeto

### Backend

#### Via Visual Studio

1. Abra o arquivo `backend/ControleGastosResidenciais.sln`
2. Defina `ControleGastosResidenciais.Api` como projeto de inicialização
3. Pressione `F5` ou clique em "Executar"

#### Via Terminal

```bash
cd backend/ControleGastosResidenciais.Api
dotnet run
```

A API estará disponível em:
- **HTTP**: `http://localhost:5021`
- **HTTPS**: `https://localhost:7199`

### Frontend

#### Via Terminal

```bash
cd frontend/controle-gastos-residenciais-web
npm run dev
```

A aplicação frontend estará disponível em:
- **URL**: `http://localhost:3000`

> **Nota**: Certifique-se de que o backend está em execução antes de iniciar o frontend, pois a aplicação web precisa se comunicar com a API.

## 📚 Endpoints da API

### Pessoas

#### POST `/api/pessoas`
Cria uma nova pessoa.

**Request Body:**
```json
{
  "nome": "João Silva",
  "idade": 25
}
```

**Response:** `201 Created`
```json
{
  "id": "guid",
  "nome": "João Silva",
  "idade": 25
}
```

#### GET `/api/pessoas`
Lista todas as pessoas.

**Response:** `200 OK`
```json
[
  {
    "id": "guid",
    "nome": "João Silva",
    "idade": 25
  }
]
```

#### GET `/api/pessoas/{id}`
Obtém uma pessoa por ID.

**Response:** `200 OK` ou `404 Not Found`

#### DELETE `/api/pessoas/{id}`
Deleta uma pessoa e suas transações (cascade delete).

**Response:** `204 No Content` ou `404 Not Found`

### Categorias

#### POST `/api/categorias`
Cria uma nova categoria.

**Request Body:**
```json
{
  "descricao": "Alimentação",
  "finalidade": 1
}
```

**Finalidade:**
- `1` = Despesa
- `2` = Receita
- `3` = Ambas

**Response:** `201 Created`

#### GET `/api/categorias`
Lista todas as categorias.

**Response:** `200 OK`

#### GET `/api/categorias/{id}`
Obtém uma categoria por ID.

**Response:** `200 OK` ou `404 Not Found`

### Transações

#### POST `/api/transacoes`
Cria uma nova transação.

**Request Body:**
```json
{
  "descricao": "Compra no supermercado",
  "valor": 150.50,
  "tipo": 1,
  "categoriaId": "guid",
  "pessoaId": "guid"
}
```

**Tipo:**
- `1` = Despesa
- `2` = Receita

**Validações:**
- Pessoa deve existir
- Categoria deve existir
- Categoria deve ser compatível com o tipo da transação
- Pessoas menores de idade não podem ter receitas

**Response:** `201 Created`, `400 Bad Request` ou `404 Not Found`

#### GET `/api/transacoes`
Lista todas as transações.

**Response:** `200 OK`

### Relatórios

#### GET `/api/relatorios/totais-por-pessoa`
Consulta totais por pessoa.

**Response:** `200 OK`
```json
{
  "pessoas": [
    {
      "id": "guid",
      "nome": "João Silva",
      "totalReceitas": 5000.00,
      "totalDespesas": 3000.00,
      "saldo": 2000.00
    }
  ],
  "totalReceitas": 5000.00,
  "totalDespesas": 3000.00,
  "saldoLiquido": 2000.00
}
```

#### GET `/api/relatorios/totais-por-categoria`
Consulta totais por categoria.

**Response:** `200 OK`
```json
{
  "categorias": [
    {
      "id": "guid",
      "descricao": "Alimentação",
      "totalReceitas": 0.00,
      "totalDespesas": 1500.00,
      "saldo": -1500.00
    }
  ],
  "totalReceitas": 5000.00,
  "totalDespesas": 3000.00,
  "saldoLiquido": 2000.00
}
```

## 🐛 Solução de problemas

### Backend

#### Erro de conexão com o banco de dados

Verifique se:
- O SQL Server está em execução
- A connection string está correta no `appsettings.json`
- Você tem permissões para criar bancos de dados

#### Erro ao aplicar migrations

Execute manualmente:
```bash
cd backend/ControleGastosResidenciais.Api
dotnet ef database update --project ../ControleGastosResidenciais.Infrastructure
```

#### Porta já em uso

Altere a porta no arquivo `Properties/launchSettings.json` ou encerre o processo que está usando a porta.

### Frontend

#### Erro de conexão com a API

Verifique se:
- O backend está em execução
- A URL da API está correta no arquivo `.env` ou `vite.config.ts`
- Não há problemas de CORS (o backend deve estar configurado para aceitar requisições do frontend)

#### Erro ao instalar dependências

Tente limpar o cache e reinstalar:
```bash
cd frontend/controle-gastos-residenciais-web
rm -rf node_modules package-lock.json
npm install
```

#### Porta 3000 já em uso

Altere a porta no arquivo `vite.config.ts`:
```typescript
server: {
  port: 3001, // ou outra porta disponível
}
```

## Arquivos do Postman

Os arquivos do Postman estão disponíveis em [Postman Collection](https://github.com/Lucas-RM/controle-gastos-residenciais/tree/main/Postman%20Collection).

### Conteúdo da Pasta

> A pasta "Postman Collection" contém:

- **Coleções do Postman:** Arquivos `.json` que incluem todas as requisições configuradas para os endpoints da API.

- **Documentação de Requisições:** Parâmetros, corpos de requisição e exemplos de respostas para facilitar o teste e a validação da API.

### Como Usar

1. Baixe os arquivos da pasta "Postman Collection".

2. Importe os arquivos no Postman:

    - Abra o Postman.
    - Clique em "Import" no canto superior esquerdo.
    - Selecione o arquivo `.json` baixado.

3. Utilize as requisições configuradas para testar a API com facilidade.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

