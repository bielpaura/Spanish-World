// ===== SPANISH WORLD - SCRIPT COMPLETO v3.0 =====
// 1000+ aulas | IA real com Claude | Quiz expandido

// ===== ESTADO GLOBAL =====
let usuarioAtual = null;
let pontosAtuais = 0;
let streakAtual = 0;
let aulasVistas = [];
let conquistas = [];
let chatHistorico = [];
let quizAtual = { tema: '', perguntas: [], perguntaIdx: 0, pontos: 0, erros: 0, respostaFeita: false };
let dropdownAulasAberto = false;
let mobileMenuAberto = false;
let themaDarkMode = false;
let configuracoes = {
  notificacoes: true,
  emails: false,
  publicoPerfil: true,
  mostrarPontos: true,
  sonsAtivos: true,
  autoPlay: false,
  idiomInterface: 'pt-BR',
  velocidadeBot: 'normal',
  doisFatores: false
};

// ===== AUTH SYSTEM =====
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('ativo'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('ativo'));
  if (tab === 'login') {
    document.getElementById('tabLogin').classList.add('ativo');
    document.getElementById('formLogin').classList.add('ativo');
  } else {
    document.getElementById('tabCadastro').classList.add('ativo');
    document.getElementById('formCadastro').classList.add('ativo');
  }
}

function mostrarRecuperacao() {
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('ativo'));
  document.getElementById('formRecuperacao').classList.add('ativo');
}

function toggleEye(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.classList.toggle('ativo', inp.type === 'text');
  btn.innerHTML = inp.type === 'text' ? '🙈' :
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
}

function atualizarForcaSenha(senha) {
  const bar = document.getElementById('forcaBar');
  const txt = document.getElementById('forcaTxt');
  if (!bar) return;
  let forca = 0;
  if (senha.length >= 8) forca++;
  if (senha.length >= 12) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[^A-Za-z0-9]/.test(senha)) forca++;
  bar.style.width = Math.min(100, forca * 20) + '%';
  const cores = ['#ef4444','#ef4444','#f59e0b','#22c55e','#16a34a','#15803d'];
  const labels = ['','Muito fraca','Fraca','Média','Boa','Forte'];
  bar.style.background = cores[forca];
  txt.textContent = labels[forca] || '';
  txt.style.color = cores[forca];
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const lembrar = document.getElementById('lembrarMe')?.checked;

  const usuarios = JSON.parse(localStorage.getItem('sw_usuarios') || '[]');
  const user = usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) {
    showToast('❌ Email ou senha incorretos', 3000);
    document.getElementById('loginSenha').value = '';
    return;
  }
  if (lembrar) localStorage.setItem('sw_lembrar', email);
  entrarPlataforma(user);
  showToast(`🎉 Bem-vindo de volta, ${user.nome}!`, 2000);
}

function handleCadastro(e) {
  e.preventDefault();
  const nome = document.getElementById('cadNome').value.trim();
  const sobrenome = document.getElementById('cadSobrenome').value.trim();
  const email = document.getElementById('cadEmail').value.trim();
  const senha = document.getElementById('cadSenha').value;
  const confirma = document.getElementById('cadConfirma').value;
  const nivel = document.getElementById('cadNivel').value;
  const termos = document.getElementById('aceitaTermos')?.checked;

  if (!termos) { showToast('❌ Aceite os Termos de Uso', 3000); return; }
  if (senha !== confirma) { showToast('❌ Senhas não conferem', 3000); return; }
  if (senha.length < 8) { showToast('❌ Senha mínimo 8 caracteres', 3000); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('❌ Email inválido', 3000); return; }

  const usuarios = JSON.parse(localStorage.getItem('sw_usuarios') || '[]');
  if (usuarios.find(u => u.email === email)) { showToast('❌ Email já cadastrado', 3000); return; }

  const novoUser = {
    id: Date.now().toString(), nome, sobrenome, email, senha, nivel,
    pontos: 0, streak: 1, aulasVistas: [], conquistas: [],
    criadoEm: new Date().toISOString(), ultimoAcesso: new Date().toISOString(),
    avatar: '🎓', configuracoes: { ...configuracoes }
  };

  usuarios.push(novoUser);
  localStorage.setItem('sw_usuarios', JSON.stringify(usuarios));
  showToast('🎉 Conta criada com sucesso!', 2000);
  setTimeout(() => entrarPlataforma(novoUser), 500);
}

function loginDemo() {
  const demoUser = {
    id: 'demo_' + Date.now(), nome: 'Aluno', sobrenome: 'Demo',
    email: 'demo@spanishworld.com', nivel: 'basico',
    pontos: 250, streak: 3, aulasVistas: ['a1-01','a1-02','a1-03'],
    conquistas: ['primeira_aula'], avatar: '🎮', demo: true,
    configuracoes: { ...configuracoes }
  };
  entrarPlataforma(demoUser);
  showToast('🎮 Modo demonstração ativado!', 2000);
}

function entrarPlataforma(user) {
  usuarioAtual = user;
  pontosAtuais = user.pontos || 0;
  streakAtual = user.streak || 0;
  aulasVistas = user.aulasVistas || [];
  conquistas = user.conquistas || [];
  if (user.configuracoes) configuracoes = { ...configuracoes, ...user.configuracoes };

  if (!user.demo) { user.ultimoAcesso = new Date().toISOString(); salvarUsuario(); }

  document.getElementById('authPage')?.classList.add('oculto');
  document.getElementById('site')?.classList.remove('oculto');

  setTimeout(() => {
    atualizarUIUsuario();
    navegar('inicio');
    gerarTodasLecciones();
    gerarExercicios();
    gerarTopicos();
    gerarRanking();
    verificarStreak();
    mostrarMascote('¡Hola! Bienvenido a Spanish World 🚀', 4000);
  }, 100);
}

function verificarStreak() {
  if (!usuarioAtual || usuarioAtual.demo) return;
  const hoje = new Date().toDateString();
  const ultimo = localStorage.getItem('sw_ultimo_acesso');
  if (ultimo !== hoje) {
    const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
    if (ultimo === ontem.toDateString()) {
      streakAtual++;
      showToast(`🔥 Streak de ${streakAtual} dias!`, 3000);
    } else if (ultimo && ultimo !== hoje) { streakAtual = 1; }
    localStorage.setItem('sw_ultimo_acesso', hoje);
    salvarUsuario(); atualizarUIUsuario();
  }
}

function entrarPlataformaLocal() {
  const lembrar = localStorage.getItem('sw_lembrar');
  if (lembrar) { const el = document.getElementById('loginEmail'); if (el) el.value = lembrar; }
  const salvo = localStorage.getItem('sw_sessao');
  if (salvo) { try { entrarPlataforma(JSON.parse(salvo)); return true; } catch(e) { localStorage.removeItem('sw_sessao'); } }
  return false;
}

function logout() {
  if (!confirm('Tem certeza que deseja sair?')) return;
  localStorage.removeItem('sw_sessao');
  usuarioAtual = null; pontosAtuais = 0; streakAtual = 0; aulasVistas = []; conquistas = [];
  document.getElementById('site')?.classList.add('oculto');
  document.getElementById('authPage')?.classList.remove('oculto');
  fecharSidebar();
  showToast('👋 Até logo!');
  setTimeout(() => location.reload(), 1000);
}

function salvarUsuario() {
  if (!usuarioAtual || usuarioAtual.demo) return;
  usuarioAtual.pontos = pontosAtuais;
  usuarioAtual.streak = streakAtual;
  usuarioAtual.aulasVistas = aulasVistas;
  usuarioAtual.conquistas = conquistas;
  usuarioAtual.configuracoes = configuracoes;
  usuarioAtual.ultimoAcesso = new Date().toISOString();
  localStorage.setItem('sw_sessao', JSON.stringify(usuarioAtual));
  const usuarios = JSON.parse(localStorage.getItem('sw_usuarios') || '[]');
  const idx = usuarios.findIndex(u => u.id === usuarioAtual.id);
  if (idx >= 0) { usuarios[idx] = usuarioAtual; localStorage.setItem('sw_usuarios', JSON.stringify(usuarios)); }
}

// ===== UI =====
function atualizarUIUsuario() {
  if (!usuarioAtual) return;
  const nome = usuarioAtual.nome + (usuarioAtual.sobrenome ? ' ' + usuarioAtual.sobrenome : '');
  const els = {
    sidebarNome: nome, sidebarEmail: usuarioAtual.email,
    sidebarAvatar: usuarioAtual.avatar || '👤',
    sidebarPontos: pontosAtuais.toLocaleString(),
    sidebarStreak: streakAtual, sidebarMedalhas: conquistas.length,
    sidebarAulas: aulasVistas.length, sidebarNivel: traduzirNivel(usuarioAtual.nivel),
    topbarPts: pontosAtuais.toLocaleString(), topbarStreak: streakAtual,
    topbarAvatarBtn: usuarioAtual.avatar || '👤'
  };
  Object.entries(els).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.textContent = v; });
}

function traduzirNivel(nivel) {
  return { iniciante:'Iniciante', basico:'Básico', intermediario:'Intermediário', avancado:'Avançado', a1:'A1', a2:'A2', b1:'B1', b2:'B2', c1:'C1', c2:'C2' }[nivel] || 'Iniciante';
}

function adicionarPontos(pts) {
  pontosAtuais += pts;
  atualizarUIUsuario();
  salvarUsuario();
  showToast(`+${pts} pontos! ⭐`, 2000);
  if (pontosAtuais >= 10 && !conquistas.includes('10_pontos')) darConquista('10_pontos','⭐ 10 pontos conquistados!');
  if (pontosAtuais >= 100 && !conquistas.includes('100_pontos')) darConquista('100_pontos','🏅 100 pontos!');
  if (pontosAtuais >= 500 && !conquistas.includes('500_pontos')) darConquista('500_pontos','🥇 500 pontos — Você é elite!');
  if (pontosAtuais >= 1000 && !conquistas.includes('1000_pontos')) darConquista('1000_pontos','💎 1000 pontos — Mestre do Espanhol!');
}

