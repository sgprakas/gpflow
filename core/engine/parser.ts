import Handlebars from "handlebars";

export class TemplateParser {
  static parse<T>(data: any, context: Record<string, any>): T {
    if (typeof data === "string") {
      const template = Handlebars.compile(data);
      return template(context) as unknown as T;
    }

    if (Array.isArray(data)) {  
      return data.map(item => this.parse(item, context)) as unknown as T;
    }

    if (typeof data === "object" && data !== null) {
      const parsed: Record<string, any> = {};
      for (const key in data) {
        parsed[key] = this.parse(data[key], context);
      }
      return parsed as T;
    }

    return data;
  }
}