using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vk.Schema;

namespace Vk.Operation.Validation;
public class CreateMessageValidator : AbstractValidator<MessageRequest>
{

    public CreateMessageValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
        RuleFor(x => x.Text).NotEmpty().MinimumLength(1).WithMessage("Message is required.");
        RuleFor(x => x.UserName).NotEmpty().MinimumLength(5).WithMessage("UserName is required.");
    }
}