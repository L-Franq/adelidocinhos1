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

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/user", {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  });

  const data = await res.json();

  if (data.sucesso) {
    alert("Usuario Cadastrado!");

    location.href = "/user/login";

    if (formLogin && titulo) {
      formCadastro.classList.add("hidden");

      formLogin.classList.remove("hidden");

      titulo.innerText = "Login";
    }
  } else alert(data.erro);
});
