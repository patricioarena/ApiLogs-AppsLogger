using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ApiBackend.Results
{
    public class ResponseApi<T> where T : class
    {
        private object data1;

        public ResponseApi(HttpStatusCode ok, String message = null, T data = null)
        {
            this.ok = ok;
            this.data = data;
            this.message = message;
        }
        public ResponseApi(HttpStatusCode ok, String message = null, T data = null, String developerMessage = null, int errorCode = 0, string ex = null)
        {
            this.ok = ok;
            this.data = data;
            this.message = message;
            this.developerMessage = developerMessage;
            this.errorCode = errorCode;
            this.exception = ex;
        }
        public ResponseApi(Exception e)
        {
            this.data = null;
            if (e is CustomException)
            {
                this.ok = HttpStatusCode.PreconditionFailed;
                this.message = "ha ocurrido un error de aplicacion";
                this.data = null;
                this.errorCode = ((CustomException)e).errorCode;
                this.developerMessage = ((CustomException)e).Message;
                this.exception = e.ToString();
            }
            if (e is SqlException)
            {
                CustomException exception = null;
                if (((SqlException)e).Number == 4060)
                    exception = new CustomException(CustomException.ErrorsEnum.SQL_Sin_Inicio_de_Sesion);
                if (((SqlException)e).Number == 18452)
                    exception = new CustomException(CustomException.ErrorsEnum.SQL_Sin_Sin_Usuario_En_El_Sistema);
                if (exception != null)
                {
                    this.ok = HttpStatusCode.InternalServerError;
                    this.message = "ha ocurrido un error de aplicacion";
                    this.data = null;
                    this.errorCode = exception.errorCode;
                    this.developerMessage = exception.Message;
                    this.exception = e.ToString();
                }
                else
                {
                    this.ok = HttpStatusCode.InternalServerError;
                    this.message = "ha ocurrido un error no controlado en la base";
                    if ((e.InnerException != null) && (e.InnerException.Message != null))
                    {
                        this.developerMessage = e.InnerException.Message;
                        this.exception = e.ToString();
                    }
                    else
                    {
                        this.developerMessage = e.Message;
                        this.exception = e.ToString();
                    }
                }
            }
            else
            {
                this.ok = HttpStatusCode.InternalServerError;
                this.message = "ha ocurrido un error no controlado";
                if ((e.InnerException != null) && (e.InnerException.Message != null))
                {
                    this.developerMessage = e.InnerException.Message;
                    this.exception = e.ToString();
                }
                else
                {
                    this.developerMessage = e.Message;
                    this.exception = e.ToString();
                }
            }
        }

        public ResponseApi(HttpStatusCode oK, string message, object data1)
        {
            ok = oK;
            this.message = message;
            this.data1 = data1;
        }

        public HttpStatusCode ok { get; set; }
        public String message { get; set; }
        public T data { get; set; }
        public String developerMessage { get; set; }
        public int errorCode { get; set; }
        public string exception { get; set; }
    }
}
