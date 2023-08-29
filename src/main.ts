import userclass from "./model/user";
import usersclass from "./model/usersmodel";
import renderdomclass from "./renderDom/renderdom";

const initApp = () => {
  const users = usersclass.instance;
  const render = renderdomclass.instance;
  const form = document.getElementById("userform") as HTMLFormElement;

  const resetForm = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    username.value = "";
    email.value = "";
    password.value = "";
  };

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (
      !username.value.length &&
      !email.value.length &&
      !password.value.length
    ) {
      return;
    } else {
      const userId: number = users.userslist.length
        ? parseInt(users.userslist[users.userslist.length - 1].id) + 1
        : 1;
      const userobj: userclass = new userclass(
        userId.toString(),
        username.value,
        email.value,
        password.value
      );
      if (users.editId !== "") {
        userobj.id = users.editId;
        users.updateUser(users.editId, userobj);
      } else {
        users.addUser(userobj);
      }
      render.renderUsers(users);
      users.editId = "";
      resetForm();
    }
  });

  users.loadUsers();
  render.renderUsers(users);
};

document.addEventListener("DOMContentLoaded", initApp);
