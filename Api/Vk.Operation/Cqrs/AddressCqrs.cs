using MediatR;
using Vk.Base.Response;
using Vk.Schema;

namespace Vk.Operation;

public record CreateAddressCommand(AddressRequest Model) : IRequest<ApiResponse<AddressResponse>>;
public record UpdateAddressCommand(AddressRequest Model, int Id) : IRequest<ApiResponse>;
public record DeleteAddressCommand(int Id) : IRequest<ApiResponse>;
public record GetAllAddressQuery() : IRequest<ApiResponse<List<AddressResponse>>>;
public record GetAddressByIdQuery(int Id) : IRequest<ApiResponse<AddressResponse>>;
public record GetAddressByUserIdQuery(int UserId) : IRequest<ApiResponse<List<AddressResponse>>>;