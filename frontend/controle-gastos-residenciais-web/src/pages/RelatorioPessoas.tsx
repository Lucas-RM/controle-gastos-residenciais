import { useEffect, useState } from 'react';
import { useRelatorios } from '../hooks/useRelatorios';
import { Table, TableRow, TableCell } from '../components/Table';
import { Loading } from '../components/Loading';
import { TotaisPorPessoaResponse } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

export function RelatorioPessoas() {
  const { getTotaisPorPessoa, loading } = useRelatorios();
  const [data, setData] = useState<TotaisPorPessoaResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await getTotaisPorPessoa();
      if (result) {
        setData(result);
      }
    };
    loadData();
  }, [getTotaisPorPessoa]);

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
        Relatório - Totais por Pessoa
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <Table
          headers={['Pessoa', 'Total Receitas', 'Total Despesas', 'Saldo']}
        >
          {data.pessoas.map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell className="font-medium">{pessoa.nome}</TableCell>
              <TableCell className="text-green-600">
                {formatCurrency(pessoa.totalReceitas)}
              </TableCell>
              <TableCell className="text-red-600">
                {formatCurrency(pessoa.totalDespesas)}
              </TableCell>
              <TableCell
                className={`font-semibold ${
                  pessoa.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(pessoa.saldo)}
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

