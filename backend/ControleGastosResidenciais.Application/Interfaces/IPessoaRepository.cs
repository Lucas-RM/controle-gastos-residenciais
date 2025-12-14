using ControleGastosResidenciais.Domain.Entities;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface IPessoaRepository
{
    Task<Pessoa?> ObterPorIdAsync(Guid id);
    Task<IEnumerable<Pessoa>> ObterTodasAsync();
    Task<Pessoa> CriarAsync(Pessoa pessoa);
    Task DeletarAsync(Pessoa pessoa);
}

