import apiClient from './api';
import { Categoria, CategoriaCreateDto } from '../types';

/**
 * Serviço para gerenciamento de Categorias
 */
export const categoriaService = {
  /**
   * Lista todas as categorias
   */
  async getAll(): Promise<Categoria[]> {
    const response = await apiClient.get<Categoria[]>('/api/Categorias');
    return response.data;
  },

  /**
   * Obtém uma categoria por ID
   */
  async getById(id: string): Promise<Categoria> {
    const response = await apiClient.get<Categoria>(`/api/Categorias/${id}`);
    return response.data;
  },

  /**
   * Cria uma nova categoria
   */
  async create(data: CategoriaCreateDto): Promise<Categoria> {
    const response = await apiClient.post<Categoria>('/api/Categorias', data);
    return response.data;
  },
};

