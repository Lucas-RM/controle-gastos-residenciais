using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Application.Interfaces;
using ControleGastosResidenciais.Domain.Entities;

namespace ControleGastosResidenciais.Application.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _categoriaRepository;

    public CategoriaService(ICategoriaRepository categoriaRepository)
    {
        _categoriaRepository = categoriaRepository;
    }

    public async Task<CategoriaDto> CriarAsync(CriarCategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Id = Guid.NewGuid(),
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        var categoriaCriada = await _categoriaRepository.CriarAsync(categoria);

        return new CategoriaDto
        {
            Id = categoriaCriada.Id,
            Descricao = categoriaCriada.Descricao,
            Finalidade = categoriaCriada.Finalidade
        };
    }

    public async Task<IEnumerable<CategoriaDto>> ObterTodasAsync()
    {
        var categorias = await _categoriaRepository.ObterTodasAsync();

        return categorias.Select(c => new CategoriaDto
        {
            Id = c.Id,
            Descricao = c.Descricao,
            Finalidade = c.Finalidade
        });
    }

    public async Task<CategoriaDto?> ObterPorIdAsync(Guid id)
    {
        var categoria = await _categoriaRepository.ObterPorIdAsync(id);

        if (categoria == null)
            return null;

        return new CategoriaDto
        {
            Id = categoria.Id,
            Descricao = categoria.Descricao,
            Finalidade = categoria.Finalidade
        };
    }
}

