export default class BaseEntity<T> {
  private _id: string | null;
  private _props: T;

  constructor(props: T, id?: string) {
    this._id = id ?? null;
    this._props = props;
  }

  public get id() {
    return this._id;
  }

  public get props() {
    return this._props;
  }

  public set props(newProps: T) {
    this._props = newProps;
  }
}
