using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacoesController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    /// <summary>
    /// Criar uma nova transação
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(TransacaoDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TransacaoDto>> Criar([FromBody] CriarTransacaoDto dto)
    {
        try
        {
            var transacao = await _transacaoService.CriarAsync(dto);
            return CreatedAtAction(nameof(ObterTodas), new { id = transacao.Id }, transacao);
        }
        catch (Application.Exceptions.EntidadeNaoEncontradaException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Application.Exceptions.RegraNegocioException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Listar todas as transações
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TransacaoDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<TransacaoDto>>> ObterTodas()
    {
        var transacoes = await _transacaoService.ObterTodasAsync();
        return Ok(transacoes);
    }
}

