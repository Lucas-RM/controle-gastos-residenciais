# Sistema de Controle de Gastos Residenciais

Sistema para gerenciamento de gastos e receitas residenciais com controle por pessoa e categoria, desenvolvido em .NET 7.0 seguindo os princípios de Clean Architecture e SOLID.

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

- **.NET 7.0**
- **Entity Framework Core 7.0**
- **SQL Server**
- **FluentValidation**
- **Swagger/OpenAPI**

## 📁 Estrutura do Projeto

O projeto segue a arquitetura Clean Architecture com as seguintes camadas:

```
backend/
├── ControleGastosResidenciais.Api/          # Camada de Apresentação (Controllers/API)
├── ControleGastosResidenciais.Application/  # Camada de Aplicação (Use Cases/Services)
├── ControleGastosResidenciais.Domain/       # Camada de Domínio (Entities/Business Rules)
└── ControleGastosResidenciais.Infrastructure/ # Camada de Infraestrutura (Data Access)
```

### Responsabilidades das Camadas

- **Api**: Recebe requisições HTTP, valida entrada de dados e retorna respostas formatadas
- **Application**: Implementa casos de uso, orquestra lógica de negócio e coordena operações entre camadas
- **Domain**: Define entidades do domínio, implementa regras de negócio e mantém independência de frameworks
- **Infrastructure**: Implementa persistência de dados, configura Entity Framework e gerencia contexto do banco

## 📦 Pré-requisitos

- [.NET 7.0 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [Visual Studio Code](https://code.visualstudio.com/) (opcional)

## ⚙️ Configuração

### 1. Clone o repositório (se aplicável)

```bash
git clone https://github.com/Lucas-RM/controle-gastos-residenciais.git
cd controle-gastos-residenciais/backend
```

### 2. Configure a String de Conexão

Edite o arquivo `ControleGastosResidenciais.Api/appsettings.json` e ajuste a connection string conforme seu ambiente:

```json
{
  "ConnectionStrings": {
    "SqlServer": "Server=localhost\\SQLEXPRESS;Database=ControleGastosResidenciais;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

### 3. Restaure as dependências

```bash
dotnet restore
```

### 4. Aplique as Migrations

As migrations são aplicadas automaticamente quando a aplicação é executada em modo de desenvolvimento. Se preferir aplicar manualmente:

```bash
cd ControleGastosResidenciais.Api
dotnet ef database update --project ../ControleGastosResidenciais.Infrastructure
```

## 🚀 Executando o Projeto

### Via Visual Studio

1. Abra o arquivo `ControleGastosResidenciais.sln`
2. Defina `ControleGastosResidenciais.Api` como projeto de inicialização
3. Pressione `F5` ou clique em "Executar"

### Via Terminal

```bash
cd ControleGastosResidenciais.Api
dotnet run
```

A API estará disponível em:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`

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

### Erro de conexão com o banco de dados

Verifique se:
- O SQL Server está em execução
- A connection string está correta no `appsettings.json`
- Você tem permissões para criar bancos de dados

### Erro ao aplicar migrations

Execute manualmente:
```bash
cd ControleGastosResidenciais.Api
dotnet ef database update --project ../ControleGastosResidenciais.Infrastructure
```

### Porta já em uso

Altere a porta no arquivo `Properties/launchSettings.json` ou encerre o processo que está usando a porta.

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

