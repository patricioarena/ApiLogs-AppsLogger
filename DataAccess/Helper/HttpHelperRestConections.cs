using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;

namespace DataAccess.Helper
{
    public class HttpHelperRestConections
    {

        WebClient client;
        public enum backendUrl { BackendeUrl, ServiceUrl, Documentos, Antecedentes }
        public string urlBackend;

        public string Logger_IsActive { get; private set; }
        public string Logger_Include200 { get; private set; }
        public string Logger_ConnectionStrings { get; private set; }

        public HttpHelperRestConections(IConfiguration configuration, backendUrl backendUrl)
        {
            client = new WebClient();
            client.Encoding = System.Text.Encoding.UTF8;
            client.Headers[HttpRequestHeader.ContentType] = "application/json";

            Logger_IsActive = configuration.GetSection("SQLServerLogger").GetSection("IsActive").Value;
            Logger_Include200 = configuration.GetSection("SQLServerLogger").GetSection("Include200").Value;
            Logger_ConnectionStrings = configuration.GetSection("SQLServerLogger").GetSection("ConnectionStrings").Value;

            urlBackend = configuration.GetSection("Url").GetSection(backendUrl.ToString()).Value;
        }

        public HttpHelperRestConections(IConfiguration configuration)
        {
            client = new WebClient();
            client.Encoding = System.Text.Encoding.UTF8;
            client.Headers[HttpRequestHeader.ContentType] = "application/json";

            Logger_IsActive = configuration.GetSection("SQLServerLogger").GetSection("IsActive").Value;
            Logger_Include200 = configuration.GetSection("SQLServerLogger").GetSection("Include200").Value;
            Logger_ConnectionStrings = configuration.GetSection("SQLServerLogger").GetSection("ConnectionStrings").Value;

            urlBackend = configuration.GetSection("Url").GetSection(backendUrl.BackendeUrl.ToString()).Value;
        }

        public IActionResult restCallGet(string uri, Controller api)
        {
            string nada;
            return restCallGet(uri, api, out nada);
        }

