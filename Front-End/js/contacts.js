const contactsContainer = document.getElementById("contactsContainer");

const findContacts = () => {
  fetch("http://localhost:4000/api/contact/find").then((contactList) => {
    contactList.json().then((contacts) => {
      console.log(contacts);
      contacts.forEach((element) => {
        const {
          name,
          lastname,
          email,
          company,
          region,
          country,
          city,
          address,
          interest,
        } = element;
        let renderContacts = `
          <tr>
              <td></td>
              <td>${name}</td>
              <td>${lastname}</td>
              <td>${email}</td>
              <td>${company}</td>
              <td>${region}</td>
              <td>${country}</td>
              <td>${city}</td>
              <td>${address}</td>
              <td>${interest}</td>
          </tr>
        `;
        contactsContainer.insertAdjacentHTML("beforeend", renderContacts);
      });
    });
  });
};

const dataSet = findContacts();

$(document).ready(function () {
  $("#contacts").DataTable({
    data: dataSet,
    columns: [
      { title: "First name" },
      { title: "Last name" },
      { title: "E-mail" },
      { title: "Company" },
      { title: "Regione" },
      { title: "Country" },
      { title: "City" },
      { title: "Address" },
      { title: "Interest" },
    ],
  });
});

/* --------------------------------------------------------------------------------------------------------- */