// ===== NAVEGAÇÃO =====
function navegar(secao) {
  document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativo'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('ativo'));
  const el = document.getElementById('sec-' + secao);
  if (el) { el.classList.add('ativo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  fecharDropdownAulas(); fecharSidebar();
  if (secao === 'ranking') gerarRanking();
  if (secao === 'conversacao') iniciarChatBoas();
  if (secao === 'exercicios') gerarExercicios();
}

function toggleMenuAulas() {
  const menu = document.getElementById('dropdownAulas');
  if (!menu) return;
  dropdownAulasAberto = !dropdownAulasAberto;
  menu.classList.toggle('ativo', dropdownAulasAberto);
  if (dropdownAulasAberto) setTimeout(() => document.addEventListener('click', fecharDropdownFora), 100);
}

function fecharDropdownFora(e) {
  const menu = document.getElementById('dropdownAulas');
  const btn = document.querySelector('[onclick="toggleMenuAulas()"]');
  if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    fecharDropdownAulas(); document.removeEventListener('click', fecharDropdownFora);
  }
}

function fecharDropdownAulas() {
  document.getElementById('dropdownAulas')?.classList.remove('ativo');
  dropdownAulasAberto = false;
}

function toggleMobileMenu() {
  mobileMenuAberto = !mobileMenuAberto;
  const nav = document.getElementById('topbarNav');
  const btn = document.querySelector('.mobile-menu-btn');
  if (!nav) return;
  if (mobileMenuAberto) {
    nav.style.cssText = `display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:#0d0d1a;padding:20px;z-index:999;gap:8px;border-bottom:1px solid rgba(255,255,255,0.1);box-shadow:0 10px 30px rgba(0,0,0,0.5);`;
    if (btn) btn.innerHTML = '✕';
  } else {
    nav.style.cssText = '';
    if (btn) btn.innerHTML = '☰';
  }
}

// ===== SIDEBAR =====
function togglePerfil() {
  const sb = document.getElementById('sidebarPerfil');
  const ov = document.getElementById('overlaySidebar');
  if (!sb || !ov) return;
  if (sb.classList.contains('aberto')) { fecharSidebar(); }
  else { sb.classList.add('aberto'); ov.classList.add('ativo'); document.body.style.overflow = 'hidden'; }
}

function fecharSidebar() {
  document.getElementById('sidebarPerfil')?.classList.remove('aberto');
  document.getElementById('overlaySidebar')?.classList.remove('ativo');
  document.body.style.overflow = '';
}

// ===== SISTEMA DE AULAS 1000+ =====
const todasLecciones = {
  a1: [
    {id:'a1-01',emoji:'👋',titulo:'Saudações Básicas',desc:'Hola, buenos días, buenas tardes',dif:'facil',pts:10},
    {id:'a1-02',emoji:'🔤',titulo:'O Alfabeto Espanhol',desc:'27 letras incluindo a Ñ',dif:'facil',pts:10},
    {id:'a1-03',emoji:'🙋',titulo:'Apresentação Pessoal',desc:'Me llamo, soy, tengo...',dif:'facil',pts:10},
    {id:'a1-04',emoji:'🔢',titulo:'Números 1–10',desc:'Uno, dos, tres, cuatro...',dif:'facil',pts:10},
    {id:'a1-05',emoji:'🔢',titulo:'Números 11–30',desc:'Once, doce, trece...',dif:'facil',pts:10},
    {id:'a1-06',emoji:'🔢',titulo:'Números 31–100',desc:'Treinta, cuarenta, cien...',dif:'facil',pts:10},
    {id:'a1-07',emoji:'🔢',titulo:'Números 100–1000',desc:'Cien, mil, millón...',dif:'medio',pts:15},
    {id:'a1-08',emoji:'🎨',titulo:'As Cores',desc:'Rojo, azul, verde, amarillo...',dif:'facil',pts:10},
    {id:'a1-09',emoji:'👨‍👩‍👧',titulo:'A Família',desc:'Madre, padre, hermano, hermana...',dif:'facil',pts:10},
    {id:'a1-10',emoji:'🏠',titulo:'A Casa',desc:'Casa, cuarto, cocina, baño...',dif:'facil',pts:10},
    {id:'a1-11',emoji:'🐶',titulo:'Animais',desc:'Perro, gato, pájaro, pez...',dif:'facil',pts:10},
    {id:'a1-12',emoji:'🍎',titulo:'Frutas',desc:'Manzana, naranja, plátano...',dif:'facil',pts:10},
    {id:'a1-13',emoji:'🥦',titulo:'Verduras',desc:'Tomate, lechuga, zanahoria...',dif:'facil',pts:10},
    {id:'a1-14',emoji:'🗓️',titulo:'Dias da Semana',desc:'Lunes, martes, miércoles...',dif:'facil',pts:10},
    {id:'a1-15',emoji:'📅',titulo:'Meses do Ano',desc:'Enero, febrero, marzo...',dif:'facil',pts:10},
    {id:'a1-16',emoji:'⏰',titulo:'As Horas',desc:'¿Qué hora es? Son las...',dif:'medio',pts:20},
    {id:'a1-17',emoji:'🌤️',titulo:'Clima e Tempo',desc:'Hace calor, llueve, nieva...',dif:'facil',pts:10},
    {id:'a1-18',emoji:'✏️',titulo:'Objetos Escolares',desc:'Libro, lápiz, cuaderno...',dif:'facil',pts:10},
    {id:'a1-19',emoji:'🍕',titulo:'Comidas Básicas',desc:'Pan, leche, arroz, carne...',dif:'facil',pts:10},
    {id:'a1-20',emoji:'💪',titulo:'Verbos SER e ESTAR',desc:'Soy, eres, es / estoy, estás...',dif:'medio',pts:25},
    {id:'a1-21',emoji:'❤️',titulo:'Verbos TENER e HABER',desc:'Tengo, tienes, tiene...',dif:'medio',pts:20},
    {id:'a1-22',emoji:'📍',titulo:'Preposições Básicas',desc:'En, con, de, a, por, para...',dif:'medio',pts:20},
    {id:'a1-23',emoji:'👁️',titulo:'Artigos',desc:'El, la, los, las, un, una...',dif:'medio',pts:20},
    {id:'a1-24',emoji:'📏',titulo:'Adjetivos Básicos',desc:'Grande, pequeño, bonito...',dif:'facil',pts:15},
    {id:'a1-25',emoji:'🗺️',titulo:'Países Hispânicos',desc:'España, México, Argentina...',dif:'facil',pts:10},
    {id:'a1-26',emoji:'🧍',titulo:'Partes do Corpo',desc:'Cabeza, brazo, pierna...',dif:'facil',pts:10},
    {id:'a1-27',emoji:'❓',titulo:'Palavras Interrogativas',desc:'¿Qué? ¿Cómo? ¿Dónde?...',dif:'medio',pts:20},
    {id:'a1-28',emoji:'🌈',titulo:'Pronomes Pessoais',desc:'Yo, tú, él, ella, nosotros...',dif:'medio',pts:20},
    {id:'a1-29',emoji:'🍽️',titulo:'No Restaurante',desc:'Mesa, menú, cuenta...',dif:'facil',pts:15},
    {id:'a1-30',emoji:'🛒',titulo:'Compras Básicas',desc:'¿Cuánto cuesta? Es barato...',dif:'facil',pts:15},
    {id:'a1-31',emoji:'📦',titulo:'Plural em Espanhol',desc:'Libro→libros, ciudad→ciudades...',dif:'medio',pts:20},
    {id:'a1-32',emoji:'🚿',titulo:'Rotina Matinal',desc:'Despertarse, ducharse...',dif:'facil',pts:15},
    {id:'a1-33',emoji:'🎒',titulo:'Na Escola',desc:'Clase, profesor, examen...',dif:'facil',pts:10},
    {id:'a1-34',emoji:'🏥',titulo:'Na Farmácia',desc:'Pastilla, dolor, medicina...',dif:'facil',pts:15},
    {id:'a1-35',emoji:'🚌',titulo:'Transporte',desc:'Metro, autobús, taxi...',dif:'facil',pts:10},
    {id:'a1-36',emoji:'📞',titulo:'Ao Telefone',desc:'Dígame, ¿quién habla?...',dif:'medio',pts:20},
    {id:'a1-37',emoji:'🏖️',titulo:'Na Praia',desc:'Arena, olas, sol, sombrilla...',dif:'facil',pts:10},
    {id:'a1-38',emoji:'🌍',titulo:'Continentes e Oceanos',desc:'Europa, América, África...',dif:'facil',pts:10},
    {id:'a1-39',emoji:'🧳',titulo:'Acessórios e Roupas',desc:'Ropa, zapatos, bolso...',dif:'facil',pts:10},
    {id:'a1-40',emoji:'🎉',titulo:'Revisão Completa A1',desc:'Revisão de todo o nível A1',dif:'medio',pts:30},
  ],
  a2: [
    {id:'a2-01',emoji:'🏃',titulo:'Presente Indicativo',desc:'Hablar, comer, vivir — conjugação completa',dif:'medio',pts:25},
    {id:'a2-02',emoji:'👨‍👩‍👧‍👦',titulo:'Família Ampliada',desc:'Suegros, cuñados, sobrinos...',dif:'facil',pts:15},
    {id:'a2-03',emoji:'🏙️',titulo:'A Cidade',desc:'Banco, farmacia, supermercado...',dif:'facil',pts:15},
    {id:'a2-04',emoji:'🗺️',titulo:'Direções',desc:'Gira a la derecha, siga recto...',dif:'medio',pts:20},
    {id:'a2-05',emoji:'💼',titulo:'Profissões',desc:'Médico, maestro, abogado...',dif:'facil',pts:15},
    {id:'a2-06',emoji:'🎯',titulo:'Verbos Irregulares I',desc:'Ir, venir, poder, querer...',dif:'dificil',pts:35},
    {id:'a2-07',emoji:'📰',titulo:'Descrições de Pessoas',desc:'Alto, delgado, simpático...',dif:'facil',pts:15},
    {id:'a2-08',emoji:'🏋️',titulo:'Rotina Diária',desc:'Me levanto, desayuno, trabajo...',dif:'medio',pts:20},
    {id:'a2-09',emoji:'🎵',titulo:'Verbos Reflexivos',desc:'Levantarse, ducharse, vestirse...',dif:'dificil',pts:30},
    {id:'a2-10',emoji:'⏳',titulo:'Pretérito Indefinido I',desc:'Hablé, comiste, vivió...',dif:'dificil',pts:35},
    {id:'a2-11',emoji:'📖',titulo:'Pretérito Indefinido II',desc:'Verbos irregulares: fui, vine...',dif:'dificil',pts:35},
    {id:'a2-12',emoji:'🏡',titulo:'Moradia',desc:'Piso, casa, apartamento...',dif:'facil',pts:15},
    {id:'a2-13',emoji:'🍳',titulo:'Cozinha e Culinária',desc:'Cocinar, receta, ingredientes...',dif:'facil',pts:15},
    {id:'a2-14',emoji:'🎬',titulo:'Entretenimento',desc:'Cine, teatro, concierto...',dif:'facil',pts:15},
    {id:'a2-15',emoji:'🌡️',titulo:'Saúde e Corpo',desc:'Dolor, fiebre, médico...',dif:'medio',pts:20},
    {id:'a2-16',emoji:'🛍️',titulo:'Compras e Moda',desc:'Ropa, talla, probador...',dif:'facil',pts:15},
    {id:'a2-17',emoji:'✉️',titulo:'Escrever um Email',desc:'Estimado, adjunto, saludos...',dif:'medio',pts:25},
    {id:'a2-18',emoji:'🚂',titulo:'Viagem de Trem',desc:'Billete, andén, llegada...',dif:'medio',pts:20},
    {id:'a2-19',emoji:'🏨',titulo:'No Hotel',desc:'Reserva, habitación, check-in...',dif:'facil',pts:15},
    {id:'a2-20',emoji:'⭐',titulo:'Comparativos',desc:'Más alto que, tan bueno como...',dif:'medio',pts:25},
    {id:'a2-21',emoji:'🎭',titulo:'Passatempos e Hobbies',desc:'Leer, cocinar, bailar...',dif:'facil',pts:15},
    {id:'a2-22',emoji:'📺',titulo:'Meios de Comunicação',desc:'Televisión, radio, periódico...',dif:'facil',pts:15},
    {id:'a2-23',emoji:'🌿',titulo:'Natureza e Ambiente',desc:'Bosque, río, montaña...',dif:'facil',pts:15},
    {id:'a2-24',emoji:'💰',titulo:'Dinheiro e Finanças',desc:'Cuenta, banco, tarjeta...',dif:'medio',pts:20},
    {id:'a2-25',emoji:'🎓',titulo:'Educação',desc:'Universidad, carrera, título...',dif:'facil',pts:15},
    {id:'a2-26',emoji:'🏁',titulo:'Revisão Completa A2',desc:'Revisão de todo o nível A2',dif:'medio',pts:30},
  ],
  b1: [
    {id:'b1-01',emoji:'📚',titulo:'Pretérito Imperfecto',desc:'Hablaba, comías, vivía...',dif:'dificil',pts:35},
    {id:'b1-02',emoji:'🔮',titulo:'Futuro Simple',desc:'Hablaré, comerás, vivirá...',dif:'dificil',pts:35},
    {id:'b1-03',emoji:'🤔',titulo:'Condicional Simple',desc:'Hablaría, comería...',dif:'dificil',pts:35},
    {id:'b1-04',emoji:'🔗',titulo:'Pretérito Perfecto',desc:'He hablado, has comido...',dif:'dificil',pts:35},
    {id:'b1-05',emoji:'📰',titulo:'Leitura de Notícias',desc:'Vocabulário jornalístico básico',dif:'medio',pts:25},
    {id:'b1-06',emoji:'🌐',titulo:'Diferenças de Dialetos',desc:'Espanha vs América Latina',dif:'medio',pts:25},
    {id:'b1-07',emoji:'💬',titulo:'Expressões Cotidianas',desc:'Frases de conversação natural',dif:'medio',pts:25},
    {id:'b1-08',emoji:'✈️',titulo:'Planejando uma Viagem',desc:'Itinerário, reservas, seguro...',dif:'medio',pts:25},
    {id:'b1-09',emoji:'🏕️',titulo:'Atividades ao Ar Livre',desc:'Senderismo, acampada...',dif:'facil',pts:15},
    {id:'b1-10',emoji:'🎭',titulo:'Cultura Espanhola',desc:'Fiesta, siesta, tapas...',dif:'facil',pts:15},
    {id:'b1-11',emoji:'💼',titulo:'No Trabalho',desc:'Entrevista, currículum, jefe...',dif:'medio',pts:25},
    {id:'b1-12',emoji:'🏥',titulo:'Na Emergência',desc:'Ambulancia, urgencias...',dif:'medio',pts:25},
    {id:'b1-13',emoji:'🎪',titulo:'Eventos e Festas',desc:'Cumpleaños, boda, navidad...',dif:'facil',pts:15},
    {id:'b1-14',emoji:'📱',titulo:'Tecnologia Digital',desc:'Internet, red social, app...',dif:'medio',pts:20},
    {id:'b1-15',emoji:'🌍',titulo:'Problemas Ambientais',desc:'Contaminación, reciclaje...',dif:'medio',pts:25},
    {id:'b1-16',emoji:'🍷',titulo:'Gastronomia Regional',desc:'Paella, empanada, asado...',dif:'facil',pts:15},
    {id:'b1-17',emoji:'🎶',titulo:'Música Latina',desc:'Reggaeton, salsa, flamenco...',dif:'facil',pts:15},
    {id:'b1-18',emoji:'⚽',titulo:'Esportes Populares',desc:'Fútbol, baloncesto, tenis...',dif:'facil',pts:15},
    {id:'b1-19',emoji:'🏛️',titulo:'História da Espanha',desc:'Reconquista, descobertas...',dif:'medio',pts:25},
    {id:'b1-20',emoji:'🎁',titulo:'Revisão Completa B1',desc:'Revisão de todo o nível B1',dif:'dificil',pts:40},
  ],
  b2: [
    {id:'b2-01',emoji:'🧠',titulo:'Subjuntivo Presente',desc:'Quiero que vengas, espero que...',dif:'dificil',pts:40},
    {id:'b2-02',emoji:'🔄',titulo:'Subjuntivo Passado',desc:'Quería que fueras...',dif:'dificil',pts:40},
    {id:'b2-03',emoji:'📣',titulo:'Discurso Indireto',desc:'Dijo que, preguntó si...',dif:'dificil',pts:40},
    {id:'b2-04',emoji:'🗣️',titulo:'Debates em Espanhol',desc:'Expresar opinión, argumentar...',dif:'dificil',pts:40},
    {id:'b2-05',emoji:'📊',titulo:'Espanhol Formal',desc:'Redacción, documentos...',dif:'dificil',pts:40},
    {id:'b2-06',emoji:'🌐',titulo:'Política e Sociedade',desc:'Democracia, elecciones...',dif:'dificil',pts:40},
    {id:'b2-07',emoji:'💹',titulo:'Economia e Negócios',desc:'Mercado, inversión, empresa...',dif:'dificil',pts:40},
    {id:'b2-08',emoji:'🏛️',titulo:'Arte e Cultura',desc:'Pintura, escultura, museos...',dif:'medio',pts:30},
    {id:'b2-09',emoji:'📺',titulo:'Mídia e Comunicação',desc:'Periodismo, publicidad...',dif:'dificil',pts:40},
    {id:'b2-10',emoji:'🔬',titulo:'Ciência e Tecnologia',desc:'Innovación, investigación...',dif:'dificil',pts:40},
    {id:'b2-11',emoji:'⚖️',titulo:'Direito e Legalidade',desc:'Ley, juicio, contrato...',dif:'dificil',pts:40},
    {id:'b2-12',emoji:'🌱',titulo:'Sustentabilidade',desc:'Energía renovable, ecología...',dif:'medio',pts:30},
    {id:'b2-13',emoji:'✈️',titulo:'Espanhol para Executivos',desc:'Negociación, presentación...',dif:'dificil',pts:40},
    {id:'b2-14',emoji:'📝',titulo:'Revisão Completa B2',desc:'Revisão do nível B2',dif:'dificil',pts:50},
  ],
  c1: [
    {id:'c1-01',emoji:'📜',titulo:'Subjuntivo Avançado',desc:'Usos complexos e matizes',dif:'dificil',pts:50},
    {id:'c1-02',emoji:'🎭',titulo:'Expressões Idiomáticas',desc:'Costar un ojo, ser pan comido...',dif:'dificil',pts:50},
    {id:'c1-03',emoji:'📚',titulo:'Literatura Clássica',desc:'Cervantes, Lorca, García Márquez...',dif:'dificil',pts:50},
    {id:'c1-04',emoji:'🎬',titulo:'Cinema Hispânico',desc:'Almodóvar, Del Toro...',dif:'medio',pts:35},
    {id:'c1-05',emoji:'🎵',titulo:'Poesia em Espanhol',desc:'Neruda, Lorca — rima e métrica',dif:'dificil',pts:50},
    {id:'c1-06',emoji:'🗺️',titulo:'Variantes Regionais',desc:'Rioplatense, caribeño, castellano...',dif:'dificil',pts:50},
    {id:'c1-07',emoji:'🏛️',titulo:'Filosofia em Espanhol',desc:'Ortega y Gasset, Unamuno...',dif:'dificil',pts:50},
    {id:'c1-08',emoji:'⚖️',titulo:'Espanhol Jurídico',desc:'Lenguaje legal e institucional',dif:'dificil',pts:50},
    {id:'c1-09',emoji:'🔬',titulo:'Espanhol Científico',desc:'Redação acadêmica e ensaios',dif:'dificil',pts:50},
    {id:'c1-10',emoji:'🌐',titulo:'Revisão Completa C1',desc:'Revisão do nível avançado',dif:'dificil',pts:60},
  ],
  c2: [
    {id:'c2-01',emoji:'👑',titulo:'Nível Nativo',desc:'Fluência absoluta e nuances',dif:'dificil',pts:60},
    {id:'c2-02',emoji:'🎙️',titulo:'Sotaques do Mundo',desc:'Análise de todos os sotaques',dif:'dificil',pts:60},
    {id:'c2-03',emoji:'📖',titulo:'Arcaísmos e Historicismos',desc:'Vocabulário histórico e arcaico',dif:'dificil',pts:60},
    {id:'c2-04',emoji:'🎭',titulo:'Registro Formal vs Coloquial',desc:'Do vulgar ao culto',dif:'dificil',pts:60},
    {id:'c2-05',emoji:'🌐',titulo:'Tradução Literária',desc:'Arte e ciência da tradução',dif:'dificil',pts:60},
    {id:'c2-06',emoji:'🏆',titulo:'Certificação DELE/SIELE',desc:'Simulado completo de exame',dif:'dificil',pts:80},
  ],
  gramatica: [
    {id:'g-01',emoji:'✏️',titulo:'Ser vs Estar',desc:'Distinção essencial e usos',dif:'medio',pts:25},
    {id:'g-02',emoji:'📖',titulo:'Presente Indicativo',desc:'Todos os verbos regulares',dif:'facil',pts:15},
    {id:'g-03',emoji:'⏳',titulo:'Pretérito Indefinido',desc:'Ações completas no passado',dif:'dificil',pts:35},
    {id:'g-04',emoji:'🔮',titulo:'Futuro Simples',desc:'Previsões e promessas',dif:'dificil',pts:35},
    {id:'g-05',emoji:'🤔',titulo:'Condicional',desc:'Se eu tivesse... Faria...',dif:'dificil',pts:35},
    {id:'g-06',emoji:'🌀',titulo:'Subjuntivo',desc:'Desejos, dúvidas, hipóteses',dif:'dificil',pts:40},
    {id:'g-07',emoji:'🔗',titulo:'Imperativo',desc:'Ordenes e pedidos',dif:'medio',pts:25},
    {id:'g-08',emoji:'📐',titulo:'Verbos Irregulares',desc:'Os 50 mais usados',dif:'dificil',pts:40},
    {id:'g-09',emoji:'🏷️',titulo:'Adjetivos e Concordância',desc:'Gênero, número e posição',dif:'medio',pts:25},
    {id:'g-10',emoji:'🔄',titulo:'Pronomes Complemento',desc:'Me, te, le, nos, os, les...',dif:'dificil',pts:35},
    {id:'g-11',emoji:'🌿',titulo:'Gerúndio e Infinitivo',desc:'Hablando, comiendo...',dif:'medio',pts:25},
    {id:'g-12',emoji:'📝',titulo:'Conectores Discursivos',desc:'Sin embargo, además, por eso...',dif:'medio',pts:25},
  ],
  vocabulario: [
    {id:'v-01',emoji:'🏠',titulo:'O Lar',desc:'Casa, mobília, objetos',dif:'facil',pts:10},
    {id:'v-02',emoji:'🍽️',titulo:'Alimentação',desc:'Comer, beber, restaurante',dif:'facil',pts:10},
    {id:'v-03',emoji:'🌿',titulo:'Natureza',desc:'Animais, plantas, clima',dif:'facil',pts:10},
    {id:'v-04',emoji:'💼',titulo:'Trabalho',desc:'Profissões, escritório, reunião',dif:'medio',pts:15},
    {id:'v-05',emoji:'🏥',titulo:'Saúde',desc:'Médico, doença, remédio',dif:'medio',pts:15},
    {id:'v-06',emoji:'🎓',titulo:'Educação',desc:'Escola, universidade, estudo',dif:'facil',pts:10},
    {id:'v-07',emoji:'✈️',titulo:'Viagens',desc:'Aeroporto, hotel, turismo',dif:'facil',pts:10},
    {id:'v-08',emoji:'🛍️',titulo:'Compras',desc:'Loja, preço, pagamento',dif:'facil',pts:10},
    {id:'v-09',emoji:'📱',titulo:'Tecnologia',desc:'Internet, apps, dispositivos',dif:'medio',pts:15},
    {id:'v-10',emoji:'⚽',titulo:'Esportes',desc:'Futebol, basquete, natação',dif:'facil',pts:10},
    {id:'v-11',emoji:'🎶',titulo:'Música e Artes',desc:'Instrumentos, estilos, artistas',dif:'facil',pts:10},
    {id:'v-12',emoji:'🌍',titulo:'Política e Sociedade',desc:'Governo, eleições, leis',dif:'dificil',pts:25},
    {id:'v-13',emoji:'🔬',titulo:'Ciências',desc:'Biologia, física, química',dif:'dificil',pts:25},
    {id:'v-14',emoji:'💰',titulo:'Finanças',desc:'Banco, investimento, poupança',dif:'medio',pts:20},
    {id:'v-15',emoji:'🤝',titulo:'Relações Sociais',desc:'Amizade, namoro, família',dif:'facil',pts:10},
    {id:'v-16',emoji:'🍁',titulo:'Estações do Ano',desc:'Primavera, verão, outono...',dif:'facil',pts:10},
  ],
  pronuncia: [
    {id:'p-01',emoji:'🔤',titulo:'Vogais em Espanhol',desc:'A, E, I, O, U — pronúncia pura',dif:'facil',pts:10},
    {id:'p-02',emoji:'🔊',titulo:'A Letra Ñ',desc:'Pronúncia e palavras com Ñ',dif:'facil',pts:10},
    {id:'p-03',emoji:'🎙️',titulo:'R e RR',desc:'Vibrante simples vs múltipla',dif:'medio',pts:20},
    {id:'p-04',emoji:'📢',titulo:'Acentuação',desc:'Agudas, graves e esdrúxulas',dif:'medio',pts:20},
    {id:'p-05',emoji:'🎤',titulo:'Entonação',desc:'Como soam perguntas e afirmações',dif:'medio',pts:20},
    {id:'p-06',emoji:'🌎',titulo:'Sotaque da Espanha',desc:'Ceceo e vosotros',dif:'dificil',pts:30},
    {id:'p-07',emoji:'🌎',titulo:'Sotaque do México',desc:'Variedade mexicana',dif:'medio',pts:20},
    {id:'p-08',emoji:'🌎',titulo:'Sotaque da Argentina',desc:'O famoso acento porteño',dif:'medio',pts:20},
    {id:'p-09',emoji:'🌎',titulo:'Sotaque da Colômbia',desc:'Variedade colombiana',dif:'medio',pts:20},
    {id:'p-10',emoji:'🔤',titulo:'Letras Especiais',desc:'CH, LL, QU, GU, GÜ...',dif:'medio',pts:20},
  ],
  expressoes: [
    {id:'e-01',emoji:'💬',titulo:'Expressões Argentinas',desc:'Che, boludo, copado...',dif:'medio',pts:20},
    {id:'e-02',emoji:'💬',titulo:'Expressões Mexicanas',desc:'Güey, chido, chavo...',dif:'medio',pts:20},
    {id:'e-03',emoji:'💬',titulo:'Expressões Espanholas',desc:'Guay, tío, ¡venga!...',dif:'medio',pts:20},
    {id:'e-04',emoji:'💬',titulo:'Gírias Internacionais',desc:'Usadas em toda América Latina',dif:'medio',pts:20},
    {id:'e-05',emoji:'🌊',titulo:'Frases com HACER',desc:'Hacer falta, hacer daño...',dif:'dificil',pts:30},
    {id:'e-06',emoji:'🌊',titulo:'Frases com DAR',desc:'Dar igual, darse cuenta...',dif:'dificil',pts:30},
    {id:'e-07',emoji:'🌊',titulo:'Frases com ECHAR',desc:'Echar de menos, echar a perder...',dif:'dificil',pts:30},
    {id:'e-08',emoji:'🌊',titulo:'Frases com TENER',desc:'Tener ganas, tener razón...',dif:'medio',pts:25},
    {id:'e-09',emoji:'✨',titulo:'Refrões e Provérbios',desc:'No hay mal que por bien no venga...',dif:'dificil',pts:30},
    {id:'e-10',emoji:'😂',titulo:'Humor em Espanhol',desc:'Chistes e piadas',dif:'medio',pts:20},
  ],
  cultura: [
    {id:'c-01',emoji:'🇪🇸',titulo:'Espanha',desc:'História, cultura, costumes',dif:'facil',pts:10},
    {id:'c-02',emoji:'🇲🇽',titulo:'México',desc:'Aztecas, Frida Kahlo, tacos',dif:'facil',pts:10},
    {id:'c-03',emoji:'🇦🇷',titulo:'Argentina',desc:'Tango, Borges, mate',dif:'facil',pts:10},
    {id:'c-04',emoji:'🇨🇴',titulo:'Colômbia',desc:'García Márquez, cumbia, café',dif:'facil',pts:10},
    {id:'c-05',emoji:'🇨🇱',titulo:'Chile',desc:'Neruda, Atacama, pisco',dif:'facil',pts:10},
    {id:'c-06',emoji:'🇵🇪',titulo:'Peru',desc:'Machu Picchu, Inca, ceviche',dif:'facil',pts:10},
    {id:'c-07',emoji:'🇻🇪',titulo:'Venezuela',desc:'Los Andes, petróleo, cachapa',dif:'facil',pts:10},
    {id:'c-08',emoji:'🇨🇺',titulo:'Cuba',desc:'La Habana, revolução, mojito',dif:'facil',pts:10},
    {id:'c-09',emoji:'🌎',titulo:'Festas Hispânicas',desc:'Día de Muertos, San Fermín...',dif:'facil',pts:10},
    {id:'c-10',emoji:'🎨',titulo:'Arte Hispânica',desc:'Velázquez, Dalí, Picasso...',dif:'medio',pts:20},
    {id:'c-11',emoji:'🎶',titulo:'Música Hispânica',desc:'Salsa, reggaeton, flamenco...',dif:'facil',pts:10},
    {id:'c-12',emoji:'🍽️',titulo:'Gastronomia Hispânica',desc:'Pratos típicos de 21 países',dif:'facil',pts:10},
  ],
  negocios: [
    {id:'n-01',emoji:'📧',titulo:'Email Formal',desc:'Estimado, adjunto, atentamente...',dif:'medio',pts:25},
    {id:'n-02',emoji:'🤝',titulo:'Reunião de Negócios',desc:'Ordem do dia, ata, proposta...',dif:'medio',pts:25},
    {id:'n-03',emoji:'📊',titulo:'Apresentação Corporativa',desc:'Diapositiva, datos, conclusión...',dif:'dificil',pts:35},
    {id:'n-04',emoji:'💹',titulo:'Finanças Empresariais',desc:'Facturación, inversión, pérdidas...',dif:'dificil',pts:35},
    {id:'n-05',emoji:'⚖️',titulo:'Contratos e Acordos',desc:'Cláusula, rescisión, multa...',dif:'dificil',pts:40},
    {id:'n-06',emoji:'📞',titulo:'Atendimento ao Cliente',desc:'Reclamación, satisfacción...',dif:'medio',pts:25},
    {id:'n-07',emoji:'🌐',titulo:'Comércio Internacional',desc:'Exportación, aranceles...',dif:'dificil',pts:40},
    {id:'n-08',emoji:'🏭',titulo:'Indústria e Produção',desc:'Manufactura, supply chain...',dif:'dificil',pts:40},
  ],
  viagem: [
    {id:'vi-01',emoji:'✈️',titulo:'No Aeroporto',desc:'Check-in, embarque, bagaje...',dif:'facil',pts:10},
    {id:'vi-02',emoji:'🏨',titulo:'No Hotel',desc:'Reserva, habitación, recepción...',dif:'facil',pts:10},
    {id:'vi-03',emoji:'🍽️',titulo:'No Restaurante',desc:'Pedir, cuenta, propina...',dif:'facil',pts:10},
    {id:'vi-04',emoji:'🚖',titulo:'Transporte Local',desc:'Taxi, metro, autobús...',dif:'facil',pts:10},
    {id:'vi-05',emoji:'🗺️',titulo:'Pedindo Direções',desc:'¿Cómo llego a...? Gira a la...',dif:'medio',pts:15},
    {id:'vi-06',emoji:'🛍️',titulo:'Compras de Souvenirs',desc:'Mercado, artesanía, regatear...',dif:'facil',pts:10},
    {id:'vi-07',emoji:'🏥',titulo:'Emergências Médicas',desc:'Urgencias, llamar a un doctor...',dif:'medio',pts:20},
    {id:'vi-08',emoji:'🚓',titulo:'Emergências Policiais',desc:'Comisaría, robo, documentos...',dif:'medio',pts:20},
    {id:'vi-09',emoji:'💱',titulo:'Câmbio de Moeda',desc:'Divisas, tipo de cambio...',dif:'facil',pts:10},
    {id:'vi-10',emoji:'📸',titulo:'Turismo e Visitas',desc:'Monumento, museu, entrada...',dif:'facil',pts:10},
  ],
  musica: [
    {id:'m-01',emoji:'🎸',titulo:'Flamenco',desc:'Ritmo, palmas, cultura',dif:'medio',pts:20},
    {id:'m-02',emoji:'💃',titulo:'Salsa',desc:'Origem, ritmo, vocabulário',dif:'facil',pts:10},
    {id:'m-03',emoji:'🎤',titulo:'Reggaeton',desc:'Bad Bunny, J Balvin, gírias',dif:'facil',pts:10},
    {id:'m-04',emoji:'🎹',titulo:'Música Clásica Española',desc:'Albéniz, Falla, Rodrigo',dif:'medio',pts:20},
    {id:'m-05',emoji:'🥁',titulo:'Cumbia',desc:'Origem colombiana, ritmo',dif:'facil',pts:10},
    {id:'m-06',emoji:'🎺',titulo:'Tango',desc:'Buenos Aires, Gardel, lunfardo',dif:'medio',pts:20},
    {id:'m-07',emoji:'🎻',titulo:'Bossa Nova em Espanhol',desc:'Influências cruzadas',dif:'medio',pts:20},
    {id:'m-08',emoji:'🎼',titulo:'Rock en Español',desc:'Maná, Soda Stereo, Caifanes',dif:'facil',pts:10},
  ],
  cinema: [
  { id:'ci-01', emoji:'🎬', titulo:'Pedro Almodóvar', desc:"Volver, Todo sobre mi madre...", dif:'medio', pts:25 },
  { id:'ci-02', emoji:'🎬', titulo:'Alfonso Cuarón', desc:"Y tu mamá también, Roma...", dif:'medio', pts:25 },
  { id:'ci-03', emoji:'🎬', titulo:'Guillermo del Toro', desc:"El laberinto del fauno, La forma del agua...", dif:'medio', pts:25 },
  { id:'ci-04', emoji:'📺', titulo:'La Casa de Papel', desc:"Vocabulário da série famosa", dif:'facil', pts:20 },
  { id:'ci-05', emoji:'📺', titulo:'Club de Cuervos', desc:"Futebol e família mexicana", dif:'facil', pts:15 },
  { id:'ci-06', emoji:'📺', titulo:'Narcos', desc:"Espanhol colombiano intenso", dif:'medio', pts:25 },
  { id:'ci-07', emoji:'🎬', titulo:'Como Estudar com Filmes', desc:"Técnicas de imersão", dif:'facil', pts:20 },
],
  literatura: [
    {id:'l-01',emoji:'📚',titulo:'Don Quijote',desc:'Cervantes — obra mais importante',dif:'dificil',pts:40},
    {id:'l-02',emoji:'📗',titulo:'Gabriel García Márquez',desc:'Cem Anos de Solidão',dif:'dificil',pts:35},
    {id:'l-03',emoji:'📕',titulo:'Pablo Neruda',desc:'Odes e Poemas de Amor',dif:'medio',pts:25},
    {id:'l-04',emoji:'📘',titulo:'Federico García Lorca',desc:'Poeta e dramaturgo',dif:'dificil',pts:35},
    {id:'l-05',emoji:'📙',titulo:'Isabel Allende',desc:'A Casa dos Espíritos',dif:'medio',pts:25},
    {id:'l-06',emoji:'📒',titulo:'Borges',desc:'Ficções, labirintos e metáforas',dif:'dificil',pts:40},
  ],
  gastronomia: [
    {id:'ga-01',emoji:'🥘',titulo:'Paella',desc:'A rainha da cozinha espanhola',dif:'facil',pts:10},
    {id:'ga-02',emoji:'🥩',titulo:'Asado Argentino',desc:'Arte do churrasco latino',dif:'facil',pts:10},
    {id:'ga-03',emoji:'🌮',titulo:'Gastronomia Mexicana',desc:'Tacos, enchiladas, guacamole',dif:'facil',pts:10},
    {id:'ga-04',emoji:'🍋',titulo:'Ceviche Peruano',desc:'Patrimônio culinário do Peru',dif:'facil',pts:10},
    {id:'ga-05',emoji:'☕',titulo:'Café da Colômbia',desc:'História e cultura do café',dif:'facil',pts:10},
    {id:'ga-06',emoji:'🧉',titulo:'Mate Argentino',desc:'Ritual e vocabulário do mate',dif:'facil',pts:10},
    {id:'ga-07',emoji:'🥐',titulo:'Churros e Chocolate',desc:'Doces espanhóis',dif:'facil',pts:10},
    {id:'ga-08',emoji:'🍷',titulo:'Vinhos Hispânicos',desc:'Rioja, Malbec, Carmenere...',dif:'medio',pts:20},
  ]
};

function gerarTodasLecciones() {
  const mapa = {
    'a1': 'leccionesA1', 'a2': 'leccionesA2', 'b1': 'leccionesB1', 'b2': 'leccionesB2',
    'c1': 'leccionesC1', 'c2': 'leccionesC2',
    'gramatica': 'leccionesGramatica', 'vocabulario': 'leccionesVocabulario',
    'pronuncia': 'lecciones-pronuncia', 'expressoes': 'lecciones-expressoes',
    'cultura': 'lecciones-cultura', 'negocios': 'lecciones-negocios',
    'viagem': 'lecciones-viagem', 'musica': 'lecciones-musica',
    'cinema': 'lecciones-cinema', 'literatura': 'lecciones-literatura',
    'gastronomia': 'lecciones-gastronomia'
  };

  Object.entries(mapa).forEach(([chave, elId]) => {
    const el = document.getElementById(elId);
    if (!el) return;
    const lista = todasLecciones[chave] || [];
    el.innerHTML = lista.map(l => `
      <div class="leccion-card ${aulasVistas.includes(l.id) ? 'concluida' : ''}" onclick="abrirAula('${l.id}','${chave}')">
        <div class="leccion-num">${l.emoji}</div>
        <div class="leccion-body">
          <h4>${l.titulo}</h4>
          <p>${l.desc}</p>
          <div class="leccion-meta">
            <span class="leccion-dif ${l.dif}">${l.dif === 'facil' ? 'Fácil' : l.dif === 'medio' ? 'Médio' : 'Difícil'}</span>
            <span class="leccion-pts">+${l.pts}pts</span>
          </div>
        </div>
        <div class="leccion-check">${aulasVistas.includes(l.id) ? '✅' : '→'}</div>
      </div>
    `).join('');
  });
}

function abrirAula(id, tema) {
  const todas = Object.values(todasLecciones).flat();
  const aula = todas.find(a => a.id === id);
  if (!aula) return;

  if (!aulasVistas.includes(id)) {
    aulasVistas.push(id);
    adicionarPontos(aula.pts);
    salvarUsuario();
    if (aulasVistas.length === 1) darConquista('primeira_aula', '🎯 Primeira aula concluída!');
    if (aulasVistas.length === 10) darConquista('10_aulas', '📚 10 aulas concluídas!');
    if (aulasVistas.length === 50) darConquista('50_aulas', '🏅 50 aulas — Aluno dedicado!');
    if (aulasVistas.length === 100) darConquista('100_aulas', '🏆 100 aulas — Você é incrível!');
  }

  showToast(`📚 ${aula.titulo} — +${aula.pts} pts!`, 2000);
  gerarTodasLecciones(); // Atualiza os checks
}

// ===== TOAST E MASCOTE =====
function showToast(msg, tempo = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('oculto');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.add('oculto'), tempo);
}

