let token = JSON.parse(window.localStorage.getItem("token"));
let regions_city_container = document.getElementById("regions_city_container");
/*  */
let regionName = document.getElementById("regionName");
let ModalRegion = document.getElementById("ModalRegion");
let saveRegion = document.getElementById("saveRegion");
let confirmDeleteRegion = document.getElementById("confirmDeleteRegion");
let notification = document.getElementById("notification");
/*  */
let CountryName = document.getElementById("CountryName");
let ModalCountry = document.getElementById("ModalCountry");
let saveCountry = document.getElementById("saveCountry");
let confirmDeleteCountry = document.getElementById("confirmDeleteCountry");
let notificationCountry = document.getElementById("notificationCountry");
/*  */
let confirmDeleteCity = document.getElementById("confirmDeleteCity");
let cityName = document.getElementById("cityName");
let ModalCity = document.getElementById("ModalCity");
let saveCity = document.getElementById("saveCity");
let notificationCity = document.getElementById("notificationCity");

/* to list region, country and cities from the page */
const findRegion = () => {
  fetch("http://localhost:4000/api/region/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((regionList) => {
    regionList.json().then((regionList) => {
      regionList.forEach((element) => {
        const { id, name } = element;
        let renderRegion = `
          <section class="region" id=regionId${id}>
            <h2 class="regionTittle">
              <b><a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">${name}</a></b>
            </h2>
            <i class="fas fa-edit" onclick="getDataForUpdateRegion(${id}, '${name}')"></i>
            <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
            <i class="fas fa-plus" onclick="getDataForAddCountry(${id})"></i>
            <div class="row">
              <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                  <div class="card card-bodyCo" id="countryCard${id}">
                  </div>
                </div>
              </div>
            </div>
          </section>
        `;
        regions_city_container.insertAdjacentHTML("beforeend", renderRegion);
        findCountry(id);
      });
    });
  });
};

findRegion();

const findCountry = (id) => {
  fetch(`http://localhost:4000/api/country/findCountryById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((country) => {
    country.json().then((element) => {
      const { id, name, RegionId } = element;
      let countryCard = document.querySelector(`#countryCard${RegionId}`);
      let renderCountry = `
        <div class="countryContainer" id="countryC${id}">
          <h4 class="coTitle">
            <a
              class="regionTree"
              data-toggle="collapse"
              href="#cityCollapse${id}"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >${name}</a>
          </h4>
          <i class="fas fa-edit" onclick="getDataForUpdateCountry(${id}, '${name}')"></i>
          <i class="far fa-trash-alt" onclick="deleteCountry(${id})"></i>
          <i class="fas fa-plus" onclick="getDataForAddCity(${id})"></i>
        </div>
        <div class="col cityContainer">
          <div class="collapse multi-collapse" id="cityCollapse${id}">
          </div>
        </div>
      `;
      countryCard.insertAdjacentHTML("beforeend", renderCountry);
      findCity(id);
    });
  });
};

const findCity = (CountryId) => {
  fetch(`http://localhost:4000/api/city/findCountryCity/${CountryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((city) => {
    city.json().then((city) => {
      city.forEach((element) => {
        const { id, name, CountryId } = element;
        let cityCard = document.querySelector(`#cityCollapse${CountryId}`);
        let renderCity = `
          <div class="card card-bodyCi" id="cityCard${id}">
            <h6>${name}</h6>
            <i class="fas fa-edit" onclick="getDataForUpdateCity(${id}, '${name}')"></i>
            <i class="far fa-trash-alt" onclick="deleteCity(${id})"></i>
          </div>
        `;
        cityCard.insertAdjacentHTML("beforeend", renderCity);
      });
    });
  });
};

/* Add region, country and cities from the page */

const getDataForAddRegion = () => {
  let regionInfo = regionName.value;

  if (regionInfo === "")
    notification.innerHTML = "Please enter the name of the region to add";
  else {
    let dataObject = {
      name: regionName.value,
    };
    let data = JSON.stringify(dataObject);
    addRegion(data);
  }
};

const addRegion = (data) => {
  event.preventDefault;
  fetch("http://localhost:4000/api/region/createRegion", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400)
      notification.innerHTML = "A region with this name already exists";
    else {
      res.json().then((element) => {
        const { id, name } = element;
        let renderRegion = `
          <section class="region" id=regionId${id}>
            <h2 class="regionTittle">
              <b><a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">${name}</a></b>
            </h2>
            <i class="fas fa-edit" onclick="getDataForUpdateRegion(${id}, '${name}')"></i>
            <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
            <i class="fas fa-plus" onclick="getDataForAddCountry(${id})"></i>
            <div class="row">
              <div class="col">
                <div class="collapse multi-collapse" id="regionCollapse${id}">
                  <div class="card card-bodyCo" id="countryCard${id}">
                  </div>
                </div>
              </div>
            </div>
          </section>
        `;
        regions_city_container.insertAdjacentHTML("beforeend", renderRegion);
        close();
        clear();
      });
    }
  });
};

const getDataForAddCountry = (RegionId) => {
  openCountry();

  saveCountry.addEventListener("click", () => {
    let countryData = CountryName.value;
    if (countryData === "")
      notificationCountry.innerHTML =
        "Please enter the name of the country to add";
    else {
      let dataObject = {
        name: CountryName.value,
        RegionId: RegionId,
      };
      let data = JSON.stringify(dataObject);
      addCountry(data);
    }
  });
};

