using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vk.Base;

public class Message : BaseModel
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Text { get; set; }
    public string RoomName { get; set; }


}
public class MessageConfigruration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.Property(x => x.UserId).IsRequired();
        builder.Property(x => x.UserName).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Text).IsRequired().HasMaxLength(250);
    }
}