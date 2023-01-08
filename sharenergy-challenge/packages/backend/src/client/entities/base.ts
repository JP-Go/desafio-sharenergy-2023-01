export default abstract class BaseEntity<T> {
  protected _id: string | null;
  protected _props: T;

  constructor(props: T, id?: string) {
    this._id = id ?? null;
    this._props = props;
  }
}
