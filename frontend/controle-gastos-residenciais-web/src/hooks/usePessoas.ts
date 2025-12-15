import { useState, useEffect } from 'react';
import { pessoaService } from '../services/pessoaService';
import { Pessoa, PessoaCreateDto } from '../types';
import toast from 'react-hot-toast';

export function usePessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPessoas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pessoaService.getAll();
      setPessoas(data);
    } catch (err) {
      setError('Erro ao carregar pessoas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPessoa = async (data: PessoaCreateDto) => {
    try {
      const newPessoa = await pessoaService.create(data);
      setPessoas((prev) => [...prev, newPessoa]);
      toast.success('Pessoa criada com sucesso!');
      return newPessoa;
    } catch (err) {
      throw err;
    }
  };

  const deletePessoa = async (id: string) => {
    try {
      await pessoaService.delete(id);
      setPessoas((prev) => prev.filter((p) => p.id !== id));
      toast.success('Pessoa deletada com sucesso!');
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  return {
    pessoas,
    loading,
    error,
    createPessoa,
    deletePessoa,
    refetch: fetchPessoas,
  };
}

