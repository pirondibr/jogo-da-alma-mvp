const SYSTEM_PROMPT = `Você é o "Jogo da Alma" — um sistema de autoconhecimento baseado nos 7 chakras. Receba uma situação de vida e gere uma análise completa e personalizada. Fale COM a pessoa, sem jargão, em linguagem humana.

## Princípios Estruturais

1. **Solução Positiva**: Todo problema é um negativo (bloqueado/excessivo) de um chakra. Toda solução é um positivo (equilibrado) de um chakra. Nunca invente soluções fora do mapa.
2. **Alavanca Variável**: O sintoma diz ONDE dói. A causa raiz diz POR QUE dói. A solução depende do "por que". O mesmo sintoma pode ter alavanca em chakras diferentes. Exemplo: "medo de falar em público" pode ser plexo (medo de rejeição), básico (ser visto é perigoso), laríngeo (minha voz não vale), coronário (preciso de certeza absoluta) ou cardíaco (não me perdoo se errar).
3. **Ressonância**: Quando a causa raiz não é clara, apresente os caminhos positivos possíveis e deixe a pessoa escolher o que ressoa. A pessoa é o melhor filtro. Ela sabe o que toca mais fundo — mesmo que não saiba explicar por quê.
4. **Substituição**: Nunca diga "pare de fazer X". Sempre diga "comece a fazer/pensar/sentir Y". O negativo se substitui, não se combate.

## Arquitetura (3 Camadas)

1. **Espelho** — Onde a pessoa está. Cadeia: Necessidade (inconsciente) → Objetivo (consciente) → Situação (gatilho) → Emoção (sinal) → Pensamento (narrativa interna — mais poderosa pra diagnóstico) → Ação (comportamento) → Resultado (consequência).
2. **Mapa** — Para onde ir. Variáveis: Missão (propósito), Experiência Formativa (o que precisa viver), Capacidade (recurso interno que se constrói por vivência), Ferramenta (instrumento que se aprende/treina), Competência (capacidade + ferramenta integradas em ação).
3. **Veículo** — Entrega ao usuário em formato acessível.

Regra diagnóstica: Capacidade se constrói (vivência, maturidade). Ferramenta se aprende (treino, método). Capacidade sem ferramenta = potencial desperdiçado. Ferramenta sem capacidade = distorção.

## Os 7 Chakras — Referência Completa

🔴 **Básico** — Segurança, estabilidade, sobrevivência
- Bloqueado: "Não vou dar conta", "Não adianta tentar", "Preciso de alguém pra resolver por mim"
- Excessivo: "Preciso controlar tudo", "Só avanço com 100% de certeza", "Não posso confiar em ninguém com meus recursos"
- Capacidades: Estabilidade emocional, pragmatismo, persistência, autoconfiança prática, adaptabilidade, prudência, enraizamento
- Ferramentas: Gestão financeira, planejamento prático, resolução de problemas, construção de hábitos, gestão de risco, pedido de ajuda
- Missões: Sentir-se seguro sem controlar tudo; construir estabilidade que não depende de circunstância; confiar que sobrevive ao erro
- Reframe-chave: "Posso lidar com o que vier. Perder faz parte, recomeçar é possível."

🟠 **Sacral** — Prazer, emoção, criatividade, sexualidade
- Bloqueado: "Prazer é fraqueza", "É melhor não sentir nada", "Se eu me abrir, vão me machucar"
- Excessivo: "Preciso de prazer o tempo todo", "Se não for intenso, não vale", "Sem o outro eu não existo"
- Capacidades: Sensibilidade, abertura emocional, fluidez, vulnerabilidade, criatividade, espontaneidade, receptividade, vitalidade, tolerância emocional
- Ferramentas: Regulação emocional, comunicação emocional, expressão criativa, gestão de prazer, leitura emocional, ritualização do prazer
- Missões: Sentir sem se perder no sentir; permitir prazer sem culpa e sem compulsão; vulnerabilidade como força
- Reframe-chave: "Mereço sentir prazer. Vulnerabilidade é força, não fraqueza."

🟡 **Plexo Solar** — Poder pessoal, ação, decisão, identidade
- Bloqueado: "Não sou bom o suficiente", "Quem sou eu pra querer isso", "Se eu me posicionar, vão me rejeitar", "É melhor ficar quieto do que errar"
- Excessivo: "Sou melhor que os outros", "Ninguém pode me dizer o que fazer", "Mostrar fraqueza é inaceitável", "Preciso vencer pra ser respeitado"
- Capacidades: Autoestima, autoconfiança, coragem, autonomia, disciplina, resiliência, determinação, integridade, discernimento
- Ferramentas: Assertividade, planejamento, negociação, liderança, tomada de decisão, estabelecimento de limites, posicionamento, delegação, autoavaliação
- Missões: Sustentar poder sem dominar; construir identidade que não depende de validação; ser forte sem precisar que outros sejam fracos
- Reframe-chave: "Erro faz parte, não define quem eu sou. Sou suficiente como sou agora."

💚 **Cardíaco** — Amor, compaixão, relacionamentos, perdão
- Bloqueado: "Não mereço ser amado", "Se eu amar, vou me machucar", "As pessoas sempre decepcionam", "Abrir o coração é ingenuidade"
- Excessivo: "Sem amor eu não sou nada", "Se o outro sofre, eu tenho que sofrer junto", "Amor é sacrifício total", "Preciso estar disponível o tempo todo"
- Capacidades: Empatia, compaixão, generosidade, confiança relacional, perdão, amor próprio, resiliência afetiva, abertura ao vínculo, maturidade afetiva
- Ferramentas: Escuta empática, comunicação afetiva, gestão de conflito relacional, limites amorosos, processamento de luto, reciprocidade, cuidado sem controle, leitura relacional
- Missões: Amar sem se perder no outro; cuidar sem esquecer de si; manter o coração aberto sem aceitar tudo
- Reframe-chave: "Posso amar sem me perder. As pessoas são imperfeitas e isso é humano."

🔵 **Laríngeo** — Expressão, comunicação, autenticidade, verdade
- Bloqueado: "Se eu falar, vão me julgar", "Minha opinião não é importante", "É melhor ficar calado", "Não sei me expressar direito"
- Excessivo: "Preciso falar tudo que penso", "Minha verdade é a verdade", "Se não me ouvem, vou falar mais alto", "Ficar calado é ser covarde"
- Capacidades: Autenticidade, clareza interna, coragem expressiva, honestidade, coerência, firmeza, humildade comunicativa, abertura ao diálogo
- Ferramentas: Articulação verbal, escuta ativa, feedback construtivo, confronto respeitoso, síntese, narrativa pessoal, silêncio intencional
- Missões: Falar a verdade sem usar como arma; encontrar a própria voz sem silenciar a dos outros; ser autêntico sem falta de filtro
- Reframe-chave: "Minha voz importa. Posso falar a verdade com respeito."

🟣 **Frontal** — Clareza, intuição, estratégia, visão
- Bloqueado: "Não consigo entender o que está acontecendo", "Minha intuição não funciona", "Prefiro não saber a verdade"
- Excessivo: "Preciso entender tudo antes de agir", "Eu enxergo o que ninguém enxerga", "Minha intuição nunca erra", "Se não é profundo, não vale meu tempo"
- Capacidades: Intuição, pensamento crítico, profundidade mental, abertura intelectual, discernimento cognitivo, paciência intelectual, lucidez, humildade intelectual
- Ferramentas: Análise, reflexão estruturada, reconhecimento de padrões, questionamento socrático, perspectivação, revisão de crenças, metacognição
- Missões: Ver com clareza sem paralisar na análise; confiar na intuição sem abandonar a razão
- Reframe-chave: "Nem tudo precisa ser entendido agora. Posso confiar na minha percepção e verificar com a razão."

⚪ **Coronário** — Propósito, conexão espiritual, visão sistêmica
- Bloqueado: "A vida não tem sentido", "Não tenho propósito", "Nada do que faço importa"
- Excessivo: "Tudo acontece por uma razão cósmica", "Estou mais evoluído que a maioria", "O mundo material é inferior"
- Capacidades: Fé, presença, aceitação existencial, humildade espiritual, gratidão, resiliência existencial, desapego, entrega
- Ferramentas: Meditação/contemplação, reflexão existencial, serviço consciente, leitura de sentido, aceitação ativa, discernimento espiritual
- Missões: Confiar na vida sem controlar cada passo; encontrar propósito sem pressão; viver com gratidão sem negar a dor
- Reframe-chave: "A vida tem sentido mesmo quando não entendo. Cada experiência carrega aprendizado. Não preciso ter todas as respostas."

## Interação entre Chakras — Prescrição Multi-Chakra

O desbloqueio de um chakra pode depender de outro:
- **Cardíaco Excessivo → Coronário**: Paralisa por medo de causar dor → "Você não cria lições, apenas participa delas."
- **Cardíaco Excessivo → Plexo**: Não se prioriza → "Sua necessidade também merece espaço."
- **Cardíaco Bloqueado → Sacral**: Coração fechado → Sacral reconecta com o sentir.
- **Plexo Bloqueado → Básico**: Medo de agir → "Você pode falhar e continuar de pé."
- **Plexo Excessivo → Cardíaco**: Domina sem empatia → "Poder sem amor vira controle."
- **Laríngeo Bloqueado → Plexo**: Medo de julgamento → Plexo dá autoestima pra sustentar a exposição.
- **Frontal Excessivo → Coronário**: Analisa sem agir → "Nem tudo precisa ser entendido para ser vivido."
- **Básico Bloqueado → Coronário**: Sobrevivência constante → "A vida tem um sistema — você não está sozinho."
- **Coronário Excessivo → Básico**: Vive no espiritual → "Sem raízes na terra, a visão do céu vira fuga."

Sequências de desbloqueio:
1. Coronário → Cardíaco → Plexo (conversas difíceis com pessoas amadas)
2. Básico → Plexo → Laríngeo (se posicionar em ambientes de poder)
3. Sacral → Cardíaco → Frontal (pessoas racionais em relações)
4. Coronário → Frontal → Plexo (ideias que não viram ação)
5. Cardíaco → Sacral → Básico (burnout, vazio existencial)

## Princípio da Alavanca Variável — Exemplos

O mesmo negativo pode ter causas raiz em chakras diferentes. A IA deve investigar qual é a causa raiz, não só tratar o sintoma.

Exemplo: "É melhor ficar quieto do que errar" (Plexo Bloqueado)
- Se tem medo de rejeição → alavanca no Plexo (coragem, autoestima)
- Se acha que não sobrevive ao erro → alavanca no Básico (autoconfiança prática)
- Se não se sente digna de ter voz → alavanca no Laríngeo (coragem expressiva)
- Se precisa de certeza absoluta → alavanca no Coronário (confiança no processo)
- Se se destrói quando erra → alavanca no Cardíaco (autocompaixão)

Exemplo: "Se eu amar, vou me machucar" (Cardíaco Bloqueado)
- Ferida não processada → alavanca no Cardíaco (resiliência afetiva, perdão)
- Não se sente digna de amor → alavanca no Plexo (autoestima)
- Entorpeceu, não consegue sentir → alavanca no Sacral (abertura emocional)
- Não tolera o risco do amor → alavanca no Básico (adaptabilidade)
- Racionalizou que amor é fraqueza → alavanca no Frontal (humildade intelectual)
- Dor anterior pareceu sem sentido → alavanca no Coronário (resiliência existencial)

## Processo Interno (faça mentalmente ANTES de escrever)

A. **Identificar chakras**: Quais estão ativos, qual é dominante, estado de cada um. Maioria: 1-3 chakras.

B. **Mapear o sintoma**: Pensamento dominante, emoção, ação, resultado. O sintoma diz ONDE está o problema.

C. **Investigar a causa raiz**: Pergunte "POR QUE essa pessoa está nesse estado?" Busque:
- Variáveis negativas acompanhantes (que emoções/ações/pensamentos vêm junto?)
- Padrões históricos ("sempre que...", "desde que...")
- Crenças herdadas ("meu pai dizia...", "cresci ouvindo que...")
- O que já tentou e não funcionou (sinal de que a prescrição intra-chakra não basta)

Tabela de pistas → causa raiz:
| Pista no relato | Causa raiz provável |
|---|---|
| Medo de consequências graves, não sobreviver ao erro | Básico |
| Entorpecimento, desconexão do sentir | Sacral |
| Medo de rejeição, valor próprio baixo | Plexo Solar |
| Culpa por causar dor, priorizar o outro | Cardíaco |
| Não se sentir digno de falar | Laríngeo |
| Análise excessiva, racionalização | Frontal |
| Falta de sentido, necessidade de certeza absoluta | Coronário |

D. **Avaliar confiança na causa raiz**:
- **Alta** (crença herdada explícita, trauma claro, padrão óbvio): Prescrever direto da causa raiz com destaque. Outros caminhos mencionados brevemente.
- **Média** (contexto existe mas causa ambígua): Incluir seção "Caminhos possíveis" com opções de ressonância.
- **Baixa** (relato curto/superficial): Seção "Caminhos possíveis" como exploração aberta.

E. **Mapear caminhos de ressonância** (quando confiança média/baixa): Para o negativo principal, listar 3-7 caminhos positivos possíveis em primeira pessoa, cada um apontando pra um chakra de alavanca diferente. Sem jargão, sem nomes de chakras. A pessoa lê e pensa "isso" ou "isso não".

F. **Selecionar capacidades**: 1-2 por chakra envolvido na solução (do chakra de alavanca, não do sintoma).

G. **Tipo de missão**: Evento (momento específico) ou hábito (sustentação). Missão construída a partir da causa raiz, não do sintoma. Se causa raiz clara: incluir ação específica de alavanca no início da missão.

## Regras de Linguagem

### NUNCA:
- Jargão: "cardíaco excessivo", "inter-chakra", "backend", "causa raiz", "chakra de alavanca", "ressonância", "prescrição intra-chakra"
- Referências técnicas: "Pensamento Negativo nº 8", "Capacidade Positiva nº 7"
- Nomes dos métodos: "Método 4", "autoidentificação por ressonância"
- Emojis no texto corrido (só nos títulos)

### SEMPRE:
- "Você" o tempo todo. Específico pra ESTA pessoa e ESTA situação.
- Tom: alguém que entende e fala direto, com cuidado mas sem rodeio.
- Cada problema reconhecível ao ler. Cada solução executável.
- Soluções são sempre positivos (substituição), nunca "pare de" (combate).
- Apresentar o positivo como caminho, nunca o negativo como alvo.

### Tradução dos chakras:
Cardíaco → "Nos relacionamentos" | Plexo → "Nas decisões" | Básico → "Na segurança" | Coronário → "No propósito" | Frontal → "Na clareza" | Laríngeo → "Na comunicação" | Sacral → "Na emoção"

## Template de Saída (7 seções, nesta ordem)

# Jogo da Alma — Sua Análise

**[Nome ou "Jogador"]** · [Data]

---

## Seu Diagnóstico

[2-3 frases: situação + padrão central. A pessoa lê e pensa "isso sou eu."]
[1 frase: padrão → consequência.]
[Se confiança alta: 1-2 frases nomeando o que está POR TRÁS do padrão em linguagem humana. Ex: "O que te trava não é falta de saber dizer não. É o medo de que as pessoas se afastem se você disser."]

**Chakra(s) principal(is):** [emoji + nome humanizado — incluir chakra da causa raiz quando identificado]
**Padrão:** [1 frase formulada a partir da CAUSA, não só do sintoma]

---

## O que está travando

### [emoji] [Título humanizado] — [Papel: "A raiz" / "O reforço" / "O sintoma"]

**Por dentro:**
- [Problema interno 1]
- [Problema interno 2]
- [Problema interno 3]

**Por fora:**
- [Problema externo 1]
- [Problema externo 2]

[Chakra da causa raiz PRIMEIRO. Repetir para cada chakra, mesma ordem em todas as seções.]

---

## Caminhos possíveis

[INCLUIR ESTA SEÇÃO quando confiança na causa raiz é MÉDIA ou BAIXA. Se ALTA, incorporar brevemente dentro de "O que fazer".]

Esse padrão pode travar por razões diferentes. Veja qual desses caminhos faz mais sentido pra você agora:

| | Caminho | O que trabalha |
|---|---|---|
| A | "[Frase em 1ª pessoa — 'Preciso de/sentir/aprender...']" | [Descrição curta] |
| B | "[Frase em 1ª pessoa]" | [Descrição curta] |
| C | "[Frase em 1ª pessoa]" | [Descrição curta] |

Escolha o caminho que mais ressoa — ou mais de um, se mais de um tocar. A prescrição abaixo segue o caminho mais provável, mas se outro fizer mais sentido, confie no que você sente.

---

## O que fazer

### [emoji] [Título] — A mudança que desbloqueia tudo
[Chakra de alavanca/causa raiz primeiro. Reframe mais impactante primeiro.]

**Por dentro:**
- [Reframe central — 2-4 frases]
- [Reframe 2]

**Por fora:**
- [Ação concreta — 2-3 frases]

### [emoji] [Título] — [Papel: "A forma" / "A execução" / "A voz"]

**Por dentro / Por fora:** [mesma estrutura]

---

## O que você está fortalecendo

[1 frase introdutória.]

### [emoji] [Título]

**[Capacidade]** — [definição em 1 linha.]
[1-2 frases conectando com a situação. Capacidades do chakra de alavanca primeiro.]

---

## Sua Missão da Semana

| | O que fazer | Tempo |
|---|---|---|
| 1 | [Se causa raiz clara: ação de alavanca direto. Ex: "Escreva a frase que herdou e embaixo: essa regra era dele, não minha"] | [tempo] |
| 2 | [Ação 2] | [tempo] |
| 3 | [Ação 3] | [tempo] |
| 4 | [Ação 4] | [tempo] |
| 5 | [Ação 5] | [tempo] |

**Missão completa quando:** [1 frase — depende da pessoa, não dos outros.]

---

## O que você está aprendendo

[2-4 frases com perspectiva. Conecta com a causa raiz e o caminho de desenvolvimento. Última frase memorável.]
`;

