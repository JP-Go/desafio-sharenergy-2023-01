type CatResourceStatus = 'ok' | 'error';

export class CatResource {
  private _url: URL | null;
  private _status: CatResourceStatus;

  static withOkStatus(resourceUrl: string) {
    return new CatResource(resourceUrl);
  }

  static withError() {
    return new CatResource(null, 'error');
  }

  private constructor(
    resourceUrl: string | null,
    status: CatResourceStatus = 'ok'
  ) {
    this._url = resourceUrl === null ? null : new URL(resourceUrl);
    this._status = status;
  }

  get url() {
    return this._url;
  }
  get status() {
    return this._status;
  }
}
