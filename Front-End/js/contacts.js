let token = JSON.parse(window.localStorage.getItem("token"));

let formAdd = document.querySelectorAll("#contactForm input,select");
const contactsContainer = document.getElementById("contactsContainer");
const contactModal = document.getElementById("contactModal");

const findContacts = () => {
  fetch("http://localhost:4000/api/contact/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((contacts) => {
      console.log(contacts);
      contacts.forEach((element) => {
        const {
          id,
          fullName,
          email,
          country,
          region,
          company,
          position,
          interest,
        } = element;
        if (interest >= 50) {
          color = "success";
        } else {
          color = "danger";
        }
        let renderContacts = `
          <div class="contact">
            <input type="checkbox" class="select">
            <h3 class="name">${fullName}</h3>
            <p class="email">${email}</p>
            <h3 class="country">${country}</h3>
            <p class="region">${region}</p>
            <h3 class="company">${company}</h3>
            <h3 class="position">${position}</h3>
            <div class="progress">
              <div class="progress-bar bg-${color}" role="progressbar" style="width: ${interest}%" aria-valuenow="${interest}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <i class="fas fa-edit" data-toggle="modal" data-target="#addContact"></i>
            <i class="far fa-trash-alt" onclick="deleteContact(${id})"></i>
          </div>
        `;
        contactsContainer.insertAdjacentHTML("beforeend", renderContacts);
      });
    });
};

findContacts();

const addContact = () => {
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

/* Delete users from the page */
const deleteContact = (id) => {
  openDelete();
  confirmDelete.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/contact/deleteContactById/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
    }).then((contact) => {
      console.log(contact);
      location.reload();
    });
  });
};

/* to list users from the page */

/* Add users from the page */

/* Update users from the page */

/* Delete users from the page */

/* functions for opening, closing, cleaning and deletion confirmation modal */
let close = () => {
  $("#addContact").modal("hide");
};

let clear = () => {
  formAdd.forEach((input) => {
    input.value = "";
  });
};

contactModal.addEventListener("click", () => {
  clear();
});

let open = () => {
  $("#addContact").modal("show");
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};
