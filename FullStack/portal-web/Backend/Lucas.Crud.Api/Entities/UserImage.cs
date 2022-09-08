using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Lucas.Crud.Api.Entities
{
    public class UserImage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string? Id { get; set; }
        
        public string userId { get; set; }
        
        public string base64 { get; set; }
        

    }
}