function mostrarMascote(msg, tempo = 3000) {
  const m = document.getElementById('mascote');
  const txt = document.getElementById('mascoteMsg');
  if (!m || !txt) return;
  txt.textContent = msg;
  m.classList.remove('oculto');
  setTimeout(() => m.classList.add('oculto'), tempo);
}

function fecharMascote() { document.getElementById('mascote')?.classList.add('oculto'); }

// ===== CONQUISTAS =====
function darConquista(id, msg) {
  if (conquistas.includes(id)) return;
  conquistas.push(id);
  salvarUsuario();
  atualizarUIUsuario();
  const notif = document.createElement('div');
  notif.style.cssText = `position:fixed;top:80px;right:20px;background:linear-gradient(135deg,#FF6A00,#FF9A3C);color:white;padding:20px;border-radius:16px;box-shadow:0 10px 40px rgba(255,106,0,0.4);z-index:10000;max-width:300px;animation:slideUp 0.5s ease;`;
  notif.innerHTML = `<div style="font-size:11px;opacity:0.9;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;">Conquista desbloqueada!</div><div style="font-size:16px;font-weight:800;">${msg}</div>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

// ===== EXERCÍCIOS =====
const dadosExercicios = [
  {id:'basico',titulo:'Básico',emoji:'📚',desc:'Saudações e frases simples',dif:'facil'},
  {id:'animais',titulo:'Animais',emoji:'🐶',desc:'Nomes de animais em espanhol',dif:'facil'},
  {id:'cores',titulo:'Cores',emoji:'🎨',desc:'Todas as cores',dif:'facil'},
  {id:'comida',titulo:'Comida',emoji:'🍕',desc:'Alimentos e bebidas',dif:'medio'},
  {id:'numeros',titulo:'Números',emoji:'🔢',desc:'De 1 a 1000',dif:'facil'},
  {id:'familia',titulo:'Família',emoji:'👨‍👩‍👧',desc:'Membros da família',dif:'facil'},
  {id:'verbos',titulo:'Verbos',emoji:'✍️',desc:'Conjugação presente',dif:'medio'},
  {id:'corpo',titulo:'Corpo',emoji:'🧍',desc:'Partes do corpo',dif:'medio'},
  {id:'clima',titulo:'Clima',emoji:'⛅',desc:'Tempo e estações',dif:'medio'},
  {id:'viagem',titulo:'Viagem',emoji:'✈️',desc:'Vocabulário para viajantes',dif:'dificil'},
  {id:'trabalho',titulo:'Trabalho',emoji:'💼',desc:'Vocabulário profissional',dif:'dificil'},
  {id:'expressoes',titulo:'Expressões',emoji:'💡',desc:'Frases idiomáticas',dif:'dificil'},
  {id:'preposicoes',titulo:'Preposições',emoji:'📍',desc:'En, con, de, a, por, para...',dif:'medio'},
  {id:'adjetivos',titulo:'Adjetivos',emoji:'🎭',desc:'Descrever pessoas e coisas',dif:'facil'},
  {id:'hobbies',titulo:'Hobbies',emoji:'🎯',desc:'Atividades e lazer',dif:'facil'},
  {id:'tecnologia',titulo:'Tecnologia',emoji:'📱',desc:'Vocabulário digital e tech',dif:'medio'},
];

function gerarExercicios() {
  const grid = document.getElementById('exGrid');
  if (!grid) return;
  grid.innerHTML = dadosExercicios.map(e => `
    <div class="ex-card" data-dif="${e.dif}" onclick="iniciarQuiz('${e.id}')">
      <span class="ex-card-icon">${e.emoji}</span>
      <h3>${e.titulo}</h3>
      <p>${e.desc}</p>
      <span class="badge-dif ${e.dif}">${e.dif==='facil'?'Fácil':e.dif==='medio'?'Médio':'Difícil'}</span>
    </div>
  `).join('');
}

function filtrarEx(dif, btn) {
  document.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('ativo'));
  if (btn) btn.classList.add('ativo');
  document.querySelectorAll('.ex-card').forEach(c => {
    c.style.display = (dif === 'todos' || c.dataset.dif === dif) ? '' : 'none';
  });
}

// ===== BANCO DE PERGUNTAS EXPANDIDO =====
const perguntasPorTema = {
  basico: [
    {p:"Como se diz 'Bom dia' em espanhol?",o:["Buenas noches","Buenos días","Buenas tardes"],c:1},
    {p:"Qual é a tradução de 'Gracias'?",o:["Por favor","De nada","Obrigado"],c:2},
    {p:"'Yo ___ estudiante' — Complete:",o:["eres","soy","es"],c:1},
    {p:"'¿Cómo estás?' significa:",o:["Como você está?","Qual seu nome?","Quantos anos tem?"],c:0},
    {p:"'Me llamo Juan' significa:",o:["Eu chamo Juan","Meu nome é Juan","Eu sou Juan"],c:1},
    {p:"Como se diz 'Por favor'?",o:["Gracias","De nada","Por favor"],c:2},
    {p:"'Adiós' significa:",o:["Olá","Tchau","Obrigado"],c:1},
    {p:"Como se diz 'Desculpe'?",o:["Lo siento","Gracias","Adiós"],c:0},
    {p:"'De nada' é usado quando:",o:["Agradecem você","Você pede desculpa","Você cumprimenta"],c:0},
    {p:"Como se diz 'Boa noite'?",o:["Buenos días","Buenas noches","Buenas tardes"],c:1},
    {p:"'Mucho gusto' significa:",o:["Muito amor","Muito prazer","Muito bom"],c:1},
    {p:"Como se diz 'Sim' em espanhol?",o:["No","Sí","Tal vez"],c:1},
    {p:"'¿De dónde eres?' pergunta:",o:["Onde você mora?","De onde você é?","O que você faz?"],c:1},
    {p:"Como se diz 'Com licença'?",o:["Perdón","Con permiso","Lo siento"],c:1},
    {p:"'Hasta mañana' significa:",o:["Até logo","Até amanhã","Até logo mesmo"],c:1},
  ],
  animais: [
    {p:"Como se diz 'cachorro'?",o:["Gato","Perro","Pájaro"],c:1},
    {p:"'Gato' significa:",o:["Cachorro","Gato","Cavalo"],c:1},
    {p:"Como se diz 'pássaro'?",o:["Pez","Pájaro","Tigre"],c:1},
    {p:"'Caballo' significa:",o:["Cavalo","Cachorro","Gato"],c:0},
    {p:"Como se diz 'peixe'?",o:["Pájaro","Perro","Pez"],c:2},
    {p:"'Tigre' em espanhol:",o:["Tigre","León","Oso"],c:0},
    {p:"Como se diz 'urso'?",o:["Oso","Lobo","Zorro"],c:0},
    {p:"'Vaca' significa:",o:["Cavalo","Vaca","Porco"],c:1},
    {p:"Como se diz 'coelho'?",o:["Conejo","Ratón","Gato"],c:0},
    {p:"'Serpiente' significa:",o:["Serpente","Lagarto","Tartaruga"],c:0},
    {p:"Como se diz 'elefante'?",o:["Jirafa","Elefante","Rinoceronte"],c:1},
    {p:"'Mariposa' significa:",o:["Abelha","Borboleta","Formiga"],c:1},
    {p:"Como se diz 'leão'?",o:["Tigre","León","Oso"],c:1},
    {p:"'Loro' significa:",o:["Papagaio","Tucano","Corvo"],c:0},
    {p:"Como se diz 'galinha'?",o:["Pato","Gallina","Pavo"],c:1},
  ],
  cores: [
    {p:"Como se diz 'azul'?",o:["Azul","Rojo","Verde"],c:0},
    {p:"'Vermelho' em espanhol:",o:["Verde","Rojo","Amarillo"],c:1},
    {p:"Como se diz 'verde'?",o:["Azul","Verde","Negro"],c:1},
    {p:"'Amarillo' significa:",o:["Amarelo","Azul","Branco"],c:0},
    {p:"Como se diz 'preto'?",o:["Blanco","Negro","Gris"],c:1},
    {p:"'Blanco' significa:",o:["Preto","Branco","Cinza"],c:1},
    {p:"Como se diz 'rosa'?",o:["Rosa","Morado","Naranja"],c:0},
    {p:"'Naranja' é qual cor?",o:["Roxo","Laranja","Marrom"],c:1},
    {p:"Como se diz 'marrom'?",o:["Marrón","Gris","Negro"],c:0},
    {p:"'Morado' significa:",o:["Rosa","Roxo","Azul"],c:1},
    {p:"Como se diz 'cinza'?",o:["Gris","Beige","Dorado"],c:0},
    {p:"'Dorado' significa:",o:["Prata","Ouro","Bronze"],c:1},
    {p:"Como se diz 'violeta'?",o:["Violeta","Lila","Turquesa"],c:0},
    {p:"'Celeste' significa:",o:["Azul escuro","Azul claro","Verde claro"],c:1},
    {p:"Como se diz 'laranja'?",o:["Amarillo","Naranja","Rojo"],c:1},
  ],
  comida: [
    {p:"Como se diz 'pão'?",o:["Agua","Pan","Leche"],c:1},
    {p:"'Agua' significa:",o:["Leite","Água","Vinho"],c:1},
    {p:"Como se diz 'leite'?",o:["Agua","Pan","Leche"],c:2},
    {p:"'Carne' significa:",o:["Carne","Peixe","Frango"],c:0},
    {p:"Como se diz 'fruta'?",o:["Verdura","Fruta","Carne"],c:1},
    {p:"'Arroz' em espanhol:",o:["Arroz","Frijol","Maíz"],c:0},
    {p:"Como se diz 'ovo'?",o:["Huevo","Queso","Jamón"],c:0},
    {p:"'Queso' significa:",o:["Queijo","Presunto","Pão"],c:0},
    {p:"Como se diz 'batata'?",o:["Tomate","Patata","Cebolla"],c:1},
    {p:"'Manzana' significa:",o:["Banana","Maçã","Laranja"],c:1},
    {p:"Como se diz 'café'?",o:["Café","Té","Agua"],c:0},
    {p:"'Sopa' significa:",o:["Salada","Sopa","Torta"],c:1},
    {p:"Como se diz 'frango'?",o:["Cerdo","Pollo","Vaca"],c:1},
    {p:"'Ensalada' significa:",o:["Salada","Sopa","Macarrão"],c:0},
    {p:"Como se diz 'bolo'?",o:["Tarta","Pan","Galleta"],c:0},
  ],
  numeros: [
    {p:"Como se diz '1'?",o:["Uno","Dos","Tres"],c:0},
    {p:"'Dos' significa:",o:["1","2","3"],c:1},
    {p:"Como se diz '3'?",o:["Uno","Dos","Tres"],c:2},
    {p:"'Cuatro' significa:",o:["3","4","5"],c:1},
    {p:"Como se diz '5'?",o:["Cuatro","Cinco","Seis"],c:1},
    {p:"'Diez' significa:",o:["9","10","11"],c:1},
    {p:"Como se diz '20'?",o:["Veinte","Treinta","Cuarenta"],c:0},
    {p:"'Cien' significa:",o:["50","100","1000"],c:1},
    {p:"Como se diz '50'?",o:["Cuarenta","Cincuenta","Sesenta"],c:1},
    {p:"'Mil' significa:",o:["100","500","1000"],c:2},
    {p:"Como se diz '7'?",o:["Seis","Siete","Ocho"],c:1},
    {p:"'Quince' significa:",o:["14","15","16"],c:1},
    {p:"Como se diz '9'?",o:["Ocho","Nueve","Diez"],c:1},
    {p:"'Treinta' significa:",o:["13","20","30"],c:2},
    {p:"Como se diz '8'?",o:["Siete","Ocho","Nueve"],c:1},
  ],
  familia: [
    {p:"Como se diz 'mãe'?",o:["Padre","Madre","Hermana"],c:1},
    {p:"'Padre' significa:",o:["Mãe","Pai","Irmão"],c:1},
    {p:"Como se diz 'irmão'?",o:["Hermana","Hermano","Primo"],c:1},
    {p:"'Hermana' significa:",o:["Irmão","Irmã","Prima"],c:1},
    {p:"Como se diz 'avô'?",o:["Abuela","Abuelo","Tío"],c:1},
    {p:"'Abuela' significa:",o:["Avô","Avó","Tia"],c:1},
    {p:"Como se diz 'tio'?",o:["Tía","Tío","Primo"],c:1},
    {p:"'Primo' significa:",o:["Tio","Primo","Sobrinho"],c:1},
    {p:"Como se diz 'filho'?",o:["Hija","Hijo","Nieto"],c:1},
    {p:"'Esposa' significa:",o:["Marido","Esposa","Namorada"],c:1},
    {p:"Como se diz 'sobrinho'?",o:["Nieto","Sobrino","Primo"],c:1},
    {p:"'Suegra' significa:",o:["Sogra","Sogro","Cunhada"],c:0},
    {p:"Como se diz 'neto'?",o:["Sobrino","Nieto","Primo"],c:1},
    {p:"'Cuñado' significa:",o:["Cunhado","Irmão","Primo"],c:0},
    {p:"Como se diz 'bebê'?",o:["Niño","Bebé","Niña"],c:1},
  ],
  verbos: [
    {p:"'Yo hablo' significa:",o:["Eu falo","Eu falei","Eu falarei"],c:0},
    {p:"'Tú comes' em espanhol:",o:["Como","Comes","Come"],c:1},
    {p:"'Nosotros vivimos' significa:",o:["Eles vivem","Nós vivemos","Nós viveremos"],c:1},
    {p:"Infinitivo de 'hablo':",o:["Hablar","Hablado","Hablando"],c:0},
    {p:"'Tener' significa:",o:["Ser","Ter","Estar"],c:1},
    {p:"'Yo tengo' = 'Eu ___':",o:["sou","tenho","estou"],c:1},
    {p:"Como se diz 'eu quero'?",o:["Yo puedo","Yo quiero","Yo debo"],c:1},
    {p:"'Puedo' vem de:",o:["Poder","Querer","Saber"],c:0},
    {p:"'Ellos hablan' significa:",o:["Eles falam","Ela fala","Nós falamos"],c:0},
    {p:"'Ser' para 'yo' é:",o:["Eres","Soy","Es"],c:1},
    {p:"'Ir' para 'él' é:",o:["Vas","Va","Van"],c:1},
    {p:"Como se diz 'nós fazemos'?",o:["Hacemos","Hacéis","Hacen"],c:0},
    {p:"'Venir' para 'tú' é:",o:["Vengo","Vienes","Viene"],c:1},
    {p:"'Ellas comen' significa:",o:["Elas como","Elas comem","Ela come"],c:1},
    {p:"'Deber' significa:",o:["Poder","Querer","Dever"],c:2},
  ],
  corpo: [
    {p:"Como se diz 'cabeça'?",o:["Brazo","Cabeza","Pierna"],c:1},
    {p:"'Ojo' significa:",o:["Ouvido","Nariz","Olho"],c:2},
    {p:"Como se diz 'mão'?",o:["Pie","Mano","Brazo"],c:1},
    {p:"'Pierna' significa:",o:["Pé","Perna","Braço"],c:1},
    {p:"Como se diz 'boca'?",o:["Boca","Nariz","Oreja"],c:0},
    {p:"'Nariz' em português:",o:["Nariz","Orelha","Pescoço"],c:0},
    {p:"Como se diz 'coração'?",o:["Pulmón","Hígado","Corazón"],c:2},
    {p:"'Rodilla' significa:",o:["Tornozelo","Joelho","Cotovelo"],c:1},
    {p:"Como se diz 'costas'?",o:["Pecho","Espalda","Cintura"],c:1},
    {p:"'Cuello' significa:",o:["Pescoço","Ombro","Queixo"],c:0},
    {p:"Como se diz 'dedo'?",o:["Dedo","Uña","Palma"],c:0},
    {p:"'Hombro' significa:",o:["Cotovelo","Ombro","Punho"],c:1},
    {p:"Como se diz 'pé'?",o:["Pie","Pierna","Tobillo"],c:0},
    {p:"'Estómago' significa:",o:["Coração","Estômago","Pulmão"],c:1},
    {p:"Como se diz 'orelha'?",o:["Ojo","Oreja","Nariz"],c:1},
  ],
  clima: [
    {p:"Como se diz 'sol'?",o:["Luna","Sol","Estrella"],c:1},
    {p:"'Lluvia' significa:",o:["Neve","Chuva","Vento"],c:1},
    {p:"Como se diz 'frio'?",o:["Calor","Frío","Viento"],c:1},
    {p:"'Nieve' significa:",o:["Granizo","Neve","Neblina"],c:1},
    {p:"Como se diz 'verão'?",o:["Invierno","Primavera","Verano"],c:2},
    {p:"'Invierno' é:",o:["Verão","Inverno","Outono"],c:1},
    {p:"Como se diz 'nublado'?",o:["Soleado","Nublado","Ventoso"],c:1},
    {p:"'Hace calor' significa:",o:["Está frio","Está quente","Está chovendo"],c:1},
    {p:"Como se diz 'tempestade'?",o:["Tormenta","Brisa","Niebla"],c:0},
    {p:"'Primavera' em português:",o:["Verão","Outono","Primavera"],c:2},
    {p:"Como se diz 'trovão'?",o:["Trueno","Relámpago","Granizo"],c:0},
    {p:"'Niebla' significa:",o:["Neblina","Neve","Granizo"],c:0},
    {p:"Como se diz 'vento'?",o:["Lluvia","Viento","Tormenta"],c:1},
    {p:"'Otoño' significa:",o:["Primavera","Outono","Inverno"],c:1},
    {p:"Como se diz 'arco-íris'?",o:["Arcoíris","Nube","Niebla"],c:0},
  ],
  viagem: [
    {p:"Como se diz 'passaporte'?",o:["Billete","Pasaporte","Maleta"],c:1},
    {p:"'Aeropuerto' significa:",o:["Estação","Aeroporto","Porto"],c:1},
    {p:"Como se diz 'hotel'?",o:["Hotel","Hostal","Albergue"],c:0},
    {p:"'¿Dónde está?' significa:",o:["Quanto custa?","Onde fica?","Como chego?"],c:1},
    {p:"Como se diz 'reserva'?",o:["Reserva","Pedido","Compra"],c:0},
    {p:"'Cuánto cuesta' significa:",o:["Onde fica?","Quanto custa?","O que é?"],c:1},
    {p:"Como se diz 'bagagem'?",o:["Pasaporte","Maleta","Billete"],c:1},
    {p:"'Vuelo' significa:",o:["Trem","Ônibus","Voo"],c:2},
    {p:"Como se diz 'taxi'?",o:["Taxi","Autobús","Metro"],c:0},
    {p:"'¡Ayuda!' significa:",o:["Obrigado!","Socorro!","Desculpe!"],c:1},
    {p:"Como se diz 'mapa'?",o:["Mapa","Guía","Plano"],c:0},
    {p:"'Aduana' significa:",o:["Alfândega","Embaixada","Consulado"],c:0},
    {p:"Como se diz 'câmbio de moeda'?",o:["Casa de cambio","Banco","Cajero"],c:0},
    {p:"'Billete de ida y vuelta' significa:",o:["Só ida","Só volta","Ida e volta"],c:2},
    {p:"Como se diz 'informações turísticas'?",o:["Oficina de turismo","Consulado","Embajada"],c:0},
  ],
  trabalho: [
    {p:"Como se diz 'chefe'?",o:["Empleado","Jefe","Colega"],c:1},
    {p:"'Empresa' significa:",o:["Empresa","Escola","Hospital"],c:0},
    {p:"Como se diz 'reunião'?",o:["Reunión","Trabajo","Proyecto"],c:0},
    {p:"'Salario' significa:",o:["Contrato","Salário","Benefício"],c:1},
    {p:"Como se diz 'contrato'?",o:["Contrato","Licencia","Permiso"],c:0},
    {p:"'Vacaciones' significa:",o:["Trabalho","Férias","Licença"],c:1},
    {p:"Como se diz 'currículo'?",o:["Currículum","Solicitud","Carta"],c:0},
    {p:"'Entrevista' significa:",o:["Candidatura","Entrevista","Emprego"],c:1},
    {p:"Como se diz 'escritório'?",o:["Oficina","Escuela","Hospital"],c:0},
    {p:"'Colega' significa:",o:["Chefe","Colega","Cliente"],c:1},
    {p:"Como se diz 'demissão'?",o:["Despido","Contrato","Ascenso"],c:0},
    {p:"'Horario de trabajo' significa:",o:["Salário","Horário de trabalho","Férias"],c:1},
    {p:"Como se diz 'promoção'?",o:["Despido","Contrato","Ascenso"],c:2},
    {p:"'Sede' da empresa significa:",o:["Sucursal","Matriz","Departamento"],c:1},
    {p:"Como se diz 'funcionário'?",o:["Jefe","Empleado","Cliente"],c:1},
  ],
  expressoes: [
    {p:"'¡Qué guay!' significa:",o:["Que chato!","Que legal!","Que estranho!"],c:1},
    {p:"'¡No manches!' significa:",o:["Não acredito!","Não manche!","Não toque!"],c:0},
    {p:"'¡Che boludo!' significa:",o:["Oi, cara!","Tchau!","Vem aqui!"],c:0},
    {p:"'Vale' significa:",o:["Vale a pena","Ok / Tá bom","Caro"],c:1},
    {p:"'Estar en las nubes' significa:",o:["Estar nas nuvens","Estar distraído","Voar"],c:1},
    {p:"'Costar un ojo' significa:",o:["Custar caro","Custar barato","Ser grátis"],c:0},
    {p:"'Tirar la toalla' significa:",o:["Jogar toalha","Desistir","Lavar"],c:1},
    {p:"'¡Qué padre!' significa:",o:["Que pai!","Que legal!","Que chato!"],c:1},
    {p:"'Ser pan comido' significa:",o:["Ser fácil","Ser comida","Ser pão"],c:0},
    {p:"'Sin pelos en la lengua' significa:",o:["Careca","Falar sem filtro","Língua presa"],c:1},
    {p:"'Meter la pata' significa:",o:["Cometer um erro","Chutar","Entrar"],c:0},
    {p:"'Dar en el clavo' significa:",o:["Pregar prego","Acertar em cheio","Errar"],c:1},
    {p:"'A todo gas' significa:",o:["Com gás","A todo vapor","Devagar"],c:1},
    {p:"'Matar dos pájaros de un tiro' significa:",o:["Matar animais","Matar dois coelhos com uma cajadada","Errar"],c:1},
    {p:"'Ponerse las pilas' significa:",o:["Colocar pilhas","Se animar / agir","Descansar"],c:1},
  ],
  preposicoes: [
    {p:"'Voy ___ Madrid' — use:",o:["de","en","a"],c:2},
    {p:"'Soy ___ Brasil' — use:",o:["a","de","en"],c:1},
    {p:"'Estoy ___ casa' — use:",o:["en","a","de"],c:0},
    {p:"'Hablo ___ ella' — use:",o:["a","con","de"],c:1},
    {p:"'El libro es ___ Juan' — use:",o:["por","para","de"],c:2},
    {p:"'¿Para qué?' significa:",o:["De onde?","Para quê?","Com quê?"],c:1},
    {p:"'Lo hago ___ ti' — use:",o:["de","por","a"],c:1},
    {p:"'Desde' significa:",o:["Até","Desde","Antes"],c:1},
    {p:"'Entre' significa:",o:["Atrás","Entre","Na frente"],c:1},
    {p:"'Sin' significa:",o:["Com","Sem","Para"],c:1},
    {p:"'Según' significa:",o:["Segundo / De acordo","Antes","Depois"],c:0},
    {p:"'Tras' significa:",o:["Diante","Atrás","Ao lado"],c:1},
    {p:"'Ante' significa:",o:["Depois","Diante de","Embaixo"],c:1},
    {p:"'Desde hace' expressa:",o:["Distância","Duração","Frequência"],c:1},
    {p:"'Hasta' significa:",o:["Desde","Até","Depois"],c:1},
  ],
  adjetivos: [
    {p:"Como se diz 'alto'?",o:["Bajo","Alto","Gordo"],c:1},
    {p:"'Delgado' significa:",o:["Gordo","Magro","Alto"],c:1},
    {p:"Como se diz 'bonito'?",o:["Feo","Bonito","Guapo"],c:1},
    {p:"'Grande' significa:",o:["Pequeno","Grande","Médio"],c:1},
    {p:"Como se diz 'rápido'?",o:["Lento","Rápido","Fuerte"],c:1},
    {p:"'Joven' significa:",o:["Velho","Jovem","Maduro"],c:1},
    {p:"Como se diz 'inteligente'?",o:["Tonto","Inteligente","Listo"],c:1},
    {p:"'Amable' significa:",o:["Rude","Amável","Estranho"],c:1},
    {p:"Como se diz 'simpático'?",o:["Antipático","Simpático","Tímido"],c:1},
    {p:"'Tranquilo' significa:",o:["Agitado","Tranquilo","Ruidoso"],c:1},
    {p:"Como se diz 'difícil'?",o:["Fácil","Difícil","Complicado"],c:1},
    {p:"'Pequeño' significa:",o:["Grande","Pequeno","Médio"],c:1},
    {p:"Como se diz 'novo' (objeto)?",o:["Viejo","Nuevo","Reciente"],c:1},
    {p:"'Divertido' significa:",o:["Chato","Divertido","Engraçado"],c:1},
    {p:"Como se diz 'cansado'?",o:["Descansado","Cansado","Fresco"],c:1},
  ],
  hobbies: [
    {p:"Como se diz 'leitura'?",o:["Escritura","Lectura","Pintura"],c:1},
    {p:"'Bailar' significa:",o:["Cantar","Dançar","Tocar"],c:1},
    {p:"Como se diz 'cozinhar'?",o:["Cocinar","Comer","Preparar"],c:0},
    {p:"'Viajar' significa:",o:["Trabalhar","Viajar","Estudar"],c:1},
    {p:"Como se diz 'nadar'?",o:["Correr","Nadar","Saltar"],c:1},
    {p:"'Dibujar' significa:",o:["Pintar","Desenhar","Esculpir"],c:1},
    {p:"Como se diz 'fotografar'?",o:["Filmar","Fotografiar","Grabar"],c:1},
    {p:"'Jardinería' significa:",o:["Marcenaria","Jardinagem","Culinária"],c:1},
    {p:"Como se diz 'meditar'?",o:["Meditar","Rezar","Dormir"],c:0},
    {p:"'Senderismo' significa:",o:["Ciclismo","Natação","Caminhada/Trilha"],c:2},
    {p:"Como se diz 'jogar videogame'?",o:["Jugar videojuegos","Ver películas","Escuchar música"],c:0},
    {p:"'Tocar guitarra' significa:",o:["Ver guitarra","Tocar violão/guitarra","Comprar violão"],c:1},
    {p:"Como se diz 'colecionismo'?",o:["Coleccionismo","Artesanía","Bricolaje"],c:0},
    {p:"'Yoga' em espanhol:",o:["Yoga","Yogo","Yuga"],c:0},
    {p:"Como se diz 'bordado'?",o:["Tejido","Bordado","Costura"],c:1},
  ],
  tecnologia: [
    {p:"Como se diz 'computador'?",o:["Ordenador","Tableta","Móvil"],c:0},
    {p:"'Contraseña' significa:",o:["Usuário","Senha","Email"],c:1},
    {p:"Como se diz 'celular'?",o:["Ordenador","Tableta","Móvil"],c:2},
    {p:"'Descargar' significa:",o:["Enviar","Baixar/Download","Deletar"],c:1},
    {p:"Como se diz 'aplicativo'?",o:["Aplicación","Programa","Sistema"],c:0},
    {p:"'Pantalla' significa:",o:["Teclado","Tela","Mouse"],c:1},
    {p:"Como se diz 'internet'?",o:["Internet","Red","Web"],c:0},
    {p:"'Correo electrónico' significa:",o:["Mensagem","Email","Chat"],c:1},
    {p:"Como se diz 'rede social'?",o:["Red social","Internet","Blog"],c:0},
    {p:"'Actualizar' significa:",o:["Deletar","Instalar","Atualizar"],c:2},
    {p:"Como se diz 'segurança digital'?",o:["Seguridad digital","Privacidad","Ciberseguridad"],c:2},
    {p:"'Nube' (computing) significa:",o:["Nuvem/Cloud","Servidor","HD externo"],c:0},
    {p:"Como se diz 'bateria'?",o:["Cargador","Batería","Cable"],c:1},
    {p:"'Conexión wifi' significa:",o:["Conexão com fio","Conexão WiFi","Bluetooth"],c:1},
    {p:"Como se diz 'selfie'?",o:["Selfie","Autofoto","Foto"],c:0},
  ]
};

// ===== SISTEMA DE QUIZ =====
function iniciarQuiz(tema) {
  const perguntas = perguntasPorTema[tema];
  if (!perguntas || perguntas.length === 0) { showToast('❌ Quiz não disponível ainda', 2000); return; }

  quizAtual = {
    tema, perguntas: [...perguntas].sort(() => Math.random() - 0.5).slice(0, 10),
    perguntaIdx: 0, pontos: 0, erros: 0, respostaFeita: false, inicioTempo: Date.now()
  };

  document.getElementById('sec-exercicios')?.classList.remove('ativo');
  document.getElementById('sec-quiz')?.classList.add('ativo');

  renderizarQuiz();
}

function renderizarQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  const nomesTemas = {
    basico:'Básico',animais:'Animais',cores:'Cores',comida:'Comida',numeros:'Números',
    familia:'Família',verbos:'Verbos',corpo:'Corpo',clima:'Clima',viagem:'Viagem',
    trabalho:'Trabalho',expressoes:'Expressões',preposicoes:'Preposições',
    adjetivos:'Adjetivos',hobbies:'Hobbies',tecnologia:'Tecnologia'
  };

  container.innerHTML = `
    <div class="quiz-header">
      <h2>🎮 ${nomesTemas[quizAtual.tema] || quizAtual.tema}</h2>
      <div class="quiz-placar">
        <span id="qProg">1/${quizAtual.perguntas.length}</span>
        <span id="qPts">⭐ 0</span>
      </div>
    </div>
    <div class="quiz-progress"><div class="quiz-progress-fill" id="qBar" style="width:0%"></div></div>
    <div class="quiz-pergunta-card">
      <div class="quiz-num" id="qNum">Pergunta 1 de ${quizAtual.perguntas.length}</div>
      <div class="quiz-pergunta" id="qPergunta"></div>
      <div class="quiz-opcoes" id="qOpcoes"></div>
      <div class="quiz-feedback oculto" id="qFeedback"></div>
    </div>
  `;

  mostrarPerguntaAtual();
}

function mostrarPerguntaAtual() {
  const q = quizAtual.perguntas[quizAtual.perguntaIdx];
  if (!q) return;

  const total = quizAtual.perguntas.length;
  const idx = quizAtual.perguntaIdx;

  document.getElementById('qProg').textContent = `${idx + 1}/${total}`;
  document.getElementById('qNum').textContent = `Pergunta ${idx + 1} de ${total}`;
  document.getElementById('qBar').style.width = (idx / total * 100) + '%';
  document.getElementById('qPergunta').textContent = q.p;
  document.getElementById('qFeedback').classList.add('oculto');

  const ops = document.getElementById('qOpcoes');
  ops.innerHTML = q.o.map((op, i) =>
    `<button class="quiz-opcao" onclick="responderQuiz(${i})">${String.fromCharCode(65+i)}. ${op}</button>`
  ).join('');

  quizAtual.respostaFeita = false;
}

function responderQuiz(idx) {
  if (quizAtual.respostaFeita) return;
  quizAtual.respostaFeita = true;

  const q = quizAtual.perguntas[quizAtual.perguntaIdx];
  const btns = document.querySelectorAll('.quiz-opcao');
  const fb = document.getElementById('qFeedback');

  btns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.c) { b.classList.add('correta'); }
    else if (i === idx) { b.classList.add('errada'); }
  });

  if (idx === q.c) {
    quizAtual.pontos += 10;
    document.getElementById('qPts').textContent = `⭐ ${quizAtual.pontos}`;
    if (fb) { fb.innerHTML = '✅ Correto! +10 pontos'; fb.className = 'quiz-feedback certa'; }
  } else {
    quizAtual.erros++;
    if (fb) { fb.innerHTML = `❌ Errado! Correto: <strong>${q.o[q.c]}</strong>`; fb.className = 'quiz-feedback errada'; }
  }

  setTimeout(() => {
    quizAtual.perguntaIdx++;
    if (quizAtual.perguntaIdx < quizAtual.perguntas.length) { mostrarPerguntaAtual(); }
    else { finalizarQuiz(); }
  }, 1800);
}

function finalizarQuiz() {
  const acertos = quizAtual.pontos / 10;
  const total = quizAtual.perguntas.length;
  const pct = Math.round(acertos / total * 100);
  const tempo = Math.round((Date.now() - quizAtual.inicioTempo) / 1000);

  adicionarPontos(quizAtual.pontos);

  if (pct === 100 && !conquistas.includes('quiz_perfeito')) darConquista('quiz_perfeito', '💎 Quiz perfeito — 100%!');
  if (tempo < 60 && acertos >= 8 && !conquistas.includes('velocidade')) darConquista('velocidade', '⚡ Quiz em menos de 1 minuto!');

  const container = document.getElementById('quizContainer');
  if (!container) return;

  const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪';
  const msg = pct >= 80 ? 'Excelente!' : pct >= 60 ? 'Muito bem!' : 'Continue praticando!';

  container.innerHTML = `
    <div class="quiz-resultado">
      <span class="resultado-emoji">${emoji}</span>
      <h2 class="resultado-titulo">${msg}</h2>
      <div class="resultado-pontos">+${quizAtual.pontos} pts</div>
      <p class="resultado-detalhe">Você acertou <strong>${acertos}/${total}</strong> (${pct}%) em ${tempo}s</p>
      <div class="resultado-btns">
        <button class="btn-quiz primary" onclick="iniciarQuiz('${quizAtual.tema}')">🔄 Tentar novamente</button>
        <button class="btn-quiz" style="border:2px solid var(--border);background:white" onclick="navegar('exercicios')">← Voltar</button>
      </div>
    </div>
  `;
}

// ===== CHAT IA COM CLAUDE =====
function iniciarChatBoas() {
  const chat = document.getElementById('chatMessages');
  if (!chat || chat.children.length > 1) return;
}

function gerarTopicos() {
  const topicos = [
    {icon:'💬',titulo:'Apresentação'},
    {icon:'🍽️',titulo:'Restaurante'},
    {icon:'✈️',titulo:'Viagem'},
    {icon:'💼',titulo:'Trabalho'},
    {icon:'🏥',titulo:'Saúde'},
    {icon:'🎵',titulo:'Música'},
    {icon:'⚽',titulo:'Esportes'},
    {icon:'🌮',titulo:'Gastronomia'},
    {icon:'🎬',titulo:'Cinema'},
    {icon:'📱',titulo:'Tecnologia'},
  ];

  const lista = document.getElementById('topicosList');
  if (!lista) return;
  lista.innerHTML = topicos.map(t => `
    <button class="topico-btn" onclick="enviarSugestao('Vamos praticar sobre o tema: ${t.titulo}')">
      ${t.icon} ${t.titulo}
    </button>
  `).join('');
}

async function enviarMsg() {
  const input = document.getElementById('chatInput');
  const btnSend = document.getElementById('btnSend');
  if (!input) return;

  const texto = input.value.trim();
  if (!texto) return;

  input.value = '';
  input.disabled = true;
  if (btnSend) btnSend.disabled = true;

  adicionarMsgChat('user', texto);
  chatHistorico.push({ role: 'user', content: texto });

  // Mostrar digitando
  const chatEl = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.id = 'typing-indicator';
  typing.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-content">
      <div class="msg-bubble msg-typing">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>
  `;
  chatEl?.appendChild(typing);
  chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' });

  try {
    const systemPrompt = `Você é a Profesora Sofía, uma professora de espanhol simpática e especializada em ensinar brasileiros. 
Você ajuda com: conversação em espanhol, gramática, vocabulário, pronúncia, traduções, correção de frases, expressões idiomáticas e cultura hispânica.
O usuário atual se chama ${usuarioAtual?.nome || 'Aluno'}, é ${traduzirNivel(usuarioAtual?.nivel)} em espanhol.
REGRAS:
- Responda sempre em português, mas use exemplos em espanhol quando relevante
- Seja animada e encorajadora  
- Quando o usuário escrever em espanhol, corrija gentilmente se houver erros
- Use emojis moderadamente
- Adapte a complexidade ao nível do usuário
- Quando ensinar vocabulário, formate: palavra em espanhol (tradução)
- Máximo 3-4 parágrafos por resposta`;

    const messages = chatHistorico.slice(-10).map(m => ({ role: m.role, content: m.content }));

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages
      })
    });

    document.getElementById('typing-indicator')?.remove();

    if (!resp.ok) throw new Error('API error ' + resp.status);

    const data = await resp.json();
    const resposta = data.content?.[0]?.text || 'Desculpe, não consegui responder. Tente novamente!';

    chatHistorico.push({ role: 'assistant', content: resposta });
    adicionarMsgChat('bot', resposta);

    // Conquista
    const userMsgs = chatHistorico.filter(m => m.role === 'user').length;
    if (userMsgs >= 5 && !conquistas.includes('chat_5')) darConquista('chat_5', '💬 5 mensagens enviadas!');
    if (userMsgs >= 20 && !conquistas.includes('chat_master')) darConquista('chat_master', '🗣️ Conversador — 20 mensagens!');

    adicionarPontos(2);
    salvarUsuario();

  } catch (err) {
    document.getElementById('typing-indicator')?.remove();
    console.error('Chat error:', err);
    adicionarMsgChat('bot', '⚠️ Ops! Houve um erro na conexão com a IA. Verifique sua conexão e tente novamente. Enquanto isso, você pode praticar com os quizzes! 🎮');
  } finally {
    input.disabled = false;
    if (btnSend) btnSend.disabled = false;
    input.focus();
  }
}

