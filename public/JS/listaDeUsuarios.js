const tabelaDeUsers = document.getElementById("target-render");
const mostrarAlerta = (titulo, texto, icone) => {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icone,
    background: "#132640", // Cor do seu sistema
    color: "#9f86a6", // Cor do seu texto
    confirmButtonColor: "#fc80db", // Cor do seu botão
    iconColor: icone === "success" ? "#fc80db" : "#f2aee0",
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  const tabelaDeUsers = document.getElementById("target-render");

  fetch("/user/userNomeId", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      const usuarios = Array.isArray(data) ? data : [data];

      tabelaDeUsers.innerHTML = "";

      usuarios.forEach((user) => {
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `<td>${user.idUsuario}</td>
                <td>${user.nome}</td>
                <td data-id="${user.idUsuario}" class="deletarUser"><img
                  src="../IMG/icons/trash.png"
                  alt="eliminar"
                  title="Eliminar"
                /></td>`;

        tabelaDeUsers.appendChild(tableRow);
      });
    })
    .catch((error) => {
      console.error("Erro crítico:", error);
      tabelaDeUsers.innerHTML =
        "<tr><td colspan='4' style='color: red;'>Erro ao buscar lista.</td></tr>";
    });

  tabelaDeUsers.addEventListener("click", (event) => {
    const btnDeletar = event.target.closest(".deletarUser");

    if (btnDeletar) {
      const idUsuario = btnDeletar.getAttribute("data-id");

      if (confirm(`Tem certeza que deseja deletar o usuário ${idUsuario}?`)) {
        fetch(`/adm/deletarUser/${idUsuario}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => {
            if (res.ok) {
              mostrarAlerta(
                "Eliminado",
                "Usuário removido com sucesso!",
                "success",
              );
            } else {
              mostrarAlerta("Falha", "Erro ao Deletar", "error");
            }
          })
          .catch((err) => console.error("Erro na requisição:", err));
      }
    }
  });
});
