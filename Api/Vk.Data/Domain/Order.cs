using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Vk.Base;

namespace Vk.Data.Domain;

[Table("Order", Schema = "dbo")]
public class Order : BaseModel
{
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public virtual User User { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public int Piece { get; set; }
    public string Status { get; set; }
    public string PaymentMethod { get; set; }
}

public class OrderConfigruration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(x => x.InsertUserId).IsRequired();
        builder.Property(x => x.ProductId).IsRequired();
        builder.Property(x => x.UpdateUserId).IsRequired().HasDefaultValue(0);
        builder.Property(x => x.InsertDate).IsRequired();
        builder.Property(x => x.UpdateDate).IsRequired(false);
        builder.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);
        builder.Property(x => x.UserId).IsRequired(true);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Description).HasMaxLength(250);
        builder.Property(x => x.Price).IsRequired();
        builder.Property(x => x.Status).IsRequired();
        builder.Property(x => x.PaymentMethod).IsRequired();
        builder.HasIndex(x => x.UserId);
    }
}