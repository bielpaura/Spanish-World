import Script from 'next/script';

const pageHtml = `

<!-- ===== TELA DE LOGIN / CADASTRO ===== -->
<div id="authPage" class="auth-page">
    <div class="auth-bg">
        <div class="auth-orb auth-orb1"></div>
        <div class="auth-orb auth-orb2"></div>
        <div class="auth-orb auth-orb3"></div>
        <div class="auth-grid-lines"></div>
    </div>
    <div class="auth-left">
        <div class="auth-brand">
            <span class="auth-logo-icon">ðŸŒŽ</span>
            <h1>SPANISH<br><em>WORLD</em></h1>
        </div>
        <p class="auth-tagline">A plataforma #1 de espanhol para brasileiros. Aprenda do bÃ¡sico ao avanÃ§ado com IA e gamificaÃ§Ã£o.</p>
        <div class="auth-stats">
            <div class="auth-stat"><span>1000+</span><small>Aulas</small></div>
            <div class="auth-stat"><span>21</span><small>PaÃ­ses</small></div>
            <div class="auth-stat"><span>500M</span><small>Falantes</small></div>
        </div>
        <div class="auth-features">
            <div class="auth-feat">ðŸ¤– IA interativa â€” conversaÃ§Ã£o guiada</div>
            <div class="auth-feat">ðŸ† GamificaÃ§Ã£o com ranking</div>
            <div class="auth-feat">ðŸ“š + de 1000 aulas organizadas</div>
            <div class="auth-feat">ðŸŽ¯ ExercÃ­cios interativos</div>
        </div>
    </div>
    <div class="auth-right">
        <div class="auth-box">
            <div class="auth-tabs">
                <button class="auth-tab ativo" id="tabLogin" onclick="switchAuthTab('login')">Entrar</button>
                <button class="auth-tab" id="tabCadastro" onclick="switchAuthTab('cadastro')">Criar conta</button>
            </div>

            <!-- LOGIN -->
            <form id="formLogin" class="auth-form ativo" onsubmit="handleLogin(event)">
                <div class="auth-form-header">
                    <h2>Bem-vindo de volta!</h2>
                    <p>Continue sua jornada no espanhol</p>
                </div>
                <div class="field-group">
                    <label>Email</label>
                    <div class="field-wrap">
                        <span class="field-icon">âœ‰ï¸</span>
                        <input type="email" id="loginEmail" placeholder="seu@email.com" required>
                    </div>
                </div>
                <div class="field-group">
                    <label>Senha</label>
                    <div class="field-wrap">
                        <span class="field-icon">ðŸ”</span>
                        <input type="password" id="loginSenha" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required minlength="6">
                        <span class="eye-toggle" onclick="toggleEye('loginSenha',this)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </span>
                    </div>
                </div>
                <div class="field-row">
                    <label class="checkbox-label"><input type="checkbox" id="lembrarMe"> Lembrar de mim</label>
                    <a href="#" class="link-forgot" onclick="mostrarRecuperacao()">Esqueci a senha</a>
                </div>
                <button type="submit" class="btn-auth">Entrar na plataforma â†’</button>
                <div class="auth-divider"><span>ou continue com</span></div>
                <div class="social-btns">
                    <button type="button" class="social-btn" onclick="loginDemo()">ðŸŽ® Conta Demo</button>
                </div>
            </form>

            <!-- CADASTRO -->
            <form id="formCadastro" class="auth-form" onsubmit="handleCadastro(event)">
                <div class="auth-form-header">
                    <h2>Crie sua conta!</h2>
                    <p>Comece a aprender espanhol hoje</p>
                </div>
                <div class="field-row-2">
                    <div class="field-group">
                        <label>Nome</label>
                        <div class="field-wrap">
                            <span class="field-icon">ðŸ‘¤</span>
                            <input type="text" id="cadNome" placeholder="Seu nome" required>
                        </div>
                    </div>
                    <div class="field-group">
                        <label>Sobrenome</label>
                        <div class="field-wrap">
                            <span class="field-icon">ðŸ‘¤</span>
                            <input type="text" id="cadSobrenome" placeholder="Sobrenome">
                        </div>
                    </div>
                </div>
                <div class="field-group">
                    <label>Email</label>
                    <div class="field-wrap">
                        <span class="field-icon">âœ‰ï¸</span>
                        <input type="email" id="cadEmail" placeholder="seu@email.com" required>
                    </div>
                </div>
                <div class="field-group">
                    <label>Senha <small>(mÃ­n. 8 caracteres)</small></label>
                    <div class="field-wrap">
                        <span class="field-icon">ðŸ”</span>
                        <input type="password" id="cadSenha" placeholder="Crie uma senha forte" required minlength="8" oninput="atualizarForcaSenha(this.value)">
                        <span class="eye-toggle" onclick="toggleEye('cadSenha',this)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </span>
                    </div>
                    <div class="senha-forca" id="senhaForca"><div class="forca-bar" id="forcaBar"></div></div>
                    <small id="forcaTxt" class="forca-txt"></small>
                </div>
                <div class="field-group">
                    <label>Confirmar Senha</label>
                    <div class="field-wrap">
                        <span class="field-icon">ðŸ”</span>
                        <input type="password" id="cadConfirma" placeholder="Repita a senha" required minlength="8">
                    </div>
                </div>
                <div class="field-group">
                    <label>NÃ­vel atual de espanhol</label>
                    <div class="field-wrap">
                        <span class="field-icon">ðŸ“Š</span>
                        <select id="cadNivel">
                            <option value="iniciante">Iniciante â€” nunca estudei</option>
                            <option value="basico">BÃ¡sico â€” conheÃ§o algumas palavras</option>
                            <option value="intermediario">IntermediÃ¡rio â€” consigo me comunicar</option>
                            <option value="avancado">AvanÃ§ado â€” falo bem</option>
                        </select>
                    </div>
                </div>
                <label class="checkbox-label termos">
                    <input type="checkbox" id="aceitaTermos" required>
                    Aceito os <a href="#" onclick="abrirTermos()">Termos de Uso</a> e <a href="#" onclick="abrirPrivacidade()">PolÃ­tica de Privacidade</a>
                </label>
                <button type="submit" class="btn-auth">Criar minha conta â†’</button>
            </form>

            <!-- RECUPERAR SENHA -->
            <div id="formRecuperacao" class="auth-form">
                <div class="auth-form-header">
                    <h2>Recuperar senha</h2>
                    <p>Enviaremos um link para seu email</p>
                </div>
                <div class="field-group">
                    <label>Email cadastrado</label>
                    <div class="field-wrap">
                        <span class="field-icon">âœ‰ï¸</span>
                        <input type="email" id="recEmail" placeholder="seu@email.com">
                    </div>
                </div>
                <button type="button" class="btn-auth" onclick="enviarRecuperacao()">Enviar link de recuperaÃ§Ã£o</button>
                <button type="button" class="btn-ghost" onclick="switchAuthTab('login')">â† Voltar ao login</button>
            </div>
        </div>
    </div>
</div>

<!-- ===== SITE PRINCIPAL ===== -->
<div id="site" class="site oculto">

    <!-- SIDEBAR PERFIL -->
    <div id="sidebarPerfil" class="sidebar-perfil">
        <div class="sidebar-header">
            <div class="sidebar-avatar" id="sidebarAvatar">ðŸ‘¤</div>
            <div class="sidebar-user-info">
                <strong id="sidebarNome">Aluno</strong>
                <span id="sidebarEmail">email@email.com</span>
                <span class="nivel-badge" id="sidebarNivel">Iniciante</span>
            </div>
            <button class="sidebar-close" onclick="togglePerfil()">âœ•</button>
        </div>

        <div class="sidebar-pontos">
            <div class="pontos-ring">
                <span id="sidebarPontos">0</span>
                <small>pts</small>
            </div>
            <div class="pontos-info">
                <div>ðŸ”¥ <b id="sidebarStreak">0</b> dias seguidos</div>
                <div>ðŸ… <b id="sidebarMedalhas">0</b> medalhas</div>
                <div>ðŸ“š <b id="sidebarAulas">0</b> aulas vistas</div>
            </div>
        </div>

        <div class="sidebar-nav">
            <button class="sb-btn" onclick="abrirAba('perfil-dados')">ðŸ‘¤ Meus Dados</button>
            <button class="sb-btn" onclick="abrirAba('perfil-personalizacao')">ðŸŽ¨ PersonalizaÃ§Ã£o</button>
            <button class="sb-btn" onclick="abrirAba('perfil-progresso')">ðŸ“Š Meu Progresso</button>
            <button class="sb-btn" onclick="abrirAba('perfil-conquistas')">ðŸ† Conquistas</button>
            <button class="sb-btn" onclick="abrirAba('perfil-seguranca')">ðŸ”’ SeguranÃ§a</button>
            <button class="sb-btn" onclick="abrirAba('perfil-privacidade')">ðŸ›¡ï¸ Privacidade</button>
            <button class="sb-btn" onclick="abrirAba('perfil-notificacoes')">ðŸ”” NotificaÃ§Ãµes</button>
            <button class="sb-btn" onclick="abrirAba('perfil-preferencias')">âš™ï¸ PreferÃªncias</button>
            <button class="sb-btn" onclick="abrirAba('perfil-metas')">ðŸŽ¯ Metas de Estudo</button>
            <button class="sb-btn" onclick="abrirAba('perfil-certificados')">ðŸ“œ Certificados</button>
            <button class="sb-btn" onclick="abrirAba('perfil-suporte')">ðŸ§‘â€ðŸ’» Suporte</button>
            <button class="sb-btn" onclick="abrirAba('perfil-assinatura')">ðŸ’Ž Plano & Assinatura</button>
        </div>

        <button class="btn-logout" onclick="logout()">ðŸšª Sair da conta</button>
    </div>
    <div class="overlay-sidebar" id="overlaySidebar" onclick="togglePerfil()"></div>

    <!-- MODAL ABAS PERFIL -->
    <div id="modalPerfil" class="modal-perfil oculto">
        <div class="modal-perfil-content">
            <button class="modal-perfil-close" onclick="fecharModalPerfil()">âœ•</button>
            <div id="modalPerfilConteudo"></div>
        </div>
    </div>

    <!-- TOPBAR -->
    <header class="topbar" id="topbar">
        <div class="topbar-left">
            <button class="burger-btn" onclick="togglePerfil()">
                <span></span><span></span><span></span>
            </button>
            <div class="topbar-brand">
                <img src="/assets/spanish-world-icon.svg" alt="Spanish World" class="brand-icon">
                <span class="brand-text">SPANISH WORLD</span>
            </div>
        </div>
        <nav class="topbar-nav" id="topbarNav">
            <a class="nav-link ativo" onclick="navegar('inicio')">InÃ­cio</a>
            <div class="nav-dropdown">
                <a class="nav-link" onclick="toggleMenuAulas()">Aulas <span class="nav-badge">1000+</span></a>
                <div class="dropdown-menu" id="dropdownAulas">
                    <div class="dropdown-col">
                        <span class="dropdown-title">Por NÃ­vel</span>
                        <a onclick="navegar('nivel-a1')">ðŸŸ¢ A1 â€” Iniciante</a>
                        <a onclick="navegar('nivel-a2')">ðŸŸ¡ A2 â€” Elementar</a>
                        <a onclick="navegar('nivel-b1')">ðŸŸ  B1 â€” IntermediÃ¡rio</a>
                        <a onclick="navegar('nivel-b2')">ðŸ”´ B2 â€” IntermediÃ¡rio Alto</a>
                        <a onclick="navegar('nivel-c1')">ðŸŸ£ C1 â€” AvanÃ§ado</a>
                        <a onclick="navegar('nivel-c2')">âš« C2 â€” Proficiente</a>
                    </div>
                    <div class="dropdown-col">
                        <span class="dropdown-title">Por Tema</span>
                        <a onclick="navegar('aulas-gramatica')">ðŸ“ GramÃ¡tica</a>
                        <a onclick="navegar('aulas-vocabulario')">ðŸ“– VocabulÃ¡rio</a>
                        <a onclick="navegar('aulas-pronuncia')">ðŸŽ™ï¸ PronÃºncia</a>
                        <a onclick="navegar('aulas-expressoes')">ðŸ’¬ ExpressÃµes</a>
                        <a onclick="navegar('aulas-cultura')">ðŸŒ Cultura HispÃ¢nica</a>
                        <a onclick="navegar('aulas-negocios')">ðŸ’¼ NegÃ³cios</a>
                    </div>
                    <div class="dropdown-col">
                        <span class="dropdown-title">Especiais</span>
                        <a onclick="navegar('aulas-viagem')">âœˆï¸ Para Viajantes</a>
                        <a onclick="navegar('aulas-musica')">ðŸŽµ MÃºsica e Letras</a>
                        <a onclick="navegar('aulas-cinema')">ðŸŽ¬ Cinema HispÃ¢nico</a>
                        <a onclick="navegar('aulas-literatura')">ðŸ“š Literatura</a>
                        <a onclick="navegar('aulas-gastronomia')">ðŸ½ï¸ Gastronomia</a>
                    </div>
                </div>
            </div>
            <a class="nav-link" onclick="navegar('exercicios')">ExercÃ­cios</a>
            <a class="nav-link" onclick="navegar('digitacao')">DigitaÃ§Ã£o</a>
            <a class="nav-link" onclick="navegar('conversacao')">Chat IA</a>
            <a class="nav-link" onclick="navegar('aulas-pronuncia')">PronÃºncia</a>
            <a class="nav-link" onclick="navegar('ranking')">Ranking</a>
            <a class="nav-link" onclick="navegar('professores')">Professores</a>
            <a class="nav-link" onclick="navegar('feedbacks')">Feedbacks</a>
            <a class="nav-link" onclick="navegar('contato')">Contato</a>
        </nav>
        <div class="topbar-right">
            <button class="theme-toggle" onclick="alternarModoEscuro()" title="Alternar modo escuro">â—</button>
            <div class="topbar-pts">â­ <span id="topbarPts">0</span></div>
            <div class="topbar-streak">ðŸ”¥ <span id="topbarStreak">0</span></div>
            <button class="topbar-avatar-btn" onclick="togglePerfil()" id="topbarAvatarBtn">ðŸ‘¤</button>
        </div>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()">â‹¯</button>
    </header>

    <!-- CONTEÃšDO PRINCIPAL -->
    <main class="main-content">

        <!-- ===== INÃCIO ===== -->
        <section class="secao ativo" id="sec-inicio">
            <div class="hero">
                <div class="hero-slideshow" id="heroSlideshow" aria-hidden="true"></div>
                <div class="hero-bg">
                    <div class="hero-particle p1"></div>
                    <div class="hero-particle p2"></div>
                    <div class="hero-particle p3"></div>
                    <div class="hero-particle p4"></div>
                    <div class="hero-particle p5"></div>
                </div>
                <div class="hero-content">
                    <div class="hero-pill">ðŸŒŸ Plataforma #1 de Espanhol</div>
                    <h1 class="hero-title">Fale Espanhol com <span class="hero-highlight">ConfianÃ§a</span></h1>
                    <p class="hero-sub">Aulas interativas, IA conversacional e gamificaÃ§Ã£o â€” tudo para vocÃª falar espanhol de verdade.</p>
                    <div class="hero-btns">
                        <button class="btn-hero-primary" onclick="navegar('nivel-a1')">ðŸš€ ComeÃ§ar Agora</button>
                        <button class="btn-hero-secondary" onclick="navegar('conversacao')">ðŸ’¬ Praticar com IA</button>
                    </div>
                    <div class="hero-themes" id="heroThemes"></div>
                    <div class="hero-metrics">
                        <div class="metric"><strong>1000+</strong><span>Aulas</span></div>
                        <div class="metric-div"></div>
                        <div class="metric"><strong>21</strong><span>PaÃ­ses</span></div>
                        <div class="metric-div"></div>
                        <div class="metric"><strong>500M</strong><span>Falantes</span></div>
                        <div class="metric-div"></div>
                        <div class="metric"><strong>100%</strong><span>GrÃ¡tis</span></div>
                    </div>
                </div>
            </div>

            <!-- Jornada de aprendizado -->
            <div class="section-block">
                <div class="section-header">
                    <span class="section-eyebrow">Sua Jornada</span>
                    <h2>Escolha seu <span>caminho de aprendizado</span></h2>
                </div>
                <div class="trilha-grid">
                    <div class="trilha-card" onclick="navegar('nivel-a1')">
                        <div class="trilha-nivel a1">A1</div>
                        <div class="trilha-info">
                            <h3>Iniciante</h3>
                            <p>Alfabeto, saudaÃ§Ãµes, apresentaÃ§Ãµes bÃ¡sicas</p>
                            <span class="trilha-aulas">80 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                    <div class="trilha-card" onclick="navegar('nivel-a2')">
                        <div class="trilha-nivel a2">A2</div>
                        <div class="trilha-info">
                            <h3>Elementar</h3>
                            <p>FamÃ­lia, rotina, compras, tempo</p>
                            <span class="trilha-aulas">120 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                    <div class="trilha-card" onclick="navegar('nivel-b1')">
                        <div class="trilha-nivel b1">B1</div>
                        <div class="trilha-info">
                            <h3>IntermediÃ¡rio</h3>
                            <p>Viagem, trabalho, passado e futuro</p>
                            <span class="trilha-aulas">200 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                    <div class="trilha-card" onclick="navegar('nivel-b2')">
                        <div class="trilha-nivel b2">B2</div>
                        <div class="trilha-info">
                            <h3>IntermediÃ¡rio Alto</h3>
                            <p>Debates, notÃ­cias, negÃ³cios</p>
                            <span class="trilha-aulas">250 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                    <div class="trilha-card" onclick="navegar('nivel-c1')">
                        <div class="trilha-nivel c1">C1</div>
                        <div class="trilha-info">
                            <h3>AvanÃ§ado</h3>
                            <p>Literatura, cinema, expressÃµes idiomÃ¡ticas</p>
                            <span class="trilha-aulas">200 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                    <div class="trilha-card" onclick="navegar('nivel-c2')">
                        <div class="trilha-nivel c2">C2</div>
                        <div class="trilha-info">
                            <h3>Proficiente</h3>
                            <p>NÃ­vel nativo, sotaques, variaÃ§Ãµes regionais</p>
                            <span class="trilha-aulas">150 aulas</span>
                        </div>
                        <div class="trilha-arrow">â†’</div>
                    </div>
                </div>
            </div>

            <!-- Categorias em destaque -->
            <div class="section-block alt-bg">
                <div class="section-header">
                    <span class="section-eyebrow">Explore</span>
                    <h2>Categorias em <span>destaque</span></h2>
                </div>
                <div class="cards-grid">
                    <div class="feature-card" onclick="navegar('aulas-gramatica')">
                        <div class="fc-icon">ðŸ“</div>
                        <h3>GramÃ¡tica</h3>
                        <p>Verbos, conjugaÃ§Ãµes, tempos verbais e estruturas essenciais</p>
                        <div class="fc-tag">320 aulas</div>
                    </div>
                    <div class="feature-card" onclick="navegar('aulas-vocabulario')">
                        <div class="fc-icon">ðŸ“–</div>
                        <h3>VocabulÃ¡rio</h3>
                        <p>Palavras por tema: casa, trabalho, natureza e muito mais</p>
                        <div class="fc-tag">280 aulas</div>
                    </div>
                    <div class="feature-card" onclick="navegar('conversacao')">
                        <div class="fc-icon">ðŸ¤–</div>
                        <h3>Chat com IA</h3>
                        <p>Converse em espanhol com nossa IA powered by Claude</p>
                        <div class="fc-tag">âˆž ilimitado</div>
                    </div>
                    <div class="feature-card" onclick="navegar('aulas-pronuncia')">
                        <div class="fc-icon">ðŸŽ™ï¸</div>
                        <h3>PronÃºncia</h3>
                        <p>Sotaque correto, fonemas e guia de letras especiais</p>
                        <div class="fc-tag">90 aulas</div>
                    </div>
                    <div class="feature-card" onclick="navegar('aulas-cultura')">
                        <div class="fc-icon">ðŸŒ</div>
                        <h3>Cultura HispÃ¢nica</h3>
                        <p>21 paÃ­ses, tradiÃ§Ãµes, mÃºsica, gastronomia e histÃ³ria</p>
                        <div class="fc-tag">150 aulas</div>
                    </div>
                    <div class="feature-card" onclick="navegar('aulas-negocios')">
                        <div class="fc-icon">ðŸ’¼</div>
                        <h3>NegÃ³cios</h3>
                        <p>Espanhol profissional, reuniÃµes, e-mails e apresentaÃ§Ãµes</p>
                        <div class="fc-tag">110 aulas</div>
                    </div>
                </div>
            </div>

            <!-- Por que espanhol -->
            <div class="section-block study-systems">
                <div class="section-header">
                    <span class="section-eyebrow">Sistemas de estudo</span>
                    <h2>Escolha como quer <span>evoluir hoje</span></h2>
                </div>
                <div class="study-grid">
                    <button class="study-card" onclick="navegar('exercicios')"><span>ðŸ§©</span><strong>Quiz com imagens</strong><small>Responda perguntas com contexto visual.</small></button>
                    <button class="study-card" onclick="navegar('digitacao')"><span>ðŸ</span><strong>Corrida de digitaÃ§Ã£o</strong><small>Digite frases completas para avanÃ§ar na pista.</small></button>
                    <button class="study-card" onclick="navegar('aulas-pronuncia')"><span>ðŸŽ™ï¸</span><strong>Treino de fala</strong><small>OuÃ§a, fale e receba avaliaÃ§Ã£o.</small></button>
                    <button class="study-card" onclick="navegar('conversacao')"><span>ðŸ’¬</span><strong>SimulaÃ§Ã£o com IA</strong><small>Pratique diÃ¡logos reais em espanhol.</small></button>
                    <button class="study-card" onclick="showToast('RevisÃ£o espaÃ§ada adicionada Ã  sua rotina!')"><span>ðŸ”</span><strong>RevisÃ£o espaÃ§ada</strong><small>Reforce pontos antes de esquecer.</small></button>
                    <button class="study-card" onclick="showToast('Modo ditado preparado para a Ã¡rea de pronÃºncia.')"><span>âœï¸</span><strong>Ditado guiado</strong><small>Escute frases e escreva em espanhol.</small></button>
                    <button class="study-card" onclick="abrirAba('perfil-metas')"><span>ðŸŽ¯</span><strong>Metas semanais</strong><small>Organize aulas, quizzes e conversas.</small></button>
                </div>
            </div>

            <div class="section-block">
                <div class="section-header">
                    <span class="section-eyebrow">MotivaÃ§Ã£o</span>
                    <h2>Por que aprender <span>espanhol</span>?</h2>
                </div>
                <div class="motivos-grid">
                    <div class="motivo-card"><span>ðŸŒ</span><h4>2Âª lÃ­ngua mais falada</h4><p>Mais de 500 milhÃµes de falantes no mundo</p></div>
                    <div class="motivo-card"><span>ðŸ’¼</span><h4>Mercado de trabalho</h4><p>Diferencial em empresas multinacionais</p></div>
                    <div class="motivo-card"><span>âœˆï¸</span><h4>21 paÃ­ses</h4><p>Viaje sem barreiras pela AmÃ©rica e Europa</p></div>
                    <div class="motivo-card"><span>ðŸ§ </span><h4>CogniÃ§Ã£o</h4><p>Bilinguismo melhora memÃ³ria e raciocÃ­nio</p></div>
                    <div class="motivo-card"><span>ðŸŽµ</span><h4>MÃºsica e cultura</h4><p>Entenda as letras do reggaeton e do flamenco</p></div>
                    <div class="motivo-card"><span>ðŸ“ˆ</span><h4>SalÃ¡rio maior</h4><p>Idioma extra pode elevar salÃ¡rios em 30%</p></div>
                </div>
            </div>
        </section>

        <!-- ===== NÃVEL A1 ===== -->
        <section class="secao" id="sec-nivel-a1">
            <div class="aula-page">
                <div class="aula-page-header a1">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">A1 â€” Iniciante</span>
                        <h2>Espanhol Iniciante</h2>
                        <p>Primeiros passos: alfabeto, saudaÃ§Ãµes, nÃºmeros e frases bÃ¡sicas</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesA1"></div>
            </div>
        </section>

        <!-- ===== NÃVEL A2 ===== -->
        <section class="secao" id="sec-nivel-a2">
            <div class="aula-page">
                <div class="aula-page-header a2">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">A2 â€” Elementar</span>
                        <h2>Espanhol Elementar</h2>
                        <p>FamÃ­lia, rotina diÃ¡ria, compras e comunicaÃ§Ã£o simples</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesA2"></div>
            </div>
        </section>

        <!-- ===== NÃVEL B1 ===== -->
        <section class="secao" id="sec-nivel-b1">
            <div class="aula-page">
                <div class="aula-page-header b1">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">B1 â€” IntermediÃ¡rio</span>
                        <h2>Espanhol IntermediÃ¡rio</h2>
                        <p>Verbos no passado e futuro, viagens e temas cotidianos</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesB1"></div>
            </div>
        </section>

        <!-- ===== NÃVEL B2 ===== -->
        <section class="secao" id="sec-nivel-b2">
            <div class="aula-page">
                <div class="aula-page-header b2">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">B2 â€” IntermediÃ¡rio Alto</span>
                        <h2>Espanhol IntermediÃ¡rio Alto</h2>
                        <p>Debate, negÃ³cios, notÃ­cias e espanhol formal</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesB2"></div>
            </div>
        </section>

        <!-- ===== NÃVEL C1 ===== -->
        <section class="secao" id="sec-nivel-c1">
            <div class="aula-page">
                <div class="aula-page-header c1">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">C1 â€” AvanÃ§ado</span>
                        <h2>Espanhol AvanÃ§ado</h2>
                        <p>Literatura, cinema, expressÃµes idiomÃ¡ticas e nuances</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesC1"></div>
            </div>
        </section>

        <!-- ===== NÃVEL C2 ===== -->
        <section class="secao" id="sec-nivel-c2">
            <div class="aula-page">
                <div class="aula-page-header c2">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div>
                        <span class="nivel-tag">C2 â€” Proficiente</span>
                        <h2>ProficiÃªncia em Espanhol</h2>
                        <p>Sotaques regionais, variaÃ§Ãµes dialectais e nÃ­vel nativo</p>
                    </div>
                </div>
                <div class="lecciones-grid" id="leccionesC2"></div>
            </div>
        </section>

        <!-- ===== AULAS POR TEMA ===== -->
        <section class="secao" id="sec-aulas-gramatica">
            <div class="aula-page">
                <div class="aula-page-header tema-g">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸ“ GramÃ¡tica</h2><p>Verbos, conjugaÃ§Ãµes e estruturas do espanhol</p></div>
                </div>
                <div class="lecciones-grid" id="leccionesGramatica"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-vocabulario">
            <div class="aula-page">
                <div class="aula-page-header tema-v">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸ“– VocabulÃ¡rio</h2><p>Palavras essenciais organizadas por tema</p></div>
                </div>
                <div class="lecciones-grid" id="leccionesVocabulario"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-pronuncia">
            <div class="aula-page">
                <div class="aula-page-header tema-p">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸŽ™ï¸ PronÃºncia</h2><p>FonÃ©tica, sotaques e guia de letras especiais</p></div>
                </div>
                <div class="pronuncia-lab">
                    <div class="pronuncia-speaker">
                        <span class="pronuncia-kicker">Frase do treino</span>
                        <h3 id="frasePronunciaDestaque">Hola, me llamo Ana y quiero aprender espaÃ±ol con confianza.</h3>
                        <button class="btn-falar-grande" onclick="iniciarReconhecimentoPronuncia()">ðŸŽ™ï¸ Clique e fale</button>
                        <small>Depois de falar, clique em avaliar para receber seu resultado.</small>
                    </div>
                    <div class="pronuncia-panel">
                        <span class="section-eyebrow">LaboratÃ³rio de fala</span>
                        <h3>Treine sua pronÃºncia com escuta, gravaÃ§Ã£o e feedback</h3>
                        <p>Escolha uma frase, ouÃ§a a voz guia, grave sua tentativa e receba uma avaliaÃ§Ã£o instantÃ¢nea.</p>
                        <div class="pronuncia-frases" id="pronunciaFrases"></div>
                    </div>
                    <div class="pronuncia-panel destaque">
                        <label for="pronunciaInput">Frase para praticar</label>
                        <textarea id="pronunciaInput" rows="3">Hola, me llamo Ana y quiero aprender espaÃ±ol con confianza.</textarea>
                        <div class="pronuncia-actions">
                            <button onclick="falarTextoPronuncia()">Ouvir guia</button>
                            <button onclick="iniciarReconhecimentoPronuncia()">Clique e fale</button>
                            <button onclick="avaliarPronuncia()">Avaliar</button>
                        </div>
                        <div class="pronuncia-result" id="pronunciaResult">Sua avaliaÃ§Ã£o aparecerÃ¡ aqui.</div>
                    </div>
                </div>
                <div class="lecciones-grid" id="lecciones-pronuncia"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-expressoes">
            <div class="aula-page">
                <div class="aula-page-header tema-e">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸ’¬ ExpressÃµes IdiomÃ¡ticas</h2><p>Fale como um nativo hispÃ¢nico</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-expressoes"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-cultura">
            <div class="aula-page">
                <div class="aula-page-header tema-c">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸŒ Cultura HispÃ¢nica</h2><p>PaÃ­ses, tradiÃ§Ãµes e costumes do mundo hispÃ¢nico</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-cultura"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-negocios">
            <div class="aula-page">
                <div class="aula-page-header tema-n">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Tema</span><h2>ðŸ’¼ Espanhol para NegÃ³cios</h2><p>VocabulÃ¡rio profissional, reuniÃµes e e-mails formais</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-negocios"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-viagem">
            <div class="aula-page">
                <div class="aula-page-header tema-vi">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Especial</span><h2>âœˆï¸ Espanhol para Viajantes</h2><p>Tudo que vocÃª precisa para viajar pelos paÃ­ses hispÃ¢nicos</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-viagem"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-musica">
            <div class="aula-page">
                <div class="aula-page-header tema-m">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Especial</span><h2>ðŸŽµ MÃºsica e Letras</h2><p>Aprenda espanhol pelas mÃºsicas mais famosas</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-musica"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-cinema">
            <div class="aula-page">
                <div class="aula-page-header tema-ci">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Especial</span><h2>ðŸŽ¬ Cinema HispÃ¢nico</h2><p>Filmes e sÃ©ries para aprender espanhol</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-cinema"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-literatura">
            <div class="aula-page">
                <div class="aula-page-header tema-l">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Especial</span><h2>ðŸ“š Literatura HispÃ¢nica</h2><p>Autores e obras clÃ¡ssicas do mundo hispanÃ³fono</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-literatura"></div>
            </div>
        </section>

        <section class="secao" id="sec-aulas-gastronomia">
            <div class="aula-page">
                <div class="aula-page-header tema-ga">
                    <button class="btn-back" onclick="navegar('inicio')">â† Voltar</button>
                    <div><span class="nivel-tag">Especial</span><h2>ðŸ½ï¸ Gastronomia</h2><p>Comida, receitas e cultura culinÃ¡ria hispÃ¢nica</p></div>
                </div>
                <div class="lecciones-grid" id="lecciones-gastronomia"></div>
            </div>
        </section>

        <!-- ===== AULA INDIVIDUAL ===== -->
        <section class="secao" id="sec-aula-view">
            <div class="aula-view-container" id="aulaViewContainer"></div>
        </section>

        <!-- ===== EXERCÃCIOS ===== -->
        <section class="secao" id="sec-exercicios">
            <div class="exercicios-page">
                <div class="exercicios-header">
                    <h2>ðŸŽ® ExercÃ­cios Interativos</h2>
                    <p>Escolha uma categoria e teste seus conhecimentos!</p>
                </div>
                <div class="ex-tabs">
                    <button class="ex-tab ativo" onclick="filtrarEx('todos',this)">Todos</button>
                    <button class="ex-tab" onclick="filtrarEx('facil',this)">ðŸŸ¢ FÃ¡cil</button>
                    <button class="ex-tab" onclick="filtrarEx('medio',this)">ðŸŸ¡ MÃ©dio</button>
                    <button class="ex-tab" onclick="filtrarEx('dificil',this)">ðŸ”´ DifÃ­cil</button>
                </div>
                <div class="ex-grid" id="exGrid"></div>
            </div>
        </section>

        <!-- ===== QUIZ ===== -->
        <section class="secao" id="sec-quiz">
            <div class="quiz-container" id="quizContainer"></div>
        </section>

        <!-- ===== CORRIDA DE DIGITAÃ‡ÃƒO ===== -->
        <section class="secao" id="sec-digitacao">
            <div class="typing-game-page">
                <div id="typingGameRoot"></div>
            </div>
        </section>

        <!-- ===== CONVERSAÃ‡ÃƒO IA ===== -->
        <section class="secao" id="sec-conversacao">
            <div class="chat-page">
                <div class="chat-sidebar">
                    <h3>ðŸ—ºï¸ TÃ³picos de Conversa</h3>
                    <div class="topicos-lista" id="topicosList"></div>
                </div>
                <div class="chat-main">
                    <div class="chat-topbar-inner">
                        <div class="chat-bot-info">
                            <div class="chat-bot-avatar">ðŸ¤–</div>
                            <div>
                                <strong>Profesora SofÃ­a</strong>
                                <small id="chatStatus">â— Online â€” IA interativa local</small>
                            </div>
                        </div>
                        <button class="btn-clear-chat" onclick="limparChat()" title="Limpar conversa">ðŸ—‘ï¸</button>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="chat-msg bot">
                            <div class="msg-avatar">ðŸ¤–</div>
                            <div class="msg-content">
                                <div class="msg-bubble">Â¡Hola! Soy la <strong>Profesora SofÃ­a</strong> ðŸŒŸ<br><br>Estou aqui para te ajudar a aprender espanhol de verdade! Posso conversar sobre qualquer assunto em espanhol, explicar gramÃ¡tica, traduzir frases, corrigir seu espanhol e muito mais.<br><br>Sobre o que vocÃª quer praticar hoje?</div>
                                <span class="msg-time">agora</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-suggestions" id="chatSuggestions">
                        <button onclick="enviarSugestao('Me ensine a me apresentar em espanhol')">Me apresentar</button>
                        <button onclick="enviarSugestao('Como conjugo verbos irregulares?')">Verbos irregulares</button>
                        <button onclick="enviarSugestao('Quais sÃ£o as diferenÃ§as entre espanhol da Espanha e do MÃ©xico?')">Dialetos</button>
                        <button onclick="enviarSugestao('Corrija meu espanhol: Yo hablar mucho')">Me corrija</button>
                        <button onclick="enviarSugestao('Ensine expressÃµes argentinas')">ExpressÃµes argentinas</button>
                        <button onclick="enviarSugestao('Como peÃ§o comida num restaurante espanhol?')">No restaurante</button>
                    </div>
                    <div class="chat-input-row">
                        <input type="text" id="chatInput" placeholder="Escreva em portuguÃªs ou espanhol..." onkeydown="if(event.key==='Enter')enviarMsg()">
                        <button class="btn-send" onclick="enviarMsg()" id="btnSend">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== RANKING ===== -->
        <section class="secao" id="sec-ranking">
            <div class="ranking-page">
                <div class="ranking-header">
                    <h2>ðŸ† Hall da Fama</h2>
                    <p>Os maiores estudiosos da plataforma</p>
                </div>
                <div class="ranking-top3" id="rankingTop3"></div>
                <div class="ranking-tabela" id="rankingTabela"></div>
                <div class="ranking-minha-pos">
                    <h3>ðŸ“ Minha PosiÃ§Ã£o</h3>
                    <div id="minhaPosicao"></div>
                </div>
            </div>
        </section>

        <!-- ===== PROFESSORES ===== -->
        <section class="secao" id="sec-professores">
            <div class="professores-page">
                <div class="section-header">
                    <span class="section-eyebrow">Nossa Equipe</span>
                    <h2>ConheÃ§a os <span>Professores</span></h2>
                </div>
                <div class="profs-grid">
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘©â€ðŸ«</div>
                        <div class="prof-country">ðŸ‡ªðŸ‡¸</div>
                        <h3>Prof.Âª MarÃ­a GonzÃ¡lez</h3>
                        <span class="prof-badge">Nativa Â· Espanha</span>
                        <p>Especialista em gramÃ¡tica e literatura espanhola. 15 anos ensinando a falantes de portuguÃªs.</p>
                        <div class="prof-skills"><span>GramÃ¡tica</span><span>Literatura</span><span>PronÃºncia</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.9/5</small></div>
                    </div>
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘¨â€ðŸ«</div>
                        <div class="prof-country">ðŸ‡²ðŸ‡½</div>
                        <h3>Prof. Carlos Mendoza</h3>
                        <span class="prof-badge">Nativo Â· MÃ©xico</span>
                        <p>Mestre em linguÃ­stica hispÃ¢nica. Especialista em espanhol latino-americano e conversaÃ§Ã£o.</p>
                        <div class="prof-skills"><span>ConversaÃ§Ã£o</span><span>VocabulÃ¡rio</span><span>Cultura</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.8/5</small></div>
                    </div>
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘©â€ðŸ’¼</div>
                        <div class="prof-country">ðŸ‡§ðŸ‡·</div>
                        <h3>Prof.Âª Ana Beatriz Silva</h3>
                        <span class="prof-badge">BilÃ­ngue Â· Brasil</span>
                        <p>Tradutora certificada. Especialista nas dificuldades dos brasileiros ao aprender espanhol.</p>
                        <div class="prof-skills"><span>Iniciantes</span><span>TraduÃ§Ã£o</span><span>NegÃ³cios</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.9/5</small></div>
                    </div>
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘¨â€ðŸ’»</div>
                        <div class="prof-country">ðŸ‡¦ðŸ‡·</div>
                        <h3>Prof. Diego RamÃ­rez</h3>
                        <span class="prof-badge">Nativo Â· Argentina</span>
                        <p>Especialista em espanhol rioplatense e cultura argentina. Professor de expressÃµes idiomÃ¡ticas.</p>
                        <div class="prof-skills"><span>ExpressÃµes</span><span>AvanÃ§ado</span><span>Cultura</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.7/5</small></div>
                    </div>
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘©â€ðŸŽ“</div>
                        <div class="prof-country">ðŸ‡¨ðŸ‡´</div>
                        <h3>Prof.Âª Valentina Ruiz</h3>
                        <span class="prof-badge">Nativa Â· ColÃ´mbia</span>
                        <p>FonoaudiÃ³loga e professora. Especialista em pronÃºncia e sotaque neutro hispÃ¢nico.</p>
                        <div class="prof-skills"><span>PronÃºncia</span><span>FonÃ©tica</span><span>Sotaque</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.8/5</small></div>
                    </div>
                    <div class="prof-card">
                        <div class="prof-photo">ðŸ‘¨â€ðŸŽ¤</div>
                        <div class="prof-country">ðŸ‡¨ðŸ‡±</div>
                        <h3>Prof. AndrÃ©s Fuentes</h3>
                        <span class="prof-badge">Nativo Â· Chile</span>
                        <p>Jornalista e professor de espanhol para negÃ³cios. Especialista em comunicaÃ§Ã£o profissional.</p>
                        <div class="prof-skills"><span>NegÃ³cios</span><span>Jornalismo</span><span>Formal</span></div>
                        <div class="prof-rating">â­â­â­â­â­ <small>4.6/5</small></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== FEEDBACKS ===== -->
        <section class="secao" id="sec-feedbacks">
            <div class="feedback-page">
                <div class="section-header">
                    <span class="section-eyebrow">Comunidade</span>
                    <h2>Feedbacks dos <span>alunos</span></h2>
                </div>
                <div class="feedback-layout">
                    <div class="feedback-list" id="feedbackList"></div>
                    <div class="feedback-form">
                        <h3>Deixe seu feedback</h3>
                        <input class="input-c" id="feedbackNome" type="text" placeholder="Seu nome">
                        <select class="input-c" id="feedbackNota">
                            <option value="5">5 estrelas</option>
                            <option value="4">4 estrelas</option>
                            <option value="3">3 estrelas</option>
                            <option value="2">2 estrelas</option>
                            <option value="1">1 estrela</option>
                        </select>
                        <textarea class="input-c" id="feedbackTexto" rows="5" placeholder="Conte o que achou da plataforma"></textarea>
                        <button class="btn-contato" onclick="enviarFeedback()">Enviar feedback</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== CONTATO ===== -->
        <section class="secao" id="sec-contato">
            <div class="contato-page">
                <div class="section-header">
                    <span class="section-eyebrow">Fale Conosco</span>
                    <h2>Entre em <span>Contato</span></h2>
                </div>
                <div class="contato-grid">
                    <div class="contato-info-bloco">
                        <h3>InformaÃ§Ãµes</h3>
                        <div class="contato-item-novo"><span>ðŸ“§</span><div><strong>Email dos administradores</strong><p>sitespanishworld@gmail.com</p></div></div>
                        <div class="contato-item-novo"><span>ðŸ“±</span><div><strong>WhatsApp</strong><p>+55 (11) 99999-0000</p></div></div>
                        <div class="contato-item-novo"><span>ðŸ“</span><div><strong>EndereÃ§o</strong><p>SÃ£o Paulo, SP â€” Brasil</p></div></div>
                        <div class="contato-item-novo"><span>â°</span><div><strong>Atendimento</strong><p>Segâ€“Sex: 8h Ã s 20h</p></div></div>
                        <h3 style="margin-top:30px">Redes Sociais</h3>
                        <div class="social-links">
                            <a class="sl insta">ðŸ“¸ Instagram</a>
                            <a class="sl youtube">â–¶ï¸ YouTube</a>
                            <a class="sl tiktok">ðŸŽµ TikTok</a>
                            <a class="sl twitter">ðŸ¦ Twitter/X</a>
                        </div>
                    </div>
                    <div class="contato-form-bloco">
                        <h3>Enviar Mensagem</h3>
                        <div class="contato-form-grid">
                            <input type="text" placeholder="Seu nome completo" class="input-c" id="contatoNome">
                            <input type="email" placeholder="Seu email" class="input-c" id="contatoEmail">
                            <select class="input-c" id="contatoAssunto">
                                <option>Selecione o assunto...</option>
                                <option>DÃºvida sobre conteÃºdo</option>
                                <option>Problema tÃ©cnico</option>
                                <option>SugestÃ£o</option>
                                <option>Parceria</option>
                                <option>Outro</option>
                            </select>
                            <textarea placeholder="Sua mensagem..." class="input-c" rows="5" style="grid-column:1/-1;resize:vertical" id="contatoMensagem"></textarea>
                            <button class="btn-contato" style="grid-column:1/-1" onclick="enviarContato()">ðŸ“¤ Enviar Mensagem</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main><!-- /main-content -->
</div><!-- /site -->

<!-- ===== MODAL AULA ===== -->
<div id="modalAula" class="modal-aula oculto">
    <div class="modal-aula-inner">
        <button class="modal-aula-close" onclick="fecharModalAula()">âœ•</button>
        <div id="modalAulaContent"></div>
    </div>
</div>

<!-- ===== TOAST ===== -->
<div id="toast" class="toast oculto"></div>

<!-- ===== MASCOTE ===== -->
<div id="mascote" class="mascote oculto">
    <span class="mascote-emoji">ðŸ¦‰</span>
    <p id="mascoteMsg">Â¡Buena suerte!</p>
    <button onclick="fecharMascote()">âœ•</button>
</div>

`;

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
      <Script src="/spanish-world.js" strategy="afterInteractive" />
    </>
  );
}

