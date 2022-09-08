using Microsoft.AspNetCore.Mvc;
using Lucas.Crud.Api.Entities;
using Lucas.Crud.Api.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Lucas.Crud.Api.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly MongoDBService _mongoDBService;
        public UserController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }
        [EnableCors]
        [HttpGet("rotaDeGet")]

        public async Task<List<User>> Get()
        {
            return await _mongoDBService.GetAsync();
        }
        [EnableCors]
        [HttpGet("GetLog")]

        public async Task<List<Log>> GetLog([FromHeader] string bearer)
        {
            if (!await _mongoDBService.ValidateToken(bearer))
            {
                return new List<Log>();
            }
            return await _mongoDBService.GetAsyncUserClientLog();
        }
        [EnableCors]
        [HttpGet("rotaDeGetDollar")]
        public async Task<List<Dollar>> GetDollar([FromHeader] string bearer)
        {
            if (!await _mongoDBService.ValidateToken(bearer))
            {
                return new List<Dollar>();
            }
            return await _mongoDBService.GetAsyncDollar();
        }
        [HttpGet("getImage")]
        public async Task<string> getImage([FromHeader] string id)
        {
            return await _mongoDBService.GetUserImage(id);
        }
        [EnableCors]
        [HttpPost("rotaDePost")] public async Task<string> Post([FromBody] User user)
        {
            return await _mongoDBService.CreateAsync(user);

        }
        [HttpPost("rotaDePostUserClient")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult?> PostUserClient([FromBody] PostUseRequest postUseRequest)
        {
            if(await _mongoDBService.canRegister(postUseRequest.bearer))
            {
            postUseRequest.user.registeredBy = await _mongoDBService.ReadJWT(postUseRequest.bearer);
            postUseRequest.user.timeRegistered = DateTime.Now;
            await _mongoDBService.CreateAsyncUserClient(postUseRequest.user);
            var Id =await _mongoDBService.findNewUserId(postUseRequest.user);
            await _mongoDBService.CreateUserImage(postUseRequest.base64, Id);
            return CreatedAtAction(nameof(Get), new { id = postUseRequest.user.Id });
            }
            return null;
        }
        [EnableCors]
        [HttpGet("rotaDeGetUserClient")]

        public async Task<List<User>> GetUserClient([FromHeader] string bearer)
        {
            if(!await _mongoDBService.ValidateToken(bearer)){
                return new List<User>();
            }
            var id = await _mongoDBService.ReadJWT(bearer);

            
            return await _mongoDBService.GetAsyncUserClient(id);
        }
        [EnableCors]
        [HttpPost("rotaDeLogin")]
        public async Task<string> Validate([FromBody] User user)
        {
            return await _mongoDBService.Login(user);

        }
        [HttpPost("rotaDeValidateLogin")]
        public async Task<bool> Validate([FromBody] string token)
        {
            return await _mongoDBService.ValidateToken(token);

        }
        [HttpPost("LeituraTeste")]
        public async Task<string> Lele([FromBody] string token)
        {
            return await _mongoDBService.ReadJWT(token);

        }



    }
}
