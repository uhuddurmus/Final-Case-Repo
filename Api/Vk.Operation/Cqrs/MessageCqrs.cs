using MediatR;
using Vk.Base.Response;
using Vk.Schema;

namespace Vk.Operation.Cqrs;

public record DeleteMessageCommand(int Id) : IRequest<ApiResponse>;
public record GetMessageByRoomNameQuery(string RoomName) : IRequest<ApiResponse<List<MessageResponse>>>;
