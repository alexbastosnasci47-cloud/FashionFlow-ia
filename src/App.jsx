<button
  onClick={() => {
    if (!image) {
      alert("Envie uma imagem antes de gerar");
      return;
    }

    // Simula processo de IA
    alert("Gerando imagem com IA...");

    // Aqui você pode futuramente chamar a API da IA
    // Por enquanto, apenas reexibe a mesma imagem
    setTimeout(() => {
      alert("Imagem gerada com sucesso!");
      setImage(image); // mantém a mesma imagem
    }, 1000);
  }}
  style={{
    marginTop: "12px",
    padding: "10px 16px",
    cursor: "pointer"
  }}
>
  Gerar imagem com IA
</button>
