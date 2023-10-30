using FluentValidation;
using Vk.Schema;

namespace Vk.Operation.Validation;
public class CreateOrderValidator : AbstractValidator<OrderRequest>
{

    public CreateOrderValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required.");
        RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required.");
        RuleFor(x => x.Status).NotEmpty().WithMessage("Status is required.");
        RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required.");
        RuleFor(x => x.Price).GreaterThan(0).WithMessage("Price must be greater than 0.");

    }
}