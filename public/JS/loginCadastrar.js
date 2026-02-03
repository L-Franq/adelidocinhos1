const aindaNaotenho = document.getElementById("aindaNaotenho");
const jaTenho = document.getElementById("jaTenho");
const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formlogin");
const titulo = document.getElementById("titulo");
const pErro = document.getElementById("erro");
const loginErro = document.getElementById("erroL");

// Função para padronizar o SweetAlert2 com as cores do seu sistema
const mostrarAlerta = (titulo, texto, icone) => {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icone,
    background: '#132640', // Cor do seu sistema
    color: '#9f86a6',      // Cor do seu texto
    confirmButtonColor: '#fc80db', // Cor do seu botão
    iconColor: icone === 'success' ? '#fc80db' : '#f2aee0'
  });
};

// Alternar para Login
jaTenho.addEventListener("click", (e) => {
  e.preventDefault();
  formCadastro.classList.add("hidden");
  formLogin.classList.remove("hidden");
  titulo.innerText = "Login";
});

// Alternar para Cadastro
aindaNaotenho.addEventListener("click", (e) => {
  e.preventDefault();
  formCadastro.classList.remove("hidden");
  formLogin.classList.add("hidden");
  titulo.innerText = "Cadastro";
});

// Lógica de Cadastro
formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Capturando valores dentro do evento (importante!)
  const nome = document.getElementById("cadastrarNome").value.trim();
  const email = document.getElementById("cadastrarEmail").value.trim();
  const telefone = document.getElementById("cadastrarTelefone").value.trim();
  const senha = document.getElementById("cadastrarSenha").value.trim();

  // Validações
  if (!nome) {
    pErro.innerText = "Erro nos campos. Verifique o seu nome!";
    pErro.classList.replace("hidden", "erro");
    return;
  }
  if (!email) {
    pErro.innerText = "Erro nos campos. Verifique o seu email!";
    pErro.classList.replace("hidden", "erro");
    return;
  }
  if (!telefone || telefone.length < 9) {
    pErro.innerText = "Erro nos campos. Verifique o seu número!";
    pErro.classList.replace("hidden", "erro");
    return;
  }
  if (!senha || senha.length < 8) {
    pErro.innerText = "Erro. Verifique a senha, no mínimo 8 caracteres!";
    pErro.classList.replace("hidden", "erro");
    return;
  }

  try {
    const res = await fetch("/user/cadastro", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
    });

    const data = await res.json();

    if (data.sucesso) {
      mostrarAlerta("Sucesso", "Cadastrado com sucesso.", "success");
      setTimeout(() => {
        location.href = "/user/cadastrar-logar";
      }, 2000);
    } else {
      mostrarAlerta("Erro", data.erro || "Dados inválidos", "error");
    }
  } catch (error) {
    mostrarAlerta("Erro", "Falha na conexão com o servidor.", "error");
  }
});

// Lógica de Login
formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/user/login", {
      method: "POST",
      body: new URLSearchParams(new FormData(e.target)),
    });

    const data = await res.json();

    if (data.sucesso) {
      mostrarAlerta("Bem-vindo", "Acedendo à sua conta...", "success");
      setTimeout(() => {
        location.href = data.redirect;
      }, 1500);
    } else {
      loginErro.innerText = data.erro;
      loginErro.classList.replace("hidden", "erro");
      mostrarAlerta("Falha no Login", data.erro, "error");
    }
  } catch (error) {
    mostrarAlerta("Erro", "Falha na conexão com o servidor.", "error");
  }
});