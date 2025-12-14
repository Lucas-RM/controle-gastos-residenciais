using ControleGastosResidenciais.Application.DTOs;
using ControleGastosResidenciais.Domain.Enums;
using FluentValidation;

namespace ControleGastosResidenciais.Api.Validators;

public class CriarCategoriaDtoValidator : AbstractValidator<CriarCategoriaDto>
{
    public CriarCategoriaDtoValidator()
    {
        RuleFor(x => x.Descricao)
            .NotEmpty().WithMessage("A descrição é obrigatória.")
            .MaximumLength(200).WithMessage("A descrição deve ter no máximo 200 caracteres.");

        RuleFor(x => x.Finalidade)
            .IsInEnum().WithMessage("A finalidade deve ser Despesa, Receita ou Ambas.");
    }
}

