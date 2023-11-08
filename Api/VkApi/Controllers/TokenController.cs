using AutoMapper;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using System.Threading;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation;
using Vk.Operation.Cqrs;
using Vk.Schema;


namespace VkApi.Controllers;


[Route("vk/api/v1/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private IMediator mediator;
    private readonly IConfiguration _configuration;
    private readonly VkDbContext dbContext;



    public TokenController(IMediator mediator, IConfiguration configuration)
    {
        this.mediator = mediator;
        _configuration = configuration;
        this.dbContext = dbContext;

    }


    [HttpPost]
    public async Task<ApiResponse<TokenResponse>> Post([FromBody] TokenRequest request)
    {
        var operation = new CreateTokenCommand(request);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("getUserInfo")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<UserResponse>> GetUserInfo()
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Id = await mediator.Send(decodeTokenCommand);
        var operation = new GetUserByIdQuery(Id.Response);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("getAdressInfo")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<List<AddressResponse>>> GetAdressInfo()
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Id = await mediator.Send(decodeTokenCommand);
        var operation = new GetAddressByUserIdQuery(Id.Response);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("GetProductsByParameter")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<List<ProductResponse>>> ByParameter(
        [FromQuery] string? ProductBrand = null,
        [FromQuery] string? ProductType = null,
        [FromQuery] int Gain = 0,
        [FromQuery] int Tax = 0

    )
    {
        var operation = new GetProductByParametersQuery(ProductType, ProductBrand, Gain,Tax);
        var result = await mediator.Send(operation);
        return result;
    }

    [HttpGet("GetProduct")]
    [Authorize(Roles = "admin , user")]
    public async Task<ApiResponse<ProductResponse>> Get(int id,int gain,int tax)
    {
        var operation = new GetProductByIdQuery(id);
        
        var result = await mediator.Send(operation);

        result.Response.Price += (result.Response.Price * gain / 100);
        result.Response.Price += (result.Response.Price * tax / 100);

        return result;
    }

    [HttpGet("getReport")]
    [Authorize(Roles = "admin, user")]

    //time 0 default all
    //time 1 günlük
    //time 2 aylýk
    //time 3 yýllýk
    public async Task<ApiResponse<List<OrderResponse>>> ByToken(string time)
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Userid = await mediator.Send(decodeTokenCommand);
        var operation = new GetOrderByUserIdQuery(Userid.Response ,time);
        var result = await mediator.Send(operation);
        return result;
    }
    [HttpGet("GetOrdersByParameter")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<List<OrderResponse>>> ByToken(
    [FromQuery] string? Status = null,
    [FromQuery] string? Description = null,
    [FromQuery] string? Name = null,
    [FromQuery] string? time = null
    )
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Userid = await mediator.Send(decodeTokenCommand);
        var operation = new GetOrderByParametersQuery(Userid.Response, Status, Description, Name, time);
        var result = await mediator.Send(operation);
        return result;
    }

}