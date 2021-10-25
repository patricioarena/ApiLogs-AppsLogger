using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class MoreInformationDTO
    {
        public string? QueryString { get; set; }
        public string? RequestHeaders { get; set; }
        public string? RequestBody { get; set; }
        public string? FrontendException { get; set; }
        public string? BackendResponse { get; set; }
    }
}
