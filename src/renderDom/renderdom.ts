import userclass from "../model/usersmodel";

interface RenderToDom {
  element: HTMLDivElement;
  renderUsers: (users: userclass) => void;
  clearUsers: () => void;
}

export default class renderdomclass implements RenderToDom {
  element: HTMLDivElement;
  static instance: renderdomclass = new renderdomclass();
  constructor() {
    this.element = document.getElementById("renderusers") as HTMLDivElement;
  }

  clearUsers(): void {
    this.element.innerHTML = "";
  }

  renderUsers(users: userclass): void {
    this.clearUsers();
    users.userslist.forEach((user) => {
      const userElement = document.createElement("div");
      const deletebtn = document.createElement("button");
      const edit = document.createElement("button");

      deletebtn.type = "button";
      deletebtn.textContent = "Delete";
      edit.type = "button";
      edit.textContent = "Edit";
      userElement.innerHTML = `
        <div>${user.username}</div>
        <div>${user.email}</div>
        <div>${user.password}</div>
      `;
      userElement.appendChild(deletebtn);
      userElement.appendChild(edit);

      deletebtn.addEventListener("click", () => {
        users.deleteUser(user.id);
        renderdomclass.instance.renderUsers(users);
      });

      edit.addEventListener("click", () => {
        users.editId = user.id;
        const username = document.getElementById(
          "username"
        ) as HTMLInputElement;
        const email = document.getElementById("email") as HTMLInputElement;
        const password = document.getElementById(
          "password"
        ) as HTMLInputElement;
        username.value = user.username;
        email.value = user.email;
        password.value = user.password;
      });

      this.element.appendChild(userElement);
    });
  }
}
