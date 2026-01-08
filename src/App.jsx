// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);

  // Função assíncrona preparada para a IA real
  const generateImage = async () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    alert("Gerando imagem com IA...");

    try {
      // Simulação do tempo de processamento da IA
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Depois de "gerar", atualiza a imagem no preview
      setImage(image); // futuramente substituir pela URL retornada pela IA
      alert("Imagem gerada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar imagem com IA.");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="section">
          <h2>Upload da peça</h2>
          <ImageUploader onUpload={setImage} />

          <button
            onClick={generateImage}
            style={{
              marginTop: "12px",
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
            <img
              src={image}
              alt="Preview"
              style={{ maxWidth: "100%", marginTop: "16px" }}
            />
          ) : (
            <p>Nenhuma imagem enviada</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
