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
                List<AddRequestResposeLogPartialDTO> listLogs = _ServiceLog.GetPartialLogs(parameters);
                return Ok(new Results.ResponseApi<List<AddRequestResposeLogPartialDTO>>(HttpStatusCode.OK, "Ok", listLogs));
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

        [HttpGet("GetConfigurations")]
        public IActionResult GetConfigurations(int? id = null)
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                if (id != null)
                    parameters.Add(new DbParameter("id", System.Data.ParameterDirection.Input, id));

                List<AppLoggerConfigurationDTO> listLogs = _ServiceLog.GetLoggersAppsConfiguration(parameters);
                return Ok(new Results.ResponseApi<List<AppLoggerConfigurationDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("GetStadistics")]
        public IActionResult GetStadistics()
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                List<AppLoggerStadisticDTO> listLogs = _ServiceLog.GetStadistics(parameters);
                return Ok(new Results.ResponseApi<List<AppLoggerStadisticDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("UpdateAppConfiguration/{id}")]
        public IActionResult updateAppConfiguration(int id, bool? activeLogger = null, bool? include200 = null)
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("id", System.Data.ParameterDirection.Input, id));

                if(activeLogger != null)
                    parameters.Add(new DbParameter("activeLogger", System.Data.ParameterDirection.Input, activeLogger));
                
                if(include200 != null)
                    parameters.Add(new DbParameter("include200", System.Data.ParameterDirection.Input, include200));


                List<AppLoggerConfigurationDTO> listLogs = _ServiceLog.updateAppConfiguration(parameters);
                return Ok(new Results.ResponseApi<List<AppLoggerConfigurationDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("AddAppConfiguration/appname/{appname}/activeLogger/{activeLogger}/include200/{include200}")]
        public IActionResult AddAppConfiguration(string appname, bool activeLogger, bool include200)
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("appname", System.Data.ParameterDirection.Input, appname));
                parameters.Add(new DbParameter("activeLogger", System.Data.ParameterDirection.Input, activeLogger));
                parameters.Add(new DbParameter("include200", System.Data.ParameterDirection.Input, include200));

                List<AppLoggerConfigurationDTO> listLogs = _ServiceLog.AddAppConfiguration(parameters);
                return Ok(new Results.ResponseApi<List<AppLoggerConfigurationDTO>>(HttpStatusCode.OK, "Ok", listLogs));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        [HttpPost("AddRequestResposeLog")]
        public IActionResult AddRequestResposeLog([FromBody] AddRequestResposeLogDTO model)
        {
            try
            {
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("Username", System.Data.ParameterDirection.Input, model.Username));                          // Logger usuario de frontend
                parameters.Add(new DbParameter("RequestMethod", System.Data.ParameterDirection.Input, model.RequestMethod)); 
                parameters.Add(new DbParameter("UrlRequestFrontend", System.Data.ParameterDirection.Input, model.UrlRequestFrontend));      // Url en el navegador
                parameters.Add(new DbParameter("UrlRequestBackend", System.Data.ParameterDirection.Input, model.UrlRequestBackend));        // Url a la que llama
                parameters.Add(new DbParameter("QueryString", System.Data.ParameterDirection.Input, model.QueryString));
                parameters.Add(new DbParameter("RequestHeaders", System.Data.ParameterDirection.Input, model.RequestHeaders));              // Dejar en blanco
                parameters.Add(new DbParameter("RequestBody", System.Data.ParameterDirection.Input, model.RequestBody));
                parameters.Add(new DbParameter("FrontendException", System.Data.ParameterDirection.Input, model.FrontendException));        // Error de frontend
                parameters.Add(new DbParameter("BackendResponse", System.Data.ParameterDirection.Input, model.BackendResponse));            // 
                parameters.Add(new DbParameter("StatusCode", System.Data.ParameterDirection.Input, model.StatusCode));

                NewIdentityDTO identityDTO = _ServiceLog.AddRequestResposeLog(parameters);
                return Ok(new Results.ResponseApi<NewIdentityDTO>(HttpStatusCode.OK, "Ok", identityDTO));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
