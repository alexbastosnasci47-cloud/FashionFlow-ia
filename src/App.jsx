import { useState } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";

function App() {
  const [image, setImage] = useState(null);

  const handleGenerate = () => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    // Simulação da IA (nenhuma API ainda)
    alert("Gerando imagem com IA...\nCenário e modelo serão aplicados aqui.");
    alert("Imagem gerada com sucesso!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "imagem-gerada.jpg";
    link.click();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Veja a imagem gerada com IA no FashionFlow!"
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="section">
          <h2>Upload da peça</h2>

          <ImageUploader onUpload={setImage} />

          <button
            onClick={handleGenerate}
            style={{ marginTop: "16px" }}
          >
            Gerar imagem com IA
          </button>
        </div>

        <div className="section">
          <h2>Resultado</h2>

          {image ? (
            <>
              <img src={image} alt="Preview" />

              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <button onClick={handleDownload}>Baixar imagem</button>
                <button onClick={handleWhatsApp}>Compartilhar no WhatsApp</button>
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
