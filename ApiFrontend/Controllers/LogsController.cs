using DataAccess.Helper;
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

            if (username != null)
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
    }
}
