using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Lucas.Crud.Api.Entities
{
    public class UserClient
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string username { get; set; }

        public string password { get; set; }

        public string email { get; set; }

        public DateTime? timeRegistered { get; set;  }

        public string userId { get; set; }
    }
}

