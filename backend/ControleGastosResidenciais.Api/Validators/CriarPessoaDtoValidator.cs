using ControleGastosResidenciais.Application.DTOs;
using FluentValidation;

namespace ControleGastosResidenciais.Api.Validators;

public class CriarPessoaDtoValidator : AbstractValidator<CriarPessoaDto>
{
    public CriarPessoaDtoValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("O nome é obrigatório.")
            .MaximumLength(200).WithMessage("O nome deve ter no máximo 200 caracteres.");

        RuleFor(x => x.Idade)
            .GreaterThan(0).WithMessage("A idade deve ser maior que zero.")
            .Must(idade => idade > 0 && idade < 150).WithMessage("A idade deve ser um valor válido.");
    }
}

