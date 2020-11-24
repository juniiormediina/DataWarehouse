let formAdd = document.querySelectorAll("#userForm input,select");
let usersContainer = document.getElementById("usersContainer");
let notification = document.getElementById("notification");
let confirmDelete = document.getElementById("confirmDelete");

console.log(formAdd);

const findUser = () => {
  fetch("http://localhost:4000/api/users/find").then((userList) => {
    userList.json().then((users) => {
      console.log(users);
      users.forEach((element) => {
        const { firstName, lastName, email, profile, id } = element;
        let renderUser = `
            <div class="user">
                <input type="checkbox" class="select" />
                <h3 class="firstName">${firstName}</h3>
                <h3 class="lastName">${lastName}</h3>
                <h3 class="email">${email}</h3>
                <h3 class="profile">${profile}</h3>
                <i class="fas fa-edit" 
                    onclick="validationFormAdd(${id})">
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

const createUser = (Userdata) => {
  fetch("http://localhost:4000/api/users/signup", {
    method: "POST",
    body: Userdata,
    headers: {
      "Content-Type": "application/json",
      //TODO:   Authorization: "Bearer " + token,
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
                <i class="fas fa-edit"></i>
                <i class="far fa-trash-alt"
                    onclick="deleteUser(${id})"
                ></i>
            </div>
        `;
      usersContainer.insertAdjacentHTML("beforeend", renderUser);
    });
  });
  close();
  clear();
};

const validationFormAdd = () => {
  for (let i = 0; i < formAdd.length; i++) {
    /* const element = formAdd[i]; */
    if (formAdd[i].value == "") {
      notification.textContent = "POR FAVOR RELLENE TODOS LOS CAMPOS";
    } else if (formAdd[4].value !== formAdd[5].value) {
      notification.textContent = "LAS CONTRASEÑAS NO COINCIDEN";
    }
  }
  let data = {
    firstName: formAdd[0].value,
    lastName: formAdd[1].value,
    email: formAdd[2].value,
    profile: formAdd[3].value,
    password: formAdd[4].value,
  };
  console.log(data);
  const dataJSON = JSON.stringify(data);
  console.log(dataJSON);
  createUser(dataJSON);
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};

const deleteUser = (id) => {
  /* let objectId = { id: id };
    let jsonId = JSON.stringify(objectId); */
  openDelete();
  confirmDelete.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/users/deleteById/${id}`, {
      method: "DELETE",
      /* headers: {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + token,
        }, */
    }).then((user) => {
      console.log(user);
      location.reload();
    });
  });
};

let close = () => {
  $("#addUser").modal("hide");
};

let clear = () => {
  formAdd.forEach((input) => {
    input.value = "";
  });
};
