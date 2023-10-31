using Microsoft.AspNetCore.SignalR;
using System.ServiceModel.Channels;
using Vk.Data.Context;
using Vk.Data.Domain;

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
        _dbContext.Messages.Add(message);
        await _dbContext.SaveChangesAsync();
        // Mesajı tüm kullanıcılara gönderin
        await Clients.All.SendAsync("ReceiveMessage", message);

    }

    public async Task JoinRoom(string roomName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
    }
    public async Task SendMessageToRoom(Message message)
    {
        try
        {
            // Mesajı veritabanına kaydedin
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
