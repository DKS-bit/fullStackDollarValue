using Lucas.Crud.Api.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;

namespace Lucas.Crud.Api.Services
{
    public class RequisitionService
    {
        private HttpClient client;
        private string token;

        public RequisitionService(IOptions<RequisitionSettings> requisitionSettings)
        {
            client = new HttpClient();
            token = requisitionSettings.Value.token;
        }

        public async Task<string> ContentExtraction(ImageRequest imageRequest)
        {

            client.DefaultRequestHeaders.Clear();
            var reqAuth = new ReqAuth
            {
                token = this.token,
            };


            var responseAuth = await client.PostAsJsonAsync("https://mostqiapi.com/user/authenticate", reqAuth);

            var responseAuthString = await responseAuth.Content.ReadAsStringAsync();

            var Temporary = JsonSerializer.Deserialize<ResAuthJson>(responseAuthString);

            var bearer = Temporary.token.ToString();


            var values = new ImageRequest
            {
                fileBase64 = imageRequest.fileBase64,
            };

            client.DefaultRequestHeaders.Add("Authorization", "Bearer "+bearer);


            var response = await client.PostAsJsonAsync("https://mostqiapi.com/process-image/content-extraction", values);

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
        public async Task<string> LivenessRequest(LivenessRequest livenessRequest)
        {

            client.DefaultRequestHeaders.Clear();
            var reqAuth = new ReqAuth
            {
                token = this.token,
            };


            var responseAuth = await client.PostAsJsonAsync("https://mostqiapi.com/user/authenticate", reqAuth);

            var responseAuthString = await responseAuth.Content.ReadAsStringAsync();

            var Temporary = JsonSerializer.Deserialize<ResAuthJson>(responseAuthString);

            var bearer = Temporary.token.ToString();


            var values = new LivenessRequest
            {
                file = livenessRequest.file,
                movements = new string[2] {"up","down"},
                returnFullFace=true
            };

            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + bearer);


            var response = await client.PostAsJsonAsync("https://mostqiapi.com/liveness/detect", values);

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
    }
}