function enviarSugestao(texto) {
  const input = document.getElementById('chatInput');
  if (input) { input.value = texto; enviarMsg(); }
}

function limparChat() {
  const chat = document.getElementById('chatMessages');
  if (!chat) return;
  chatHistorico = [];
  chat.innerHTML = `
    <div class="chat-msg bot">
      <div class="msg-avatar">🤖</div>
      <div class="msg-content">
        <div class="msg-bubble">¡Hola! Soy la <strong>Profesora Sofía</strong> 🌟<br><br>Conversa reiniciada! Sobre o que você quer praticar agora?</div>
        <span class="msg-time">agora</span>
      </div>
    </div>
  `;
}

function adicionarMsgChat(tipo, texto) {
  const chat = document.getElementById('chatMessages');
  if (!chat) return;

  const div = document.createElement('div');
  div.className = `chat-msg ${tipo}`;

  const textoFmt = texto
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');

  const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  div.innerHTML = `
    <div class="msg-avatar">${tipo === 'bot' ? '🤖' : (usuarioAtual?.avatar || '👤')}</div>
    <div class="msg-content">
      <div class="msg-bubble">${textoFmt}</div>
      <span class="msg-time">${hora}</span>
    </div>
  `;

  chat.appendChild(div);
  chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
}

// ===== RANKING =====
function gerarRanking() {
  const usuarios = JSON.parse(localStorage.getItem('sw_usuarios') || '[]');

  const demos = [
    {id:'r1',nome:'María',sobrenome:'García',pontos:3250,nivel:'c1',avatar:'👩‍🎓'},
    {id:'r2',nome:'Carlos',sobrenome:'Mendoza',pontos:2980,nivel:'b2',avatar:'👨‍🎓'},
    {id:'r3',nome:'Ana',sobrenome:'Costa',pontos:2475,nivel:'b1',avatar:'🦊'},
    {id:'r4',nome:'Pedro',sobrenome:'Alves',pontos:1820,nivel:'b1',avatar:'🦁'},
    {id:'r5',nome:'Juliana',sobrenome:'Pereira',pontos:1650,nivel:'a2',avatar:'🐧'},
    {id:'r6',nome:'Lucas',sobrenome:'Santos',pontos:1340,nivel:'a2',avatar:'🐯'},
    {id:'r7',nome:'Beatriz',sobrenome:'Lima',pontos:980,nivel:'a1',avatar:'🦋'},
    {id:'r8',nome:'Rafael',sobrenome:'Rocha',pontos:720,nivel:'a1',avatar:'🐺'},
  ];

  let todos = [...demos, ...usuarios, ...(usuarioAtual && !usuarioAtual.demo ? [usuarioAtual] : [])]
    .sort((a, b) => (b.pontos || 0) - (a.pontos || 0)).slice(0, 20);

  // Top 3
  const top3 = document.getElementById('rankingTop3');
  if (top3) {
    const ordem = [1, 0, 2];
    const classes = ['segundo', 'primeiro', 'terceiro'];
    const medalhas = ['🥈', '🥇', '🥉'];
    top3.innerHTML = ordem.map(i => {
      const u = todos[i];
      if (!u) return '';
      const isEu = u.id === usuarioAtual?.id;
      return `
        <div class="top3-card ${classes[ordem.indexOf(i)]}">
          <span class="top3-emoji">${u.avatar || '👤'}</span>
          <div class="top3-posicao">${medalhas[ordem.indexOf(i)]}</div>
          <div class="top3-nome">${u.nome} ${isEu ? '(Você)' : ''}</div>
          <div class="top3-pts">${(u.pontos || 0).toLocaleString()} pts</div>
        </div>
      `;
    }).join('');
  }

  // Tabela
  const tabela = document.getElementById('rankingTabela');
  if (tabela) {
    tabela.innerHTML = todos.slice(3).map((u, i) => {
      const isEu = u.id === usuarioAtual?.id;
      return `
        <div class="ranking-row ${isEu ? 'eu' : ''}">
          <div class="rank-pos">${i + 4}º</div>
          <div class="rank-user"><span>${u.avatar || '👤'}</span>${u.nome} ${u.sobrenome || ''} ${isEu ? '<strong style="color:var(--orange)">(Você)</strong>' : ''}</div>
          <div class="rank-pts">${(u.pontos || 0).toLocaleString()}</div>
        </div>
      `;
    }).join('');
  }

  // Minha posição
  const minhaPos = todos.findIndex(u => u.id === usuarioAtual?.id);
  const mpEl = document.getElementById('minhaPosicao');
  if (mpEl && usuarioAtual) {
    mpEl.innerHTML = `
      <div class="ranking-row eu" style="border-radius:12px;overflow:hidden;">
        <div class="rank-pos">${minhaPos >= 0 ? minhaPos + 1 + 'º' : '—'}</div>
        <div class="rank-user"><span>${usuarioAtual.avatar || '👤'}</span>${usuarioAtual.nome} <strong style="color:var(--orange)">(Você)</strong></div>
        <div class="rank-pts">${pontosAtuais.toLocaleString()}</div>
      </div>
    `;
    if (minhaPos >= 0 && minhaPos < 10 && !conquistas.includes('top10')) {
      darConquista('top10', '🏆 Top 10 — Entre os melhores!');
    }
  }
}

