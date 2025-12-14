using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Domain.Entities;

public class Transacao
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public Guid CategoriaId { get; set; }
    public Guid PessoaId { get; set; }
    
    // Navegação
    public virtual Categoria Categoria { get; set; } = null!;
    public virtual Pessoa Pessoa { get; set; } = null!;
}

