let token = JSON.parse(window.localStorage.getItem("token"));

let formAdd = document.querySelectorAll("#userForm input,select");
let usersContainer = document.getElementById("usersContainer");
let saveUser = document.getElementById("saveUser");
let confirmDelete = document.getElementById("confirmDelete");
let notification = document.getElementById("notification");

/* to list users from the page */
const findUser = () => {
  fetch("http://localhost:4000/api/users/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((userList) => {
    userList.json().then((userList) => {
      userList.forEach((element) => {
        const { firstName, lastName, email, profile, id } = element;
        let renderUser = `
          <div class="user">
            <input type="checkbox" class="select" />
            <h3 class="firstName">${firstName}</h3>
            <h3 class="lastName">${lastName}</h3>
            <h3 class="email">${email}</h3>
            <h3 class="profile">${profile}</h3>
            <i class="fas fa-edit" 
              onclick="getDataForUpdate(${id})">
            </i>
            <i class="far fa-trash-alt"
              onclick="deleteUser(${id})">
            </i>
          </div>
        `;
        usersContainer.insertAdjacentHTML("beforeend", renderUser);
      });
    });
  });
};
findUser();

/* Add users from the page */
const addUser = () => {
  for (let i = 0; i < formAdd.length; i++) {
    /* const element = formAdd[i]; */
    if (formAdd[i].value == "") {
      notification.textContent = "Please fill all fields";
      return;
    } else if (formAdd[4].value !== formAdd[5].value) {
      notification.textContent = "Passwords do not match";
      return;
    }
  }
  let data = {
    firstName: formAdd[0].value,
    lastName: formAdd[1].value,
    email: formAdd[2].value,
    profile: formAdd[3].value,
    password: formAdd[4].value,
  };
  const dataJSON = JSON.stringify(data);
  signup(dataJSON);
};

const signup = (Userdata) => {
  fetch("http://localhost:4000/api/users/signup", {
    method: "POST",
    body: Userdata,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((user) => {
    user.json().then((users) => {
      console.log(users);
      const { firstName, lastName, email, profile, id } = users;
      let renderUser = `
        <div class="user">
          <input type="checkbox" class="select" />
          <h3 class="firstName">${firstName}</h3>
          <h3 class="lastName">${lastName}</h3>
          <h3 class="email">${email}</h3>
          <h3 class="profile">${profile}</h3>
          <i class="fas fa-edit" 
            onclick="getDataForUpdate(${id})">
          </i>
          <i class="far fa-trash-alt"
            onclick="deleteUser(${id})">
          </i>
        </div>
      `;
      usersContainer.insertAdjacentHTML("beforeend", renderUser);
    });
  });
  close();
  clear();
};

/* Update users from the page */
let getDataForUpdate = (id) => {
  fetch(`http://localhost:4000/api/users/findById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((user) => {
    user.json().then((userData) => {
      const { firstName, lastName, email, profile } = userData;
      formAdd[0].value = firstName;
      formAdd[1].value = lastName;
      formAdd[2].value = email;
      formAdd[3].value = profile;
      open();
      saveUser.onclick = "";
      saveUser.addEventListener("click", () => {
        let form = Array.from(formAdd).reduce(
          (acc, input) => ({
            ...acc,
            [input.id]: input.value,
          }),
          {}
        );
        for (const key in form) {
          if (form[key] === "") {
            delete form[key];
          }
        }
        let data = {
          firstName: form.inputUserName,
          lastName: form.inputUserLastName,
          email: form.inputEmail,
          profile: form.inputProfile,
          password: form.inputPassword,
        };

        let dataJSON = JSON.stringify(data);
        updateUser(id, dataJSON);

        console.log(id);
        console.log(dataJSON);

        close();
        clear();
      });
    });
  });
};

let updateUser = (id, data) => {
  fetch(`http://localhost:4000/api/users/updateById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((updatedUser) => {
    updatedUser.json().then((userUpd) => {
      location.reload();
      console.log(userUpd);
    });
  });
};

/* Delete users from the page */
const deleteUser = (id) => {
  openDelete();
  confirmDelete.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/users/deleteById/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }).then((user) => {
      console.log(user);
      location.reload();
    });
  });
};

/* functions for opening, closing, cleaning and deletion confirmation modal */
let close = () => {
  $("#addUser").modal("hide");
};

let clear = () => {
  formAdd.forEach((input) => {
    input.value = "";
  });
};

let open = () => {
  $("#addUser").modal("show");
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};
