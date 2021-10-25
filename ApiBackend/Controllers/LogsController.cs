using ApiBackend.Results;
using Application.IServices;
using DataAccess.Helper;
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
        private readonly IServiceLog _ServiceLog;
        public LogsController(IServiceLog serviceLog)
        {
            _ServiceLog = serviceLog;
        }

        [HttpGet]
        public IActionResult GetLogs(string username = null, string startDate = null, string endDate = null, string appname = null, int pageSize = 100, int page = 1)
        {
            if (username == null || username == "null")
                username = string.Empty;

            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("username", System.Data.ParameterDirection.Input, username));
                parameters.Add(new DbParameter("pageSize", System.Data.ParameterDirection.Input, pageSize));
                parameters.Add(new DbParameter("page", System.Data.ParameterDirection.Input, page));
                parameters.Add(new DbParameter("startDate", System.Data.ParameterDirection.Input, startDate));
                parameters.Add(new DbParameter("endDate", System.Data.ParameterDirection.Input, endDate));
                parameters.Add(new DbParameter("appname", System.Data.ParameterDirection.Input, appname));

                //List<AppLoggerDTO> listLogs = ImpersontedControllerAction<List<DbParameter>, List<AppLoggerDTO>>(_ServiceLog.GetPartialLogs, parameters);
                List<AppLoggerDTO> listLogs = _ServiceLog.GetPartialLogs(parameters);
                return Ok(new Results.ResponseApi<List<AppLoggerDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("MoreInformation/{id}")]
        public IActionResult GetMoreInformation(int id)
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("id", System.Data.ParameterDirection.Input, id));

                List<MoreInformationDTO> listLogs = _ServiceLog.GetMoreInformation(parameters);
                return Ok(new Results.ResponseApi<List<MoreInformationDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
