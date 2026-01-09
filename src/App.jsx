import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);
  const [scene, setScene] = useState("Estúdio Branco");
  const [customScene, setCustomScene] = useState("");
  const [modelType, setModelType] = useState("Standard");

  const handleGenerate = () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    const finalScene = customScene.trim() !== "" ? customScene : scene;

    alert(
      `Gerando imagem com IA...\n\nCenário: ${finalScene}\nModelo: ${modelType}`
    );

    alert("Imagem gerada com sucesso!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "imagem-gerada.jpg";
    link.click();
 const handleWhatsApp = () => {
  const siteUrl = window.location.href;

  const text = encodeURIComponent(
    `Veja a imagem gerada com IA no FashionFlow!\n\nAcesse aqui:\n${siteUrl}`
  );

  window.open(`https://wa.me/?text=${text}`, "_blank");
};


  return (
    <>
      <Header />

      <div className="container">
        {/* COLUNA ESQUERDA */}
        <div className="section">
          <h2>Upload da peça</h2>

          <ImageUploader onUpload={setImage} />

          {/* CENÁRIOS */}
          <div style={{ marginTop: "16px" }}>
            <label>Cenário</label>
            <select
              value={scene}
              onChange={(e) => setScene(e.target.value)}
              style={{ width: "100%", marginTop: "8px", padding: "8px" }}
            >
              <option>Estúdio Branco</option>
              <option>Loft Moderno</option>
              <option>Paris (Urbano Chic)</option>
              <option>Praia Paradisíaca</option>
              <option>Jardim Tropical</option>
            </select>
          </div>

          {/* CENÁRIO LIVRE */}
          <div style={{ marginTop: "12px" }}>
            <label>Ou digite qualquer cenário do mundo</label>
            <input
              type="text"
              placeholder="Ex: Nova York à noite, Tóquio futurista..."
              value={customScene}
              onChange={(e) => setCustomScene(e.target.value)}
              style={{ width: "100%", marginTop: "8px", padding: "8px" }}
            />
          </div>

          {/* MODELO */}
          <div style={{ marginTop: "12px" }}>
            <label>Tipo de modelo</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              style={{ width: "100%", marginTop: "8px", padding: "8px" }}
            >
              <option>Standard</option>
              <option>Plus</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            style={{ marginTop: "20px" }}
          >
            Gerar imagem com IA
          </button>
        </div>

        {/* COLUNA DIREITA */}
        <div className="section">
          <h2>Resultado</h2>

          {image ? (
            <>
              <img src={image} alt="Preview" />

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "16px",
                  flexWrap: "wrap",
                }}
              >
                <button onClick={handleDownload}>Baixar imagem</button>
                <button onClick={handleWhatsApp}>
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
