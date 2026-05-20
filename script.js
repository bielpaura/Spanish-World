// ===== BANCO DE PERGUNTAS =====
const perguntasPorTema = {
    basico: [
        {pergunta:"Como se diz 'Bom dia' em espanhol?", opcoes:["Buenas noches","Buenos días","Buenas tardes"], correta:1},
        {pergunta:"Qual é a tradução de 'Gracias'?", opcoes:["Por favor","De nada","Obrigado"], correta:2},
        {pergunta:"'Yo ___ estudiante' — Complete:", opcoes:["eres","soy","es"], correta:1},
        {pergunta:"'¿Cómo estás?' significa:", opcoes:["Como você está?","Qual seu nome?","Quantos anos tem?"], correta:0},
        {pergunta:"'Me llamo Juan' significa:", opcoes:["Eu chamo Juan","Meu nome é Juan","Eu sou Juan"], correta:1},
        {pergunta:"Como se diz 'Por favor'?", opcoes:["Gracias","De nada","Por favor"], correta:2},
        {pergunta:"'Adiós' significa:", opcoes:["Olá","Tchau","Obrigado"], correta:1},
        {pergunta:"Como se diz 'Desculpe'?", opcoes:["Lo siento","Gracias","Adiós"], correta:0},
        {pergunta:"'De nada' é usado quando:", opcoes:["Agradecem você","Você pede desculpa","Você cumprimenta"], correta:0},
        {pergunta:"Como se diz 'Boa noite'?", opcoes:["Buenos días","Buenas noches","Buenas tardes"], correta:1}
    ],
    animais: [
        {pergunta:"Como se diz 'cachorro' em espanhol?", opcoes:["Gato","Perro","Pájaro"], correta:1},
        {pergunta:"Tradução de 'gato':", opcoes:["Perro","Gato","Caballo"], correta:1},
        {pergunta:"Como se diz 'pássaro'?", opcoes:["Pez","Pájaro","Tigre"], correta:1},
        {pergunta:"'Caballo' significa:", opcoes:["Cavalo","Cachorro","Gato"], correta:0},
        {pergunta:"Como se diz 'peixe'?", opcoes:["Pájaro","Perro","Pez"], correta:2},
        {pergunta:"'Tigre' em espanhol é:", opcoes:["Tigre","León","Oso"], correta:0},
        {pergunta:"Como se diz 'urso'?", opcoes:["Oso","Lobo","Zorro"], correta:0},
        {pergunta:"'Vaca' significa:", opcoes:["Cavalo","Vaca","Porco"], correta:1},
        {pergunta:"Como se diz 'coelho'?", opcoes:["Conejo","Ratón","Gato"], correta:0},
        {pergunta:"'Serpiente' significa:", opcoes:["Serpente","Lagarto","Tartaruga"], correta:0}
    ],
    cores: [
        {pergunta:"Como se diz 'azul' em espanhol?", opcoes:["Azul","Rojo","Verde"], correta:0},
        {pergunta:"Tradução de 'vermelho':", opcoes:["Verde","Rojo","Amarillo"], correta:1},
        {pergunta:"Como se diz 'verde'?", opcoes:["Azul","Verde","Negro"], correta:1},
        {pergunta:"'Amarillo' significa:", opcoes:["Amarelo","Azul","Branco"], correta:0},
        {pergunta:"Como se diz 'preto'?", opcoes:["Blanco","Negro","Gris"], correta:1},
        {pergunta:"'Blanco' significa:", opcoes:["Preto","Branco","Cinza"], correta:1},
        {pergunta:"Como se diz 'rosa'?", opcoes:["Rosa","Morado","Naranja"], correta:0},
        {pergunta:"'Naranja' é qual cor?", opcoes:["Roxo","Laranja","Marrom"], correta:1},
        {pergunta:"Como se diz 'marrom'?", opcoes:["Marrón","Gris","Negro"], correta:0},
        {pergunta:"'Morado' significa:", opcoes:["Rosa","Roxo","Azul"], correta:1}
    ],
    comida: [
        {pergunta:"Como se diz 'pão' em espanhol?", opcoes:["Agua","Pan","Leche"], correta:1},
        {pergunta:"Tradução de 'água':", opcoes:["Leche","Agua","Vino"], correta:1},
        {pergunta:"Como se diz 'leite'?", opcoes:["Agua","Pan","Leche"], correta:2},
        {pergunta:"'Carne' significa:", opcoes:["Carne","Peixe","Frango"], correta:0},
        {pergunta:"Como se diz 'fruta'?", opcoes:["Verdura","Fruta","Carne"], correta:1},
        {pergunta:"'Arroz' em espanhol é:", opcoes:["Arroz","Frijol","Maíz"], correta:0},
        {pergunta:"Como se diz 'ovo'?", opcoes:["Huevo","Queso","Jamón"], correta:0},
        {pergunta:"'Queso' significa:", opcoes:["Queijo","Presunto","Pão"], correta:0},
        {pergunta:"Como se diz 'batata'?", opcoes:["Tomate","Patata","Cebolla"], correta:1},
        {pergunta:"'Manzana' significa:", opcoes:["Banana","Maçã","Laranja"], correta:1}
    ],
    numeros: [
        {pergunta:"Como se diz '1' em espanhol?", opcoes:["Uno","Dos","Tres"], correta:0},
        {pergunta:"Tradução de 'dos':", opcoes:["1","2","3"], correta:1},
        {pergunta:"Como se diz '3'?", opcoes:["Uno","Dos","Tres"], correta:2},
        {pergunta:"'Cuatro' significa:", opcoes:["3","4","5"], correta:1},
        {pergunta:"Como se diz '5'?", opcoes:["Cuatro","Cinco","Seis"], correta:1},
        {pergunta:"'Diez' significa:", opcoes:["9","10","11"], correta:1},
        {pergunta:"Como se diz '20'?", opcoes:["Veinte","Treinta","Cuarenta"], correta:0},
        {pergunta:"'Cien' significa:", opcoes:["50","100","1000"], correta:1},
        {pergunta:"Como se diz '50'?", opcoes:["Cuarenta","Cincuenta","Sesenta"], correta:1},
        {pergunta:"'Mil' significa:", opcoes:["100","500","1000"], correta:2}
    ],
    familia: [
        {pergunta:"Como se diz 'mãe' em espanhol?", opcoes:["Padre","Madre","Hermana"], correta:1},
        {pergunta:"Tradução de 'pai':", opcoes:["Madre","Padre","Hermano"], correta:1},
        {pergunta:"Como se diz 'irmão'?", opcoes:["Hermana","Hermano","Primo"], correta:1},
        {pergunta:"'Hermana' significa:", opcoes:["Irmão","Irmã","Prima"], correta:1},
        {pergunta:"Como se diz 'avô'?", opcoes:["Abuela","Abuelo","Tío"], correta:1},
        {pergunta:"'Abuela' significa:", opcoes:["Avô","Avó","Tia"], correta:1},
        {pergunta:"Como se diz 'tio'?", opcoes:["Tía","Tío","Primo"], correta:1},
        {pergunta:"'Primo' significa:", opcoes:["Tio","Primo","Sobrinho"], correta:1},
        {pergunta:"Como se diz 'filho'?", opcoes:["Hija","Hijo","Nieto"], correta:1},
        {pergunta:"'Esposa' significa:", opcoes:["Marido","Esposa","Namorada"], correta:1}
    ],
    verbos: [
        {pergunta:"'Yo hablo' significa:", opcoes:["Eu falo","Eu falei","Eu falarei"], correta:0},
        {pergunta:"Como se conjuga 'comer' para 'Tú'?", opcoes:["Como","Comes","Come"], correta:1},
        {pergunta:"'Nosotros vivimos' significa:", opcoes:["Eles vivem","Nós vivemos","Nós viveremos"], correta:1},
        {pergunta:"Qual é o infinitivo de 'hablo'?", opcoes:["Hablar","Hablar","Hablando"], correta:0},
        {pergunta:"'Tener' significa:", opcoes:["Ser","Ter","Estar"], correta:1},
        {pergunta:"'Yo tengo' = 'Eu ___':", opcoes:["sou","tenho","estou"], correta:1},
        {pergunta:"Como se diz 'eu quero'?", opcoes:["Yo puedo","Yo quiero","Yo debo"], correta:1},
        {pergunta:"'Puedo' vem de qual verbo?", opcoes:["Poder","Querer","Saber"], correta:0},
        {pergunta:"'Ellos hablan' significa:", opcoes:["Eles falam","Ela fala","Nós falamos"], correta:0},
        {pergunta:"Conjugação de 'ser' para 'yo'?", opcoes:["Eres","Soy","Es"], correta:1}
    ],
    corpo: [
        {pergunta:"Como se diz 'cabeça' em espanhol?", opcoes:["Brazo","Cabeza","Pierna"], correta:1},
        {pergunta:"'Ojo' significa:", opcoes:["Ouvido","Nariz","Olho"], correta:2},
        {pergunta:"Como se diz 'mão'?", opcoes:["Pie","Mano","Brazo"], correta:1},
        {pergunta:"'Pierna' significa:", opcoes:["Pé","Perna","Braço"], correta:1},
        {pergunta:"Como se diz 'boca'?", opcoes:["Boca","Nariz","Oreja"], correta:0},
        {pergunta:"'Nariz' em português é:", opcoes:["Nariz","Orelha","Pescoço"], correta:0},
        {pergunta:"Como se diz 'coração'?", opcoes:["Pulmón","Hígado","Corazón"], correta:2},
        {pergunta:"'Rodilla' significa:", opcoes:["Tornozelo","Joelho","Cotovelo"], correta:1},
        {pergunta:"Como se diz 'costas'?", opcoes:["Pecho","Espalda","Cintura"], correta:1},
        {pergunta:"'Cuello' significa:", opcoes:["Pescoço","Ombro","Queixo"], correta:0}
    ],
    clima: [
        {pergunta:"Como se diz 'sol' em espanhol?", opcoes:["Luna","Sol","Estrella"], correta:1},
        {pergunta:"'Lluvia' significa:", opcoes:["Neve","Chuva","Vento"], correta:1},
        {pergunta:"Como se diz 'frio'?", opcoes:["Calor","Frío","Viento"], correta:1},
        {pergunta:"'Nieve' significa:", opcoes:["Granizo","Neve","Neblina"], correta:1},
        {pergunta:"Como se diz 'verão'?", opcoes:["Invierno","Primavera","Verano"], correta:2},
        {pergunta:"'Invierno' é:", opcoes:["Verão","Inverno","Outono"], correta:1},
        {pergunta:"Como se diz 'nublado'?", opcoes:["Soleado","Nublado","Ventoso"], correta:1},
        {pergunta:"'Hace calor' significa:", opcoes:["Está frio","Está quente","Está chovendo"], correta:1},
        {pergunta:"Como se diz 'tempestade'?", opcoes:["Tormenta","Brisa","Niebla"], correta:0},
        {pergunta:"'Primavera' em português:", opcoes:["Verão","Outono","Primavera"], correta:2}
    ],
    viagem: [
        {pergunta:"Como se diz 'aeroporto'?", opcoes:["Estación","Aeropuerto","Puerto"], correta:1},
        {pergunta:"'Pasaporte' significa:", opcoes:["Bilhete","Passaporte","Visto"], correta:1},
        {pergunta:"Como se diz 'hotel'?", opcoes:["Hotel","Hostal","Motel"], correta:0},
        {pergunta:"'¿Dónde está...?' significa:", opcoes:["Como se vai a...?","Onde fica...?","Qual é o caminho?"], correta:1},
        {pergunta:"Como se diz 'a conta, por favor'?", opcoes:["La cuenta, por favor","El menú, por favor","La mesa, por favor"], correta:0},
        {pergunta:"'Ida y vuelta' significa:", opcoes:["Somente ida","Ida e volta","Passagem cancelada"], correta:1},
        {pergunta:"Como se diz 'táxi'?", opcoes:["Autobús","Taxi","Tren"], correta:1},
        {pergunta:"'¿Cuánto cuesta?' significa:", opcoes:["Onde comprar?","Quanto custa?","Tem desconto?"], correta:1},
        {pergunta:"Como se diz 'bagagem'?", opcoes:["Maleta","Equipaje","Bolsa"], correta:1},
        {pergunta:"'Reserva' significa:", opcoes:["Passagem","Reserva","Confirmação"], correta:1}
    ],
    trabalho: [
        {pergunta:"Como se diz 'empresa' em espanhol?", opcoes:["Empresa","Negocio","Compañía"], correta:0},
        {pergunta:"'Reunión' significa:", opcoes:["Relatório","Reunião","Apresentação"], correta:1},
        {pergunta:"Como se diz 'chefe'?", opcoes:["Empleado","Jefe","Gerente"], correta:1},
        {pergunta:"'Contrato' em português:", opcoes:["Contrato","Acordo","Proposta"], correta:0},
        {pergunta:"Como se diz 'salário'?", opcoes:["Sueldo","Bono","Comisión"], correta:0},
        {pergunta:"'Vacaciones' significa:", opcoes:["Feriado","Licença","Férias"], correta:2},
        {pergunta:"Como se diz 'escritório'?", opcoes:["Fábrica","Oficina","Taller"], correta:1},
        {pergunta:"'Entrevista de trabajo' é:", opcoes:["Contrato de trabalho","Entrevista de emprego","Avaliação"], correta:1},
        {pergunta:"Como se diz 'colega de trabalho'?", opcoes:["Compañero de trabajo","Amigo","Socio"], correta:0},
        {pergunta:"'Despedir' significa:", opcoes:["Contratar","Demitir","Promover"], correta:1}
    ],
    expressoes: [
        {pergunta:"'¡Qué guay!' (Espanha) significa:", opcoes:["Que estranho!","Que legal!","Que chato!"], correta:1},
        {pergunta:"'Meter la pata' significa:", opcoes:["Entrar na conversa","Cometer um erro","Ajudar alguém"], correta:1},
        {pergunta:"'Tomar el pelo' significa:", opcoes:["Pentear o cabelo","Tirar sarro","Dar um beijo"], correta:1},
        {pergunta:"'No pegar ojo' significa:", opcoes:["Não ver nada","Não dormir","Não entender"], correta:1},
        {pergunta:"'Estar en las nubes' significa:", opcoes:["Estar animado","Estar viajando","Estar distraído"], correta:2},
        {pergunta:"'¡Venga!' (Espanha) equivale a:", opcoes:["Vai embora!","Vamos! / Tudo bem!","Que raiva!"], correta:1},
        {pergunta:"'¡Anda ya!' expressa:", opcoes:["Concordância","Incredulidade","Tristeza"], correta:1},
        {pergunta:"'Estar hecho polvo' significa:", opcoes:["Estar sujo","Estar exausto","Estar irritado"], correta:1},
        {pergunta:"'Por supuesto' significa:", opcoes:["Talvez","Claro que sim","Não sei"], correta:1},
        {pergunta:"'¿En serio?' equivale a:", opcoes:["Com certeza?","Sério mesmo?","De jeito nenhum?"], correta:1}
    ]
};

