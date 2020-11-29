let token = JSON.parse(window.localStorage.getItem("token"));

let formAdd = document.querySelectorAll("#contactForm input,select");
let notification = document.getElementById("notification");
const contactsContainer = document.getElementById("contactsContainer");
const contactModal = document.getElementById("contactModal");
const ModalContact = document.getElementById("ModalContact");
const saveContact = document.getElementById("saveContact");
let inputRegion = document.getElementById("inputRegion");
let inputCountry = document.getElementById("inputCountry");
let inputCity = document.getElementById("inputCity");

/*get and render data from countries and cities */

let renderRegions = () => {
  fetch("http://localhost:4000/api/region/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((regionCard) => {
    regionCard.json().then((regionCard) => {
      regionCard.forEach((regionC) => {
        const { id, name } = regionC;
        let region = `<option data-id="${id}">${name}</option>`;
        inputRegion.insertAdjacentHTML("beforeend", region);
      });
    });
  });
};

let renderCountries = (regionId) => {
  fetch(`http://localhost:4000/api/country/findRegionCountry/${regionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((Countries) => {
    Countries.json().then((countries) => {
      countries.forEach((element) => {
        const { id, name } = element;
        let countrySelect = `<option data-id="${id}">${name}</option>`;
        inputCountry.insertAdjacentHTML("beforeend", countrySelect);
      });
    });
  });
};

let showCountries = () => {
  inputCountry.innerHTML = "";
  let option = `<option selected></option>`;
  inputCountry.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputRegion);
  renderCountries(id.dataset.id);
};

let showCities = () => {
  inputCity.innerHTML = "";
  let option = `<option selected></option>`;
  inputCity.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputCountry);
  renderCities(id.dataset.id);
};

let getSelectedOption = (sel) => {
  var opt;
  for (var i = 0, len = sel.options.length; i < len; i++) {
    opt = sel.options[i];
    if (opt.selected === true) {
      break;
    }
  }
  return opt;
};

let renderCities = (countryId) => {
  fetch(`http://localhost:4000/api/city/findCountryCity/${countryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((cityCard) => {
    cityCard.json().then((cityCard) => {
      cityCard.forEach((city) => {
        const { id, name } = city;
        let citySelect = `<option>${name}</option>`;
        inputCity.insertAdjacentHTML("beforeend", citySelect);
      });
    });
  });
};

renderRegions();

/* to list users from the page */
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
            <i class="fas fa-edit" onclick="getDataForUpdateContact(${id})"></i>
            <i class="far fa-trash-alt" onclick="deleteContact(${id})"></i>
          </div>
        `;
        contactsContainer.insertAdjacentHTML("beforeend", renderContacts);
      });
    });
};

findContacts();

/* Add users from the page */
const getDataForAddContact = () => {
  let formData = Array.from(formAdd).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );

  for (const key in formData) {
    if (formData[key] === "") {
      notification.innerHTML = "Please fill all fields";
      return;
    }
  }

  let data = {
    fullName: formData.inputFullName,
    email: formData.inputEmail,
    company: formData.inputCompany,
    region: formData.inputRegion,
    country: formData.inputCountry,
    city: formData.inputCity,
    position: formData.inputPosition,
    interest: formData.inputInterest,
  };

  let dataJSON = JSON.stringify(data);
  addContact(dataJSON);
};

const addContact = (data) => {
  event.preventDefault;
  fetch("http://localhost:4000/api/contact/createContact", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400)
      notification.innerHTML = "The email is already exist";
    else {
      res.json().then((element) => {
        const {
          id,
          fullName,
          email,
          company,
          region,
          country,
          position,
          interest,
        } = element;
        if (interest >= 50) {
          color = "success";
        } else {
          color = "danger";
        }
        let renderContacts = `
          <div class="contact" id="contact${id}">
            <input type="checkbox" class="selectCont" />
            <h3 class="name">${fullName}</h3>
            <p class="email">${email}</p>
            <h3 class="country">${country}</h3>
            <p class="region">${region}</p>
            <h3 class="company">${company}</h3>
            <h3 class="position">${position}</h3>
            <div class="progress">
              <div
                class="progress-bar bg-${color}"
                role="progressbar"
                style="width: ${interest}%"
                aria-valuenow="${interest}"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <i class="fas fa-edit" onclick="getDataForUpdateContact(${id})"></i>
            <i class="far fa-trash-alt" onclick="deleteContact('${id}')"></i>
          </div>
        `;
        contactsContainer.insertAdjacentHTML("beforeend", renderContacts);
        close();
        clear();
      });
    }
  });
};

/* Update users from the page */
const getDataForUpdateContact = (id) => {
  fetch(`http://localhost:4000/api/contact/findContactById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((contact) => {
    contact.json().then((element) => {
      const {
        id,
        fullName,
        email,
        company,
        region,
        country,
        city,
        position,
        interest,
      } = element;

      ModalContact.innerHTML = "Edit Contact";

      formAdd[0].value = fullName;
      formAdd[1].value = email;
      formAdd[2].value = company;
      formAdd[3].value = region;
      formAdd[4].innerHTML = `<option selected>${country}</option>`;
      formAdd[5].innerHTML = `<option selected>${city}</option>`;
      formAdd[6].value = position;
      formAdd[7].value = interest;
      open();

      saveContact.onclick = "";
      saveContact.addEventListener("click", () => {
        let formData = Array.from(formAdd).reduce(
          (acc, input) => ({
            ...acc,
            [input.id]: input.value,
          }),
          {}
        );

        for (const key in formData) {
          if (formData[key] === "") {
            delete formData[key];
          }
        }

        let data = {
          fullName: formData.inputFullName,
          email: formData.inputEmail,
          company: formData.inputCompany,
          region: formData.inputRegion,
          country: formData.inputCountry,
          city: formData.inputCity,
          position: formData.inputPosition,
          interest: formData.inputInterest,
        };

        let dataJSON = JSON.stringify(data);
        updateContact(id, dataJSON);
        close();
        clear();
      });
    });
  });
};

const updateContact = (id, data) => {
  fetch(`http://localhost:4000/api/contact/updateContactById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((contact) => {
    contact.json().then((response) => {
      location.reload();
    });
  });
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
    }).then((response) => {
      location.reload();
    });
  });
};

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
