import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Sparkles, 
  Share2, 
  Download, 
  Layers, 
  Image as ImageIcon, 
  CheckCircle2, 
  Smartphone,
  Send,
  Loader2,
  ChevronRight,
  User,
  Trash2,
  History,
  MapPin,
  Maximize
} from 'lucide-react';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);
  const [modelType, setModelType] = useState('modelo plus size feminina elegante e estilosa');
  const [location, setLocation] = useState('estúdio fotográfico minimalista');
  const [status, setStatus] = useState('');

  const apiKey = ""; 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const generateFashionLook = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    setStatus('Configurando enquadramento de corpo inteiro...');

    try {
      const base64Data = await fileToBase64(selectedImage);
      
      // Prompt focado em CORPO INTEIRO e PRESERVAÇÃO da peça
      const prompt = `FASHION PHOTOGRAPHY - FULL BODY SHOT: 
      Subject: A ${modelType} standing, showing the entire outfit from head to toe, including shoes.
      Environment: ${location}. 
      Garment: Use the exact clothing item from the uploaded image. The colors, patterns, and fabric must be perfectly preserved.
      Composition: Centered full-length portrait, professional fashion catalog style.
      Lighting: High-end fashion lighting, sharp focus on the clothes, 8k resolution, cinematic quality.
      NO CROPPING: Do not cut off the head or feet. Whole body must be visible.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inlineData: { mimeType: "image/png", data: base64Data } }
            ]
          }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE']
          }
        })
      });

      if (!response.ok) throw new Error('Falha na comunicação');

      const result = await response.json();
      const base64Image = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

      if (base64Image) {
        const newImg = `data:image/png;base64,${base64Image}`;
        setGeneratedImage(newImg);
        setHistory(prev => [newImg, ...prev].slice(0, 4));
        setStatus('Corpo inteiro renderizado!');
      }
    } catch (error) {
      console.error(error);
      setStatus('Erro de conexão. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareToWhatsApp = () => {
    if (!generatedImage) return;
    const message = encodeURIComponent(`Olá! Veja o resultado do nosso novo ensaio digital de corpo inteiro. ✨`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `fashion-full-body-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
              <Layers className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">FashionFlow <span className="text-indigo-600">Studio</span></h1>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
             <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Modo Corpo Inteiro Ativo</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Painel lateral */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
              <h2 className="text-xs font-black mb-6 text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                Configuração da Foto
              </h2>
              
              <div className="space-y-5">
                {/* Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Imagem de Referência</label>
                  <label className={`relative block cursor-pointer border-2 border-dashed rounded-2xl transition-all h-36 overflow-hidden bg-slate-50 hover:bg-slate-100 ${previewUrl ? 'border-indigo-400' : 'border-slate-200'}`}>
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    {previewUrl ? (
                      <img src={previewUrl} alt="Original" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <Upload className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-bold">Enviar Peça</span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Modelo */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Perfil do Modelo</label>
                  <select 
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="modelo plus size feminina elegante e sorridente">Modelo Plus Size Feminina</option>
                    <option value="modelo plus size masculina robusto e estiloso">Modelo Plus Size Masculina</option>
                    <option value="modelo feminina profissional fashion">Modelo Feminina Standard</option>
                    <option value="modelo masculino atlético fashion">Modelo Masculino Standard</option>
                  </select>
                </div>

                {/* Localização */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-500" /> Cenário Externo ou Interno
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <optgroup label="Mais Pedidos">
                      <option value="ruas de Paris com prédios clássicos em um dia ensolarado">Paris (Urbano Chic)</option>
                      <option value="praia de areia branca com mar azul turquesa e coqueiros">Praia Paradisiaca</option>
                      <option value="jardim botânico tropical com vegetação densa e flores">Jardim Tropical</option>
                    </optgroup>
                    <optgroup label="Estúdios">
                      <option value="estúdio fotográfico profissional com fundo infinito branco">Estúdio Branco Profissional</option>
                      <option value="loft minimalista com parede de tijolos e luz natural">Loft Moderno</option>
                    </optgroup>
                  </select>
                </div>

                <button 
                  onClick={generateFashionLook}
                  disabled={!selectedImage || isGenerating}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3 tracking-widest text-xs"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PROCESSANDO CORPO INTEIRO...</span>
                    </>
                  ) : (
                    <>
                      <Maximize className="w-4 h-4" />
                      <span>GERAR FOTO COMPLETA</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {status && (
              <div className="p-4 bg-indigo-600 text-white rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                <Sparkles className="w-4 h-4" />
                {status}
              </div>
            )}
          </div>

          {/* Resultado */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-3 shadow-xl border border-slate-100 relative">
              <div className="relative aspect-[3/4.5] md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100">
                {isGenerating && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 w-6 h-6" />
                    </div>
                    <p className="mt-6 font-black text-[10px] tracking-[0.2em] text-indigo-600 uppercase text-center px-10 leading-relaxed">
                      Ajustando enquadramento <br/>e iluminação de corpo inteiro
                    </p>
                  </div>
                )}

                {generatedImage ? (
                  <div className="relative h-full group">
                    <img src={generatedImage} alt="Resultado Final" className="w-full h-full object-cover animate-in zoom-in-95 duration-700" />
                    
                    {/* Botões Flutuantes de Ação */}
                    <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                      <button onClick={downloadImage} className="w-full bg-white/90 backdrop-blur-sm text-slate-900 p-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95">
                        <Download className="w-4 h-4" /> 
                        Salvar na Galeria
                      </button>
                      <button onClick={shareToWhatsApp} className="w-full bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#22c35e] transition-all active:scale-95">
                        <Send className="w-4 h-4" /> 
                        Enviar Catálogo via WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 p-12 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                       <ImageIcon className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="font-black text-[10px] uppercase tracking-widest opacity-40">Selecione uma peça e clique em <br/>"Gerar Foto Completa"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Carrossel de Histórico */}
            {history.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 px-2">
                {history.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setGeneratedImage(img)}
                    className={`flex-shrink-0 w-24 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${generatedImage === img ? 'border-indigo-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Histórico" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
