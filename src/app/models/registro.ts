export class Registro{
  id: number;
  timestamp: string;
  username: string;
  requestMethod: string;
  urlRequestFrontend: string;
  urlRequestBackend: string;
  queryString: string;
  requestHeaders: string;
  requestBody: string;
  frontendException: string;
  backendResponse: string;
  statusCode: number | null;
  aplicacion: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || 0;
    this.timestamp = obj && obj.timestamp || "";
    this.username = obj && obj.username || "";
    this.requestMethod = obj && obj.requestMethod || "";
    this.urlRequestFrontend = obj && obj.urlRequestFrontend || "";
    this.urlRequestBackend = obj && obj.urlRequestBackend || "";
    this.queryString = obj && obj.queryString || "";
    this.requestHeaders = obj && obj.requestHeaders || "";
    this.requestBody = obj && obj.requestBody || "";
    this.frontendException = obj && obj.frontendException || "";
    this.backendResponse = obj && obj.backendResponse || "";
    this.statusCode = obj && obj.statusCode || null;
    this.aplicacion = obj && obj.aplicacion || "";
  }
}
