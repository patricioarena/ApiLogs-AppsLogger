export class Registro{
  id: number;
  timestamp: string;
  username: string;
  requestMethod: string;
  urlRequestFrontend: string;
  urlRequestBackend: string;
  statusCode: number | null;
  aplicacion: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || 0;
    this.timestamp = obj && obj.timestamp || "";
    this.username = obj && obj.username || "";
    this.requestMethod = obj && obj.requestMethod || "";
    this.urlRequestFrontend = obj && obj.urlRequestFrontend || "";
    this.urlRequestBackend = obj && obj.urlRequestBackend || "";
    this.statusCode = obj && obj.statusCode || null;
    this.aplicacion = obj && obj.aplicacion || "";
  }
}
