using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Vk.Base;

namespace Vk.Data.Domain;
[Table("Product", Schema = "dbo")]

public class Product : BaseModel
{
    public string Name { get; set; }

    public string Description { get; set; }

    public decimal? Price { get; set; }

    public string PictureUrl { get; set; }

    public string ProductType { get; set; }

    public string ProductBrand { get; set; }

    public int Piece { get; set; }


}
public class ProductConfigruration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Description).HasMaxLength(250);
        builder.Property(x => x.Price).IsRequired();
        builder.Property(x => x.Piece).IsRequired();
    }
}