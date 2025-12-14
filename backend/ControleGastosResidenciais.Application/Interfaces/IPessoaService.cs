using ControleGastosResidenciais.Application.DTOs;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface IPessoaService
{
    Task<PessoaDto> CriarAsync(CriarPessoaDto dto);
    Task<IEnumerable<PessoaDto>> ObterTodasAsync();
    Task DeletarAsync(Guid id);
    Task<PessoaDto?> ObterPorIdAsync(Guid id);
}

