namespace Vk.Schema;

public class MessageRequest
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Text { get; set; }
    public string RoomName { get; set; }
}

public class MessageResponse
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Text { get; set; }
    public string RoomName { get; set; }

}