using DataAccess.Helper;
using Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;

namespace ApiFrontend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : Controller
    {
        private HttpHelperRestConections _httpHelper;

        public LogsController(IConfiguration configuration)
        {
            _httpHelper = new HttpHelperRestConections(configuration, HttpHelperRestConections.backendUrl.BackendeUrl);
        }

        [HttpGet]
        public IActionResult GetLogs(string username = null, string startDate = null, string endDate = null, string appname = null, int pageSize = 100, int page = 1)
        {
            var url = "api/Logs?";

            if (username != null)
                url = url + "&username=" + username;

            if (appname != null)
                url = url + "&appname=" + appname;

            if (startDate != null)
                url = url + "&startDate=" + startDate;

            if (endDate != null)
                url = url + "&endDate=" + endDate;

            if (pageSize != 100)
                url = url + "&pageSize=" + pageSize;

            if (page != 1)
                url = url + "&page=" + page;

            return _httpHelper.restCallGet(url, this);
        }

        [HttpGet("MoreInformation/{id}")]
        public IActionResult GetMoreInformation(int id)
        {
            var url = "api/Logs/MoreInformation/" + id;
            return _httpHelper.restCallGet(url, this);
        }

        [HttpGet("GetConfigurations")]
        public IActionResult GetConfigurations(int? id = null)
        {
 
            var url = "api/Logs/GetConfigurations?";
            if (id != null)
                url = url + "&id=" + id;

            return _httpHelper.restCallGet(url, this);
        }

        [HttpGet("GetStadistics")]
        public IActionResult GetStadistics()
        {
            var url = "api/Logs/GetStadistics";
            return _httpHelper.restCallGet(url, this);
        }

        [HttpPost("UpdateAppConfiguration/{id}")]
        public IActionResult SetAppConfiguration(int id, bool? activeLogger = null, bool? include200 = null)
        {
            var url = "api/Logs/UpdateAppConfiguration/" + id + "?";
            
            if (activeLogger != null)
                url = url + "&activeLogger=" + activeLogger;
            
            if (include200 != null)
                url = url + "&include200=" + include200;

            return _httpHelper.restCallPost(url, null, this);
        }

        [HttpPost("AddAppConfiguration/appname/{appname}/activeLogger/{activeLogger}/include200/{include200}")]
        public IActionResult SetAppConfiguration(string appname, bool activeLogger, bool include200)
        {
            var url = $"api/Logs/AddAppConfiguration/appname/{appname}/activeLogger/{activeLogger}/include200/{include200}";
            return _httpHelper.restCallPost(url, null, this);
        }

        [HttpPost("AddRequestResposeLog")]
        public IActionResult AddRequestResposeLog([FromBody] AddRequestResposeLogDTO model)
        {
            var url = $"api/Logs/AddAppConfiguration";
            return _httpHelper.restCallPost(url, model, this);
        }
    }
}
