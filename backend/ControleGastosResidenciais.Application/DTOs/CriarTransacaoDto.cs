using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Application.DTOs;

public class CriarTransacaoDto
{
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid CategoriaId { get; set; }
    public Guid PessoaId { get; set; }
}

