using Serilog;
using Vk.Data.Context;
using Vk.Data.Domain;
using Vk.Data.Repository;

namespace Vk.Data.Uow;

public class UnitOfWork : IUnitOfWork
{
    private readonly VkDbContext dbContext;

    public UnitOfWork(VkDbContext dbContext)
    {
        this.dbContext = dbContext;

        UserRepository = new GenericRepository<User>(dbContext);
        AddressRepository = new GenericRepository<Address>(dbContext);
        OrderRepository = new GenericRepository<Order>(dbContext);
        ProductRepository = new GenericRepository<Product>(dbContext);

    }

    public void Complete()
    {
        dbContext.SaveChanges();
    }

    public void CompleteTransaction()
    {
        using (var transaction = dbContext.Database.BeginTransaction())
        {
            try
            {
                dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                Log.Error("CompleteTransactionError", ex);
            }
        }
    }


    public IGenericRepository<User> UserRepository { get; private set; }
    public IGenericRepository<Order> OrderRepository { get; private set; }
    public IGenericRepository<Product> ProductRepository { get; private set; }
    public IGenericRepository<Address> AddressRepository { get; private set; }
}