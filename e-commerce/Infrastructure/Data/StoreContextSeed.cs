using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsyn(StoreContext context)
        {
            if (!context.ProductBrand.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrand.AddRange(brands);


            }
            if (!context.ProductBrand.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrand.AddRange(brands);


            }
            if (!context.ProductBrand.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrand.AddRange(brands);


            }
        }
    }
}