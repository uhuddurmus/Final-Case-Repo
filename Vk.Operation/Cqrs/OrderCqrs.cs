using MediatR;
using Vk.Base.Response;
using Vk.Schema;

namespace Vk.Operation.Cqrs;

public record CreateOrderCommand(OrderRequest Model) : IRequest<ApiResponse<OrderResponse>>;
public record UpdateOrderCommand(string Status, int Id) : IRequest<ApiResponse>;
public record DeleteOrderCommand(int Id) : IRequest<ApiResponse>;
public record GetAllOrderQuery() : IRequest<ApiResponse<List<OrderResponse>>>;
public record GetOrderByIdQuery(int Id) : IRequest<ApiResponse<OrderResponse>>;
public record GetOrderByUserIdQuery(int UserId) : IRequest<ApiResponse<List<OrderResponse>>>;