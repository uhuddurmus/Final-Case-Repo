using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vk.Base.Response;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace VkApi.Controllers;

[Route("vk/api/v1/[controller]")]
[ApiController]
public class PeymentController : ControllerBase
{
    private IMediator mediator;

    public PeymentController(IMediator mediator)
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

    public async Task<ApiResponse> UpdateCredit(int id, string status)
    {
        var operation = new UpdateOrderCommand(status, id);
        var result = await mediator.Send(operation);
        return result;
    }

}