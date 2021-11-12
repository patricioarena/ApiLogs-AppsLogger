using Application.IFactory;
using Application.IServices;
using DataAccess.Helper;
using DataAccess.Models;
using Domain.DTOs;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
            var list = _dbManager.ExecuteList<AddRequestResposeLog>("dbo.GetMoreInformation", parameters);

            List<MoreInformationDTO> listDTO = _Service.Mapper().Map<List<AddRequestResposeLog>, List<MoreInformationDTO>>(list);

            return listDTO;
        }

        public List<AddRequestResposeLogPartialDTO> GetPartialLogs(List<DbParameter> parameters)
        {

            var list = _dbManager.ExecuteList<AddRequestResposeLog>("dbo.GetPartialLogs", parameters);

            List<AddRequestResposeLogPartialDTO> listDTO = _Service.Mapper().Map<List<AddRequestResposeLog>, List<AddRequestResposeLogPartialDTO>>(list);

            return listDTO;
        }

        public List<AppLoggerConfigurationDTO> GetLoggersAppsConfiguration(List<DbParameter> parameters)
        {
            var list = _dbManager.ExecuteList<AppLoggerConfiguration>("dbo.GetConfigurations", parameters);

            List<AppLoggerConfigurationDTO> listDTO = _Service.Mapper().Map<List<AppLoggerConfiguration>, List<AppLoggerConfigurationDTO>>(list);

            return listDTO;
        }

        public List<AppLoggerStadisticDTO> GetStadistics(List<DbParameter> parameters)
        {           
            var list = _dbManager.ExecuteList<AppLoggerStadistic>("dbo.GetStadistics");

            List<AppLoggerStadisticDTO> listDTO = _Service.Mapper().Map<List<AppLoggerStadistic>, List<AppLoggerStadisticDTO>>(list);

            return listDTO;

        }

        public List<AppLoggerConfigurationDTO> updateAppConfiguration(List<DbParameter> parameters)
        {
            var list = _dbManager.ExecuteList<AppLoggerConfiguration>("dbo.SetAppConfiguration", parameters);

            List<AppLoggerConfigurationDTO> listDTO = _Service.Mapper().Map<List<AppLoggerConfiguration>, List<AppLoggerConfigurationDTO>>(list);

            return listDTO;
        }

        public List<AppLoggerConfigurationDTO> AddAppConfiguration(List<DbParameter> parameters)
        {
            var list = _dbManager.ExecuteList<AppLoggerConfiguration>("dbo.AddAppConfiguration", parameters);

            List<AppLoggerConfigurationDTO> listDTO = _Service.Mapper().Map<List<AppLoggerConfiguration>, List<AppLoggerConfigurationDTO>>(list);

            return listDTO;
        }

        public NewIdentityDTO AddRequestResposeLog(List<DbParameter> parameters)
        {
            NewIdentityDTO identityDTO = _dbManager.ExecuteSingle<NewIdentityDTO>("dbo.AddRequestResposeLog", parameters);

            //List<AppLoggerConfigurationDTO> listDTO = _Service.Mapper().Map<List<AddRequestResposeLog>, List<AppLoggerConfigurationDTO>>(list);

            return identityDTO;
        }
    }
}
