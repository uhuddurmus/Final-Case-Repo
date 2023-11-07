using Microsoft.AspNetCore.SignalR;
using Vk.Data.Context;

public class ChatHub : Hub
{
    private readonly VkDbContext _dbContext;

    public ChatHub(VkDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    //adminlerin herkese atması için admin user id 1
    public async Task SendMessage(Message message)
    {
        if(message.UserId == 1)
        {
            message.InsertDate = DateTime.Now;
            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();
            // Mesajı tüm kullanıcılara gönderin
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
        else
        {
            await Clients.All.SendAsync("ReceiveMessage", "Not an admin");
        }
    }
    public async Task JoinRoom(string roomName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
    }

    public async Task LeaveRoom(string roomName)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
    }
    public async Task SendMessageToRoom(Message message)
    {
        try
        {
            // Mesajı veritabanına kaydedin
            message.InsertDate = DateTime.Now;
            _dbContext.Messages.Add(message);
            await _dbContext.SaveChangesAsync();

            // Mesajı belirli bir odaya gönderin
            await Clients.Group(message.RoomName).SendAsync("ReceiveMessage", message);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
