namespace Lucas.Crud.Api.Entities
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;

        public string CollectionName { get; set; } = null!;

        public string MySecretKey { get; set; } = null!;
    }
}
