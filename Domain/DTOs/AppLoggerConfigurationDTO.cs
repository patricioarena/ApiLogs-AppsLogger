using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.DTOs
{
    public partial class AppLoggerConfigurationDTO
    {
        public int id { get; set; }
        public string Aplicacion { get; set; }
        public bool ActiveLogger { get; set; }
        public bool Include200 { get; set; }
    }
}