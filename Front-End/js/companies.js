const companiesContainer = document.getElementById("CompaniesContainer");
const formAdd = document.querySelectorAll("#companyForm input,select");
const notification = document.getElementById("notification");
const ModalCompany = document.getElementById("ModalCompany");
const saveCompany = document.getElementById("saveCompany");
const companyCountry = document.getElementById("companyCountry");
const companyCity = document.getElementById("companyCity");

/*get and render data from countries and cities */
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

let showCities = () => {
  companyCity.innerHTML = "";
  let setCitiesOptions = `<option selected></option>`;
  companyCity.insertAdjacentHTML("afterbegin", setCitiesOptions);
  let id = getSelectedOption(companyCountry);
  renderCities(id.dataset.id);
};

const renderCountries = () => {
  fetch(`http://localhost:4000/api/country/find`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((countries) => {
    countries.json().then((countries) => {
      countries.forEach((element) => {
        const { id, name } = element;
        let setCountriesSelect = `
          <option data-id="${id}">${name}</option>
        `;
        companyCountry.insertAdjacentHTML("beforeend", setCountriesSelect);
      });
    });
  });
};

const renderCities = (countryId) => {
  fetch(`http://localhost:4000/api/city/findCountryCity/${countryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((city) => {
    city.json().then((city) => {
      city.forEach((element) => {
        const { id, name } = element;
        let SetCitiesSelect = `
          <option>${name}</option>
        `;
        companyCity.insertAdjacentHTML("beforeend", SetCitiesSelect);
      });
    });
  });
};

renderCountries();

/* to list users from the page */
const findCompanies = () => {
  fetch("http://localhost:4000/api/companies/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((companies) => {
      companies.forEach((element) => {
        const { id, name, country, city, address, email, phone } = element;
        let renderCompanies = `
          <div class="companies" id="company${id}">
            <input type="checkbox" class="select" />
            <h4 class="name">${name}</h4>
            <h4 class="country">${country}</h4>
            <h4 class="city">${city}</h4>
            <h4 class="address">${address}</h4>
            <h4 class="email">${email}</h4>
            <h4 class="phone">${phone}</h4>
            <i class="fas fa-edit" onclick="getDataForUpdateCompany(${id})"></i>
            <i class="far fa-trash-alt" onclick="deleteCompany(${id})"></i>
          </div>
        `;
        companiesContainer.insertAdjacentHTML("beforeend", renderCompanies);
      });
    });
};

findCompanies();

/* Add users from the page */
const getDataForAddCompany = () => {
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
    name: formData.CompanyName,
    country: formData.companyCountry,
    city: formData.companyCity,
    address: formData.companyAddress,
    email: formData.companyEmail,
    phone: formData.companyPhone,
  };

  let dataJSON = JSON.stringify(data);
  addCompany(dataJSON);
};

const addCompany = (data) => {
  event.preventDefault;
  fetch("http://localhost:4000/api/companies/createCompanies", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400)
      notification.innerHTML =
        "The email is already registered in the name of another company";
    else {
      res.json().then((element) => {
        const { id, name, country, city, address, email, phone } = element;
        let renderCompanies = `
          <div class="companies" id="company${id}">
            <input type="checkbox" class="select" />
            <h4 class="name">${name}</h4>
            <h4 class="country">${country}</h4>
            <h4 class="city">${city}</h4>
            <h4 class="address">${address}</h4>
            <h4 class="email">${email}</h4>
            <h4 class="phone">${phone}</h4>
            <i class="fas fa-edit" onclick="getDataForUpdateCompany(${id})"></i>
            <i class="far fa-trash-alt" onclick="deleteCompany(${id})"></i>
          </div>
        `;
        companiesContainer.insertAdjacentHTML("beforeend", renderCompanies);
        close();
        clear();
      });
    }
  });
};

/* Update users from the page */
const getDataForUpdateCompany = (id) => {
  fetch(`http://localhost:4000/api/companies/findCompaniesById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((company) => {
    company.json().then((element) => {
      const { id, name, country, city, address, email, phone } = element;
      ModalCompany.innerHTML = "Edit Company";
      formAdd[0].value = name;
      formAdd[1].value = country;
      formAdd[2].value = city;
      formAdd[3].value = address;
      formAdd[4].value = email;
      formAdd[5].value = phone;
      open();
      saveCompany.onclick = "";
      saveCompany.addEventListener("click", () => {
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
          name: formData.CompanyName,
          country: formData.companyCountry,
          city: formData.companyCity,
          address: formData.companyAddress,
          email: formData.companyEmail,
          phone: formData.companyPhone,
        };

        let dataJSON = JSON.stringify(data);
        updateCompany(id, dataJSON);
        close();
        clear();
      });
    });
  });
};

const updateCompany = (id, data) => {
  fetch(`http://localhost:4000/api/companies/updateCompaniesById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((company) => {
    company.json().then((response) => {
      location.reload();
    });
  });
};

/* Delete users from the page */
const deleteCompany = (id) => {
  openDelete();
  confirmDelete.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/companies/deleteCompaniesById/${id}`, {
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
  $("#addCompany").modal("hide");
};

let clear = () => {
  formAdd.forEach((input) => {
    input.value = "";
  });
};

let open = () => {
  $("#addCompany").modal("show");
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};
