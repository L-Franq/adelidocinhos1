const aindaNaotenho = document.getElementById("aindaNaotenho");
const jaTenho = document.getElementById("jaTenho");
const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formlogin");
const titulo = document.getElementById("titulo");
const senhaInput = document.getElementById("cadastrarSenha").value;
const nomeInput = document.getElementById("cadastrarNome").value;
const emailInput = document.getElementById("cadastrarEmail").value;
const telefoneInput = document.getElementById("cadastrarTelefone").value;
const pErro = document.getElementById("erro");
const loginErro = document.getElementById("erroL");

const mostrarAlerta = (titulo, texto, icone) => {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icone,
    background: "#132640", // Cor do seu sistema
    color: "#9f86a6", // Cor do seu texto
    confirmButtonColor: "#fc80db", // Cor do seu botão
    iconColor: icone === "success" ? "#fc80db" : "#f2aee0",
  });
};

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

  if (nomeInput === null || nomeInput === "") {
    pErro.classList.remove("hidden");
    pErro.classList.add("erro");
    pErro.innerText = "erro nos campos. verifique o seu nome!";
    return;
  }

  if (emailInput === null || emailInput === "") {
    pErro.classList.remove("hidden");
    pErro.classList.add("erro");
    pErro.innerText = "erro nos campos. verifique o seu email!";
    return;
  }

  if (
    (telefoneInput === null || telefoneInput === "") &&
    telefoneInput.length < 9
  ) {
    pErro.classList.remove("hidden");
    pErro.classList.add("erro");
    pErro.innerText = "erro nos campos. verifique o seu numero!";
    return;
  }

  if ((senhaInput === null || senhaInput === "") && senhaInput.length < 8) {
    pErro.classList.remove("hidden");
    pErro.classList.add("erro");
    pErro.innerText = "erro. verifique a senha, no minimo 8 caracteres!";
    return;
  }

  const res = await fetch("/user/cadastro", {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  });

  const data = await res.json();

  if (data.sucesso) {
    setTimeout(() => {
      mostrarAlerta("Bem-Vindo", "Cadastrado com sucesso.", "success");
    }, 8000);

    location.href = "/user/cadastrar-logar";

    if (formLogin && titulo) {
      formCadastro.classList.add("hidden");

      formLogin.classList.remove("hidden");

      titulo.innerText = "Login";
    }
  } else
    setTimeout(() => {
      mostrarAlerta(data.erro, "Erro ao cadastrar", "error");
    }, 8000);
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/user/login", {
    method: "POST",
    body: new URLSearchParams(new FormData(e.target)),
  });

  const data = await res.json();

  if (data.sucesso) {
    mostrarAlerta("Processando", "...", "success");
    // Redireciona dependendo do tipo de usuário
    location.href = data.redirect;
  } else {
    loginErro.classList.remove("hidden");
    loginErro.classList.add("erro");
    loginErro.innerText = data.erro;
  }
});
