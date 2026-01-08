// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);
  const [scene, setScene] = useState("Estúdio Branco Profissional");
  const [modelType, setModelType] = useState("Standard");

  // Função preparada para IA real no futuro
  const generateImage = async () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    alert(
      `Gerando imagem com IA...\n\nCenário: ${scene}\nModelo: ${modelType}`
    );

    try {
      // Simulação de processamento da IA
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setImage(image); // futuramente será a imagem retornada pela IA
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
