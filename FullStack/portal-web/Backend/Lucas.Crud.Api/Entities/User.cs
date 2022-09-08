using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
namespace Lucas.Crud.Api.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string username { get; set; }

        public string password { get; set; }

        public string email { get; set; }

        public string? registeredBy { get; set; } // id of the user that registered this client

        public string? fullName { get; set; }

        public string? rg { get; set; }

        public string? dtOfBirth { get; set; }

        public DateTime? timeRegistered { get; set; }
    }
}
