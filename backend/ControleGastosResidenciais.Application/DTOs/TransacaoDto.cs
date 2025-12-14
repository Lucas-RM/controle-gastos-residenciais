using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Application.DTOs;

public class TransacaoDto
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid CategoriaId { get; set; }
    public Guid PessoaId { get; set; }
    public string? CategoriaDescricao { get; set; }
    public string? PessoaNome { get; set; }
}