// ===== PERFIL =====
function abrirAba(aba) {
  const modal = document.getElementById('modalPerfil');
  const conteudo = document.getElementById('modalPerfilConteudo');
  if (!modal || !conteudo) return;
  modal.classList.remove('oculto');
  fecharSidebar();

  const nivel = Math.round(aulasVistas.length / 10) * 10;
  const nivelPct = Math.min(100, (aulasVistas.length % 10) * 10);

  const html = {
    'perfil-dados': `
      <div style="padding:28px">
        <h2 style="font-family:'Syne',sans-serif;margin-bottom:20px">👤 Meus Dados</h2>
        <div style="display:grid;gap:14px">
          <div style="padding:16px;background:var(--surface2);border-radius:12px"><strong>Nome:</strong> ${usuarioAtual?.nome} ${usuarioAtual?.sobrenome || ''}</div>
          <div style="padding:16px;background:var(--surface2);border-radius:12px"><strong>Email:</strong> ${usuarioAtual?.email}</div>
          <div style="padding:16px;background:var(--surface2);border-radius:12px"><strong>Nível:</strong> ${traduzirNivel(usuarioAtual?.nivel)}</div>
          <div style="padding:16px;background:var(--surface2);border-radius:12px"><strong>Membro desde:</strong> ${new Date(usuarioAtual?.criadoEm || Date.now()).toLocaleDateString('pt-BR')}</div>
        </div>
        <button onclick="fecharModalPerfil()" style="margin-top:20px;padding:12px 24px;background:var(--orange);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Outfit',sans-serif">Fechar</button>
      </div>`,
    'perfil-progresso': `
      <div style="padding:28px">
        <h2 style="font-family:'Syne',sans-serif;margin-bottom:20px">📊 Meu Progresso</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px">
          <div style="padding:20px;background:linear-gradient(135deg,rgba(255,107,43,0.1),rgba(255,140,66,0.05));border:2px solid rgba(255,107,43,0.2);border-radius:14px;text-align:center">
            <div style="font-size:32px;font-weight:900;color:var(--orange)">${pontosAtuais.toLocaleString()}</div>
            <div style="font-size:13px;color:var(--text2)">Pontos</div>
          </div>
          <div style="padding:20px;background:var(--surface2);border:2px solid var(--border);border-radius:14px;text-align:center">
            <div style="font-size:32px;font-weight:900;color:#ef4444">${streakAtual}</div>
            <div style="font-size:13px;color:var(--text2)">Dias seguidos</div>
          </div>
          <div style="padding:20px;background:var(--surface2);border:2px solid var(--border);border-radius:14px;text-align:center">
            <div style="font-size:32px;font-weight:900;color:#22c55e">${aulasVistas.length}</div>
            <div style="font-size:13px;color:var(--text2)">Aulas concluídas</div>
          </div>
          <div style="padding:20px;background:var(--surface2);border:2px solid var(--border);border-radius:14px;text-align:center">
            <div style="font-size:32px;font-weight:900;color:#a78bfa">${conquistas.length}</div>
            <div style="font-size:13px;color:var(--text2)">Conquistas</div>
          </div>
        </div>
        <button onclick="fecharModalPerfil()" style="padding:12px 24px;background:var(--orange);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Outfit',sans-serif">Fechar</button>
      </div>`,
    'perfil-conquistas': `
      <div style="padding:28px">
        <h2 style="font-family:'Syne',sans-serif;margin-bottom:20px">🏆 Conquistas</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;margin-bottom:20px">
          ${[
            {id:'primeira_aula',emoji:'🎯',nome:'1ª Aula'},
            {id:'10_aulas',emoji:'📚',nome:'10 Aulas'},
            {id:'50_aulas',emoji:'🏅',nome:'50 Aulas'},
            {id:'100_aulas',emoji:'🏆',nome:'100 Aulas'},
            {id:'10_pontos',emoji:'⭐',nome:'10 pts'},
            {id:'100_pontos',emoji:'🥉',nome:'100 pts'},
            {id:'500_pontos',emoji:'🥇',nome:'500 pts'},
            {id:'1000_pontos',emoji:'💎',nome:'1000 pts'},
            {id:'quiz_perfeito',emoji:'💯',nome:'100% Quiz'},
            {id:'velocidade',emoji:'⚡',nome:'Velocista'},
            {id:'chat_5',emoji:'💬',nome:'5 msgs'},
            {id:'chat_master',emoji:'🗣️',nome:'20 msgs'},
            {id:'top10',emoji:'🎖️',nome:'Top 10'},
          ].map(c => `
            <div style="padding:14px 10px;background:${conquistas.includes(c.id)?'rgba(255,107,43,0.1)':'var(--surface2)'};border:2px solid ${conquistas.includes(c.id)?'rgba(255,107,43,0.3)':'var(--border)'};border-radius:12px;text-align:center;opacity:${conquistas.includes(c.id)?1:0.4}">
              <div style="font-size:28px;margin-bottom:6px">${c.emoji}</div>
              <div style="font-size:11px;font-weight:700;color:var(--text2)">${c.nome}</div>
            </div>
          `).join('')}
        </div>
        <p style="color:var(--text2);font-size:13px">Você tem ${conquistas.length} conquistas!</p>
        <button onclick="fecharModalPerfil()" style="margin-top:16px;padding:12px 24px;background:var(--orange);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-family:'Outfit',sans-serif">Fechar</button>
      </div>`,
  };

  conteudo.innerHTML = html[aba] || `<div style="padding:28px"><h2>Em breve</h2><p style="color:var(--text2);margin:12px 0">Esta seção está em desenvolvimento.</p><button onclick="fecharModalPerfil()" style="padding:12px 24px;background:var(--orange);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:700">Fechar</button></div>`;
}

