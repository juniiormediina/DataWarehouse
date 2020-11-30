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
      Authorization: "Bearer " + token,
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

const signup = (data) => {
  fetch("http://localhost:4000/api/users/signup", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      notification.innerHTML = "The email already exists";
      return;
    } else {
      res.json().then((users) => {
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
      close();
      clear();
    }
  });
};

/* Update users from the page */
let getDataForUpdate = (id) => {
  fetch(`http://localhost:4000/api/users/findById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
      Authorization: "Bearer " + token,
    },
  }).then((updatedUser) => {
    updatedUser.json().then((response) => {
      location.reload();
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
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
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

/* Sort tags */

function sortByNameA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[0];
      y = rows[i + 1].getElementsByTagName("h3")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByNameZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[0];
      y = rows[i + 1].getElementsByTagName("h3")[0];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByLastNameA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[1];
      y = rows[i + 1].getElementsByTagName("h3")[1];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByLastNameZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[1];
      y = rows[i + 1].getElementsByTagName("h3")[1];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByEmailA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[2];
      y = rows[i + 1].getElementsByTagName("h3")[2];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByEmailZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[2];
      y = rows[i + 1].getElementsByTagName("h3")[2];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByProfileA() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[3];
      y = rows[i + 1].getElementsByTagName("h3")[3];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortByProfileZ() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("usersContainer");
  switching = true;
  while (switching) {
    switching = false;
    rows = document.querySelectorAll(".user");

    for (i = 0; i < rows.length; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("h3")[3];
      y = rows[i + 1].getElementsByTagName("h3")[3];
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
