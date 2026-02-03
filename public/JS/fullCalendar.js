let calendar;
let USER_ROLE = null;

const coresTurno = {
  manha: "#FFA500",
  tarde: "#1E90FF",
  noite: "#32CD32",
};

async function obterRole() {
  const res = await fetch("/whoami", { credentials: "include" });
  const data = await res.json();
  USER_ROLE = data.role;
}

document.addEventListener("DOMContentLoaded", async () => {
  await obterRole();

  const calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",

    // 🔥 FULLCALENDAR BUSCA DIRETO DO SERVIDOR
    events: {
      url: "/user/marcacoes/mes",
      method: "GET",
      failure() {
        alert("Erro ao carregar marcações");
      },
    },

    // 🎨 Cor por turno
    eventDidMount(info) {
      const turno = info.event.extendedProps.turno;
      info.el.style.backgroundColor = coresTurno[turno] || "#888";
    },

    dateClick(info) {
      if (USER_ROLE === "Adm") abrirModalAdm(info.dateStr);
      else abrirModalUser(info.dateStr);
    },
  });

  calendar.render();

  configurarModalUser();
  configurarModalAdm();
});

// ================= USER =================

function configurarModalUser() {
  const modal = document.getElementById("modalMarcacao");
  const fechar = document.getElementById("fecharModal");
  const form = document.getElementById("formMarcacao");
  const inputDia = document.getElementById("diaSelecionado");

  function abrir(data) {
    inputDia.value = data;
    modal.classList.remove("hidden");
  }

  window.abrirModalUser = abrir;

  fechar.onclick = () => {
    modal.classList.add("hidden");
    form.reset();
  };

  form.onsubmit = async (e) => {
    e.preventDefault();

    const body = {
      dia: inputDia.value,
      turno: document.getElementById("turno").value,
      hora: document.getElementById("hora").value,
      descricao: document.getElementById("descricao").value,
      lugar: document.getElementById("lugar").value,
    };

    const res = await fetch("/user/marcar", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (json.sucesso) {
      modal.classList.add("hidden");
      form.reset();
      calendar.refetchEvents(); // 🔥 Atualiza visual
    } else {
      alert(json.erro);
    }
  };
}

// ================= ADM =================

function configurarModalAdm() {
  const modal = document.getElementById("ModalAdm");
  const fechar = document.getElementById("fecharModalAdm");
  const form = document.getElementById("formMarcacaoAdm");
  const lista = document.getElementById("listaMarcacoesAdm");
  let diaAtual = null;
  let editandoId = null;

  window.abrirModalAdm = async function (dia) {
    diaAtual = dia;
    modal.classList.remove("hidden");
    await carregarLista();
  };

  fechar.onclick = () => {
    modal.classList.add("hidden");
    form.reset();
  };

  async function carregarLista() {
    const res = await fetch(`/adm/marcacoes?dia=${diaAtual}`, {
      credentials: "include",
    });

    const marcacoes = await res.json();
    lista.innerHTML = "";

    marcacoes.forEach((m) => {
      const li = document.createElement("li");
      li.innerText = `${m.turno} - ${m.hora} - ${m.descricao}`;

      const btnE = document.createElement("button");
      btnE.innerText = "Editar";
      btnE.onclick = () => {
        editandoId = m.idMarc;
        document.getElementById("horaAdm").value = m.hora;
        document.getElementById("turnoAdm").value = m.turno;
        document.getElementById("descricaoAdm").value = m.descricao;
      };

      const btnX = document.createElement("button");
      btnX.innerText = "Excluir";
      btnX.onclick = async () => {
        await fetch(`/adm/marcacoes/${m.idMarc}`, {
          method: "DELETE",
          credentials: "include",
        });
        await carregarLista();
        calendar.refetchEvents();
      };

      li.appendChild(btnE);
      li.appendChild(btnX);
      lista.appendChild(li);
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();

    const body = {
      dia: diaAtual,
      hora: document.getElementById("horaAdm").value,
      turno: document.getElementById("turnoAdm").value,
      descricao: document.getElementById("descricaoAdm").value,
    };

    const url = editandoId ? `/adm/marcacoes/${editandoId}` : "/adm/marcacoes";
   
    const method = editandoId ? "PUT" : "POST";
     console.log(method);

    await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    form.reset();
    editandoId = null;
    await carregarLista();
    calendar.refetchEvents();
  };
}
