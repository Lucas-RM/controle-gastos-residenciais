namespace ControleGastosResidenciais.Domain.Entities;

public class Pessoa
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    
    // Navegação
    public virtual ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    
    public bool EhMenorDeIdade => Idade < 18;
}

