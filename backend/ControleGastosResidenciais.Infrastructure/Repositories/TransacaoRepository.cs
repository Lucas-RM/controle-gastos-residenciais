using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;
using ControleGastosResidenciais.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.Infrastructure.Repositories;

public class TransacaoRepository : ITransacaoRepository
{
    private readonly ApplicationDbContext _context;

    public TransacaoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Transacao?> ObterPorIdAsync(Guid id)
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<Transacao>> ObterTodasAsync()
    {
        return await _context.Transacoes.ToListAsync();
    }

    public async Task<IEnumerable<Transacao>> ObterTodasComRelacionamentosAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Categoria)
            .Include(t => t.Pessoa)
            .ToListAsync();
    }

    public async Task<Transacao> CriarAsync(Transacao transacao)
    {
        await _context.Transacoes.AddAsync(transacao);
        await _context.SaveChangesAsync();
        return transacao;
    }

    public async Task<IEnumerable<Transacao>> ObterPorPessoaIdAsync(Guid pessoaId)
    {
        return await _context.Transacoes
            .Where(t => t.PessoaId == pessoaId)
            .ToListAsync();
    }
}

