using DataAccess.Helper;
using Domain.DTOs;
using System.Collections.Generic;

namespace Application.IServices
{
    public interface IServiceLog
    {
        List<AddRequestResposeLogPartialDTO> GetPartialLogs(List<DbParameter> parameters);
        List<MoreInformationDTO> GetMoreInformation(List<DbParameter> parameters);
        List<AppLoggerConfigurationDTO> GetLoggersAppsConfiguration(List<DbParameter> parameters);
        List<AppLoggerStadisticDTO> GetStadistics(List<DbParameter> parameters);
        List<AppLoggerConfigurationDTO> updateAppConfiguration(List<DbParameter> parameters);
        List<AppLoggerConfigurationDTO> AddAppConfiguration(List<DbParameter> parameters);
        NewIdentityDTO AddRequestResposeLog(List<DbParameter> parameters);
    }
}