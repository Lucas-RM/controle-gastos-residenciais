// Enums
export enum Finalidade {
  Despesa = 1,
  Receita = 2,
  Ambas = 3,
}

export enum TipoTransacao {
  Despesa = 1,
  Receita = 2,
}

// Interfaces de Domínio
export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
}

export interface PessoaCreateDto {
  nome: string;
  idade: number;
}

export interface Categoria {
  id: string;
  descricao: string;
  finalidade: Finalidade;
}

export interface CategoriaCreateDto {
  descricao: string;
  finalidade: Finalidade;
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  pessoaId: string;
  categoriaDescricao?: string;
  pessoaNome?: string;
}

export interface TransacaoCreateDto {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoriaId: string;
  pessoaId: string;
}

// Interfaces de Relatórios
export interface TotaisPorPessoaItem {
  id: string;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorPessoaResponse {
  pessoas: TotaisPorPessoaItem[];
  totalReceitas: number;
  totalDespesas: number;
  saldoLiquido: number;
}

export interface TotaisPorCategoriaItem {
  id: string;
  descricao: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotaisPorCategoriaResponse {
  categorias: TotaisPorCategoriaItem[];
  totalReceitas: number;
  totalDespesas: number;
  saldoLiquido: number;
}