const addCountry = (data) => {
  event.preventDefault;
  fetch("http://localhost:4000/api/country/createCountry", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400)
      notificationCountry.innerHTML = "A country with this name already exists";
    else {
      res.json().then((element) => {
        const { id, name, RegionId } = element;
        let countryCard = document.querySelector(`#countryCard${RegionId}`);
        let renderCountry = `
        <div class="countryContainer" id="countryC${id}">
          <h4 class="coTitle">
            <a
              class="regionTree"
              data-toggle="collapse"
              href="#cityCollapse${id}"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >${name}</a>
          </h4>
          <i class="fas fa-edit" onclick="getDataForUpdateCountry(${id}, '${name}')"></i>
          <i class="far fa-trash-alt" onclick="deleteCountry(${id})"></i>
          <i class="fas fa-plus" onclick="getDataForAddCity(${id})"></i>
        </div>
        <div class="col cityContainer">
          <div class="collapse multi-collapse" id="cityCollapse${id}">
          </div>
        </div>
      `;
        countryCard.insertAdjacentHTML("beforeend", renderCountry);
        closeCountry();
      });
    }
  });
};

const getDataForAddCity = (CountryId) => {
  openCity();

  saveCity.addEventListener("click", () => {
    let cityData = cityName.value;
    if (cityData === "")
      notificationCity.innerHTML = "Please enter the name of the city to add";
    else {
      let dataObject = {
        name: cityName.value,
        CountryId: CountryId,
      };
      let data = JSON.stringify(dataObject);
      addCity(data);
    }
  });
};
/* aqui el error */
const addCity = (data) => {
  event.preventDefault;
  fetch("http://localhost:4000/api/city/createCity", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400)
      notificationCity.innerHTML = "A country with this name already exists";
    else {
      res.json().then((city) => {
        const { id, name, CountryId } = city;
        let cityCard = document.querySelector(`#cityCollapse${CountryId}`);
        let renderCity = `
          <div class="card card-bodyCi" id="cityCard${id}">
            <h6>${name}</h6>
            <i class="fas fa-edit" onclick="getDataForUpdateCity(${id}, '${name}')"></i>
            <i class="far fa-trash-alt" onclick="deleteCity(${id})"></i>
          </div>
        `;
        console.log(renderCity);
        cityCard.insertAdjacentHTML("beforeend", renderCity);
        closeCity();
      });
    }
  });
};

/* Update region, country and cities from the page */
const getDataForUpdateRegion = (id, name) => {
  fetch(`http://localhost:4000/api/region/findRegionById/{id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((regionEdit) => {
    regionEdit.json().then((response) => {
      regionName.value = name;
      open();
      ModalRegion.innerHTML = "Edit Region";
      saveRegion.onclick = "";
      saveRegion.addEventListener("click", () => {
        let dataObject = {
          name: regionName.value,
        };
        let data = JSON.stringify(dataObject);
        updateRegion(id, data);
        close();
      });
    });
  });
};

const updateRegion = (id, data) => {
  fetch(`http://localhost:4000/api/region/updateRegionById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((regionUpdate) => {
    regionUpdate.json().then((response) => {
      location.reload();
    });
  });
};

const getDataForUpdateCountry = (id, name) => {
  fetch(`http://localhost:4000/api/country/findCountryById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((country) => {
    country.json().then((response) => {
      CountryName.value = name;
      openCountry();
      ModalCountry.innerHTML = "Edit Country";
      saveCountry.addEventListener("click", () => {
        let dataObject = {
          name: CountryName.value,
        };
        let data = JSON.stringify(dataObject);
        updateCountry(id, data);
        closeCountry();
      });
    });
  });
};

const updateCountry = (id, data) => {
  fetch(`http://localhost:4000/api/country/updateCountryById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((countryUpdate) => {
    countryUpdate.json().then((response) => {
      location.reload();
    });
  });
};

const getDataForUpdateCity = (id, name) => {
  fetch(`http://localhost:4000/api/city/findCityById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer " + token,
    },
  }).then((city) => {
    city.json().then((response) => {
      cityName.value = name;
      openCity();
      ModalCity.innerHTML = "Edit City";
      saveCity.addEventListener("click", () => {
        let dataObject = {
          name: cityName.value,
        };
        let data = JSON.stringify(dataObject);
        updateCity(id, data);
        closeCountry();
      });
    });
  });
};

const updateCity = (id, data) => {
  fetch(`http://localhost:4000/api/city/updateCityById/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //Authorization: "Bearer " + token,
    },
  }).then((cityUpdate) => {
    cityUpdate.json().then((response) => {
      location.reload();
    });
  });
};

/* Delete region, country and cities from the page */
const deleteRegion = (id) => {
  OpenRegionDelete();
  confirmDeleteRegion.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/region/deleteRegionById/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

const deleteCountry = (id) => {
  OpenCountryDelete();

  confirmDeleteCountry.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/country/deleteCountryById/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

const deleteCity = (id) => {
  OpenCityDelete();
  confirmDeleteCity.addEventListener("click", () => {
    fetch(`http://localhost:4000/api/city/deleteCityById/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

/* functions for opening, closing, cleaning and deletion confirmation modal */
const open = () => {
  $("#addRegion").modal("show");
};
const close = () => {
  $("#addRegion").modal("hide");
};
const OpenRegionDelete = () => {
  $("#deleteRegionConfirm").modal("show");
};

const openCountry = () => {
  $("#addCountry").modal("show");
};
const closeCountry = () => {
  $("#addCountry").modal("hide");
};
const OpenCountryDelete = () => {
  $("#deleteCountryConfirm").modal("show");
};

const openCity = () => {
  $("#addCity").modal("show");
};
const closeCity = () => {
  $("#addCity").modal("hide");
};
const OpenCityDelete = () => {
  $("#deleteCityConfirm").modal("show");
};

const clear = () => {
  regionName.value = "";
};
