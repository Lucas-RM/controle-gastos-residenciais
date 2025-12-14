using ControleGastosResidenciais.Domain.Entities;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface ITransacaoRepository
{
    Task<Transacao?> ObterPorIdAsync(Guid id);
    Task<IEnumerable<Transacao>> ObterTodasAsync();
    Task<Transacao> CriarAsync(Transacao transacao);
    Task<IEnumerable<Transacao>> ObterPorPessoaIdAsync(Guid pessoaId);
    Task<IEnumerable<Transacao>> ObterTodasComRelacionamentosAsync();
}

