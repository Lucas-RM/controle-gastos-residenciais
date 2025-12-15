import { useState, useEffect } from 'react';
import { useTransacoes } from '../hooks/useTransacoes';
import { usePessoas } from '../hooks/usePessoas';
import { useCategorias } from '../hooks/useCategorias';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import { Table, TableRow, TableCell } from '../components/Table';
import { Loading } from '../components/Loading';
import { Plus } from 'lucide-react';
import { TransacaoCreateDto, TipoTransacao, Finalidade } from '../types';
import { isNotEmpty, isPositive, isCategoriaCompatible, isMinor } from '../utils/validators';
import { formatCurrency } from '../utils/formatCurrency';

const tipoOptions = [
  { value: TipoTransacao.Despesa.toString(), label: 'Despesa' },
  { value: TipoTransacao.Receita.toString(), label: 'Receita' },
];

export function Transacoes() {
  const { transacoes, loading: transacoesLoading, createTransacao } = useTransacoes();
  const { pessoas, loading: pessoasLoading } = usePessoas();
  const { categorias, loading: categoriasLoading } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TransacaoCreateDto>({
    descricao: '',
    valor: 0,
    tipo: TipoTransacao.Despesa,
    categoriaId: '',
    pessoaId: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TransacaoCreateDto | 'general', string>>>({});
  const [categoriasFiltradas, setCategoriasFiltradas] = useState(categorias);

  const loading = transacoesLoading || pessoasLoading || categoriasLoading;

  useEffect(() => {
    if (formData.tipo) {
      const finalidade =
        formData.tipo === TipoTransacao.Despesa
          ? Finalidade.Despesa
          : Finalidade.Receita;
      const filtradas = categorias.filter(
        (c) =>
          c.finalidade === finalidade || c.finalidade === Finalidade.Ambas
      );
      setCategoriasFiltradas(filtradas);

      // Reset categoria se não for compatível
      if (formData.categoriaId) {
        const categoriaSelecionada = categorias.find(
          (c) => c.id === formData.categoriaId
        );
        if (
          categoriaSelecionada &&
          !isCategoriaCompatible(categoriaSelecionada.finalidade, formData.tipo)
        ) {
          setFormData({ ...formData, categoriaId: '' });
        }
      }
    }
  }, [formData.tipo, categorias]);

  const handleOpenModal = () => {
    setFormData({
      descricao: '',
      valor: 0,
      tipo: TipoTransacao.Despesa,
      categoriaId: '',
      pessoaId: '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      descricao: '',
      valor: 0,
      tipo: TipoTransacao.Despesa,
      categoriaId: '',
      pessoaId: '',
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TransacaoCreateDto | 'general', string>> = {};

    if (!isNotEmpty(formData.descricao)) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!isPositive(formData.valor)) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Tipo deve ser "Despesa" ou "Receita"';
    }

    if (!formData.pessoaId) {
      newErrors.pessoaId = 'Pessoa é obrigatória';
    }

    if (!formData.categoriaId) {
      newErrors.categoriaId = 'Categoria é obrigatória';
    }

    // Validar compatibilidade categoria-tipo
    if (formData.categoriaId && formData.tipo) {
      const categoria = categorias.find((c) => c.id === formData.categoriaId);
      if (categoria && !isCategoriaCompatible(categoria.finalidade, formData.tipo)) {
        newErrors.categoriaId = 'Categoria não é compatível com o tipo selecionado';
      }
    }

    // Validar idade para receitas
    if (formData.pessoaId && formData.tipo === TipoTransacao.Receita) {
      const pessoa = pessoas.find((p) => p.id === formData.pessoaId);
      if (pessoa && isMinor(pessoa.idade)) {
        newErrors.general = 'Pessoas menores de 18 anos não podem ter receitas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createTransacao(formData);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
        <Button onClick={handleOpenModal}>
          <Plus size={20} />
          Nova Transação
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {transacoes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhuma transação cadastrada. Clique em "Nova Transação" para começar.
          </div>
        ) : (
          <Table
            headers={[
              'Descrição',
              'Valor',
              'Tipo',
              'Pessoa',
              'Categoria',
            ]}
          >
            {transacoes.map((transacao) => (
              <TableRow key={transacao.id}>
                <TableCell>{transacao.descricao}</TableCell>
                <TableCell
                  className={
                    transacao.tipo === TipoTransacao.Despesa
                      ? 'text-red-600 font-semibold'
                      : 'text-green-600 font-semibold'
                  }
                >
                  {transacao.tipo === TipoTransacao.Despesa ? '-' : '+'}
                  {formatCurrency(transacao.valor)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transacao.tipo === TipoTransacao.Despesa
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {transacao.tipo === TipoTransacao.Despesa
                      ? 'Despesa'
                      : 'Receita'}
                  </span>
                </TableCell>
                <TableCell>{transacao.pessoaNome}</TableCell>
                <TableCell>{transacao.categoriaDescricao}</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Transação"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} isLoading={isSubmitting}>
              Salvar
            </Button>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}
          <Input
            label="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
            error={errors.descricao}
            required
          />
          <Input
            label="Valor"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.valor || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                valor: parseFloat(e.target.value) || 0,
              })
            }
            error={errors.valor}
            required
          />
          <Select
            label="Tipo"
            value={formData.tipo.toString()}
            onChange={(e) =>
              setFormData({
                ...formData,
                tipo: parseInt(e.target.value) as TipoTransacao,
                categoriaId: '', // Reset categoria ao mudar tipo
              })
            }
            error={errors.tipo}
            options={tipoOptions}
            required
          />
          <Select
            label="Pessoa"
            value={formData.pessoaId}
            onChange={(e) =>
              setFormData({ ...formData, pessoaId: e.target.value })
            }
            options={pessoas.map((p) => ({
              value: p.id,
              label: `${p.nome} (${p.idade} anos)`,
            }))}
            error={errors.pessoaId}
            required
          />
          <Select
            label="Categoria"
            value={formData.categoriaId}
            onChange={(e) =>
              setFormData({ ...formData, categoriaId: e.target.value })
            }
            options={categoriasFiltradas.map((c) => ({
              value: c.id,
              label: c.descricao,
            }))}
            error={errors.categoriaId}
            required
          />
        </form>
      </Modal>
    </div>
  );
}

