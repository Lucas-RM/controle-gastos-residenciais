using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosResidenciais.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoasController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    /// <summary>
    /// Criar uma nova pessoa
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(PessoaDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PessoaDto>> Criar([FromBody] CriarPessoaDto dto)
    {
        var pessoa = await _pessoaService.CriarAsync(dto);
        return CreatedAtAction(nameof(ObterPorId), new { id = pessoa.Id }, pessoa);
    }

    /// <summary>
    /// Listar todas as pessoas
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PessoaDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<PessoaDto>>> ObterTodas()
    {
        var pessoas = await _pessoaService.ObterTodasAsync();
        return Ok(pessoas);
    }

    /// <summary>
    /// Obter pessoa por ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PessoaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PessoaDto>> ObterPorId(Guid id)
    {
        var pessoa = await _pessoaService.ObterPorIdAsync(id);
        if (pessoa == null)
            return NotFound();

        return Ok(pessoa);
    }

    /// <summary>
    /// Deletar uma pessoa e suas transações
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Deletar(Guid id)
    {
        try
        {
            await _pessoaService.DeletarAsync(id);
            return NoContent();
        }
        catch (Application.Exceptions.EntidadeNaoEncontradaException)
        {
            return NotFound();
        }
    }
}

