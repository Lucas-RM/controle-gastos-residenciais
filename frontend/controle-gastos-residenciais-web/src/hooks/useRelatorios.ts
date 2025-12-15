import { useState, useCallback } from 'react';
import { relatorioService } from '../services/relatorioService';
import {
  TotaisPorPessoaResponse,
  TotaisPorCategoriaResponse,
} from '../types';

export function useRelatorios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTotaisPorPessoa = useCallback(async (): Promise<TotaisPorPessoaResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await relatorioService.getTotaisPorPessoa();
      return data;
    } catch (err) {
      setError('Erro ao carregar relatório por pessoa');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotaisPorCategoria = useCallback(async (): Promise<TotaisPorCategoriaResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await relatorioService.getTotaisPorCategoria();
      return data;
    } catch (err) {
      setError('Erro ao carregar relatório por categoria');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getTotaisPorPessoa,
    getTotaisPorCategoria,
  };
}

