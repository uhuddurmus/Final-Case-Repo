using AutoMapper;
using Vk.Data.Domain;
using Vk.Schema;

namespace Vk.Operation.Mapper;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<UserRequest, User>();
        CreateMap<User, UserResponse>();

        CreateMap<ProductRequest, Product>();
        CreateMap<Product, ProductResponse>();

        CreateMap<AddressRequest, Address>();
        CreateMap<Address, AddressResponse>();

        CreateMap<OrderRequest, Order>();
        CreateMap<Order, OrderResponse>();

        CreateMap<MessageRequest, Message>();
        CreateMap<Message, MessageResponse>();

    }
}