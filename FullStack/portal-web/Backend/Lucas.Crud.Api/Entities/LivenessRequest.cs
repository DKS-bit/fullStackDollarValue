namespace Lucas.Crud.Api.Entities
{
    public class LivenessRequest
    {
       
        public string file { get; set; }
        public string[]? movements { get; set; }
 
        public bool? returnFullFace { get; set; }
    }
}