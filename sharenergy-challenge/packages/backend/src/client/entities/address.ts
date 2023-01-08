export interface AddressProps {
  city: string;
  cep: string;
  state: string;
  street: string;
  number: string;
}

export class Address {
  private _props: AddressProps;

  constructor(props: AddressProps) {
    this._props = props;
  }

  public get city() {
    return this._props.city;
  }
  public get cep() {
    return this._props.cep;
  }
  public get state() {
    return this._props.state;
  }
  public get street() {
    return this._props.street;
  }
  public get number() {
    return this._props.number;
  }
}
