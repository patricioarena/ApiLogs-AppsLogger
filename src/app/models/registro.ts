export class Registro{
  id: number;
  timestamp: string;
  level: string;
  exception: string;
  renderedMessage: string;
  properties: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || 0;
    this.timestamp = obj && obj.timestamp || "";
    this.level = obj && obj.level || "";
    this.exception = obj && obj.exception || "";
    this.renderedMessage = obj && obj.renderedMessage || "";
    this.properties = obj && obj.properties || "";
  }

}
