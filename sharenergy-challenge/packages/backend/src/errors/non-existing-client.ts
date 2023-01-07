export class NonExistingClient extends Error {
  constructor(id: string) {
    super(`Client with id ${id} does not exist`);
  }
}
