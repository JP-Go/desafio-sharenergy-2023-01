type CatResourceStatus = 'ok' | 'error';

export class CatResource {
  _url: string | null;
  _status: CatResourceStatus;

  static withOkStatus(resourceUrl: string) {
    return new CatResource(resourceUrl);
  }

  static withError(resourceUrl: string) {
    return new CatResource(resourceUrl, 'error');
  }

  constructor(resourceUrl: string, status: CatResourceStatus = 'ok') {
    this._url = resourceUrl;
    this._status = status;
  }

  get url() {
    return this._url;
  }
  get status() {
    return this._status;
  }
}