        public IActionResult restCallGet(string uri, Controller api, out string content)
        {
            int statusCode = 0;
            Exception exception = null;

            bool tieneAuthorizationBasic = false;
            JObject jsonHeaders = new JObject();
            string responseString = string.Empty;
            try
            {
                jsonHeaders.Add("URL", urlBackend + uri);
                if (api.Request.Headers.ContainsKey("Authorization"))
                {
                    if (api.Request.Headers["Authorization"].ToString().Contains("Basic"))
                    {
                        client.Headers["Authorization"] = api.Request.Headers["Authorization"].ToString();
                        tieneAuthorizationBasic = true;
                    }
                }
                if (!tieneAuthorizationBasic)
                {
                    client.UseDefaultCredentials = true;
                }


                responseString = client.DownloadString(urlBackend + uri);
                api.Response.StatusCode = StatusCodes.Status200OK;
                statusCode = api.Response.StatusCode;
                content = responseString;
                JObject json = new JObject();

                try
                {
                    json = JObject.Parse(content);
                    json.Add("request headers", jsonHeaders);
                    return api.Content(json.ToString(), "application/json");
                }
                catch (Exception e)
                {
                    exception = e;
                    if (api.Response.StatusCode == 200 && e.Source == "Newtonsoft.Json")
                    {
                        var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "El servicio origen posee una respuesta NO estandarizada", responseString);
                        responseString = JsonConvert.SerializeObject(responseApi);
                        JObject responseJson = JObject.Parse(responseString);
                        responseJson.Add("request headers", jsonHeaders);
                        content = responseString;
                        return api.Content(responseJson.ToString(), "application/json");
                    }
                }
                return api.Content(json.ToString(), "application/json");
            }
            catch (WebException we)
            {
                exception = we; // Para guardar en logger
                statusCode = (int)HttpStatusCode.InternalServerError;
                if (we.Status == WebExceptionStatus.ProtocolError)
                {
                    var response = we.Response as HttpWebResponse;
                    if (response != null)
                    {
                        statusCode = (int)response.StatusCode;
                        using (StreamReader r = new StreamReader(((HttpWebResponse)we.Response).GetResponseStream()))
                        {
                            responseString = r.ReadToEnd();
                        }
                    }
                }
                api.Response.StatusCode = statusCode;
                if (statusCode == 401)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "El Api Backend no esta recibiendo el header authorization", null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);

                }
                if (statusCode == 404)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "la url: '" + urlBackend + uri + "' de backend no existe", null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);
                }
                if (statusCode == 403)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "no tiene permisos para acceder al endpoint: '" + urlBackend + uri, null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);
                }
                content = responseString;
                return api.Content(responseString, "application/json");
            }
            catch (Exception e)
            {
                exception = e; // Para guardar en logger
                var errorObject = new JObject();
                errorObject.Add("error", e.Message);
                errorObject.Add("url", urlBackend + uri);
                api.Response.StatusCode = StatusCodes.Status500InternalServerError;
                statusCode = api.Response.StatusCode;
                new ResponseApi<JObject>((HttpStatusCode)statusCode, e.Message, errorObject);
                content = responseString;
                return new JsonResult(errorObject);
            }
            finally
            {
                this.CustomLogger(
                    controller: api,
                    pathBaseBackend: urlBackend,
                    pathBackend: uri,
                    requestBody: null,
                    statusCode: statusCode,
                    exception: exception,
                    responseBody: responseString
                    );
            }
        }

        public IActionResult restCallPost(string uri, object body, Controller api)
        {
            string nada = "";
            return restCallPost(uri, body, api, out nada);
        }

        public IActionResult restCallPost(string uri, object body, Controller api, out string content)
        {
            int statusCode = 0;
            Exception exception = null;

            bool tieneAuthorizationBasic = false;
            JObject jsonHeaders = new JObject();
            string serialisedBody = string.Empty;
            string responseString = string.Empty;

            try
            {
                jsonHeaders.Add("URL", urlBackend + uri);
                if (api.Request.Headers.ContainsKey("Authorization"))
                {
                    if (api.Request.Headers["Authorization"].ToString().Contains("Basic"))
                    {
                        client.Headers["Authorization"] = api.Request.Headers["Authorization"].ToString();
                        tieneAuthorizationBasic = true;
                    }
                }
                if (!tieneAuthorizationBasic)
                {
                    client.UseDefaultCredentials = true;
                }

                serialisedBody = JsonConvert.SerializeObject(body);

                responseString = client.UploadString(urlBackend + uri, serialisedBody);
                api.Response.StatusCode = StatusCodes.Status200OK;
                statusCode = api.Response.StatusCode;
                content = responseString;
                JObject json = new JObject();

                try
                {
                    json = JObject.Parse(content);
                    json.Add("request headers", jsonHeaders);
                    return api.Content(json.ToString(), "application/json");
                }
                catch (Exception e)
                {
                    exception = e;
                    if (api.Response.StatusCode == 200 && e.Source == "Newtonsoft.Json")
                    {
                        var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "El servicio origen posee una respuesta NO estandarizada", responseString);
                        responseString = JsonConvert.SerializeObject(responseApi);
                        JObject responseJson = JObject.Parse(responseString);
                        responseJson.Add("request headers", jsonHeaders);
                        content = responseString;
                        return api.Content(responseJson.ToString(), "application/json");
                    }
                }
                return api.Content(json.ToString(), "application/json");
            }
            catch (WebException we)
            {
                exception = we; // Para guardar en logger
                statusCode = (int)HttpStatusCode.InternalServerError;
                if (we.Status == WebExceptionStatus.ProtocolError)
                {
                    var response = we.Response as HttpWebResponse;
                    if (response != null)
                    {
                        statusCode = (int)response.StatusCode;
                        using (StreamReader r = new StreamReader(((HttpWebResponse)we.Response).GetResponseStream()))
                        {
                            responseString = r.ReadToEnd();
                        }
                    }
                }
                api.Response.StatusCode = statusCode;
                if (statusCode == 401)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "El Api Backend no esta recibiendo el header authorization", null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);
                }
                if (statusCode == 404)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "la url: '" + urlBackend + uri + "' de backend no existe", null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);
                }
                if (statusCode == 403)
                {
                    var responseApi = new ResponseApi<string>((HttpStatusCode)statusCode, "no tiene permisos para acceder al endpoint: '" + urlBackend + uri, null);
                    responseString = JsonConvert.SerializeObject(responseApi);
                    JObject responseJson = JObject.Parse(responseString);
                    responseJson.Add("request headers", jsonHeaders);
                    responseString = JsonConvert.SerializeObject(responseJson);
                }
                content = responseString;
                return api.Content(responseString, "application/json");
            }
            catch (Exception e)
            {
                exception = e;
                var errorObject = new JObject();
                errorObject.Add("error", e.Message);
                errorObject.Add("url", urlBackend + uri);
                api.Response.StatusCode = StatusCodes.Status500InternalServerError;
                statusCode = api.Response.StatusCode;
                new ResponseApi<JObject>((HttpStatusCode)statusCode, e.Message, errorObject);
                content = responseString;
                return new JsonResult(errorObject);
            }
            finally
            {
                this.CustomLogger(
                    controller: api,
                    pathBaseBackend: urlBackend,
                    pathBackend: uri,
                    requestBody: serialisedBody,
                    statusCode: statusCode,
                    exception: exception,
                    responseBody: responseString
                    );
            }
        }

        private Response CustomLogger(
            Controller controller,
            string pathBaseBackend,
            string pathBackend,
            string requestBody,
            int statusCode,
            Exception exception,
            string responseBody
            )
        {
            try
            {
                bool IsActive = Convert.ToBoolean(Logger_IsActive);
                if (IsActive.Equals(true))
                {
                    bool Include200 = Convert.ToBoolean(Logger_Include200);
                    if (Include200.Equals(true) && statusCode == StatusCodes.Status200OK)
                    {
                        return this.AddRequestResposeLog(
                             controller: controller,
                             pathBaseBackend: pathBaseBackend,
                             pathBackend: pathBackend,
                             requestBody: requestBody,
                             statusCode: statusCode,
                             exception: exception,
                             responseBody: responseBody
                             );
                    }
                    if (Include200.Equals(false) && statusCode != StatusCodes.Status200OK)
                    {
                        return this.AddRequestResposeLog(
                            controller: controller,
                            pathBaseBackend: pathBaseBackend,
                            pathBackend: pathBackend,
                            requestBody: requestBody,
                            statusCode: statusCode,
                            exception: exception,
                            responseBody: responseBody
                            );
                    }
                    if (Include200.Equals(true) && statusCode != StatusCodes.Status200OK)
                    {
                        return this.AddRequestResposeLog(
                            controller: controller,
                            pathBaseBackend: pathBaseBackend,
                            pathBackend: pathBackend,
                            requestBody: requestBody,
                            statusCode: statusCode,
                            exception: exception,
                            responseBody: responseBody
                            );
                    }
                    if (Include200.Equals(false) && statusCode == StatusCodes.Status200OK)
                    {
                        return null;
                    }
                }

                return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private Response AddRequestResposeLog(
            Controller controller,
            string pathBaseBackend,
            string pathBackend,
            string? requestBody,
            int statusCode,
            Exception exception,
            string responseBody
            )
        {
            try
            {
                var callerIdentity = controller.HttpContext.User.Identity as WindowsIdentity;
                var username = callerIdentity.Name;
                var pathFrontend = controller.Request.Path.ToString();
                var schema = controller.Request.Scheme;
                var host = controller.Request.Host;
                string? queryString = controller.Request.QueryString.ToString();
                var pathBaseFrontend = controller.Request.PathBase.ToString();
                var requestMethod = controller.Request.Method;

                string UrlRequestFrontend = schema + "://" + host + pathBaseFrontend + pathFrontend;
                string UrlRequestBackend = pathBaseBackend + pathBackend;

                #region Normalización de nulos para enviarlos a db
                string? exceptionStr = null;
                if (exception != null)
                    exceptionStr = exception.ToString();

                if (requestBody != null)
                {
                    if (requestBody.Equals("null"))
                        requestBody = null;
                }

                if (queryString.Equals(string.Empty))
                    queryString = null;
                #endregion

                #region Copia de headers, no se guardan credenciales
                JObject jsonRequestHeaders = new JObject();
                foreach (var oneHeader in controller.Request.Headers)
                {
                    var header = oneHeader.Key;
                    var value = oneHeader.Value.FirstOrDefault();

                    if (header == "Authorization")
                    {
                        jsonRequestHeaders.Add(header, "Basic ************");
                    }
                    else
                    {
                        jsonRequestHeaders.Add(header, value);
                    }
                }
                string requestHeaders = JsonConvert.SerializeObject(jsonRequestHeaders);
                #endregion

                DbManager manager = new DbManager(Logger_ConnectionStrings);
                List<DbParameter> parameters = new List<DbParameter>();

                parameters.Add(new DbParameter("Username", System.Data.ParameterDirection.Input, username));
                parameters.Add(new DbParameter("RequestMethod", System.Data.ParameterDirection.Input, requestMethod));
                parameters.Add(new DbParameter("UrlRequestFrontend", System.Data.ParameterDirection.Input, UrlRequestFrontend));
                parameters.Add(new DbParameter("UrlRequestBackend", System.Data.ParameterDirection.Input, UrlRequestBackend));
                parameters.Add(new DbParameter("QueryString", System.Data.ParameterDirection.Input, queryString));
                parameters.Add(new DbParameter("RequestHeaders", System.Data.ParameterDirection.Input, requestHeaders));
                parameters.Add(new DbParameter("RequestBody", System.Data.ParameterDirection.Input, requestBody));
                parameters.Add(new DbParameter("FrontendException", System.Data.ParameterDirection.Input, exceptionStr));
                parameters.Add(new DbParameter("BackendResponse", System.Data.ParameterDirection.Input, responseBody));
                parameters.Add(new DbParameter("StatusCode", System.Data.ParameterDirection.Input, statusCode));

                return manager.ExecuteSingle<Response>("dbo.AddRequestResposeLog", parameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private class Response
        {
            public int? New_Identity { get; set; }
        }
    }
}
