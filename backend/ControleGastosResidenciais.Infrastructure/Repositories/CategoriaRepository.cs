using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;
using ControleGastosResidenciais.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosResidenciais.Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly ApplicationDbContext _context;

    public CategoriaRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Categoria?> ObterPorIdAsync(Guid id)
    {
        return await _context.Categorias.FindAsync(id);
    }

    public async Task<IEnumerable<Categoria>> ObterTodasAsync()
    {
        return await _context.Categorias.ToListAsync();
    }

    public async Task<Categoria> CriarAsync(Categoria categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }
}

