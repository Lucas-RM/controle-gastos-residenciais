using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Exceptions;
using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;

namespace ControleGastosResidenciais.Application.Services;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _pessoaRepository;

    public PessoaService(IPessoaRepository pessoaRepository)
    {
        _pessoaRepository = pessoaRepository;
    }

    public async Task<PessoaDto> CriarAsync(CriarPessoaDto dto)
    {
        var pessoa = new Pessoa
        {
            Id = Guid.NewGuid(),
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        var pessoaCriada = await _pessoaRepository.CriarAsync(pessoa);

        return new PessoaDto
        {
            Id = pessoaCriada.Id,
            Nome = pessoaCriada.Nome,
            Idade = pessoaCriada.Idade
        };
    }

    public async Task<IEnumerable<PessoaDto>> ObterTodasAsync()
    {
        var pessoas = await _pessoaRepository.ObterTodasAsync();

        return pessoas.Select(p => new PessoaDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade
        });
    }

    public async Task<PessoaDto?> ObterPorIdAsync(Guid id)
    {
        var pessoa = await _pessoaRepository.ObterPorIdAsync(id);

        if (pessoa == null)
            return null;

        return new PessoaDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }

    public async Task DeletarAsync(Guid id)
    {
        var pessoa = await _pessoaRepository.ObterPorIdAsync(id);

        if (pessoa == null)
            throw new EntidadeNaoEncontradaException($"Pessoa com Id {id} não encontrada.");

        await _pessoaRepository.DeletarAsync(pessoa);
    }
}

