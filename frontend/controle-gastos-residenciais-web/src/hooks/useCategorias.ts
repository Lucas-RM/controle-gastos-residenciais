import { useState, useEffect } from 'react';
import { categoriaService } from '../services/categoriaService';
import { Categoria, CategoriaCreateDto, Finalidade } from '../types';
import toast from 'react-hot-toast';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createCategoria = async (data: CategoriaCreateDto) => {
    const newCategoria = await categoriaService.create(data);
    setCategorias((prev) => [...prev, newCategoria]);
    toast.success('Categoria criada com sucesso!');
    return newCategoria;
  };

  const getCategoriasByFinalidade = (finalidade: Finalidade): Categoria[] => {
    return categorias.filter(
      (c) => c.finalidade === finalidade || c.finalidade === Finalidade.Ambas
    );
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    createCategoria,
    getCategoriasByFinalidade,
    refetch: fetchCategorias,
  };
}

