const tabelaDeUsers = document.getElementById("target-render");

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();

  const tabelaDeUsers = document.getElementById("target-render");

  fetch("/user/userNomeId", {
    // Certifique-se que esta rota retorna um ARRAY []
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      // VALIDACAO: Se a API mandar um objeto mas você quer uma lista
      // Vamos garantir que 'data' seja tratado como Array
      const usuarios = Array.isArray(data) ? data : [data];

      // Limpar a tabela antes de popular
      tabelaDeUsers.innerHTML = "";

      // ITERAÇÃO
      usuarios.forEach((user) => {
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `<td>${user.idUsuario}</td>
                <td>${user.nome}</td>
                <td class="deletarUser"><img
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
});
