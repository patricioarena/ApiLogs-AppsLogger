export class ResponseApi<T> {
  public ok: number;
  public message: string;
  public idUsuario: number;
  public data: T;
  public idJuicio: number;
  public developerMessage: string;
  public errorCode: number;
  public exception: string;

  constructor(obj?: any) {
    this.ok = obj && obj.ok || 0;
    this.message = obj && obj.message || "";
    this.idUsuario = obj && obj.idUsuario || 0;
    this.data = obj && obj.data || null;
    this.idJuicio = obj && obj.idJuicio || 0;
    this.developerMessage = obj && obj.developerMessage || "";
    this.errorCode = obj && obj.errorCode || 0;
    this.exception = obj && obj.exception || "";
  }

}
