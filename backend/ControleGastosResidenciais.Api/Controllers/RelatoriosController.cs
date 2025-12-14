using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatoriosController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public RelatoriosController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    /// <summary>
    /// Consultar totais por pessoa
    /// </summary>
    [HttpGet("totais-por-pessoa")]
    [ProducesResponseType(typeof(RelatorioTotaisPorPessoaDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<RelatorioTotaisPorPessoaDto>> ObterTotaisPorPessoa()
    {
        var relatorio = await _transacaoService.ObterTotaisPorPessoaAsync();
        return Ok(relatorio);
    }

    /// <summary>
    /// Consultar totais por categoria
    /// </summary>
    [HttpGet("totais-por-categoria")]
    [ProducesResponseType(typeof(RelatorioTotaisPorCategoriaDto), StatusCodes.Status200OK)]
    public async Task<ActionResult<RelatorioTotaisPorCategoriaDto>> ObterTotaisPorCategoria()
    {
        var relatorio = await _transacaoService.ObterTotaisPorCategoriaAsync();
        return Ok(relatorio);
    }
}

