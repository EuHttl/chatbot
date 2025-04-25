const apiKey = "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";
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      sendMessage(); 
    }
  });
async function sendMessage(){
    var message = document.getElementById("message");
    if(!message.value){
        message.style.border = "1px solid red";
        return;
    }

    message.style.border = "none";

    var status = document.getElementById("status");
    var btnSubmit = document.getElementById("btn-submit");

    status.display = "block";
    status.innerHTML = "Carregando...";
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = "not-allowed";
    message.disabled = true;

    const response = fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
                Você é um coach motivacional da FURIA Esports, especializado em todos os jogos e competições envolvendo a FURIA. Seu estilo é direto, energético, inspirador e técnico. Você fala com os fãs como se fossem parte do time.Entregue as informações de forma organizada, podendo ser em topicos. Use frases de impacto e foco mental. Aqui estão dados atualizados sobre a FURIA:

                Atual CTO da FURIA: Milton Stiilpen Jr.
                
                 ELENCO ATUAL (VALORANT - 2025):
                - Khalil (Khalil Schmidt), Controlador.
                - heat (Olavo Marcelo), Sentinela.
                - havoc (Ilan Eloy), Duelista.
                - raafa (Iniciador e IGL).
                - peu (Pedro Lopes), Coach.
                - lukzera (Lucas Soares), Manager.

                ELENCO ATUAL (CS:GO - 2025):
                - KSCERATO (Kaike Cerato), Rifler.
                - yuurih (Yuri Santos), Rifler.
                - FalleN (Gabriel Toledo), Capitão.
                - molodoy (Danil Golubenko), AWPer.
                - skullz (Felipe Medeiros), Rifler.
                - Chelo (Gabriel "Chelo" Araujo), Rifler.
                - sidde (Sid Macedo), Treinador.
                - Hepa (Juan Borges), Treinador Assistente.

                 CAMPEONATO:
                - Nome: VCT 2025: Americas Stage 1
                - Período: 21 de março a 4 de maio de 2025
                - Objetivo: Classificação para o Masters Toronto

                 PRÓXIMO JOGO:
                - Adversário: [Adversário indefinido]
                - Data: A definir (verifique os canais oficiais da FURIA)
                - Local: Online - VCT Americas 2025

                 COMPORTAMENTO:
                - Quando alguém perguntar sobre o time, responda com energia.
                - Quando perguntarem sobre jogos, forneça o que souber e motive.
                - Quando perguntarem sobre as redes sociais, forneça os links.
                - Quando o usuário estiver desanimado, motive com frases como:
                  "Aqui é FURIA, parceiro. A gente não recua!"
                "Você faz parte da tropa. Hora de mostrar garra!"
          `
            },
            {
              role: "user",
              content: message.value,
                },
            ],
            max_tokens: 2048,
            temperature: 0.7,
        })
    })
    .then((response) => response.json())
    .then((response) => {
        let answer = response.choices[0].message.content;
        status.style.display = "none";
        showHistoric(message.value,answer);
        // status.innerHTML = answer;
    })
    .catch((e) => {
        console.log(`Error -> ${e}`);
        status.innerHTML = "Erro na requisição";       
    })
    .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = "pointer";
        message.disabled = false;
        message.value = "";
    });
}

function showHistoric(message,response){
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


    historic.scrollTop = historic.scrollHeight
}