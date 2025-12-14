using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Application.DTOs;

public class CategoriaDto
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
}

