namespace Vk.Schema;


public class OrderRequest

{
    public int UserId { get; set; }
    public int ProductId { get; set; }
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

public class OrderResponse

{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public int Piece { get; set; }
    public string Status { get; set; }
    public string PaymentMethod { get; set; }
    public DateTime InsertDate { get; set; }

}

