document.getElementById("message").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    sendMessage(); 
  }
});

async function sendMessage() {
  var message = document.getElementById("message");
  if (!message.value) {
    message.style.border = "1px solid red";
    return;
  }

  message.style.border = "none";

  var status = document.getElementById("status");
  var btnSubmit = document.getElementById("btn-submit");

  status.style.display = "block";
  status.innerHTML = "Carregando...";
  btnSubmit.disabled = true;
  btnSubmit.style.cursor = "not-allowed";
  message.disabled = true;

  try {
    const response = await fetch("/api/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.value }),
    });

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const data = await response.json();
    let answer = data.choices[0].message.content;

    showHistoric(message.value, answer);

  } catch (e) {
    console.log(`Error -> ${e}`);
    status.innerHTML = "Erro na requisição";
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.style.cursor = "pointer";
    message.disabled = false;
    message.value = "";
    status.style.display = "none";
  }
}

function showHistoric(message, response) {
  var historic = document.getElementById("historic");

  var boxMyMessage = document.createElement("div");
  boxMyMessage.className = "box-my-message";

  var myMessage = document.createElement("p");
  myMessage.className = "my-message";
  myMessage.innerHTML = message;

  boxMyMessage.appendChild(myMessage);
  historic.appendChild(boxMyMessage);

  var boxResponseMessage = document.createElement("div");
  boxResponseMessage.className = "box-response-message";

  var chatbot = document.createElement("p");
  chatbot.className = "chatbot-message";
  chatbot.innerHTML = response;

  boxResponseMessage.appendChild(chatbot);
  historic.appendChild(boxResponseMessage);

  historic.scrollTop = historic.scrollHeight;
}
