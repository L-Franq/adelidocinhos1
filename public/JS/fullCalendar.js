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
  let calendarioPronto = false;

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",

    datesSet() {
      calendarioPronto = true;
    },

    dateClick(info) {
      if (!calendarioPronto || !info.jsEvent) return;

      const data = info.dateStr;

      if (!agenda[data]) agenda[data] = criarDia();

      const dia = agenda[data];

      if (window.USER_ROLE === "adm") {
        abrirModalEditarMarcacao(data);
      } else {
        abrirModal(data);
      }
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
const modalAdm = document.getElementById("modalAdm");
const formMarcacaoAdm = document.getElementById("formMarcacaoAdm");
let diaSelecionadoAdm = null;

async function abrirModalAdm(dia) {
  diaSelecionadoAdm = dia;
  document.getElementById("admDia").innerText = dia;

  await carregarMarcacoesAdm(dia);

  modalAdm.classList.remove("hidden");
}

function fecharModalAdm() {
  modalAdm.classList.add("hidden");
  formMarcacaoAdm.reset();
}

// ✅ Fetch das marcações do dia
async function carregarMarcacoesAdm(dia) {
  const res = await fetch(`/adm/marcacoes?dia=${dia}`);
  const marcacoes = await res.json();
  renderizarListaMarcacoes(marcacoes);
}

// ✅ Renderiza lista dentro do modal
function renderizarListaMarcacoes(marcacoes) {
  const lista = document.getElementById("listaMarcacoesAdm");
  lista.innerHTML = "";

  if (!marcacoes || marcacoes.length === 0) {
    lista.innerHTML = "<p>Nenhuma marcação neste dia</p>";
    return;
  }

  marcacoes.forEach((marc) => {
    const li = document.createElement("li");
    li.innerText = `${marc.turno.toUpperCase()} - ${marc.hora} - ${marc.descricao || "Sem descrição"}`;

    // Botão Editar
    const btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.onclick = () => abrirModalEditarMarcacao(marc);

    // Botão Excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.onclick = () => excluirMarcacao(marc.idMarc);

    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
  });
}

// ✅ Criar nova marcação
formMarcacaoAdm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const hora = document.getElementById("horaAdm").value;
  const turno = document.getElementById("turnoAdm").value;
  const descricao = document.getElementById("descricaoAdm").value;

  const res = await fetch("/adm/marcacoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dia: diaSelecionadoAdm,
      hora,
      turno,
      descricao,
    }),
  });

  const data = await res.json();
  if (data.sucesso) {
    await carregarMarcacoesAdm(diaSelecionadoAdm);
    formMarcacaoAdm.reset();
  } else {
    Swal.fire(data.erro, "Erro ao excluir marcação", "error");
  }
});

async function excluirMarcacao(idMarc) {
  if (!confirm("Deseja realmente excluir esta marcação?")) return;

  const res = await fetch(`/adm/marcacoes/${idMarc}`, { method: "DELETE" });
  const data = await res.json();

  if (data.sucesso) {
    await carregarMarcacoesAdm(diaSelecionadoAdm);
  } else {
    Swal.fire(data.erro, "Erro ao excluir marcação", "error");
  }
}

function abrirModalEditarMarcacao(marc) {
  document.getElementById("horaAdm").value = marc.hora;
  document.getElementById("turnoAdm").value = marc.turno;
  document.getElementById("descricaoAdm").value = marc.descricao;
}

//Modal do Usuario
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
  const lugar = document.getElementById("lugar").value;

  const dia = agenda[data];

  if (dia.slots[turno] === null) {
    dia.slots[turno] = { descricao };
  } else if (dia.espera.length < 2) {
    dia.espera.push({ descricao }, { lugar });
  } else {
    dia.bloqueado = true;
    alert("Dia lotado");
  }

  atualizarVisual(calendar, data, dia, turno);
  modal.style.display = "none";
  form.reset();
  console.log(agenda);
};
