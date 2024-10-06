import React, { useState } from "react";

function App() {
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");

  const baseURL = "https://web.whatsapp.com/send?phone=55";
  const defaultMessage = 
`*Sua concorrência já está online, e você?* 🧐

Hoje, quem não está investindo em uma *presença digital* está perdendo espaço. Na Majors Solutions, ajudamos empresas como *Fiat* e *Jeep* a se destacarem com soluções completas: desde *sites* até *softwares personalizados* para automatizar processos e gerar resultados.

Temos uma equipe pronta para criar a solução ideal para o seu negócio, seja um *site profissional*, uma loja virtual ou até um *software sob medida* para você dominar o digital. Tudo com a mesma qualidade que já entregamos para grandes marcas!

Quer ver como isso pode transformar seu negócio? 
Dê uma olhadinha na Majors 
👉🏼 https://servicos.majorssolutions.com.br/ 
Fala comigo e vamos colocar o seu projeto no ar!`;

  const handleEnviar = () => {
    if (numero) {
      const mensagemFinal = mensagem ? mensagem : defaultMessage;
      const urlComNumero = `${baseURL}${numero}&text=${encodeURIComponent(
        mensagemFinal
      )}`;
      window.open(urlComNumero, "_blank");
    } else {
      alert("Por favor, insira um número válido.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          color: "#333",
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        Envie uma mensagem de texto e áudio
      </h1>
      <input
        type="text"
        placeholder="Insira o número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />
      <textarea
        placeholder="Digite sua mensagem (opcional)"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          height: "100px",
          width: "300px",
        }}
      />
      <button
        onClick={handleEnviar}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Enviar Mensagem
      </button>
    </div>
  );
}

export default App;