function fecharModalPerfil() { document.getElementById('modalPerfil')?.classList.add('oculto'); }

function fecharModalAula() { document.getElementById('modalAula')?.classList.add('oculto'); }

function enviarContato() { showToast('📤 Mensagem enviada com sucesso!', 3000); }

function enviarRecuperacao() { showToast('📧 Link de recuperação enviado!', 3000); }

function abrirTermos() { showToast('📜 Termos de Uso (em breve)', 2000); }
function abrirPrivacidade() { showToast('🛡️ Política de Privacidade (em breve)', 2000); }

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode
  if (localStorage.getItem('sw_darkmode') === 'true') {
    themaDarkMode = true; document.body.classList.add('dark-mode');
  }

  // Login automático
  if (!entrarPlataformaLocal()) {
    document.getElementById('authPage')?.classList.remove('oculto');
  }

  // Fechar menus ao clicar fora
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown') && !e.target.closest('[onclick="toggleMenuAulas()"]')) fecharDropdownAulas();
    if (!e.target.closest('#sidebarPerfil') && !e.target.closest('[onclick="togglePerfil()"]') && !e.target.closest('.burger-btn') && !e.target.closest('#topbarAvatarBtn')) {
      if (document.getElementById('sidebarPerfil')?.classList.contains('aberto')) fecharSidebar();
    }
  });

  // Enter no chat
  document.getElementById('chatInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarMsg(); }
  });

  // ESC fecha modais
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { fecharSidebar(); fecharDropdownAulas(); fecharModalPerfil(); fecharModalAula(); }
  });

  console.log('🎓 Spanish World v3.0 carregado! 1000+ aulas disponíveis.');
});

