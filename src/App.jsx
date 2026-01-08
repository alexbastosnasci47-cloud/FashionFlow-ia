import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="section">
          <h3>Upload da peça</h3>
          <p>Aqui vamos enviar a imagem</p>
        </div>

        <div className="section">
          <h3>Resultado</h3>
          <p>Aqui aparecerá a imagem gerada</p>
        </div>
      </div>
    </>
  )
}

export default App
