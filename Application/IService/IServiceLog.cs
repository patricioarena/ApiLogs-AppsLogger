using Domain.DTOs;
using System.Collections.Generic;

namespace Application.IServices
{
    public interface IServiceLog
    {
        List<AppLoggerDTO> GetLogs();
    }
}