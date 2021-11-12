using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.DTOs
{
    public partial class AppLoggerStadisticDTO
    {
        public string Aplicacion { get; set; }
        public int? StatusCode { get; set; }
        public int Cantidad { get; set; }

    }
}
