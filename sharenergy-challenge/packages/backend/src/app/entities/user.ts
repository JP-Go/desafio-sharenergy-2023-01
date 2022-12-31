export default class User {
  private _avatarUrl: string;
  private _fullName: string;
  private _email: string;
  private _username: string;
  private _age: number;

  private get age() {
    return this._age;
  }
  private set age(age: number) {
    this._age = age;
  }

  private get username() {
    return this._username;
  }
  private set username(username: string) {
    this._username = username;
  }
  private get fullName() {
    return this._fullName;
  }
  private set fullName(fullName: string) {
    this._fullName = fullName;
  }
  private get email() {
    return this._email;
  }
  private set email(email: string) {
    this._email = email;
  }

  private get avatarUrl() {
    return this._avatarUrl;
  }
  private set avatarUrl(avatarUrl: string) {
    this._avatarUrl = avatarUrl;
  }
}