// ===== ESTADO =====
let perguntaAtual = 0, pontos = 0, respondeu = false;
let usuarioAtual = null, senhaVisivelPerfil = false;
let salvandoPontuacao = false, categoriaAtual = '';
let historicoChatIA = [];

// ===== MODAL CONTEÚDO =====
const detalhesCards = {
    gramatica: {
        titulo:'📚 GRAMÁTICA',
        conteudo:`<p>Domine as bases do espanhol com regras claras:</p>
        <ul>
            <li><strong>Verbos no presente:</strong> Ser, Estar, Tener, Hacer, Ir</li>
            <li><strong>Pronomes:</strong> Yo, Tú, Él/Ella, Nosotros, Vosotros, Ellos</li>
            <li><strong>Artigos:</strong> El, La, Los, Las (definidos) | Un, Una, Unos, Unas (indefinidos)</li>
            <li><strong>Plural e gênero:</strong> Regras de masculino/feminino — palavras terminadas em -o (masc.) e -a (fem.)</li>
            <li><strong>Preposições:</strong> A, De, En, Por, Para, Con, Sin, Sobre</li>
            <li><strong>Estrutura de frases:</strong> Sujeito + Verbo + Complemento</li>
            <li><strong>Negação:</strong> Coloque "no" antes do verbo — "No hablo inglés"</li>
            <li><strong>Perguntas:</strong> ¿Qué?, ¿Cómo?, ¿Dónde?, ¿Cuándo?, ¿Por qué?, ¿Quién?</li>
        </ul>
        <p><strong>Exemplo completo:</strong><br>
        "Yo <u>soy</u> estudiante <u>de</u> español" = Eu sou estudante de espanhol</p>`
    },
    vocabulario: {
        titulo:'📖 VOCABULÁRIO',
        conteudo:`<p>Expanda seu repertório com palavras essenciais:</p>
        <ul>
            <li><strong>Saudações:</strong> Hola, Buenos días, Buenas tardes, Buenas noches, Adiós, Hasta luego</li>
            <li><strong>Números:</strong> Uno a Cien — base para compras e datas</li>
            <li><strong>Cores:</strong> Rojo, Azul, Verde, Amarillo, Negro, Blanco, Rosa, Naranja</li>
            <li><strong>Família:</strong> Madre, Padre, Hermano, Hermana, Abuelo, Abuela, Tío, Tía</li>
            <li><strong>Comida:</strong> Pan, Agua, Leche, Carne, Fruta, Verdura, Arroz, Huevo</li>
            <li><strong>Lugares:</strong> Casa, Escuela, Trabajo, Tienda, Restaurante, Aeropuerto, Hospital</li>
            <li><strong>Verbos essenciais:</strong> Ser, Estar, Tener, Ir, Comer, Hablar, Querer, Poder</li>
            <li><strong>Advérbios:</strong> Aquí, Allí, Ahora, Después, Antes, Siempre, Nunca</li>
        </ul>
        <p><strong>Dica de ouro:</strong> Aprenda 5 palavras por dia e revise sempre! Use flashcards para memorizar melhor.</p>`
    },
    cultura: {
        titulo:'🌎 CULTURA HISPÂNICA',
        conteudo:`<p>Mergulhe no rico universo hispânico:</p>
        <ul>
            <li><strong>Países:</strong> 21 países falam espanhol — México, Espanha, Argentina, Colômbia, Chile, Peru, Venezuela...</li>
            <li><strong>Música:</strong> Reggaetón (Bad Bunny, J Balvin), Salsa (Celia Cruz), Bachata (Romeo Santos), Flamenco (Rosalía), Cumbia</li>
            <li><strong>Festas:</strong> Día de los Muertos (México/nov.), La Tomatina (Espanha/ago.), Carnaval, San Fermín (pamplona)</li>
            <li><strong>Gastronomia:</strong> Tacos, Paella, Empanadas, Ceviche, Churros, Asado, Arepas, Pisco Sour</li>
            <li><strong>Costumes:</strong> Siesta espanhola, cumprimentos com beijos, importância da família</li>
            <li><strong>Cinema:</strong> Pedro Almodóvar, Alfonso Cuarón, Guillermo del Toro — cineastas mundialmente famosos</li>
            <li><strong>Literatura:</strong> García Márquez (Colômbia), Pablo Neruda (Chile), Cervantes (Espanha), Borges (Argentina)</li>
        </ul>
        <p><strong>Curiosidade:</strong> O espanhol é a 2ª língua nativa mais falada do mundo, com mais de 500 milhões de falantes nativos!</p>`
    }
};

