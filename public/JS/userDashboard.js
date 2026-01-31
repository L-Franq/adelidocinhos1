const userName = document.getElementById("userName");
const btnAgendar = document.getElementById("agendar");
const iframe = document.getElementById("dashboardIframe");
const indispo = document.querySelectorAll(".indispo");

indispo.forEach((msg) => {
  msg.addEventListener("click", (e) => {
    e.preventDefault();
    setTimeout(
      Swal.fire("Lamentamos!", "Servico indisponivel no momento.", "info"),
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