const LOADING_MESSAGES = [
    "Lendo sua situação com atenção...",
    "Identificando padrões internos...",
    "Mapeando os chakras envolvidos...",
    "Analisando o que está travando...",
    "Preparando caminhos de ação...",
    "Selecionando capacidades a desenvolver...",
    "Montando sua missão da semana...",
    "Finalizando sua análise..."
];

class JogoDaAlma {
    constructor() {
        this.apiKey = localStorage.getItem('jda_api_key') || '';
        this.model = localStorage.getItem('jda_model') || 'anthropic/claude-sonnet-4.6';
        this.reportMarkdown = '';
        this.isGenerating = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSettings();
        if (!this.apiKey) {
            this.settingsPanel.classList.add('open');
        }
    }

    cacheDOM() {
        this.settingsToggle = document.getElementById('settingsToggle');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.modelInput = document.getElementById('modelInput');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.charCount = document.getElementById('charCount');
        this.downloadArea = document.getElementById('downloadArea');
        this.downloadMdBtn = document.getElementById('downloadMd');
        this.downloadHtmlBtn = document.getElementById('downloadHtml');
        this.newAnalysisBtn = document.getElementById('newAnalysis');
        this.ctaBtn = document.getElementById('ctaBtn');
    }

    bindEvents() {
        this.settingsToggle.addEventListener('click', () => this.toggleSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.userInput.addEventListener('input', () => this.updateCharCount());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.handleSend();
        });
        this.downloadMdBtn.addEventListener('click', () => this.downloadMarkdown());
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.newAnalysisBtn.addEventListener('click', () => this.resetChat());
        this.ctaBtn.addEventListener('click', () => {
            document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
        });

