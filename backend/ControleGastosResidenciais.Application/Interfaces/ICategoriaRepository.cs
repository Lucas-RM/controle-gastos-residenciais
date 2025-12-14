using ControleGastosResidenciais.Domain.Entities;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface ICategoriaRepository
{
    Task<Categoria?> ObterPorIdAsync(Guid id);
    Task<IEnumerable<Categoria>> ObterTodasAsync();
    Task<Categoria> CriarAsync(Categoria categoria);
}

