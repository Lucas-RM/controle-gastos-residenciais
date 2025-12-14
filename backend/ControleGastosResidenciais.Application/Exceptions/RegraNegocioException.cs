namespace ControleGastosResidenciais.Application.Exceptions;

public class RegraNegocioException : Exception
{
    public RegraNegocioException(string mensagem) : base(mensagem)
    {
    }
}

