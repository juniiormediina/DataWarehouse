const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

/* ------------------------------------------------------------------- */
/* Funcionalidad del login */
/* ------------------------------------------------------------------- */
const formSignIn = document.querySelectorAll("#formSignIn input");
const notification = document.getElementById("notification");
const send = document.getElementById("send");

send.addEventListener("click", () => {
  signin();
});

let signin = () => {
  let signin = Array.from(formSignIn).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  console.log(signin);

  for (const key in signin) {
    if (signin[key] === "") {
      notification.innerHTML = "Please, fill all the spaces";
      return;
    }
  }

  getInfo = {
    email: signin.email,
    password: signin.password,
  };

  const FinalGetInfo = JSON.stringify(getInfo);
  console.log(FinalGetInfo);
  getData(FinalGetInfo);
};

const getData = (data) => {
  fetch("http://localhost:4000/api/users/signin", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 401) {
      notification.innerHTML = "Email or password is not valid";
    } else {
      res.json().then((token) => {
        let data = JSON.stringify(token);
        console.log(token);
        window.localStorage.setItem("token", data);
        window.location.href = "contact.html";
      });
    }
  });
};
