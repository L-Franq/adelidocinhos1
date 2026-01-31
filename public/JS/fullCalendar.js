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

let USER_ROLE = null;

async function obterRole() {
  const res = await fetch("/whoami", {
    credentials: "include",
  });
  const data = await res.json();
  USER_ROLE = data.role;
}

document.addEventListener("DOMContentLoaded", async () => {
  await obterRole();

  const calendarEl = document.getElementById("calendar");
  let calendarioPronto = false;

  // ===== FullCalendar =====
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

      if (USER_ROLE === "Adm") {
        abrirModalAdm(data);
      } else {
        abrirModalUser(data);
      }
    },
  });

  calendar.render();

  // ===== Modal User =====
  const modalUser = document.getElementById("modalMarcacao");
  const fecharModalUser = document.getElementById("fecharModal");
  const formUser = document.getElementById("formMarcacao");
  const inputDiaUser = document.getElementById("diaSelecionado");

  function abrirModalUser(data) {
    inputDiaUser.value = data;
    modalUser.classList.remove("hidden");
  }

  fecharModalUser.onclick = () => {
    modalUser.classList.add("hidden");
    formUser.reset();
  };

  window.onclick = (e) => {
    if (e.target === modalUser) {
      modalUser.classList.add("hidden");
      formUser.reset();
    }
  };

  formUser.onsubmit = async (event) => {
    event.preventDefault();

    const data = inputDiaUser.value;
    if (!data) return Swal.fire("Data inválida", "", "error");
    if (!agenda[data]) agenda[data] = criarDia();

    const turno = document.getElementById("turno").value;
    const descricao = document.getElementById("descricao").value;
    const lugar = document.getElementById("lugar").value;
    const hora = document.getElementById("hora").value;

    const dia = agenda[data];

    if (dia.slots[turno] === null) {
      dia.slots[turno] = descricao;
    } else if (dia.espera.length < 2) {
      dia.espera.push({ descricao, lugar });
    } else {
      dia.bloqueado = true;
      Swal.fire("Sem Vagas", "Dia lotado", "warning");
    }

    try {
      const res = await fetch("/user/marcar", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dia: data, turno, hora, descricao, lugar }),
      });
      const json = await res.json();
      if (!json.sucesso) Swal.fire("Erro interno", "", "error");
    } catch {
      Swal.fire("Erro de conexão, tente mais tarde.", "", "warning");
      return;
    }

    atualizarVisual(calendar, data, dia);
    modalUser.style.display = "none";
    formUser.reset();
  };

  // ===== Modal Admin =====
  //if (USER_ROLE === "Adm") {
  const modalAdm = document.getElementById("ModalAdm");
  const formAdm = document.getElementById("formMarcacaoAdm");
  const fecharModalAdm = document.getElementById("fecharModalAdm");
  let diaSelecionadoAdm = null;
  let idMarcacaoEditando = null;

  fecharModalAdm.onclick = () => {
    modalAdm.classList.add("hidden");
    formAdm.reset();
  };

  window.addEventListener("click", (e) => {
    if (e.target === modalAdm) {
      modalAdm.classList.add("hidden");
      formAdm.reset();
    }
  });

  async function abrirModalAdm(dia) {
    diaSelecionadoAdm = dia;
    document.getElementById("admDia").innerText = dia;
    modalAdm.classList.remove("hidden");

    await carregarMarcacoesAdm(dia);
  }

  async function carregarMarcacoesAdm(dia) {
    const res = await fetch(`/adm/marcacoes?dia=${dia}`, {
      credentials: "include",
    });

    if (!res.ok) {
      renderizarListaMarcacoes([]);
      return;
    }

    const marcacoes = await res.json();
    renderizarListaMarcacoes(marcacoes);
  }

  function renderizarListaMarcacoes(marcacoes) {
    const lista = document.getElementById("listaMarcacoesAdm");
    lista.innerHTML = "";

    const arrayMarcacoes = Array.isArray(marcacoes) ? marcacoes : [marcacoes];
    if (!arrayMarcacoes || arrayMarcacoes.length === 0) {
      lista.innerHTML = "<p>Nenhuma marcação neste dia</p>";
      return;
    }

    arrayMarcacoes.forEach((marc) => {
      const li = document.createElement("li");
      li.innerText = `${marc.turno.toUpperCase()} - ${marc.hora} - ${marc.descricao || "Sem descrição"}`;

      const btnEditar = document.createElement("button");
      btnEditar.innerText = "Editar";
      btnEditar.onclick = () => abrirModalEditarMarcacao(marc);

      const btnExcluir = document.createElement("button");
      btnExcluir.innerText = "Excluir";
      btnExcluir.onclick = () => excluirMarcacao(marc.idMarc);

      li.appendChild(btnEditar);
      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  }

  formAdm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const hora = document.getElementById("horaAdm").value;
    const turno = document.getElementById("turnoAdm").value;
    const descricao = document.getElementById("descricaoAdm").value;

    const url = idMarcacaoEditando
      ? `/adm/marcacoes/${idMarcacaoEditando}`
      : "/adm/marcacoes";

    const method = idMarcacaoEditando ? "PUT" : "POST";

    const res = await fetch(url, {
      credentials: "include",
      method,
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
      formAdm.reset();
      idMarcacaoEditando = null;
    } else {
      //Swal.fire(data.erro, "Erro ao salvar marcação", "error");
      alert(data.erro);
    }
  });

  async function excluirMarcacao(idMarc) {
    if (!confirm("Deseja realmente excluir esta marcação?")) return;

    const res = await fetch(`/adm/marcacoes/${idMarc}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data = await res.json();

    if (data.sucesso) {
      await carregarMarcacoesAdm(diaSelecionadoAdm);
    } else {
      Swal.fire(data.erro, "Problemas ao carregar marcacoes", "error");
    }
  }

  function abrirModalEditarMarcacao(marc) {
    idMarcacaoEditando = marc.idMarc;

    document.getElementById("horaAdm").value = marc.hora;
    document.getElementById("turnoAdm").value = marc.turno;
    document.getElementById("descricaoAdm").value = marc.descricao;
  }
  // } // fim do bloco Admin
});

// ===== Atualização do calendário =====
function atualizarVisual(calendar, data, dia) {
  calendar.getEvents().forEach((event) => {
    if (event.startStr === data) event.remove();
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
        title: turno.toUpperCase(),
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
