const userName = document.getElementById("userName");
const btnAgendar = document.getElementById("agendar");
const iframe = document.getElementById("dashboardIframe");
const indispo = document.querySelectorAll(".indispo");

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

indispo.forEach((msg) => {
  msg.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(
      mostrarAlerta("Lamentamos!", "Servico indisponivel no momento.", "info"),
      1000 * 20,
    );
  });
});

fetch("/user/userDados", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((user) => {
    userName.innerText = "Olá, " + user.nome;
  })
  .catch(() => {
    userName.innerText = "ERRO";
  });

btnAgendar.addEventListener("click", () => {
  iframe.style.maxWidth = "100%";
  iframe.src = "/agenda";
});
