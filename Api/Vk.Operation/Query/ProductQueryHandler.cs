using AutoMapper;
using LinqKit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Vk.Base.Response;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Data.Uow;
using Vk.Operation.Cqrs;

namespace Vk.Operation;

public class ProductQueryHandler :
    IRequestHandler<GetAllProductQuery, ApiResponse<List<ProductResponse>>>,
    IRequestHandler<GetProductByIdQuery, ApiResponse<ProductResponse>>,
    IRequestHandler<GetProductByParametersQuery, ApiResponse<List<ProductResponse>>>

{
    private readonly VkDbContext dbContext;
    private readonly IMapper mapper;
    private readonly IUnitOfWork unitOfWork;

    public ProductQueryHandler(VkDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
        this.unitOfWork = unitOfWork;

    }


    public async Task<ApiResponse<List<ProductResponse>>> Handle(GetAllProductQuery request,
        CancellationToken cancellationToken)
    {
        List<Product> list = await dbContext.Set<Product>()
            .ToListAsync(cancellationToken);

        List<ProductResponse> mapped = mapper.Map<List<ProductResponse>>(list);
        return new ApiResponse<List<ProductResponse>>(mapped);
    }

    public async Task<ApiResponse<ProductResponse>> Handle(GetProductByIdQuery request,
        CancellationToken cancellationToken)
    {
        Product? entity = await dbContext.Set<Product>()
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (entity == null)
        {
            return new ApiResponse<ProductResponse>("Record not found!");
        }

        ProductResponse mapped = mapper.Map<ProductResponse>(entity);
        return new ApiResponse<ProductResponse>(mapped);
    }

    public async Task<ApiResponse<List<ProductResponse>>> Handle(GetProductByParametersQuery request, CancellationToken cancellationToken)
    {

        var predicate = PredicateBuilder.New<Product>(true);

        if (!string.IsNullOrWhiteSpace(request.ProductBrand))
            predicate.And(x => x.ProductBrand.Contains(request.ProductBrand));
        if (!string.IsNullOrWhiteSpace(request.ProductType))
            predicate.And(x => x.ProductType.Contains(request.ProductType));

        var list = await dbContext.Set<Product>()
            .Where(predicate).ToListAsync(cancellationToken);

        // Gain ve tax oranlarını burada hesaplayın ve her ürünün Price kısmına ekleyin
        foreach (var product in list)
        {
            // Yüzde değerleri Price'a ekleyin
            product.Price += (product.Price * request.gain / 100);
            product.Price += (product.Price * request.tax / 100);
        }

        var mapped = mapper.Map<List<ProductResponse>>(list);

        return new ApiResponse<List<ProductResponse>>(mapped);

    }
}