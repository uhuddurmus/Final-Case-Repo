using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace Vk.Operation;

public class OrderQueryHandler :
    IRequestHandler<GetAllOrderQuery, ApiResponse<List<OrderResponse>>>,
    IRequestHandler<GetOrderByIdQuery, ApiResponse<OrderResponse>>,
    IRequestHandler<GetOrderByUserIdQuery, ApiResponse<List<OrderResponse>>>
{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public OrderQueryHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }


    public async Task<ApiResponse<List<OrderResponse>>> Handle(GetAllOrderQuery request,
        CancellationToken cancellationToken)
    {
        List<Order> list = await dbContext.Set<Order>()
            .Include(x => x.User)
            .ToListAsync(cancellationToken);

        List<OrderResponse> mapped = mapper.Map<List<OrderResponse>>(list);
        return new ApiResponse<List<OrderResponse>>(mapped);
    }

    public async Task<ApiResponse<OrderResponse>> Handle(GetOrderByIdQuery request,
        CancellationToken cancellationToken)
    {
        Order? entity = await dbContext.Set<Order>()
            .Include(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
        {
            return new ApiResponse<OrderResponse>("Record not found!");
        }

        OrderResponse mapped = mapper.Map<OrderResponse>(entity);
        return new ApiResponse<OrderResponse>(mapped);
    }

    public async Task<ApiResponse<List<OrderResponse>>> Handle(GetOrderByUserIdQuery request, CancellationToken cancellationToken)
    {
        IQueryable<Order> query = dbContext.Set<Order>()
            .Include(x => x.User)
            .Where(x => x.UserId == request.UserId);

        if (request.time == "1")
        {
            // Günlük zaman aralığına göre filtrele
            query = query.Where(x => x.InsertDate.Date == DateTime.Today && x.InsertDate.Year == DateTime.Now.Year && x.InsertDate.Month == DateTime.Now.Month);
        }
        else if (request.time == "2")
        {
            // Aylık zaman aralığına göre filtrele
            query = query.Where(x => x.InsertDate.Month == DateTime.Now.Month && x.InsertDate.Year == DateTime.Now.Year);
        }
        else if (request.time == "3")
        {
            // Yıllık zaman aralığına göre filtrele
            query = query.Where(x => x.InsertDate.Year == DateTime.Now.Year);
        }

        List<Order> list = await query.ToListAsync(cancellationToken);
        var mapped = mapper.Map<List<OrderResponse>>(list);
        return new ApiResponse<List<OrderResponse>>(mapped);
    }
}