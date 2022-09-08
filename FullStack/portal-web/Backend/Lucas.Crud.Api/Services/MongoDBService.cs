using Lucas.Crud.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Lucas.Crud.Api.Services
{
    public class MongoDBService
    {
        private List<Log> registerLog;
        private IMongoCollection<User> _userCollection;
        private IMongoCollection<Dollar> _dollarCollection;
        private IMongoCollection<UserImage> _userImageCollection;
        private string secretKey;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = database.GetCollection<User>(mongoDBSettings.Value.CollectionName);
            _dollarCollection = database.GetCollection<Dollar>("dollar");
            _userImageCollection = database.GetCollection<UserImage>("userImage");
            registerLog = new List<Log>();


            secretKey = mongoDBSettings.Value.MySecretKey;

        }

        public async Task<string> CreateToken(string id)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                 Subject =  new ClaimsIdentity(new Claim[] {
                    new Claim("id", id)
                 }),
                Expires = DateTime.Now.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);


        }
        public async Task<bool> ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.secretKey);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out _
                ); 
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
        public async Task<String> CreateAsync(User user)
        {   

            var filter = Builders<User>.Filter.Eq("username", user.username);
            var filterEmail = Builders<User>.Filter.Eq("email", user.email);
            var res = await _userCollection.Find(filter).CountAsync();
            if (res == 0)
            {
                var resEmail = await _userCollection.Find(filterEmail).CountAsync();
                if(resEmail == 0)
                {
                    await _userCollection.InsertOneAsync(user);
                    return "Sucesso";
                }
                else { 
                return "Falha Email";
                }
            }
            return "Falha Username";
        }
        public async Task CreateAsyncUserClient(User user)
        {
            var filter = Builders<User>.Filter.Eq("username", user.username);
            var res = await _userCollection.Find(filter).CountAsync();
            if (res == 0)
            {
                await _userCollection.InsertOneAsync(user);

            }
            return;
        }
        public async Task <List<User>> GetAsync()
        {
            return await _userCollection.Find(new BsonDocument()).ToListAsync();
        }
        public async Task<List<User>> GetAsyncUserClient( string id)
        {
            var filter = Builders<User>.Filter.Eq("registeredBy", id );
            return await _userCollection.Find(filter).ToListAsync();
        }
        public async Task<List<Log>> GetAsyncUserClientLog()
        {
            this.registerLog.Clear();
            var users = await _userCollection.Find(new BsonDocument()).ToListAsync();
            foreach (var  user in users)    
            {
               if(user.registeredBy != null)
                {
                    var filter = Builders<User>.Filter.Eq("Id", user.registeredBy);
                    var client = await _userCollection.Find(filter).ToListAsync();
                    var log = new Log(user.timeRegistered, client[0].username, user.fullName);
                    this.registerLog.Add(log);
                    
                }
               
            }
            return this.registerLog;
            
        }
        public async Task<List<Dollar>> GetAsyncDollar()
        {
            return await _dollarCollection.Find(new BsonDocument()).ToListAsync();
        }
        //public async Task<string> validation(int id) {
        //    var Secret = 
        //}
        public async Task <string> ReadJWT(string token)
        {
  
            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.ReadJwtToken(token);
            string id = jwt.Claims.First(c => c.Type == "id").Value;

            return id;



        }
        public async Task<string> GetUserImage(string id)
        {
            var filter = Builders<UserImage>.Filter.Eq("userId", id);
            var res = await _userImageCollection.Find(filter).ToListAsync();
            return res[0].base64;
            
        }
        public async Task<string> CreateUserImage(string base64, string id)
        {
            var userImage = new UserImage
            {
                userId = id,
                base64 = base64
            };
            await _userImageCollection.InsertOneAsync(userImage);
            return "sucesso";

        }
        public async Task<string> Login(User user)
        {
       
            var filter = Builders<User>.Filter.Eq("username", user.username);
            try { 
             var res = await _userCollection.Find(filter).ToListAsync();
                if (res[0].password == user.password)
                {
                    return await CreateToken(res[0].Id);
                }
            }
            catch (Exception ex)
            {
                return "Falha";
            }
            return "Falha";
        }

        public async Task<string> findNewUserId(User user)
        {
            var filter = Builders<User>.Filter.Eq("username", user.username);
            var res = await _userCollection.Find(filter).ToListAsync();
            return res[0].Id;
        }

        public async Task<bool> canRegister(string bearer)
        {
            var id = ReadJWT(bearer);
            var filter = Builders<User>.Filter.Eq("Id", id.Result);
            var res = await _userCollection.Find(filter).ToListAsync();
             if(res[0].registeredBy == null)
            {
                return true;
            }
            return false;

        }
    }





}
