const userName = document.getElementById("userName");
const btnAgendar = document.getElementById("agendar");

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

btnAgendar.addEventListener("click", ()=>{                   
});