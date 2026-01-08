// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);
  const [scene, setScene] = useState("Estúdio Branco Profissional");
  const [modelType, setModelType] = useState("Standard");

  // Função assíncrona para gerar imagem (simulação)
  const generateImage = async () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    alert(
      `Gerando imagem com IA...\n\nCenário: ${scene}\nModelo: ${modelType}`
    );

    try {
      // Simula processamento da IA
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setImage(image); // futuramente substituir pela URL retornada pela IA
      alert("Imagem gerada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar imagem com IA.");
    }
  };

  // Função para baixar a imagem
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
          >
            <option>Paris (Urbano Chic)</option>
            <option>Praia Paradisíaca</option>
            <option>Jardim Tropical</option>
            <option>Estúdio Branco Profissional</option>
            <option>Loft Moderno</option>
          </select>

          <h3>Tipo de modelo</h3>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
          >
            <option>Standard</option>
            <option>Plus</option>
          </select>

          <br /><br />

          <button
            onClick={generateImage}
            style={{
              padding: "10px 16px",
              cursor: "pointer",
            }}
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
