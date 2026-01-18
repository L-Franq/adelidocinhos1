const userName = document.getElementById("userName");

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
