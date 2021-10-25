using DataAccess.Helper;
using Domain.DTOs;
using System.Collections.Generic;

namespace Application.IServices
{
    public interface IServiceLog
    {
        List<AppLoggerDTO> GetPartialLogs(List<DbParameter> parameters);
        List<MoreInformationDTO> GetMoreInformation(List<DbParameter> parameters);
    }
}