// ===== UTILIDADES =====
function tocarSom(tipo) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (tipo === 'acerto') {
            osc.frequency.value = 523.25;
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc.start(); osc.stop(ctx.currentTime + 0.35);
        } else {
            osc.frequency.value = 180;
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            osc.start(); osc.stop(ctx.currentTime + 0.4);
        }
    } catch(e) {}
}

// ===== PARTÍCULAS LOGIN =====
function criarParticulas() {
    const cont = document.getElementById('particles');
    if (!cont) return;
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random()*100}%;animation-duration:${4+Math.random()*8}s;animation-delay:${Math.random()*6}s;width:${4+Math.random()*6}px;height:${4+Math.random()*6}px`;
        cont.appendChild(p);
    }
}

// ===== OLHINHO (toggle senha) =====
function toggleSenha(inputId, btnId) {
    const campo = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!campo || !btn) return;
    const aberto = campo.type === 'text';
    campo.type = aberto ? 'password' : 'text';
    btn.classList.toggle('ativo', !aberto);
    // muda o ícone do olho: aberto = olho riscado
    btn.innerHTML = aberto
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
}

function toggleSenhaPerfil() {
    const span = document.getElementById('perfilSenha');
    const btn = document.getElementById('eyePerfil');
    if (!span || !btn) return;
    senhaVisivelPerfil = !senhaVisivelPerfil;
    span.textContent = senhaVisivelPerfil ? usuarioAtual.senha : '••••••••';
    btn.classList.toggle('ativo', senhaVisivelPerfil);
    btn.innerHTML = senhaVisivelPerfil
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

// ===== FORMULÁRIOS =====
function trocarForm(tipo, btn) {
    document.querySelectorAll('.tabs-login button').forEach(b => b.classList.remove('ativo'));
    document.querySelectorAll('.form-area').forEach(f => f.classList.remove('ativo'));
    if (btn) btn.classList.add('ativo');
    document.querySelector(`[data-tipo="${tipo}"]`).classList.add('ativo');
}

document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    if (senha.length !== 8) { alert('A senha deve ter exatamente 8 dígitos!'); return; }
    const salvo = JSON.parse(localStorage.getItem('usuario'));
    if (salvo && salvo.email === email && salvo.senha === senha) {
        usuarioAtual = salvo;
        entrarSite();
    } else {
        alert('Email ou senha incorretos!');
    }
});

document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    const senha = document.getElementById('cadSenha').value;
    if (senha.length !== 8) { alert('A senha deve ter exatamente 8 dígitos!'); return; }
    usuarioAtual = {
        nome: document.getElementById('cadNome').value.trim(),
        email: document.getElementById('cadEmail').value.trim(),
        senha: senha, pontos: 0
    };
    localStorage.setItem('usuario', JSON.stringify(usuarioAtual));
    alert('Cadastro realizado com sucesso! Faça login agora.');
    trocarForm('login', document.querySelector('.tabs-login button'));
});

function entrarSite() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('site').style.display = 'block';
    atualizarPerfil();
    document.getElementById('nomeJogador').textContent = usuarioAtual.nome;
}

function logout() {
    usuarioAtual = null;
    location.reload();
}

// ===== NAV =====
function abrirMenu() {
    const sub = document.getElementById('submenu');
    const seta = document.getElementById('setaMenu');
    const aberto = sub.classList.toggle('ativo');
    if (seta) seta.style.transform = aberto ? 'rotate(180deg)' : 'rotate(0)';
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('#menuAulas')) {
        document.getElementById('submenu').classList.remove('ativo');
        const s = document.getElementById('setaMenu');
        if (s) s.style.transform = 'rotate(0)';
    }
});

function mostrarSecao(secao) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativo'));
    const el = document.getElementById(secao);
    if (el) el.classList.add('ativo');
    document.getElementById('submenu').classList.remove('ativo');
    if (document.getElementById('setaMenu')) document.getElementById('setaMenu').style.transform = 'rotate(0)';
    if (secao === 'ranking') carregarRanking();
    window.scrollTo(0, 0);
}

// ===== PERFIL =====
function abrirPerfil() {
    atualizarPerfil();
    document.getElementById('painelPerfil').classList.add('aberto');
    document.getElementById('overlayPerfil').classList.add('ativo');
}

function fecharPerfil() {
    document.getElementById('painelPerfil').classList.remove('aberto');
    document.getElementById('overlayPerfil').classList.remove('ativo');
}

function atualizarPerfil() {
    if (!usuarioAtual) return;
    document.getElementById('perfilNome').textContent = usuarioAtual.nome;
    document.getElementById('perfilEmail').textContent = usuarioAtual.email;
    document.getElementById('pontosTotal').textContent = usuarioAtual.pontos || 0;
    senhaVisivelPerfil = false;
    document.getElementById('perfilSenha').textContent = '••••••••';
    const eyeP = document.getElementById('eyePerfil');
    if (eyeP) {
        eyeP.classList.remove('ativo');
        eyeP.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    }
}

// ===== QUIZ =====
function iniciarQuiz(categoria) {
    categoriaAtual = categoria;
    perguntaAtual = 0;
    pontos = 0;
    mostrarSecao('quiz');
    document.getElementById('pontosAtual').textContent = 0;
    document.getElementById('nomeJogador').textContent = usuarioAtual ? usuarioAtual.nome : 'Aluno';
    document.getElementById('btnFinalizar').style.display = 'none';
    document.getElementById('btnProxima').style.display = 'inline-block';
    document.getElementById('btnProxima').disabled = true;
    const titulos = {
        basico:'Quiz — Básico', animais:'Quiz — Animais', cores:'Quiz — Cores',
        comida:'Quiz — Comida', numeros:'Quiz — Números', familia:'Quiz — Família',
        verbos:'Quiz — Verbos', corpo:'Quiz — Corpo Humano', clima:'Quiz — Clima',
        viagem:'Quiz — Viagem', trabalho:'Quiz — Trabalho', expressoes:'Quiz — Expressões'
    };
    document.getElementById('tituloQuiz').textContent = titulos[categoria] || 'Quiz de Espanhol';
    carregarPergunta();
}

function carregarPergunta() {
    respondeu = false;
    const total = perguntasPorTema[categoriaAtual].length;
    const q = perguntasPorTema[categoriaAtual][perguntaAtual];
    const pct = ((perguntaAtual) / total) * 100;
    document.getElementById('progressBar').style.width = pct + '%';
    const quizBox = document.getElementById('quiz-box');
    let html = `<div class="questao-card">
        <div class="questao-num">Pergunta ${perguntaAtual+1} de ${total}</div>
        <h3>${q.pergunta}</h3>
        <div class="opcoes">`;
    q.opcoes.forEach((opcao, i) => {
        html += `<button class="opcao" onclick="responder(${i})">${opcao}</button>`;
    });
    html += `</div><div class="feedback-quiz" id="feedbackQuiz"></div></div>`;
    quizBox.innerHTML = html;
    document.getElementById('btnProxima').disabled = true;
}

function responder(escolha) {
    if (respondeu) return;
    respondeu = true;
    const q = perguntasPorTema[categoriaAtual][perguntaAtual];
    const botoes = document.querySelectorAll('.opcao');
    const feedback = document.getElementById('feedbackQuiz');
    botoes.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correta) btn.classList.add('correta');
        if (i === escolha && i !== q.correta) btn.classList.add('errada');
    });
    if (escolha === q.correta) {
        pontos += 10;
        document.getElementById('pontosAtual').textContent = pontos;
        feedback.innerHTML = '✅ Correto! +10 pontos';
        feedback.className = 'feedback-quiz correto';
        tocarSom('acerto');
        mostrarMascote('🎉', 'Parabéns!');
    } else {
        feedback.innerHTML = `❌ Errado! Resposta: <strong>${q.opcoes[q.correta]}</strong>`;
        feedback.className = 'feedback-quiz errado';
        tocarSom('erro');
        mostrarMascote('😅', 'Quase! Continue!');
    }
    document.getElementById('btnProxima').disabled = false;
    const total = perguntasPorTema[categoriaAtual].length;
    if (perguntaAtual === total - 1) {
        document.getElementById('btnProxima').style.display = 'none';
        document.getElementById('btnFinalizar').style.display = 'inline-block';
    }
}

function proximaPergunta() {
    perguntaAtual++;
    carregarPergunta();
}

function finalizarQuiz() {
    if (salvandoPontuacao) return;
    salvandoPontuacao = true;
    const btn = document.getElementById('btnFinalizar');
    btn.disabled = true;
    btn.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:girar .6s linear infinite;margin-right:8px;vertical-align:middle"></span>Salvando...`;
    document.getElementById('progressBar').style.width = '100%';
    setTimeout(() => {
        salvarRanking();
        if (usuarioAtual) {
            usuarioAtual.pontos = (usuarioAtual.pontos || 0) + pontos;
            localStorage.setItem('usuario', JSON.stringify(usuarioAtual));
            document.getElementById('pontosTotal').textContent = usuarioAtual.pontos;
        }
        mostrarMascote('🏆', `${pontos} pontos!`);
        setTimeout(() => {
            mostrarSecao('ranking');
            btn.innerHTML = '🏆 Ver Resultado';
            btn.disabled = false;
            salvandoPontuacao = false;
        }, 1800);
    }, 800);
}

