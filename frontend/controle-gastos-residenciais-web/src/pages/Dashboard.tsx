import { useEffect, useState } from 'react';
import { useRelatorios } from '../hooks/useRelatorios';
import { useTransacoes } from '../hooks/useTransacoes';
import { Loading } from '../components/Loading';
import { formatCurrency } from '../utils/formatCurrency';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function Dashboard() {
  const { getTotaisPorPessoa, loading } = useRelatorios();
  const { transacoes } = useTransacoes();
  const [totais, setTotais] = useState<{
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await getTotaisPorPessoa();
      if (data) {
        setTotais({
          totalReceitas: data.totalReceitas,
          totalDespesas: data.totalDespesas,
          saldoLiquido: data.saldoLiquido,
        });
      }
    };
    loadData();
  }, [getTotaisPorPessoa]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Receitas</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {totais ? formatCurrency(totais.totalReceitas) : formatCurrency(0)}
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Despesas</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {totais ? formatCurrency(totais.totalDespesas) : formatCurrency(0)}
              </p>
            </div>
            <TrendingDown className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo Líquido</p>
              <p
                className={`text-2xl font-bold mt-2 ${
                  totais && totais.saldoLiquido >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {totais ? formatCurrency(totais.saldoLiquido) : formatCurrency(0)}
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-primary-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Últimas Transações
          </h2>
        </div>
        <div className="p-6">
          {transacoes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma transação cadastrada ainda.
            </p>
          ) : (
            <div className="space-y-4">
              {transacoes.slice(0, 5).map((transacao) => (
                <div
                  key={transacao.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transacao.descricao}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transacao.pessoaNome} • {transacao.categoriaDescricao}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${
                      transacao.tipo === 1 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {transacao.tipo === 1 ? '-' : '+'}
                    {formatCurrency(transacao.valor)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

