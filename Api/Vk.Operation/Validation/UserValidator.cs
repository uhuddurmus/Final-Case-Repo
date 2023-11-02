using FluentValidation;
using Vk.Schema;

namespace Vk.Operation.Validation;

public class CreateUserValidator : AbstractValidator<UserRequest>
{

    public CreateUserValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().WithMessage("Fullname is required.");
        RuleFor(x => x.FullName).MinimumLength(5).WithMessage("Fullname length min value is 5.");

        RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required.");
        RuleFor(x => x.Email).MinimumLength(10).WithMessage("Email length min value is 20.");

        RuleFor(x => x.Credit).NotEmpty().WithMessage("Credit is required.");
        RuleFor(x => x.Credit).GreaterThanOrEqualTo(0).WithMessage("Credit must be greater than or equal to 0.");



    }
}