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

        public List<MoreInformationDTO> GetMoreInformation(List<DbParameter> parameters)
        {
            var list = _dbManager.ExecuteList<AppLogger>("dbo.GetMoreInformation", parameters);
           
            List<MoreInformationDTO> listDTO = _Service.Mapper().Map<List<AppLogger>, List<MoreInformationDTO>>(list);

            return listDTO;
        }

        public List<AppLoggerDTO> GetPartialLogs(List<DbParameter> parameters)
        {

            var list = _dbManager.ExecuteList<AppLogger>("dbo.GetPartialLogs", parameters);

            List<AppLoggerDTO> listDTO = _Service.Mapper().Map<List<AppLogger>, List<AppLoggerDTO>>(list);

            return listDTO;
        }








    }
}
