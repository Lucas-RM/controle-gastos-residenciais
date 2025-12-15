import apiClient from './api';
import {
  TotaisPorPessoaResponse,
  TotaisPorCategoriaResponse,
} from '../types';

/**
 * Serviço para relatórios
 */
export const relatorioService = {
  /**
   * Obtém totais agrupados por pessoa
   */
  async getTotaisPorPessoa(): Promise<TotaisPorPessoaResponse> {
    const response = await apiClient.get<TotaisPorPessoaResponse>(
      '/api/Relatorios/totais-por-pessoa'
    );
    return response.data;
  },

  /**
   * Obtém totais agrupados por categoria
   */
  async getTotaisPorCategoria(): Promise<TotaisPorCategoriaResponse> {
    const response = await apiClient.get<TotaisPorCategoriaResponse>(
      '/api/Relatorios/totais-por-categoria'
    );
    return response.data;
  },
};

