import { Address } from './address';
import BaseEntity from './base';

export interface ClientProps {
  name: string;
  email: string;
  phone: string;
  address: Address;
  cpf: string;
}

export class Client extends BaseEntity<ClientProps> {
  constructor(props: ClientProps, id?: string) {
    super(props, id);
  }

  public get id() {
    return this.id;
  }
  public get name() {
    return this.props.name;
  }
  public get email() {
    return this.props.email;
  }
  public get phone() {
    return this.props.phone;
  }
  public get address() {
    return this.props.address;
  }
  public get cpf() {
    return this.props.cpf;
  }
}
