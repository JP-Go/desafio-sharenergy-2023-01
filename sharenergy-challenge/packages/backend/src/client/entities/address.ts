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

  public get props() {
    return this._props;
  }

  public get city() {
    return this.props.city;
  }
  public get cep() {
    return this.props.cep;
  }
  public get state() {
    return this.props.state;
  }
  public get street() {
    return this.props.street;
  }
  public get number() {
    return this.props.number;
  }
}
