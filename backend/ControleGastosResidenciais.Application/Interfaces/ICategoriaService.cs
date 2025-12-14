using ControleGastosResidenciais.Application.DTOs;

namespace ControleGastosResidenciais.Application.Interfaces;

public interface ICategoriaService
{
    Task<CategoriaDto> CriarAsync(CriarCategoriaDto dto);
    Task<IEnumerable<CategoriaDto>> ObterTodasAsync();
    Task<CategoriaDto?> ObterPorIdAsync(Guid id);
}

