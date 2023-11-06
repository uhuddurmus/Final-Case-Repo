using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vk.Base.Response;
using Vk.Operation;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace VkApi.Controllers;

[Route("vk/api/v1/[controller]")]
[ApiController]
public class PaymentController : ControllerBase
{
    private IMediator mediator;

    public PaymentController(IMediator mediator)
    {
        this.mediator = mediator;
    }


    //önyüzde yalancı bi ödemeden sonra statü güncellemek için card

    [HttpPost("paymentCard")]
    [Authorize(Roles = "admin,user")]

    public async Task<ApiResponse> UpdateStatus(int id, string status)
    {
        var operation = new UpdateOrderCommand(status, id);
        var result = await mediator.Send(operation);
        return result;
    }

    //Eftİle bakiye yükleme

    [HttpPost("Eft")]
    [Authorize(Roles = "admin,user")]

    public async Task<ApiResponse> UpdateCredit(int credit,Boolean isPayment)
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        
        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Id = await mediator.Send(decodeTokenCommand);
        var operation = new UpdateUserCredit(Id.Response, credit, isPayment);
        var result = await mediator.Send(operation);
        return result;
    }

}