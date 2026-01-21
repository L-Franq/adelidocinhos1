const hora = document.createElement("P");
const hoje = document.getElementById("hoje");
const containerHorario = document.getElementById("horario");
const btnCalendario = document.getElementById("carrgarCalendario");
const iframe = document.getElementById("dashboardIframe");
const admNome = document.getElementById("admName");
const perfilPic = document.getElementById("perfilPic");
const inputFoto = document.getElementById("inputFoto");

let agora = new Date();

hoje.innerText = "Data: " + agora.toLocaleDateString();

setInterval(() => {
  let agora = new Date();
  hora.innerText = "Hora: " + agora.toLocaleTimeString();
}, 1000);

containerHorario.insertBefore(hora, hoje);

btnCalendario.addEventListener("click", () => {
  iframe.src = "/agenda";
});

const fotoSalva = localStorage.getItem("fotoPerfilAdm");

if (fotoSalva) {
  perfilPic.src = fotoSalva;
}

perfilPic.addEventListener("click", (e) => {
  e.preventDefault();
  inputFoto.click();
});

inputFoto.addEventListener("change", () => {
  const file = inputFoto.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    Swal.fire("Por favor", "Selecione uma imagem válida", "warning");

    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    perfilPic.src = reader.result;

    // opcional: salvar no localStorage
    localStorage.setItem("fotoPerfilAdm", reader.result);
  };

  reader.readAsDataURL(file);
});

fetch("/adm/dados", {
  credentials: "include",
})
  .then((res) => res.json())
  .then((adm) => {
    admNome.innerText = "Bem-vindo(a), " + adm.nome;
  })
  .catch(() => {
    admNome.innerText = "ERRO";
  });
