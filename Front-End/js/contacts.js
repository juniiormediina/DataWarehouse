const contactsContainer = document.getElementById("contactsContainer");

const findContacts = () => {
  fetch("http://localhost:4000/api/contact/find")
    .then((res) => res.json())
    .then((contacts) => {
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
};

findContacts();
