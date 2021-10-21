using Application.IFactory;
using Application.IServices;
using DataAccess.Helper;
using DataAccess.Models;
using Domain.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ServiceLog : IServiceLog
    {
        private readonly IAbstractServiceFactory _Service;
        private readonly IDbManager _dbManager;

        public ServiceLog(IDbManager dbManager, IAbstractServiceFactory service)
        {
            _Service = service;
            _dbManager = dbManager;
        }

        public List<AppLoggerDTO> GetLogs()
        {

            //exec Logger.dbo.FilterLogs
            //    @username = 'par',
            //    @startDate = '2021/07/01',
            //    @endDate = '2021/12/29',
            //    @pageSize = 5,
            //    @page = 1,
            //    @appname = ''

            List<DbParameter> parameters = new List<DbParameter>();

            string username = "par";
            int pageSize = 10;
            int page = 1;

            parameters.Add(new DbParameter("username", System.Data.ParameterDirection.Input, username));
            parameters.Add(new DbParameter("pageSize", System.Data.ParameterDirection.Input, pageSize));
            parameters.Add(new DbParameter("page", System.Data.ParameterDirection.Input, page));

            var list = _dbManager.ExecuteList<AppLogger>("dbo.FilterLogs", parameters);

            List<AppLoggerDTO> listLogDTO = _Service.Mapper().Map<List<AppLogger>, List<AppLoggerDTO>>(list);

            return listLogDTO;
        }








    }
}
