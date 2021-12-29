import { errorCodeName } from '@const/index';

export class ErrorException extends Error {
  public status: number = 500;

  public metaData: unknown = null;

  constructor(
    name: string = errorCodeName.UnknownError,
    metaData: unknown = null
  ) {
    super(name);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.status = 500;
    this.metaData = metaData;
    switch (name) {
      case errorCodeName.ClientError:
        this.status = 400;
        break;
      case errorCodeName.Unauthenticated:
        this.status = 401;
        break;
      case errorCodeName.Forbidden:
        this.status = 403;
        break;
      case errorCodeName.NotFound:
        this.status = 404;
        break;
      case errorCodeName.MethodNotAllowed:
        this.status = 405;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
