import { useState, useEffect } from 'react';
import { transacaoService } from '../services/transacaoService';
import { Transacao, TransacaoCreateDto } from '../types';
import toast from 'react-hot-toast';

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transacaoService.getAll();
      setTransacoes(data);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTransacao = async (data: TransacaoCreateDto) => {
    try {
      const newTransacao = await transacaoService.create(data);
      setTransacoes((prev) => [...prev, newTransacao]);
      toast.success('Transação criada com sucesso!');
      return newTransacao;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTransacoes();
  }, []);

  return {
    transacoes,
    loading,
    error,
    createTransacao,
    refetch: fetchTransacoes,
  };
}

