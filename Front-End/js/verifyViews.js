let usersView = document.getElementById("usersView");
let signOut = document.getElementById("signOut");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

let data = parseJwt(window.localStorage.getItem("token"));

if (!data) {
  window.location = "../index.html";
} else {
  if (data.profile !== "administrator") {
    usersView.style.display = "none";
  }
}

signOut.addEventListener("click", () => {
  alert(`a moment ${data.firstName} we are closing session
        ¡¡¡¡ESTO LO PUEDO MEJORAR UN POCO!!!!        
  `);
  window.location = "../index.html";
  localStorage.clear();
});
