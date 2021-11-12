using System;
using System.Collections.Generic;

#nullable disable

namespace DataAccess.Models
{
    public partial class AppLoggerStadistic
    {
        public string Aplicacion { get; set; }
        public int? StatusCode { get; set; }
        public int Cantidad { get; set; }

    }
}
