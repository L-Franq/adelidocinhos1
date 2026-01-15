const aindaNaotenho = document.getElementById("aindaNaotenho");
const jaTenho = document.getElementById("jaTenho");
const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formlogin");
const titulo = document.getElementById("titulo");

jaTenho.addEventListener("click", (event) => {
  event.preventDefault();

  formCadastro.classList.add("hidden");

  formLogin.classList.remove("hidden");

  titulo.innerText = "Login";
});

aindaNaotenho.addEventListener("click", (event) => {
  event.preventDefault();

  formCadastro.classList.remove("hidden");

  formLogin.classList.add("hidden");

  titulo.innerText = "Cadastro";
});
