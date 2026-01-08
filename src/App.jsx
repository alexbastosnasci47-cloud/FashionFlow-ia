// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);

  // Função separada para gerar a imagem
  const generateImage = () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    // Simula o processo de IA
    alert("Gerando imagem com IA...");

    setTimeout(() => {
      alert("Imagem gerada com sucesso!");
      setImage(image); // mantém a mesma imagem por enquanto
    }, 1000);
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
