export default class User {
  private _avatarUrl: string;
  private _fullName: string;
  private _email: string;
  private _username: string;
  private _age: number;

  constructor(
    avatarUrl: string,
    fullName: string,
    email: string,
    username: string,
    age: number
  ) {
    this._avatarUrl = avatarUrl;
    this._fullName = fullName;
    this._email = email;
    this._username = username;
    this._age = age;
  }

  public get age() {
    return this._age;
  }
  private set age(age: number) {
    this._age = age;
  }

  public get username() {
    return this._username;
  }
  private set username(username: string) {
    this._username = username;
  }
  public get fullName() {
    return this._fullName;
  }
  private set fullName(fullName: string) {
    this._fullName = fullName;
  }
  public get email() {
    return this._email;
  }
  private set email(email: string) {
    this._email = email;
  }

  public get avatarUrl() {
    return this._avatarUrl;
  }
  private set avatarUrl(avatarUrl: string) {
    this._avatarUrl = avatarUrl;
  }
}