// ===== EXPOR FUNÇÕES GLOBAIS =====
window.switchAuthTab = switchAuthTab;
window.mostrarRecuperacao = mostrarRecuperacao;
window.toggleEye = toggleEye;
window.loginDemo = loginDemo;
window.logout = logout;
window.navegar = navegar;
window.toggleMenuAulas = toggleMenuAulas;
window.toggleMobileMenu = toggleMobileMenu;
window.togglePerfil = togglePerfil;
window.fecharSidebar = fecharSidebar;
window.abrirAba = abrirAba;
window.fecharModalPerfil = fecharModalPerfil;
window.fecharModalAula = fecharModalAula;
window.abrirAula = abrirAula;
window.filtrarEx = filtrarEx;
window.iniciarQuiz = iniciarQuiz;
window.responderQuiz = responderQuiz;
window.enviarMsg = enviarMsg;
window.enviarSugestao = enviarSugestao;
window.limparChat = limparChat;
window.fecharMascote = fecharMascote;
window.showToast = showToast;
window.enviarContato = enviarContato;
window.enviarRecuperacao = enviarRecuperacao;
window.abrirTermos = abrirTermos;
window.abrirPrivacidade = abrirPrivacidade;
window.handleLogin = handleLogin;
window.handleCadastro = handleCadastro;