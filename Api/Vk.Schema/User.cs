namespace Vk.Schema;

public class UserRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public int Profit { get; set; }
    public string Role { get; set; }
    public int Credit { get; set; }
}

public class UserResponse
{
    public int Id { get; set; }
    public string Email { get; set; }
    //public string Password { get; set; } password dönmez !!!
    public string FullName { get; set; }
    public int Profit { get; set; }
    public string Role { get; set; }
    public int Credit { get; set; }

    public virtual List<AddressResponse> Addresses { get; set; }
    public virtual List<OrderResponse> Orders { get; set; }
}