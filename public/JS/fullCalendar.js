let agenda = {};
let calendar;

const coresTurno = {
  manha: "#FFA500",
  tarde: "#1E90FF",
  noite: "#32CD32",
  espera: "#CCC",
  bloqueado: "#555",
};

function criarDia() {
  return {
    slots: {
      manha: null,
      tarde: null,
      noite: null,
    },
    espera: [],
    bloqueado: false,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",

    dateClick(info) {
      const data = info.dateStr;

      if (!agenda[data]) agenda[data] = criarDia();

      const dia = agenda[data];

      /*if (window.USER_ROLE === "adm") {
        const accao = confirm("Deseja trancar este dia?");

        if (accao) {
          dia.bloqueado = true;
          atualizarVisual(calendar, data, dia);
        }
        return;
      }

      if (dia.bloqueado) {
        alert("Dia Bloqueado");
      }*/
      abrirModal(data);
    },
  });

  calendar.render();
});

function atualizarVisual(calendar, data, dia) {
  calendar.getEvents().forEach((event) => {
    if (event.startStr === data) {
      event.remove();
    }
  });

  if (dia.bloqueado) {
    calendar.addEvent({
      title: "🔒 Bloqueado",
      start: data,
      allDay: true,
      backgroundColor: coresTurno.bloqueado,
    });
    return;
  }

  for (let turno in dia.slots) {
    if (dia.slots[turno]) {
      calendar.addEvent({
        title: turno.toLocaleUpperCase(),
        start: data,
        allDay: true,
        backgroundColor: coresTurno[turno],
      });
    }
  }

  if (dia.espera.length > 0) {
    calendar.addEvent({
      title: `⏳ Espera (${dia.espera.length})`,
      start: data,
      allDay: true,
      backgroundColor: coresTurno.espera,
    });
  }
}

const modal = document.getElementById("modalMarcacao");
const fecharModal = document.getElementById("fecharModal");
const form = document.getElementById("formMarcacao");
const inputDia = document.getElementById("diaSelecionado");

function abrirModal(data) {
  inputDia.value = data;
  modal.style.display = "flex";
}

fecharModal.onclick = () => {
  modal.style.display = "none";
  form.reset();
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    form.reset();
  }
};

form.onsubmit = function (event) {
  event.preventDefault();

  const data = inputDia.value;

  if (!data) {
    alert("Data inválida");
    return;
  }

  // 🔒 GARANTIA ABSOLUTA
  if (!agenda[data]) {
    agenda[data] = criarDia();
  }

  const turno = document.getElementById("turno").value;
  const descricao = document.getElementById("descricao").value;

  const dia = agenda[data];

  if (dia.slots[turno] === null) {
    dia.slots[turno] = { descricao };
  } else if (dia.espera.length < 2) {
    dia.espera.push({ descricao });
  } else {
    dia.bloqueado = true;
    alert("Dia lotado");
  }

  atualizarVisual(calendar, data, dia, turno);
  modal.style.display = "none";
  form.reset();
  console.log(agenda);
};
