const inputs = document.querySelectorAll(".input");
const formSignIn = document.querySelectorAll("#formSignIn input");
const send = document.getElementById("send");

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

/* -------------------------------------------------------------------- */

let signin = () => {};
