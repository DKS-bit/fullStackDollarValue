using Microsoft.AspNetCore.Mvc;
using Lucas.Crud.Api.Services;
using Microsoft.AspNetCore.Cors;
using Lucas.Crud.Api.Entities;

namespace Lucas.Crud.Api.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class RequisitionController : ControllerBase
    {
        private readonly RequisitionService _requisitionService;
        public RequisitionController(RequisitionService requisitionService)
        {
            _requisitionService = requisitionService;
        }

        [EnableCors]
        [HttpPost("ContentExtraction")]
        [DisableRequestSizeLimit]
        public async Task<string> Post([FromBody] ImageRequest imageRequest)
        {
            return await _requisitionService.ContentExtraction(imageRequest);

        }
        [EnableCors]
        [HttpPost("Liveness")]
        [RequestSizeLimit(20000000)]
        public async Task<string> PostLiveness([FromBody] LivenessRequest livenessRequest)
        {
            return await _requisitionService.LivenessRequest(livenessRequest);

        }




    }
}
