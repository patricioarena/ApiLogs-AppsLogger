export class RegistroDetalle{
  queryString: string;
  requestHeaders: string;
  requestBody: string;
  frontendException: string;
  backendResponse: string;

  constructor(obj?: any) {
    this.queryString = obj && obj.queryString || "";
    this.requestHeaders = obj && obj.requestHeaders || "";
    this.requestBody = obj && obj.requestBody || "";
    this.frontendException = obj && obj.frontendException || "";
    this.backendResponse = obj && obj.backendResponse || "";
  }
}