function salvarRanking() {
    if (!usuarioAtual) return;
    let ranking = JSON.parse(localStorage.getItem('rankingEspanhol') || '[]');
    const agora = Date.now();
    const jaSalvou = ranking.some(r => r.nome === usuarioAtual.nome && r.pontos === pontos && agora - (r.timestamp || 0) < 3000);
    if (jaSalvou) return;
    ranking.push({nome: usuarioAtual.nome, pontos, categoria: categoriaAtual, data: new Date().toLocaleDateString('pt-BR'), timestamp: agora});
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 10);
    localStorage.setItem('rankingEspanhol', JSON.stringify(ranking));
}

function carregarRanking() {
    let ranking = JSON.parse(localStorage.getItem('rankingEspanhol') || '[]');
    let html = `<table class="tabela-ranking"><tr><th>Pos</th><th>Nome</th><th>Pontos</th><th>Data</th></tr>`;
    if (ranking.length === 0) {
        html += '<tr><td colspan="4" style="text-align:center;color:#999;padding:30px">Nenhum resultado ainda. Jogue um quiz!</td></tr>';
    } else {
        ranking.forEach((r, i) => {
            const medalha = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
            html += `<tr><td>${medalha}</td><td><strong>${r.nome}</strong></td><td style="color:var(--orange);font-weight:800">${r.pontos}</td><td>${r.data}</td></tr>`;
        });
    }
    html += '</table>';
    document.getElementById('tabelaRanking').innerHTML = html;
}

