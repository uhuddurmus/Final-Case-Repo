using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Operation.Cqrs;
using Vk.Schema;

namespace Vk.Operation.Command;

public class OrderCommandHandler :
    IRequestHandler<CreateOrderCommand, ApiResponse<OrderResponse>>,
    IRequestHandler<UpdateOrderCommand, ApiResponse>,
    IRequestHandler<DeleteOrderCommand, ApiResponse>

{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;

    public OrderCommandHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }


    public async Task<ApiResponse<OrderResponse>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        Order mapped = mapper.Map<Order>(request.Model);
        mapped.InsertDate = DateTime.Now;

        var product = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == request.Model.ProductId, cancellationToken);

        if (product != null)
        {
            if (product.Piece >= mapped.Piece)
            {
                product.Piece = product.Piece - mapped.Piece;

                var entity = await dbContext.Set<Order>().AddAsync(mapped, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);

                var response = mapper.Map<OrderResponse>(entity.Entity);
                return new ApiResponse<OrderResponse>(response);
            }
            else
            {
                return new ApiResponse<OrderResponse>("Not Enought Product!");
            }
        }
        else
        {
            return new ApiResponse<OrderResponse>("Product not found!");
        }
    }

    public async Task<ApiResponse> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<Order>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity == null)
        {
            return new ApiResponse("Record not found!");
        }
        entity.Status = request.Status;
        //pending yeni olusturmus siparis
        //active ödenmis siparis
        //done tamamlanmıs siparis 
        await dbContext.SaveChangesAsync(cancellationToken);
        return new ApiResponse("Success");
    }

    public async Task<ApiResponse> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var entity = await dbContext.Set<Order>().FirstOrDefaultAsync(x => x.Id == request.Id && x.Status == "pending", cancellationToken);

        if (entity == null)
        {
            return new ApiResponse("Record not found or status is not pending!");
        }

        dbContext.Set<Order>().Remove(entity); // Entiteyi veritabanından kaldır
        await dbContext.SaveChangesAsync(cancellationToken);

        return new ApiResponse();
    }

}