namespace Lucas.Crud.Api.Entities
{
    public class PostUseRequest
    {
        public User user { get; set; }

        public string bearer { get; set; }

        public string base64 { get; set; }
    }
}