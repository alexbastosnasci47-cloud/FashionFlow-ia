// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  // Estados do app
  const [image, setImage] = useState(null); // imagem enviada pelo usuário
  const [scene, setScene] = useState("Estúdio Branco Profissional"); // select de cenário
  const [customScene, setCustomScene] = useState(""); // cenário digitado
  const [modelType, setModelType] = useState("Standard"); // tipo de modelo

  // Função para gerar a imagem com IA (simulação)
  const generateImage = () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    const finalScene = customScene.trim() !== "" ? customScene : scene;

    // Apenas alerta simulado, sem download automático
    alert(`Gerando imagem com IA...\nCenário: ${finalScene}\nModelo: ${modelType}`);

    // Futuramente aqui será substituído pela chamada real da API Gemini
  };

  // Função para baixar a imagem enviada/gerada
  const downloadImage = () => {
    if (!image) {
      alert("Nenhuma imagem para baixar!");
      return;
    }

    const link = document.createElement("a");
    link.href = image;
    link.download = "lookgram_result.png";
    link.click();
  };

  // Função para compartilhar via WhatsApp
  const shareWhatsApp = () => {
    if (!image) {
      alert("Nenhuma imagem para compartilhar!");
      return;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?text=Olha a minha peça! ${image}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="section">
          <h2>Upload da peça</h2>
          <ImageUploader onUpload={setImage} />

          <h3>Cenário</h3>
          <select
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            style={{ marginBottom: "8px", width: "100%", padding: "6px" }}
          >
            <option>Paris (Urbano Chic)</option>
            <option>Praia Paradisíaca</option>
            <option>Jardim Tropical</option>
            <option>Estúdio Branco Profissional</option>
            <option>Loft Moderno</option>
          </select>

          <input
            type="text"
            placeholder="Ou digite outro cenário aqui..."
            value={customScene}
            onChange={(e) => setCustomScene(e.target.value)}
            style={{ marginBottom: "12px", width: "100%", padding: "6px" }}
          />

          <h3>Tipo de modelo</h3>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            style={{ marginBottom: "12px", width: "100%", padding: "6px" }}
          >
            <option>Standard</option>
            <option>Plus</option>
          </select>

          <button
            onClick={generateImage}
            style={{ padding: "10px 16px", cursor: "pointer" }}
          >
            Gerar imagem com IA
          </button>
        </div>

        <div className="section">
          <h2>Resultado</h2>

          {image ? (
            <>
              <img
                src={image}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: "16px" }}
              />

              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={downloadImage}
                  style={{
                    marginRight: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Baixar Imagem
                </button>

                <button
                  onClick={shareWhatsApp}
                  style={{ padding: "8px 12px", cursor: "pointer" }}
                >
                  Compartilhar no WhatsApp
                </button>
              </div>
            </>
          ) : (
            <p>Nenhuma imagem enviada</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
