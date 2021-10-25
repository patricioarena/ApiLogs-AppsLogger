using System;

namespace Domain.DTOs
{
    public class AppLoggerDTO
    {
        public int id { get; set; }
        public DateTime? Timestamp { get; set; }
        public string Username { get; set; }
        public string RequestMethod { get; set; }
        public string UrlRequestFrontend { get; set; }
        public string UrlRequestBackend { get; set; }
        public int? StatusCode { get; set; }
        public string Aplicacion { get; set; }
    }
}
