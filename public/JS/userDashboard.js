const userName = document.getElementById("userName");
const btnAgendar = document.getElementById("agendar");
const iframe = document.getElementById("dashboardIframe");

fetch("/user/userDados", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((user) => {
    userName.innerText = user.nome;
  })
  .catch(() => {
    userName.innerText = "ERRO";
  });

btnAgendar.addEventListener("click", () => {
  iframe.style.maxWidth = "100%";
  iframe.src = "/agenda";
});
