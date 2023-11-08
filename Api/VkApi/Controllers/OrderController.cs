using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Vk.Base.Response;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace VkApi.Controllers;

[Route("vk/api/v1/[controller]")]
[ApiController]
public class OrderesController : ControllerBase
{
    private IMediator mediator;
    //pending yeni olusturmus siparis
    //active ödenmis siparis
    //done tamamlanmıs siparis 
    public OrderesController(IMediator mediator)
    {
        this.mediator = mediator;
    }


    [HttpGet]
    [Authorize(Roles = "admin")]

    public async Task<ApiResponse<List<OrderResponse>>> GetAll()
    {
        var operation = new GetAllOrderQuery();
        var result = await mediator.Send(operation);
        return result;
    }


    [HttpGet("{id}")]
    [Authorize(Roles = "admin")]

    public async Task<ApiResponse<OrderResponse>> Get(int id)
    {
        var operation = new GetOrderByIdQuery(id);
        var result = await mediator.Send(operation);
        return result;
    }

  
    

    [HttpPost]
    [Authorize(Roles = "admin , user")]

    public async Task<ApiResponse<OrderResponse>> Post([FromBody] OrderRequest request)
    {
        var operation = new CreateOrderCommand(request);
        var result = await mediator.Send(operation);
        return result;
    }
    
    [HttpPost ("updateOrder")]
    [Authorize(Roles = "admin , user")]

    public async Task<ApiResponse> Get(int id, string status)
    {
        var operation = new UpdateOrderCommand(status,id);
        var result = await mediator.Send(operation);
        return result;
    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "admin,user")]

    public async Task<ApiResponse> Delete(int id)
    {
        var operation = new DeleteOrderCommand(id);
        var result = await mediator.Send(operation);
        return result;
    }
}