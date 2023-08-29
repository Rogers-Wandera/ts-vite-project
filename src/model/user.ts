interface user {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default class userclass implements user {
  constructor(
    private _id: string,
    private _username: string,
    private _email: string,
    private _password: string
  ) {
    this._id = _id;
    this._username = _username;
    this._email = _email;
    this._password = _password;
  }
  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }
  get username(): string {
    return this._username;
  }
  set username(username: string) {
    this._username = username;
  }
  get email(): string {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }
  get password(): string {
    return this._password;
  }
  set password(password: string) {
    this._password = password;
  }
}
