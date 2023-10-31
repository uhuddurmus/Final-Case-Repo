using Microsoft.EntityFrameworkCore;
using Vk.Data.Domain;

namespace Vk.Data.Context;

public class VkDbContext : DbContext
{
    public VkDbContext(DbContextOptions<VkDbContext> options) : base(options)
    {

    }


    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfigruration());
        modelBuilder.ApplyConfiguration(new OrderConfigruration());
        modelBuilder.ApplyConfiguration(new ProductConfigruration());
        modelBuilder.ApplyConfiguration(new AddressConfigruration());
        modelBuilder.ApplyConfiguration(new MessageConfigruration());

        base.OnModelCreating(modelBuilder);
    }

}
