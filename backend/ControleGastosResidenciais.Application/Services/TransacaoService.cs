using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Exceptions;
using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;
using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Application.Services;

public class TransacaoService : ITransacaoService
{
    private readonly ITransacaoRepository _transacaoRepository;
    private readonly IPessoaRepository _pessoaRepository;
    private readonly ICategoriaRepository _categoriaRepository;

    public TransacaoService(
        ITransacaoRepository transacaoRepository,
        IPessoaRepository pessoaRepository,
        ICategoriaRepository categoriaRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
        _categoriaRepository = categoriaRepository;
    }

    public async Task<TransacaoDto> CriarAsync(CriarTransacaoDto dto)
    {
        // Validar se pessoa existe
        var pessoa = await _pessoaRepository.ObterPorIdAsync(dto.PessoaId);
        if (pessoa == null)
            throw new EntidadeNaoEncontradaException($"Pessoa com Id {dto.PessoaId} não encontrada.");

        // Validar se categoria existe
        var categoria = await _categoriaRepository.ObterPorIdAsync(dto.CategoriaId);
        if (categoria == null)
            throw new EntidadeNaoEncontradaException($"Categoria com Id {dto.CategoriaId} não encontrada.");

        // Validar idade da pessoa para restrição de tipo
        if (pessoa.EhMenorDeIdade && dto.Tipo == TipoTransacao.Receita)
            throw new RegraNegocioException("Pessoas menores de idade não podem ter receitas.");

        // Validar compatibilidade entre tipo e categoria
        if (!categoria.PodeSerUsadaParaTipo(dto.Tipo))
            throw new RegraNegocioException(
                $"A categoria '{categoria.Descricao}' não pode ser usada para transações do tipo '{dto.Tipo}'.");

        var transacao = new Transacao
        {
            Id = Guid.NewGuid(),
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            CategoriaId = dto.CategoriaId,
            PessoaId = dto.PessoaId
        };

        var transacaoCriada = await _transacaoRepository.CriarAsync(transacao);

        return new TransacaoDto
        {
            Id = transacaoCriada.Id,
            Descricao = transacaoCriada.Descricao,
            Valor = transacaoCriada.Valor,
            Tipo = transacaoCriada.Tipo,
            CategoriaId = transacaoCriada.CategoriaId,
            PessoaId = transacaoCriada.PessoaId
        };
    }

    public async Task<IEnumerable<TransacaoDto>> ObterTodasAsync()
    {
        var transacoes = await _transacaoRepository.ObterTodasComRelacionamentosAsync();

        return transacoes.Select(t => new TransacaoDto
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            Tipo = t.Tipo,
            CategoriaId = t.CategoriaId,
            PessoaId = t.PessoaId,
            CategoriaDescricao = t.Categoria?.Descricao,
            PessoaNome = t.Pessoa?.Nome
        });
    }

    public async Task<RelatorioTotaisPorPessoaDto> ObterTotaisPorPessoaAsync()
    {
        var transacoes = await _transacaoRepository.ObterTodasComRelacionamentosAsync();
        var pessoas = await _pessoaRepository.ObterTodasAsync();

        var totaisPorPessoa = pessoas.Select(pessoa =>
        {
            var transacoesPessoa = transacoes.Where(t => t.PessoaId == pessoa.Id).ToList();
            var totalReceitas = transacoesPessoa
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);
            var totalDespesas = transacoesPessoa
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new TotalPorPessoaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        var totalReceitasGeral = transacoes
            .Where(t => t.Tipo == TipoTransacao.Receita)
            .Sum(t => t.Valor);
        var totalDespesasGeral = transacoes
            .Where(t => t.Tipo == TipoTransacao.Despesa)
            .Sum(t => t.Valor);

        return new RelatorioTotaisPorPessoaDto
        {
            Pessoas = totaisPorPessoa,
            TotalReceitas = totalReceitasGeral,
            TotalDespesas = totalDespesasGeral,
            SaldoLiquido = totalReceitasGeral - totalDespesasGeral
        };
    }

    public async Task<RelatorioTotaisPorCategoriaDto> ObterTotaisPorCategoriaAsync()
    {
        var transacoes = await _transacaoRepository.ObterTodasComRelacionamentosAsync();
        var categorias = await _categoriaRepository.ObterTodasAsync();

        var totaisPorCategoria = categorias.Select(categoria =>
        {
            var transacoesCategoria = transacoes.Where(t => t.CategoriaId == categoria.Id).ToList();
            var totalReceitas = transacoesCategoria
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);
            var totalDespesas = transacoesCategoria
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);

            return new TotalPorCategoriaDto
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        var totalReceitasGeral = transacoes
            .Where(t => t.Tipo == TipoTransacao.Receita)
            .Sum(t => t.Valor);
        var totalDespesasGeral = transacoes
            .Where(t => t.Tipo == TipoTransacao.Despesa)
            .Sum(t => t.Valor);

        return new RelatorioTotaisPorCategoriaDto
        {
            Categorias = totaisPorCategoria,
            TotalReceitas = totalReceitasGeral,
            TotalDespesas = totalDespesasGeral,
            SaldoLiquido = totalReceitasGeral - totalDespesasGeral
        };
    }
}

