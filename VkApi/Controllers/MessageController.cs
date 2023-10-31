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
public class MessagesController : ControllerBase
{
    private IMediator mediator;

    public MessagesController(IMediator mediator)
    {
        this.mediator = mediator;
    }




    [HttpGet("GetMessageByRoomName")]
    [Authorize(Roles = "admin,user")]

    public async Task<ApiResponse<List<MessageResponse>>> Get(string roomName)
    {
        var operation = new GetMessageByRoomNameQuery(roomName);
        var result = await mediator.Send(operation);
        return result;
    }




    [HttpDelete("{id}")]
    [Authorize(Roles = "admin,user")]
    public async Task<ApiResponse> Delete(int id)
    {
        var operation = new DeleteMessageCommand(id);
        var result = await mediator.Send(operation);
        return result;
    }
}