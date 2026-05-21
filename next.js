'use client';

import { useState, useEffect } from 'react';
import { perguntasPorTema, Pergunta } from '@/data/perguntas';

interface Usuario {
  nome: string;
  nivel: string;
  pontos: number;
}

interface Mensagem Chat {
  id: number;
  tipo: 'user' | 'bot';
  texto: string;
}

export default function Home() {
  // --- ESTADOS DA APLICAÇÃO ---
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [abaLogin, setAbaLogin] = useState<'login' | 'cadastro'>('login');
  
  // Inputs de formulários
  const [nomeInput, setNomeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  
  // Estados do Quiz
  const [quizAtivo, setQuizAtivo] = useState(false);
  const [temaAtual, setTemaAtual] = useState<string>('basico');
  const [perguntaAtualIdx, setPerguntaAtualIdx] = useState(0);
  const [pontosQuiz, setPontosQuiz] = useState(0);

  // Estados do Chat
  const [mensagens, setMensagens] = useState<MensagemChat[]>([
    { id: 1, tipo: 'bot', texto: '¡Hola! Sou seu assistente de Espanhol. Como posso te ajudar hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [estaDigitando, setEstaDigitando] = useState(false);

  // Estado do Modal de Detalhes dos Cards
  const [conteudoModal, setConteudoModal] = useState<string | null>(null);

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const salvo = localStorage.getItem('usuario');
    if (salvo) {
      setUsuario(JSON.parse(salvo));
    }
  }, []);

  // --- FUNÇÕES DE LOGICA ---
  const lidarComLoginCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeInput.trim()) return;

    const novoUsuario: Usuario = {
      nome: nomeInput,
      nivel: 'Principiante',
      pontos: 0
    };

    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    setUsuario(novoUsuario);
  };

  const fazerLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const iniciarQuiz = (tema: string) => {
    setTemaAtual(tema);
    setPerguntaAtualIdx(0);
    setPontosQuiz(0);
    setQuizAtivo(true);
  };

  const responderQuiz = (opcaoSelecionada: number) => {
    const perguntas = perguntasPorTema[temaAtual] || [];
    const perguntaAtual = perguntas[perguntaAtualIdx];

    let novosPontos = pontosQuiz;
    if (opcaoSelecionada === perguntaAtual.correta) {
      novosPontos += 10;
      setPontosQuiz(novosPontos);
      alert("¡Correcto! 🎉");
    } else {
      alert(`Incorreto. A resposta certa era: ${perguntaAtual.opcoes[perguntaAtual.correta]}`);
    }

    if (perguntaAtualIdx + 1 < perguntas.length) {
      setPerguntaAtualIdx(perguntaAtualIdx + 1);
    } else {
      alert(`Fim do Quiz! Você fez ${novosPontos} pontos.`);
      if (usuario) {
        const usuarioAtualizado = { ...usuario, pontos: usuario.pontos + novosPontos };
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
      }
      setQuizAtivo(false);
    }
  };

  const enviarMensagemChat = () => {
    if (!chatInput.trim()) return;

    const novaMsgUser: MensagemChat = { id: Date.now(), tipo: 'user', texto: chatInput };
    setMensagens(prev => [...prev, novaMsgUser]);
    setChatInput('');
    setEstaDigitando(true);

    // Simulação do Bot Inteligente
    setTimeout(() => {
      setEstaDigitando(false);
      const novaMsgBot: MensagemChat = {
        id: Date.now() + 1,
        tipo: 'bot',
        texto: `Você disse "${novaMsgUser.texto}". ¡Excelente práctica!`
      };
      setMensagens(prev => [...prev, novaMsgBot]);
    }, 1500);
  };

  // --- RENDERIZAÇÃO DA INTERFACE ---

  // Tela de Login/Cadastro (Caso não haja usuário logado)
  if (!usuario) {
    return (
      <div className="login" id="loginPage">
        <div className="login-bg">
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
          <div className="orb orb3"></div>
        </div>
        <div className="login-box">
          <div className="login-logo">
            <span className="logo-icon">🌎</span>
            <h1>SPANISH WORLD</h1>
          </div>
          <p className="login-sub">Aprenda espanhol do básico ao avançado</p>
          
          <div className="tabs-login">
            <button className={abaLogin === 'login' ? 'ativo' : ''} onClick={() => setAbaLogin('login')}>LOGIN</button>
            <button className={abaLogin === 'cadastro' ? 'ativo' : ''} onClick={() => setAbaLogin('cadastro')}>CADASTRO</button>
          </div>

          <form onSubmit={lidarComLoginCadastro} className="form-login">
            <input 
              type="text" 
              placeholder="Digite seu nome" 
              className="input-login" 
              required 
              value={nomeInput}
              onChange={(e) => setNomeInput(e.target.value)}
            />
            {abaLogin === 'cadastro' && (
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="input-login"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            )}
            <button type="submit" className="btn-login">
              {abaLogin === 'login' ? '🚀 ENTRAR' : '✨ CADASTRAR'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Principal (Usuário Logado)
  const perguntasDoTema = perguntasPorTema[temaAtual] || [];
  const perguntaAtual = perguntasDoTema[perguntaAtualIdx];

  return (
    <div className="site">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span>🌎</span> SPANISH WORLD
          </div>
          <nav className="nav-links">
            <a href="#dashboard">Dashboard</a>
            <a href="#conteudo">Aulas</a>
            <a href="#pratica">Praticar</a>
            <a href="#chat">IA Chat</a>
            <a href="#contato">Suporte</a>
          </nav>
          <div className="user-profile-nav">
            <span className="user-avatar-icon">👤</span>
            <div className="user-nav-info">
              <span className="user-nav-name">{usuario.nome}</span>
              <span className="user-nav-pts">🏆 {usuario.pontos} pts</span>
            </div>
            <button onClick={fazerLogout} style={{marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer'}}>🚪</button>
          </div>
        </div>
      </header>

      {/* DASHBOARD HERO */}
      <section id="dashboard" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2>¡Hola, {usuario.nome}! 👋</h2>
            <p>Seu nível atual é <strong>{usuario.nivel}</strong>. Continue praticando para alcançar a fluência!</p>
            <div className="stats-container">
              <div className="stat-card">
                <h3>🏆 {usuario.pontos}</h3>
                <p>Pontos Totais</p>
              </div>
              <div className="stat-card">
                <h3>🔥 5 Dias</h3>
                <p>Ofensiva Atual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO / CARDS */}
      <section id="conteudo" className="seccion">
        <h2 className="titulo-seccion">📚 Módulos de Aprendizado</h2>
        <div className="cards-grid">
          <div className="card" onClick={() => setConteudoModal('<h2>Vocabulário Básico</h2><p>Aqui você aprende saudações como "Buenos días", "Hola" e expressões comuns do dia a dia.</p>')}>
            <div className="card-icon">💬</div>
            <h3>Vocabulário Essencial</h3>
            <p>Saudações, despedidas e expressões do cotidiano.</p>
          </div>
          <div className="card" onClick={() => setConteudoModal('<h2>Gramática: Verbo Ser/Estar</h2><p>Entenda quando usar "Soy" ou "Estoy" para não errar mais!</p>')}>
            <div className="card-icon">🧠</div>
            <h3>Gramática Prática</h3>
            <p>Estruturas verbais e tempos essenciais simplificados.</p>
          </div>
        </div>
      </section>

      {/* QUIZ / PRÁTICA */}
      <section id="pratica" className="seccion bg-alt">
        <h2 className="titulo-seccion">🎯 Área de Prática</h2>
        
        {!quizAtivo ? (
          <div className="temas-grid">
            <div className="tema-card" onClick={() => iniciarQuiz('basico')}>
              <h3>Vocabulário Básico</h3>
              <button className="btn-primary">Iniciar Quiz</button>
            </div>
            <div className="tema-card" onClick={() => iniciarQuiz('animais')}>
              <h3>Animais</h3>
              <button className="btn-primary">Iniciar Quiz</button>
            </div>
          </div>
        ) : (
          <div className="quiz-box">
            <div className="quiz-header">
              <span>Tema: <strong>{temaAtual.toUpperCase()}</strong></span>
              <span>Pergunta {perguntaAtualIdx + 1} de {perguntasDoTema.length}</span>
            </div>
            {perguntaAtual && (
              <>
                <h3 className="quiz-pergunta">{perguntaAtual.pergunta}</h3>
                <div className="quiz-opcoes">
                  {perguntaAtual.opcoes.map((opcao, idx) => (
                    <button 
                      key={idx} 
                      className="btn-opcao" 
                      onClick={() => responderQuiz(idx)}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button className="btn-secondary" style={{marginTop: '20px'}} onClick={() => setQuizAtivo(false)}>
              ❌ Cancelar Quiz
            </button>
          </div>
        )}
      </section>

      {/* CHAT COM IA */}
      <section id="chat" className="seccion">
        <h2 className="titulo-seccion">🤖 Chat Inteligente</h2>
        <div className="chat-container">
          <div className="chat-box">
            {mensagens.map((msg) => (
              <div key={msg.id} className={msg.tipo === 'user' ? 'msg-user' : 'msg-bot'}>
                <span className="msg-avatar">{msg.tipo === 'user' ? '😊' : '🤖'}</span>
                <div className="msg-bubble">{msg.texto}</div>
              </div>
            ))}
            {estaDigitando && (
              <div className="msg-bot msg-typing">
                <span className="msg-avatar">🤖</span>
                <div className="msg-bubble">Digitando<span className="dots">...</span></div>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Escreva em espanhol..." 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensagemChat()}
            />
            <button onClick={enviarMensagemChat}>Enviar</button>
          </div>
        </div>
      </section>

      {/* MODAL DETALHE DE CARDS */}
      {conteudoModal && (
        <div className="modal-card" onClick={() => setConteudoModal(null)}>
          <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
            <span className="modal-fechar" onClick={() => setConteudoModal(null)}>✕</span>
            <div dangerouslySetInnerHTML={{ __file: conteudoModal }} />
          </div>
        </div>
      )}
    </div>
  );
}
