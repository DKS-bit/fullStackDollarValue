using Microsoft.Graph;
using MongoDB.Driver;
using System.Net;
using System.Reflection.PortableExecutable;
using System.Text.Json;

namespace WorkerServiceDollar
{

    public class Worker : BackgroundService
    {
        public IMongoCollection<Dollar> collection;
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
            MongoClient clientMongo = new MongoClient("mongodb+srv://lucas:lucas123@clustercrud.pinju0h.mongodb.net/?retryWrites=true&w=majority");
            string databaseName = "crud";
            string collectionName = "dollar";
            var db = clientMongo.GetDatabase(databaseName);
            collection = db.GetCollection<Dollar>(collectionName);
    }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            while (!stoppingToken.IsCancellationRequested)
            {

                string html = string.Empty;
                string url = "https://api.hgbrasil.com/finance/quotations?key=d5046ad4";

                HttpClient client = new HttpClient();
                var res =await client.GetAsync(url);
                html = await res.Content.ReadAsStringAsync();
                var T = JsonSerializer.Deserialize<Root>(html);
                
                var value = T.results.currencies.USD.buy;

                Dollar dollar = new Dollar();
                dollar.Value = value;
                dollar.timestamp = DateTime.Now;

                await collection.InsertOneAsync(dollar);
                Console.WriteLine(value);

               //Fazer conn banco de dados mongodb + srv://<username>:<password>@clustercrud.pinju0h.mongodb.net/?retryWrites=true&w=majority

                //Mnadar para collection certa
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await Task.Delay(60000, stoppingToken);
            }
        }
    }
}