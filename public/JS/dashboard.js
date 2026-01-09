const hora = document.createElement("P");
const hoje = document.getElementById("hoje");
const containerHorario = document.getElementById("horario");

let agora = new Date();

hoje.innerText = "Data: " + agora.toLocaleDateString();

setInterval(() => {
  let agora = new Date();
  hora.innerText = "Hora: " + agora.toLocaleTimeString();
}, 1000);

containerHorario.insertBefore(hora, hoje);
