import apiClient from './api';
import { Transacao, TransacaoCreateDto } from '../types';

/**
 * Serviço para gerenciamento de Transações
 */
export const transacaoService = {
  /**
   * Lista todas as transações
   */
  async getAll(): Promise<Transacao[]> {
    const response = await apiClient.get<Transacao[]>('/api/Transacoes');
    return response.data;
  },

  /**
   * Cria uma nova transação
   */
  async create(data: TransacaoCreateDto): Promise<Transacao> {
    const response = await apiClient.post<Transacao>('/api/Transacoes', data);
    return response.data;
  },
};

