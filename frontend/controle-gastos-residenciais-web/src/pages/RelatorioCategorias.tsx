import { useEffect, useState } from 'react';
import { useRelatorios } from '../hooks/useRelatorios';
import { Table, TableRow, TableCell } from '../components/Table';
import { Loading } from '../components/Loading';
import { TotaisPorCategoriaResponse } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

export function RelatorioCategorias() {
  const { getTotaisPorCategoria, loading } = useRelatorios();
  const [data, setData] = useState<TotaisPorCategoriaResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await getTotaisPorCategoria();
      if (result) {
        setData(result);
      }
    };
    loadData();
  }, [getTotaisPorCategoria]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">
        Erro ao carregar relatório.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Relatório - Totais por Categoria
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <Table
          headers={[
            'Categoria',
            'Total Receitas',
            'Total Despesas',
            'Saldo',
          ]}
        >
          {data.categorias.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell className="font-medium">
                {categoria.descricao}
              </TableCell>
              <TableCell className="text-green-600">
                {formatCurrency(categoria.totalReceitas)}
              </TableCell>
              <TableCell className="text-red-600">
                {formatCurrency(categoria.totalDespesas)}
              </TableCell>
              <TableCell
                className={`font-semibold ${
                  categoria.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(categoria.saldo)}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Totais Gerais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Receitas</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatCurrency(data.totalReceitas)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Despesas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {formatCurrency(data.totalDespesas)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Saldo Líquido</p>
            <p
              className={`text-2xl font-bold mt-1 ${
                data.saldoLiquido >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(data.saldoLiquido)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

