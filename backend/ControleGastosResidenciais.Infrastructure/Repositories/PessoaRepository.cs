using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;
using ControleGastosResidenciais.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.Infrastructure.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly ApplicationDbContext _context;

    public PessoaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Pessoa?> ObterPorIdAsync(Guid id)
    {
        return await _context.Pessoas.FindAsync(id);
    }

    public async Task<IEnumerable<Pessoa>> ObterTodasAsync()
    {
        return await _context.Pessoas.ToListAsync();
    }

    public async Task<Pessoa> CriarAsync(Pessoa pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    public async Task DeletarAsync(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}

