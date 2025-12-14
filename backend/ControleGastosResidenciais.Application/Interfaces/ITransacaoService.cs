using ControleGastosResidenciais.Application.DTOs;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface ITransacaoService
{
    Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto);
    Task<IEnumerable<TransacaoDto>> ObterTodasAsync();
    Task<RelatorioTotaisPorPessoaDto> ObterTotaisPorPessoaAsync();
    Task<RelatorioTotaisPorCategoriaDto> ObterTotaisPorCategoriaAsync();
}

