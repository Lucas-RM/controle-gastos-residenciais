using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Domain.Enums;
using FluentValidation;

namespace ControleGastosResidenciais.Api.Validators;

public class CriarTransacaoDtoValidator : AbstractValidator<CriarTransacaoDto>
{
    public CriarTransacaoDtoValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("A descrição é obrigatória.");

        RuleFor(x => x.Valor)
            .GreaterThan(0).WithMessage("O valor deve ser maior que zero.");

        RuleFor(x => x.Tipo)
            .IsInEnum().WithMessage("O tipo deve ser Despesa ou Receita.");

        RuleFor(x => x.CategoriaId)
            .NotEmpty().WithMessage("A categoria é obrigatória.");

        RuleFor(x => x.PessoaId)
            .NotEmpty().WithMessage("A pessoa é obrigatória.");
    }
}

