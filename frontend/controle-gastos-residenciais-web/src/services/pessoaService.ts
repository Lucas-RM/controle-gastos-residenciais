import apiClient from './api';
import { Pessoa, PessoaCreateDto } from '../types';

/**
 * Serviço para gerenciamento de Pessoas
 */
export const pessoaService = {
  /**
   * Lista todas as pessoas
   */
  async getAll(): Promise<Pessoa[]> {
    const response = await apiClient.get<Pessoa[]>('/api/Pessoas');
    return response.data;
  },

  /**
   * Obtém uma pessoa por ID
   */
  async getById(id: string): Promise<Pessoa> {
    const response = await apiClient.get<Pessoa>(`/api/Pessoas/${id}`);
    return response.data;
  },

  /**
   * Cria uma nova pessoa
   */
  async create(data: PessoaCreateDto): Promise<Pessoa> {
    const response = await apiClient.post<Pessoa>('/api/Pessoas', data);
    return response.data;
  },

  /**
   * Deleta uma pessoa
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/Pessoas/${id}`);
  },
};

