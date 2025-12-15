import { useState } from 'react';
import { usePessoas } from '../hooks/usePessoas';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Table, TableRow, TableCell } from '../components/Table';
import { Loading } from '../components/Loading';
import { Trash2, Plus } from 'lucide-react';
import { PessoaCreateDto } from '../types';
import { isNotEmpty, isValidAge } from '../utils/validators';

export function Pessoas() {
  const { pessoas, loading, createPessoa, deletePessoa } = usePessoas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PessoaCreateDto>({
    nome: '',
    idade: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PessoaCreateDto, string>>>({});

  const handleOpenModal = () => {
    setFormData({ nome: '', idade: 0 });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ nome: '', idade: 0 });
    setErrors({});
  };

  const handleOpenDeleteModal = (id: string) => {
    setSelectedPessoa(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPessoa(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PessoaCreateDto, string>> = {};

    if (!isNotEmpty(formData.nome)) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!isValidAge(formData.idade)) {
      newErrors.idade = 'Idade deve ser um número inteiro positivo';
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
      await createPessoa(formData);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPessoa) return;

    try {
      await deletePessoa(selectedPessoa);
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Pessoas</h1>
        <Button onClick={handleOpenModal}>
          <Plus size={20} />
          Nova Pessoa
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {pessoas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhuma pessoa cadastrada. Clique em "Nova Pessoa" para começar.
          </div>
        ) : (
          <Table headers={['Nome', 'Idade', 'Ações']}>
            {pessoas.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>{pessoa.nome}</TableCell>
                <TableCell>{pessoa.idade} anos</TableCell>
                <TableCell>
                  <Button
                    variant="danger"
                    onClick={() => handleOpenDeleteModal(pessoa.id)}
                  >
                    <Trash2 size={16} />
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Pessoa"
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
            label="Nome"
            value={formData.nome}
            onChange={(e) =>
              setFormData({ ...formData, nome: e.target.value })
            }
            error={errors.nome}
            required
          />
          <Input
            label="Idade"
            type="number"
            min="1"
            value={formData.idade || ''}
            onChange={(e) =>
              setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })
            }
            error={errors.idade}
            required
          />
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar esta pessoa? Todas as transações associadas também serão deletadas. Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
}

