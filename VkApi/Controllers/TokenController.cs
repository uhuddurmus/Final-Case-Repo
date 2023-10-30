using AutoMapper;
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

    [HttpGet("GetOrdersByToken")]
    [Authorize(Roles = "admin, user")]
    public async Task<ApiResponse<List<OrderResponse>>> ByToken()
    {
        var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Create a DecodeTokenCommand and send it to Mediator
        var decodeTokenCommand = new DecodeTokenCommand(token);
        var Userid = await mediator.Send(decodeTokenCommand);
        var operation = new GetOrderByUserIdQuery(Userid.Response);
        var result = await mediator.Send(operation);
        return result;
    }

    //[HttpPost("CreateOrder")]
    ////[Authorize(Roles = "admin")]

    //public async Task<ApiResponse<OrderResponse>> Post([FromBody] OrderRequest request, CancellationToken cancellationToken)
    //{
    //    var opp = new GetProductByIdQuery(request.ProductId);
    //    var ress = await mediator.Send(opp);
    //    if (ress.Response != null)
    //    {
    //        var entity = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == ress.Response.Id, cancellationToken);
    //        if (entity != null)
    //        {
    //            if (entity.Piece > request.Piece)
    //            {
    //                entity.Piece = entity.Piece - request.Piece;
    //                var operation = new CreateOrderCommand(request);
    //                var result = await mediator.Send(operation);
    //                await dbContext.SaveChangesAsync();

    //                return result;

    //            }
    //            else
    //            {
    //                return new ApiResponse<OrderResponse>("Not enought product");
    //            }
    //        }
    //        else
    //        {
    //            return new ApiResponse<OrderResponse>("No such an product");
    //        }
    //    }
    //    else
    //    {
    //        return new ApiResponse<OrderResponse>("No such an product");
    //    }
    //}

}