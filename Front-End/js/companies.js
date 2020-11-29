let token = JSON.parse(window.localStorage.getItem("token"));

const companiesContainer = document.getElementById("CompaniesContainer");

const findCompanies = () => {
  fetch("http://localhost:4000/api/companies/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
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
        <i class="fas fa-edit" onclick="getCompanyInfo(${id})"></i>
        <i class="far fa-trash-alt" onclick="deleteCompany(${id})"></i>
      </div>`;
        companiesContainer.insertAdjacentHTML("beforeend", renderCompanies);
      });
    });
};

findCompanies();

/* to list users from the page */

/* Add users from the page */

/* Update users from the page */

/* Delete users from the page */

/* functions for opening, closing, cleaning and deletion confirmation modal */
