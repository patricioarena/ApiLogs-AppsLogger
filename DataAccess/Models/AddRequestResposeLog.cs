using System;
using System.Collections.Generic;

#nullable disable

namespace DataAccess.Models
{
    public partial class AddRequestResposeLog
    {
        public int id { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Username { get; set; }
        public string RequestMethod { get; set; }
        public string UrlRequestFrontend { get; set; }
        public string UrlRequestBackend { get; set; }
        public string? QueryString { get; set; }
        public string? RequestHeaders { get; set; }
        public string? RequestBody { get; set; }
        public string? FrontendException { get; set; }
        public string? BackendResponse { get; set; }
        public int? StatusCode { get; set; }
        public string Aplicacion { get; set; }
    }
}
