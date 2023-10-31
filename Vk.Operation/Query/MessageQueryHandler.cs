using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace Vk.Operation;

public class MessageQueryHandler :
    IRequestHandler<GetMessageByRoomNameQuery, ApiResponse<List<MessageResponse>>>
{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public MessageQueryHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }

    public async Task<ApiResponse<List<MessageResponse>>> Handle(GetMessageByRoomNameQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Message> query = dbContext.Set<Message>()
            .Where(x => x.RoomName == request.RoomName || x.RoomName == "0");

        List<Message> list = await query.ToListAsync(cancellationToken);
        var mapped = mapper.Map<List<MessageResponse>>(list);
        return new ApiResponse<List<MessageResponse>>(mapped);
    }
}