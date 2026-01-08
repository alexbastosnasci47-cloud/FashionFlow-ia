import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="section">
          <h2>Upload da peça</h2>
          <p>Aqui vamos enviar a imagem</p>
        </div>

        <div className="section">
          <h2>Resultado</h2>
          <p>Aqui aparecerá a imagem gerada</p>
        </div>
      </div>
    </>
  )
}

export default App
