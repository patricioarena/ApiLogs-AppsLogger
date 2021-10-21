using ApiBackend.Results;
using Application.IServices;
using Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;

namespace ApiBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : CustomController
    {
        private readonly IServiceLog _ServiceLog ;
        public LogsController(IServiceLog serviceLog)
        {
            _ServiceLog = serviceLog;
        }

        [HttpGet]
        public IActionResult GetLogs()
        {
            try
            {
                List<AppLoggerDTO> listLogs = _ServiceLog.GetLogs();
                return Ok(new ResponseApi<List<AppLoggerDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
