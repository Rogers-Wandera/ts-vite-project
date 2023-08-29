import userclass from "./user";

interface usersmodel {
  userslist: userclass[];
  addUser: (user: userclass) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, user: userclass) => void;
  loadUsers: () => void;
}

export default class usersclass implements usersmodel {
  static instance: usersclass = new usersclass();
  editId: string;
  constructor(private users: userclass[] = []) {
    this.users = users;
    this.editId = "";
  }
  get userslist(): userclass[] {
    return this.users;
  }
  saveUser(): void {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  loadUsers(): void {
    const stringified: string | null = localStorage.getItem("users");
    if (typeof stringified !== "string") return;
    const parsedusers: {
      _id: string;
      _username: string;
      _email: string;
      _password: string;
    }[] = JSON.parse(stringified);
    parsedusers.forEach((user) => {
      const newItem = new userclass(
        user._id,
        user._username,
        user._email,
        user._password
      );
      this.addUser(newItem);
    });
  }
  addUser(user: userclass): void {
    this.users.push(user);
    this.saveUser();
  }
  deleteUser(id: string): void {
    const userExists = this.users.find((user) => user.id === id);
    if (userExists) {
      const newarray = this.users.filter((user) => user.id !== userExists.id);
      this.users = newarray;
      this.saveUser();
    }
  }
  updateUser(id: string, userobj: userclass): void {
    const userExists: userclass | undefined = this.users.find(
      (user) => user.id === id
    );
    if (userExists) {
      userExists.username = userobj.username;
      userExists.email = userobj.email;
      userExists.password = userobj.password;
      const newArray = this.users.filter((user) => user.id !== id);
      this.users = [...newArray, userExists];
      this.saveUser();
    }
  }
}