function limparRanking() {
    if (confirm('Tem certeza que quer apagar todo o ranking?')) {
        localStorage.removeItem('rankingEspanhol');
        carregarRanking();
    }
}

// ===== MASCOTE =====
function mostrarMascote(emoji, texto) {
    const mascote = document.getElementById('mascote');
    mascote.innerHTML = `<span class="boneco">${emoji}</span><p>${texto}</p>`;
    mascote.classList.add('mostrar');
    clearTimeout(mascote._timer);
    mascote._timer = setTimeout(() => mascote.classList.remove('mostrar'), 3000);
}

// ===== MODAL =====
function abrirDetalheCard(tipo) {
    const modal = document.getElementById('modalCard');
    const conteudo = document.getElementById('conteudoModal');
    const dados = detalhesCards[tipo];
    if (!dados) return;
    conteudo.innerHTML = `<h2>${dados.titulo}</h2>${dados.conteudo}`;
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

function fecharDetalheCard() {
    document.getElementById('modalCard').classList.remove('ativo');
    document.body.style.overflow = '';
}

// ===== CONTATO =====
function enviarContato() {
    alert('✅ Mensagem enviada com sucesso! Responderemos em até 24 horas.');
}

// ===== CHAT IA =====
const respostasIA = [
    // Apresentação
    { gatilhos: ['apresent', 'nome', 'me llamo', 'llamar'],
      resposta: `¡Perfecto! Para se apresentar em espanhol:\n\n**Formal:** "Buenos días, mi nombre es [seu nome]. Mucho gusto."\n**Informal:** "¡Hola! Me llamo [seu nome]. ¿Y tú?"\n\nPara perguntar o nome de alguém: "¿Cómo te llamas?" (informal) ou "¿Cómo se llama usted?" (formal)\n\nTente dizer seu nome em espanhol! 😊` },
    // Verbos
    { gatilhos: ['verb', 'conjugar', 'conjugação', 'presente', 'tiempo'],
      resposta: `¡Claro! Os verbos regulares em espanhol têm três terminações:\n\n**-AR** (hablar): yo hablo, tú hablas, él habla\n**-ER** (comer): yo como, tú comes, él come\n**-IR** (vivir): yo vivo, tú vives, él vive\n\nOs verbos irregulares mais importantes são **SER** e **ESTAR**:\n- Yo soy / estoy\n- Tú eres / estás\n- Él es / está\n\nQuer praticar algum verbo específico? 💪` },
    // Comida / restaurante
    { gatilhos: ['comida', 'restaurante', 'comer', 'pedir', 'menú', 'menu'],
      resposta: `🍽️ Frases essenciais no restaurante:\n\n- "¿Me trae la carta, por favor?" — Pode trazer o cardápio?\n- "Quisiera pedir..." — Eu gostaria de pedir...\n- "¿Cuánto cuesta?" — Quanto custa?\n- "La cuenta, por favor" — A conta, por favor\n- "¡Está delicioso!" — Está delicioso!\n- "Sin picante, por favor" — Sem picante, por favor\n\nO vocabulário de comida: pan (pão), agua (água), carne, pollo (frango), pescado (peixe), ensalada (salada) 🥗` },
    // Viagem
    { gatilhos: ['viag', 'viajar', 'turismo', 'país', 'cidade', 'dónde', 'direção'],
      resposta: `✈️ Espanhol para viajantes:\n\n**Pedir direções:**\n- "¿Dónde está...?" — Onde fica...?\n- "¿Cómo llego a...?" — Como chego a...?\n- "Gire a la derecha/izquierda" — Vire à direita/esquerda\n\n**No hotel:**\n- "Tengo una reserva" — Tenho uma reserva\n- "¿A qué hora es el desayuno?" — A que horas é o café?\n\n**Emergências:**\n- "¡Ayuda!" — Socorro!\n- "Llame a la policía" — Chame a polícia\n\nQuer saber expressões para algum país específico? 🌎` },
    // Saudações
    { gatilhos: ['sauda', 'olá', 'hola', 'boa', 'bom', 'cumpriment'],
      resposta: `😊 Saudações em espanhol:\n\n**Formais:**\n- Buenos días — Bom dia\n- Buenas tardes — Boa tarde\n- Buenas noches — Boa noite\n- ¿Cómo está usted? — Como o senhor/a está?\n\n**Informais:**\n- ¡Hola! — Olá!\n- ¿Qué tal? / ¿Cómo estás? — Como vai?\n- ¡Buenas! — Oi! (abreviado, muito usado)\n\n**Despedidas:**\n- Adiós — Tchau\n- Hasta luego — Até logo\n- Hasta mañana — Até amanhã\n- ¡Cuídate! — Cuide-se!` },
    // Pronúncia
    { gatilhos: ['pronunci', 'som', 'falar', 'sotaque', 'letra'],
      resposta: `🎙️ Dicas de pronúncia:\n\n**Letras especiais:**\n- Ñ = "nh" — niño (menino)\n- LL = "lh" — llamo (chamo)\n- J = "r" gutural — jardín\n- H = sempre mudo — hola\n- RR = "r" forte — perro\n\n**Vogais são sempre abertas** — sem ditongos fechados como no português!\n\n**Acento:** Palavras terminadas em vogal, N ou S têm acento na penúltima sílaba. Outras, na última.\n\nQuer que eu explique a pronúncia de alguma palavra específica? 🔊` },
    // Expressões
    { gatilhos: ['expressão', 'expressoes', 'gíria', 'idiomática', 'coloquial'],
      resposta: `🗣️ Expressões populares que você precisa saber:\n\n- **¡Qué guay!** (Esp.) / **¡Qué chido!** (Méx.) = Que legal!\n- **¡Venga!** = Vamos! / Tá bom!\n- **Tomar el pelo** = Estar tirando sarro\n- **No hay mal que por bien no venga** = Não há mal que não venha para o bem\n- **Estar hecho polvo** = Estar exausto/destruído\n- **¿En serio?** = Sério mesmo?\n\nExpressa emoção no espanhol:\n- Alegria: ¡Genial! ¡Fantástico! ¡Me encanta!\n- Surpresa: ¡Madre mía! ¡No me digas!\n- Raiva: ¡Qué fastidio! ¡Me tiene harto!` },
    // Números
    { gatilhos: ['número', 'numero', 'contar', 'uno', 'cien'],
      resposta: `🔢 Números em espanhol:\n\n1-10: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez\n\n11-20: once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte\n\nDezenas: treinta (30), cuarenta (40), cincuenta (50), sesenta (60), setenta (70), ochenta (80), noventa (90), cien (100)\n\n**Atenção:** 21 = veintiuno, 31 = treinta y uno\n\nQuer aprender números maiores? 📊` },
    // Família
    { gatilhos: ['famil', 'parentes', 'madre', 'padre', 'hermano'],
      resposta: `👨‍👩‍👧 Vocabulário de família:\n\n- Madre/Mamá — Mãe\n- Padre/Papá — Pai\n- Hermano/Hermana — Irmão/Irmã\n- Abuelo/Abuela — Avô/Avó\n- Tío/Tía — Tio/Tia\n- Primo/Prima — Primo/Prima\n- Hijo/Hija — Filho/Filha\n- Nieto/Nieta — Neto/Neta\n- Esposo/Esposa — Marido/Esposa\n- Suegro/Suegra — Sogro/Sogra\n\nFrase: "Mi familia es muy grande" — Minha família é muito grande 😊` },
    // Cultura
    { gatilhos: ['cultur', 'música', 'musica', 'país', 'espanha', 'méxico', 'argentina'],
      resposta: `🌎 O mundo hispânico é incrível!\n\n**Países:** 21 países falam espanhol como língua oficial!\n\n**Música:** Bad Bunny (Puerto Rico), J Balvin (Colômbia), Shakira (Colômbia), Rosalía (Espanha), C. Tangana\n\n**Gastronomia por país:**\n- 🇲🇽 México: tacos, guacamole, chile en nogada\n- 🇪🇸 Espanha: paella, tortilla española, churros\n- 🇦🇷 Argentina: asado, empanadas, dulce de leche\n- 🇵🇪 Peru: ceviche, lomo saltado\n\n**Cinema:** Alfonso Cuarón (Roma), Guillermo del Toro (A Forma da Água) 🎬` },
    // Default
    { gatilhos: [],
      resposta: null }
];

function obterRespostaIA(mensagem) {
    const msg = mensagem.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (const item of respostasIA) {
        if (item.gatilhos.length === 0) continue;
        if (item.gatilhos.some(g => msg.includes(g))) {
            return item.resposta;
        }
    }
    // Respostas genéricas
    const genericas = [
        `¡Muy bien! 😊 Posso te ajudar com vários tópicos de espanhol:\n\n• Gramática e verbos\n• Vocabulário (comida, família, cores...)\n• Expressões idiomáticas\n• Pronúncia\n• Frases para viagem\n• Cultura hispânica\n\nSobre o que você quer aprender agora?`,
        `Boa pergunta! Em espanhol existe uma riqueza enorme. Me diga mais especificamente o que quer aprender — gramática, vocabulário, conversação? Estou aqui para ajudar! 🎯`,
        `¡Interesante! O espanhol tem muitas nuances. Para te dar a melhor resposta, pode elaborar um pouco mais sua dúvida? Posso te ajudar com verbos, expressões, pronúncia ou cultura! 📚`
    ];
    return genericas[Math.floor(Math.random() * genericas.length)];
}

function formatarMensagemIA(texto) {
    return texto
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function enviarMensagem() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    adicionarMsgChat('user', msg);
    const typing = adicionarMsgTyping();
    setTimeout(() => {
        typing.remove();
        const resposta = obterRespostaIA(msg);
        adicionarMsgChat('bot', resposta);
    }, 1000 + Math.random() * 800);
}

function enviarSugestao(texto) {
    document.getElementById('chatInput').value = texto;
    enviarMensagem();
}

function adicionarMsgChat(tipo, texto) {
    const box = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = tipo === 'user' ? 'msg-user' : 'msg-bot';
    const avatar = tipo === 'user' ? '😊' : '🤖';
    div.innerHTML = `<span class="msg-avatar">${avatar}</span><div class="msg-bubble">${tipo === 'bot' ? formatarMensagemIA(texto) : texto}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function adicionarMsgTyping() {
    const box = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = 'msg-bot msg-typing';
    div.innerHTML = `<span class="msg-avatar">🤖</span><div class="msg-bubble">Digitando<span class="dots">...</span></div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
}

// ===== INICIALIZAÇÃO =====
window.addEventListener('load', () => {
    criarParticulas();
    const salvo = localStorage.getItem('usuario');
    if (salvo) {
        usuarioAtual = JSON.parse(salvo);
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        fecharDetalheCard();
        fecharPerfil();
    }
    if (e.key === 'Enter' && document.getElementById('chatInput') === document.activeElement) {
        enviarMensagem();
    }
});
JSEOF