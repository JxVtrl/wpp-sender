import React, { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [numeros, setNumeros] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState("");

  const baseURL = "https://web.whatsapp.com/send?phone=";
  const defaultMessage = `*Sua concorrência já está online, e você?* 🧐

Hoje, quem não está investindo em uma *presença digital* está perdendo espaço. Na Majors Solutions, ajudamos empresas como *Fiat* e *Jeep* a se destacarem com soluções completas: desde *sites* até *softwares personalizados* para automatizar processos e gerar resultados.

Temos uma equipe pronta para criar a solução ideal para o seu negócio, seja um *site profissional*, uma loja virtual ou até *tráfego sob medida* para você dominar o digital. Tudo com a mesma qualidade que já entregamos para grandes marcas!

Quer ver como isso pode transformar seu negócio? 
Dê uma olhadinha na Majors 
👉🏼 https://servicos.majorssolutions.com.br/
👉🏼 @majors_solutions no instagram
Fala comigo e vamos colocar o seu projeto no ar!`;

  // Função para carregar o arquivo Excel
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        // Pegando os valores de Country Code (coluna A) e Phone Number (coluna C)
        const loadedNumeros = jsonData.map((row: any[]) => `${row[0]}${row[2]}`);
        setNumeros(loadedNumeros);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Função para enviar mensagem para o número atual
  const handleEnviar = () => {
    if (numeros.length > 0 && currentIndex < numeros.length) {
      const numeroAtual = numeros[currentIndex];
      const mensagemFinal = mensagem ? mensagem : defaultMessage;
      const urlComNumero = `${baseURL}${numeroAtual}&text=${encodeURIComponent(
        mensagemFinal
      )}`;
      window.open(urlComNumero, "_blank");
      handleProximo();
    } else {
      alert("Nenhum número disponível ou você chegou ao final da lista.");
    }
  };

  // Função para ir para o próximo número
  const handleProximo = () => {
    if (currentIndex < numeros.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Você já enviou para todos os números.");
    }
  };

  // Função para enviar mensagens aos próximos 5 números
  const handleEnviarProximos5 = () => {
    const limit = Math.min(currentIndex + 5, numeros.length); // Garante que não exceda o total de números
    for (let i = currentIndex; i < limit; i++) {
      const numeroAtual = numeros[i];
      const mensagemFinal = mensagem ? mensagem : defaultMessage;
      const urlComNumero = `${baseURL}${numeroAtual}&text=${encodeURIComponent(
        mensagemFinal
      )}`;

      // Abre cada aba com um pequeno atraso
      setTimeout(() => {
        window.open(urlComNumero, "_blank");
      }, (i - currentIndex) * 20000); // 20 segundo de intervalo entre cada aba
    }
    setCurrentIndex(limit); // Atualiza o índice para o próximo após o envio
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

      {/* Upload do arquivo Excel */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{
          marginBottom: "1rem",
        }}
      />

      {/* Campo de mensagem opcional */}
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
          marginBottom: "1rem",
        }}
      >
        Enviar Mensagem
      </button>

      <button
        onClick={handleEnviarProximos5}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Enviar para os Próximos 5
      </button>

      {/* Exibe o número atual */}
      {numeros.length > 0 && (
        <p style={{ marginTop: "1rem" }}>
          Número atual: {numeros[currentIndex]}
        </p>
      )}
    </div>
  );
}

export default App;
