using ControleGastosResidenciais.Domain.Enums;

namespace ControleGastosResidenciais.Domain.Entities;

public class Categoria
{
    public Guid Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public FinalidadeCategoria Finalidade { get; set; }
    
    // Navegação
    public virtual ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    
    public bool PodeSerUsadaParaTipo(TipoTransacao tipo)
    {
        return Finalidade switch
        {
            FinalidadeCategoria.Ambas => true,
            FinalidadeCategoria.Despesa => tipo == TipoTransacao.Despesa,
            FinalidadeCategoria.Receita => tipo == TipoTransacao.Receita,
            _ => false
        };
    }
}

