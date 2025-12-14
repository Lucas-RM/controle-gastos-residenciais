namespace ControleGastosResidenciais.Application.DTOs;

public class RelatorioTotaisPorPessoaDto
{
    public List<TotalPorPessoaDto> Pessoas { get; set; } = new();
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoLiquido { get; set; }
}

