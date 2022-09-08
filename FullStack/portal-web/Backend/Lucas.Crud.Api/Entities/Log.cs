using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
namespace Lucas.Crud.Api.Entities
{
    public class Log
    {
        public Log(DateTime? timestamp, string? clientName, string? userName)
        {
            this.timestamp = timestamp;
            this.clientName = clientName;
            this.userName = userName;
        }

        public DateTime? timestamp { get; set; }
        public string? clientName { get; set; }
        public string? userName { get; set; }

    }
}
