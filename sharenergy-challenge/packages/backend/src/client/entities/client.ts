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

  public get id(): string | null {
    return this.id;
  }
  public get name(): string {
    return this.props.name;
  }
  public get email(): string {
    return this.props.email;
  }
  public get phone(): string {
    return this.props.phone;
  }
  public get address(): Address {
    return this.props.address;
  }
  public get cpf(): string {
    return this.props.cpf;
  }
}
