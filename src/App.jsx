// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);               // imagem do upload
  const [generatedImage, setGeneratedImage] = useState(null); // imagem final da IA
  const [scene, setScene] = useState("Estúdio Branco Profissional");
  const [customScene, setCustomScene] = useState("");
  const [modelType, setModelType] = useState("Standard");

  // Função para gerar a imagem com IA
  const generateImage = async () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    const finalScene = customScene.trim() !== "" ? customScene : scene;

    alert(`Gerando imagem com IA...\nCenário: ${finalScene}\nModelo: ${modelType}`);

    try {
      // =========================
      // Aqui vai a chamada real da API Gemini
      // =========================
      // Simulação: substituímos a imagem do upload por "gerada"
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Atualiza apenas generatedImage, não image
      setGeneratedImage(image); // futuramente, será a URL retornada pela IA
      alert("Imagem gerada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar imagem com IA.");
    }
  };

  // Função para baixar a imagem gerada
  const downloadImage = () => {
    if (!generatedImage) {
      alert("Nenhuma imagem para baixar!");
      return;
    }

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "lookgram_result.png";
    link.click();
  };

  // Função para compartilhar a imagem gerada via WhatsApp
  const shareWhatsApp = () => {
    if (!generatedImage) {
      alert("Nenhuma imagem para compartilhar!");
      return;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?text=Olha a minha peça! ${generatedImage}`;
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

          {generatedImage ? (
            <>
              <img
                src={generatedImage}
                alt="Preview"
                style={{ maxWidth: "100%", marginTop: "16px" }}
              />

              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={downloadImage}
                  style={{ marginRight: "8px", padding: "8px 12px", cursor: "pointer" }}
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
            <p>Nenhuma imagem gerada ainda</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
