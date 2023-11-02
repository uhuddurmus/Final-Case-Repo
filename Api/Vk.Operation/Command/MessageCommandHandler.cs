using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace Vk.Operation.Command;

public class MessageCommandHandler :
    IRequestHandler<DeleteMessageCommand, ApiResponse>
{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public MessageCommandHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }



    public async Task<ApiResponse> Handle(DeleteMessageCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<Message>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse("Record not found!");
        }

        dbContext.Set<Message>().Remove(entity);
        await dbContext.SaveChangesAsync(cancellationToken);
        return new ApiResponse();
    }
}