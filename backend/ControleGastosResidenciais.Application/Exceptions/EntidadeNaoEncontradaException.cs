namespace ControleGastosResidenciais.Application.Exceptions;

public class EntidadeNaoEncontradaException : Exception
{
    public EntidadeNaoEncontradaException(string mensagem) : base(mensagem)
    {
    }
}

