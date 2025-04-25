export default async function handler(req, res) {
    const apiKey = process.env.apiKey;  // Use a chave da API configurada no Vercel
    
    if (req.method === "POST") {
      const { message } = req.body;  // Recebe a mensagem do frontend
      
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,  // Usa a chave da API do OpenAI
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: message }],  // Passa a mensagem do usuário
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return res.status(200).json(data);  // Retorna a resposta da API da OpenAI para o frontend
        } else {
          return res.status(500).json({ error: "Erro ao comunicar com a OpenAI", details: data });
        }
      } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor", details: error.message });
      }
    } else {
      return res.status(405).json({ error: "Método não permitido" });  // Só aceita POST
    }
  }
  