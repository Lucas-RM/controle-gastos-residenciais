import { useState } from 'react';
import { useCategorias } from '../hooks/useCategorias';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import { Table, TableRow, TableCell } from '../components/Table';
import { Loading } from '../components/Loading';
import { Plus } from 'lucide-react';
import { CategoriaCreateDto, Finalidade } from '../types';
import { isNotEmpty } from '../utils/validators';

const finalidadeOptions = [
  { value: Finalidade.Despesa.toString(), label: 'Despesa' },
  { value: Finalidade.Receita.toString(), label: 'Receita' },
  { value: Finalidade.Ambas.toString(), label: 'Ambas' },
];

const getFinalidadeLabel = (finalidade: Finalidade): string => {
  switch (finalidade) {
    case Finalidade.Despesa:
      return 'Despesa';
    case Finalidade.Receita:
      return 'Receita';
    case Finalidade.Ambas:
      return 'Ambas';
    default:
      return '';
  }
};

const getFinalidadeBadgeClass = (finalidade: Finalidade): string => {
  switch (finalidade) {
    case Finalidade.Despesa:
      return 'bg-red-100 text-red-800';
    case Finalidade.Receita:
      return 'bg-green-100 text-green-800';
    case Finalidade.Ambas:
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function Categorias() {
  const { categorias, loading, createCategoria } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CategoriaCreateDto>({
    descricao: '',
    finalidade: Finalidade.Despesa,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CategoriaCreateDto, string>>>({});

  const handleOpenModal = () => {
    setFormData({ descricao: '', finalidade: Finalidade.Despesa });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ descricao: '', finalidade: Finalidade.Despesa });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CategoriaCreateDto, string>> = {};

    if (!isNotEmpty(formData.descricao)) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.finalidade) {
      newErrors.finalidade = 'Finalidade é obrigatória';
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
      await createCategoria(formData);
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
        <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
        <Button onClick={handleOpenModal}>
          <Plus size={20} />
          Nova Categoria
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {categorias.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhuma categoria cadastrada. Clique em "Nova Categoria" para começar.
          </div>
        ) : (
          <Table headers={['Descrição', 'Finalidade']}>
            {categorias.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell>{categoria.descricao}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getFinalidadeBadgeClass(
                      categoria.finalidade
                    )}`}
                  >
                    {getFinalidadeLabel(categoria.finalidade)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Categoria"
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
          <Input
            label="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
            error={errors.descricao}
            required
          />
          <Select
            label="Finalidade"
            value={formData.finalidade.toString()}
            onChange={(e) =>
              setFormData({
                ...formData,
                finalidade: parseInt(e.target.value) as Finalidade,
              })
            }
            options={finalidadeOptions}
            error={errors.finalidade}
            required
          />
        </form>
      </Modal>
    </div>
  );
}

