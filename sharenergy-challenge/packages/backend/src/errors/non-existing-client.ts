export class NonExistingClient extends Error {
  constructor(id: string) {
    super(`Cliente com ${id} não existe`);
  }
}
