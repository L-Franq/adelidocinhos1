const hora = document.createElement("P");
const hoje = document.getElementById("hoje");
const containerHorario = document.getElementById("horario");
const btnCalendario = document.getElementById("carrgarCalendario");
const iframe = document.getElementById("dashboardIframe");

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