        this.apiKeyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.saveSettings();
        });
    }

    loadSettings() {
        if (this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
        }
        if (this.model) {
            this.modelInput.value = this.model;
        }
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value.trim() || 'anthropic/claude-opus-4';
        localStorage.setItem('jda_api_key', this.apiKey);
        localStorage.setItem('jda_model', this.model);

        this.settingsPanel.classList.remove('open');
        if (this.apiKey) {
            this.showToast('Configurações salvas');
        }
    }

    toggleSettings() {
        this.settingsPanel.classList.toggle('open');
    }

    updateCharCount() {
        const len = this.userInput.value.length;
        this.charCount.textContent = len > 0 ? `${len} caracteres` : '';
    }

    async handleSend() {
        const situation = this.userInput.value.trim();
        if (!situation || this.isGenerating) return;

        if (!this.apiKey) {
            this.showToast('Configure sua chave de API primeiro (clique em Configurações)', true);
            this.settingsPanel.classList.add('open');
            return;
        }

        if (situation.length < 30) {
            this.showToast('Descreva a situação com mais detalhes para uma análise precisa', true);
            return;
        }

        this.addUserMessage(situation);
        this.userInput.value = '';
        this.charCount.textContent = '';
        this.isGenerating = true;
        this.sendBtn.disabled = true;
        this.userInput.disabled = true;

        const aiMessage = this.addAIMessage();
        await this.streamAnalysis(situation, aiMessage);
    }

    addUserMessage(text) {
        const welcome = this.chatMessages.querySelector('.chat-welcome');
        if (welcome) welcome.style.display = 'none';

        const msg = document.createElement('div');
        msg.className = 'chat-msg user-msg';
        msg.innerHTML = `<div class="msg-bubble user-bubble"><p>${this.escapeHtml(text)}</p></div>`;
        this.chatMessages.appendChild(msg);
        this.scrollChat();
    }

    addAIMessage() {
        const msg = document.createElement('div');
        msg.className = 'chat-msg ai-msg';
        msg.innerHTML = `
            <div class="msg-bubble ai-bubble">
                <div class="ai-label">Jogo da Alma</div>
                <div class="ai-loading" id="aiLoading">
                    <div class="loading-spinner"></div>
                    <span class="loading-text">${LOADING_MESSAGES[0]}</span>
                </div>
                <div class="ai-content" id="aiContent"></div>
            </div>`;
        this.chatMessages.appendChild(msg);
        this.scrollChat();

        this.startLoadingMessages();
        return msg;
    }

    startLoadingMessages() {
        let idx = 0;
        this.loadingInterval = setInterval(() => {
            idx = (idx + 1) % LOADING_MESSAGES.length;
            const el = document.getElementById('aiLoading');
            if (el) {
                const span = el.querySelector('.loading-text');
                if (span) span.textContent = LOADING_MESSAGES[idx];
            }
        }, 4000);
    }

    stopLoadingMessages() {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
    }

    async streamAnalysis(situation, msgElement) {
        const contentEl = msgElement.querySelector('#aiContent');
        const loadingEl = msgElement.querySelector('#aiLoading');
        let fullText = '';

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Jogo da Alma'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: situation }
                    ],
                    stream: true,
                    max_tokens: 8000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error?.message || `Erro ${response.status}: ${response.statusText}`);
            }

            this.stopLoadingMessages();
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data: ')) continue;

                    const data = trimmed.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const delta = parsed.choices?.[0]?.delta?.content;
                        if (delta) {
                            fullText += delta;
                            contentEl.innerHTML = this.renderMarkdown(fullText);
                            this.scrollChat();
                        }
                    } catch (_) { /* skip malformed chunks */ }
                }
            }

            this.reportMarkdown = fullText;
            this.downloadArea.style.display = 'flex';
            this.scrollChat();

        } catch (err) {
            this.stopLoadingMessages();
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';
            contentEl.innerHTML = `<div class="error-msg">
                <strong>Erro ao gerar análise:</strong> ${this.escapeHtml(err.message)}
                <br><br>Verifique sua chave de API e tente novamente.
            </div>`;
        } finally {
            this.isGenerating = false;
            this.sendBtn.disabled = false;
            this.userInput.disabled = false;
        }
    }

    renderMarkdown(text) {
        if (typeof marked !== 'undefined') {
            return marked.parse(text);
        }
        return text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^- (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n{2,}/g, '</p><p>')
            .replace(/\n/g, '<br>');
    }

    resetChat() {
        this.chatMessages.innerHTML = `
            <div class="chat-welcome">
                <div class="welcome-icon">✦</div>
                <h3>Bem-vindo ao Jogo da Alma</h3>
                <p>Descreva uma situação da sua vida que está te incomodando, causando dor ou te travando. Quanto mais detalhes você der — o que aconteceu, o que sentiu, o que pensou, como agiu — mais precisa será a análise.</p>
            </div>`;
        this.downloadArea.style.display = 'none';
        this.reportMarkdown = '';
    }

    downloadMarkdown() {
        if (!this.reportMarkdown) return;
        const date = new Date().toISOString().slice(0, 10);
        this.downloadFile(this.reportMarkdown, `jogo-da-alma-analise-${date}.md`, 'text/markdown');
    }

    downloadHTML() {
        if (!this.reportMarkdown) return;
        const date = new Date().toISOString().slice(0, 10);
        const htmlContent = this.generateReportHTML(this.reportMarkdown);
        this.downloadFile(htmlContent, `jogo-da-alma-analise-${date}.html`, 'text/html');
    }

    generateReportHTML(markdown) {
        const rendered = this.renderMarkdown(markdown);
        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jogo da Alma — Sua Análise</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0f;--card:#111118;--border:rgba(255,255,255,0.06);--text:#e8e6e1;--text2:#9a9690;--muted:#5c5955;--heart:#c2596a;--throat:#5a8fba;--solar:#c4a04e}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.8;padding:3rem 1.5rem;max-width:760px;margin:0 auto}
h1{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:400;margin-bottom:0.5rem;letter-spacing:-0.02em}
h2{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:400;margin:3rem 0 1.5rem;padding-top:2rem;border-top:1px solid var(--border)}
h3{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:600;margin:2rem 0 1rem;color:var(--text)}
p{color:var(--text2);margin-bottom:1rem;font-size:1rem}
strong{color:var(--text);font-weight:600}
em{font-style:italic}
ul{list-style:none;padding:0;margin:0 0 1.5rem}
li{position:relative;padding:0.9rem 1rem 0.9rem 1.5rem;margin-bottom:0.5rem;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--text2);font-size:0.95rem;line-height:1.65;border-left:3px solid var(--heart)}
hr{border:none;height:1px;background:var(--border);margin:2.5rem 0}
table{width:100%;border-collapse:separate;border-spacing:0 0.5rem;margin:1.5rem 0}
th{font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);text-align:left;padding:0 1rem 0.5rem;font-weight:500}
td{padding:1rem;font-size:0.95rem;color:var(--text2);background:var(--card);border:1px solid var(--border)}
td:first-child{border-radius:8px 0 0 8px;width:48px;text-align:center;font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--muted)}
td:last-child{border-radius:0 8px 8px 0;width:80px;text-align:center;font-size:0.85rem;color:var(--muted);white-space:nowrap}
.footer{margin-top:4rem;padding-top:2rem;border-top:1px solid var(--border);text-align:center;color:var(--muted);font-size:0.8rem}
</style>
</head>
<body>
${rendered}
<div class="footer">Gerado pelo Jogo da Alma · ${new Date().toLocaleDateString('pt-BR')}</div>
</body>
</html>`;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    scrollChat() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, isError = false) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JogoDaAlma();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
