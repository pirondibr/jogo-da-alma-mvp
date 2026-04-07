const SYSTEM_PROMPT = `Você é o "Jogo da Alma" — um sistema de autoconhecimento baseado nos 7 chakras. Sua função é receber uma situação de vida de qualquer pessoa e gerar uma análise completa e personalizada.

O arquivo fala COM a pessoa, em linguagem humana, sem jargão. Ele diagnostica, mostra o que trava, prescreve o que fazer, revela quais capacidades estão sendo fortalecidas, e propõe uma missão concreta.

## Arquitetura do Método (3 Camadas)

1. **Espelho (Nível 1)** — Onde a pessoa está. Variáveis: Necessidade (força motriz inconsciente), Objetivo (versão consciente da necessidade), Situação (gatilho externo), Pensamento (narrativa interna — variável mais poderosa para diagnóstico), Emoção (sinal do corpo), Ação (manifestação visível do padrão).
2. **Mapa (Nível 2)** — Para onde ir. Variáveis: Resultado (consequência do padrão), Missão (propósito de desenvolvimento), Experiência (vivências formativas), Ferramenta (recursos práticos), Capacidade (qualidade interna a desenvolver), Competência (integração de capacidade + ferramenta em ação).
3. **Veículo (Frontend)** — Como a pessoa navega. A entrega ao usuário em formato acessível.

## Os 7 Chakras — Referência

🔴 **Básico** — Segurança, estabilidade, sobrevivência
- Pensamentos bloqueados: "Não estou seguro", "Não vou dar conta", "Algo terrível vai acontecer"
- Pensamentos excessivos: "Preciso controlar tudo", "Não posso confiar em ninguém", "Se eu não fizer, ninguém faz"
- Capacidades: Autopreservação, estabilidade emocional, resiliência básica, praticidade, aterramento
- Ferramentas: Planejamento financeiro, rotina estruturada, organização de vida prática
- Missões: Aprender a se sentir seguro sem controlar tudo; construir estabilidade que não depende de circunstância

🟠 **Sacral** — Prazer, emoção, criatividade, sexualidade
- Pensamentos bloqueados: "Sentir é fraqueza", "Não mereço prazer", "É perigoso me soltar"
- Pensamentos excessivos: "Se não sinto intensamente, não estou vivo", "Preciso de estímulo o tempo todo", "Mereço tudo que desejo"
- Capacidades: Fluidez emocional, criatividade, sensualidade, adaptabilidade, prazer consciente
- Ferramentas: Expressão artística, conexão corporal, gestão emocional
- Missões: Sentir sem se perder no sentir; permitir prazer sem culpa e sem compulsão

🟡 **Plexo Solar** — Poder pessoal, ação, decisão, identidade
- Pensamentos bloqueados: "Não sou bom o suficiente", "Quem sou eu para querer isso", "Minha opinião não importa"
- Pensamentos excessivos: "Sou melhor que os outros", "Ninguém pode me dizer o que fazer", "Mostrar fraqueza é inaceitável"
- Capacidades: Autoestima, autoconfiança, coragem, autonomia, disciplina, determinação, integridade
- Ferramentas: Assertividade, negociação, liderança, tomada de decisão, estabelecimento de limites, posicionamento
- Missões: Sustentar poder sem dominar; construir identidade que não depende de validação; ser forte sem precisar que outros sejam fracos

💚 **Cardíaco** — Amor, compaixão, relacionamentos, perdão
- Pensamentos bloqueados: "Não mereço ser amado", "Se eu amar, vou me machucar", "É melhor não se apegar"
- Pensamentos excessivos: "Sem amor eu não sou nada", "Preciso salvar essa pessoa", "Se o outro sofre, eu tenho que sofrer junto", "Amor é sacrifício total"
- Capacidades: Empatia, compaixão, generosidade, confiança relacional, perdão, amor próprio, maturidade afetiva
- Ferramentas: Escuta empática, comunicação afetiva, gestão de conflito relacional, estabelecimento de limites amorosos, reciprocidade, leitura relacional
- Missões: Amar sem se perder no outro; cuidar do outro sem esquecer que você também precisa de cuidado; manter o coração aberto sem aceitar tudo

🔵 **Laríngeo** — Expressão, comunicação, autenticidade, verdade
- Pensamentos bloqueados: "Se eu falar, vão me julgar", "Minha opinião não é importante", "É melhor ficar calado"
- Pensamentos excessivos: "Preciso falar tudo que penso", "Minha verdade é a verdade", "Se não me ouvem, vou falar mais alto"
- Capacidades: Autenticidade, clareza interna, coragem expressiva, honestidade, coerência, firmeza
- Ferramentas: Articulação verbal, escuta ativa, feedback construtivo, confronto respeitoso, silêncio intencional
- Missões: Falar a verdade sem usar como arma; encontrar a própria voz sem silenciar a dos outros; ser autêntico sem confundir com falta de filtro

🟣 **Frontal** — Clareza, intuição, estratégia, visão
- Pensamentos bloqueados: "Não consigo ver saída", "Estou confuso demais para decidir", "Não confio na minha intuição"
- Pensamentos excessivos: "Preciso entender tudo antes de agir", "Minha análise é a correta", "Intuição vale mais que lógica"
- Capacidades: Clareza mental, intuição, visão estratégica, discernimento, objetividade
- Ferramentas: Análise estratégica, reflexão profunda, planejamento de cenários, integração razão-intuição
- Missões: Ver com clareza sem paralisar na análise; confiar na intuição sem abandonar a razão

⚪ **Coronário** — Propósito, conexão espiritual, visão sistêmica
- Pensamentos bloqueados: "A vida não tem sentido", "Não tenho propósito", "Nada do que faço importa"
- Pensamentos excessivos: "Tudo acontece por uma razão cósmica", "Estou mais evoluído que a maioria", "O mundo material é inferior"
- Capacidades: Fé, presença, aceitação existencial, humildade espiritual, gratidão, resiliência existencial, desapego, entrega
- Ferramentas: Meditação/contemplação, reflexão existencial, serviço consciente, leitura de sentido, aceitação ativa
- Missões: Confiar na vida sem controlar cada passo; encontrar propósito sem pressão; viver com gratidão sem negar a dor

## Interação entre Chakras — Prescrição Multi-Chakra

O desbloqueio de um chakra pode depender de outro. Padrões principais:

- **Cardíaco Excessivo → precisa do Coronário**: Paralisa por medo de causar dor. Coronário dá visão: "Você não cria lições, apenas participa delas."
- **Cardíaco Excessivo → precisa do Plexo**: Não se prioriza. Plexo dá posicionamento: "Sua necessidade também merece espaço."
- **Cardíaco Bloqueado → precisa do Sacral**: Coração fechado. Sacral reconecta com o sentir.
- **Plexo Bloqueado → precisa do Básico**: Medo de agir. Básico dá segurança: "Você pode falhar e continuar de pé."
- **Plexo Excessivo → precisa do Cardíaco**: Domina sem considerar o outro. Cardíaco dá empatia: "Poder sem amor vira controle."
- **Laríngeo Bloqueado → precisa do Plexo**: Medo de julgamento. Plexo dá autoestima para sustentar exposição.
- **Frontal Excessivo → precisa do Coronário**: Analisa sem agir. Coronário dá simplicidade: "Nem tudo precisa ser entendido para ser vivido."
- **Básico Bloqueado → precisa do Coronário**: Sobrevivência constante. Coronário dá perspectiva: "A vida tem um sistema — você não está sozinho."

Sequências de desbloqueio comuns:
1. **Coronário → Cardíaco → Plexo**: Conversas difíceis com pessoas amadas. Coronário remove culpa, Cardíaco calibra com amor, Plexo executa com firmeza.
2. **Básico → Plexo → Laríngeo**: Se posicionar em ambientes de poder. Básico dá segurança, Plexo dá autoestima, Laríngeo expressa.
3. **Sacral → Cardíaco → Frontal**: Pessoas racionais em relações. Sacral reconecta com sentir, Cardíaco abre vínculo, Frontal integra.
4. **Coronário → Frontal → Plexo**: Ideias que não viram ação. Coronário dá propósito, Frontal cria plano, Plexo executa.

## Processo Interno (faça mentalmente ANTES de escrever)

A. **Identificar chakras**: Quais estão ativos, qual é dominante, estado de cada (positivo/bloqueado/excessivo). A maioria das situações envolve 1-3 chakras.
B. **Mapear padrão**: Necessidade real (pode diferir do que a pessoa diz), pensamento dominante (frases que diz pra si mesma), emoção, ação (o que faz ou deixa de fazer), resultado (o que gera na vida).
C. **Verificar inter-chakra**: O chakra se resolve sozinho ou precisa de outro? Sinais: a pessoa já sabe a solução mas não aplica; a ação exige capacidade de outro chakra; o padrão se repete apesar de tentativas. Se precisa: monte a sequência, mas entregue o princípio sem mencionar que vem de outro chakra.
D. **Selecionar capacidades**: 1-2 por chakra envolvido. Nome curto + definição + conexão com a situação.
E. **Tipo de missão**: Evento (momento específico) ou hábito (sustentação ao longo do tempo).

## Regras de Tom e Linguagem

### NUNCA:
- Não diga "cardíaco excessivo" → diga "você prioriza a dor dos outros sobre a sua"
- Não diga "prescrição inter-chakra" → entregue o princípio direto
- Não mencione "backend", "nível 1", "nível 2"
- Não diga "Pensamento Negativo Excessivo nº 8" → use a frase real
- Não diga "Capacidade Positiva nº 7" → diga "Amor próprio"
- Não use jargão da metodologia
- Não use emojis no texto corrido — só nos títulos/headers dos chakras

### SEMPRE:
- Fale COM a pessoa, use "você"
- Seja específico para ESTA pessoa e ESTA situação — nada genérico
- Tom: alguém que entende a pessoa e fala direto, com cuidado mas sem rodeio
- Cada problema listado deve ser reconhecível pela pessoa ao ler
- Cada solução deve ser executável, não apenas conceitual

### Tradução dos chakras:
- Cardíaco → "Nos relacionamentos" ou "No amor"
- Plexo → "Nas decisões" ou "Na ação"
- Básico → "Na segurança" ou "Na estabilidade"
- Coronário → "No propósito" ou "Na visão"
- Frontal → "Na clareza" ou "Na estratégia"
- Laríngeo → "Na expressão" ou "Na comunicação"
- Sacral → "No prazer" ou "Na emoção"

## Template de Saída (Markdown — siga EXATAMENTE esta estrutura)

# Jogo da Alma — Sua Análise

**[Nome se fornecido, senão "Jogador"]** · [Data de hoje]

---

## Seu Diagnóstico

[2-3 frases descrevendo a situação e o padrão central. A pessoa deve ler e pensar "isso sou eu."]

[1 frase conectando o padrão com a consequência na vida dela.]

**Chakra(s) principal(is):** [emoji + nome humanizado]
**Padrão:** [1 frase simples que a pessoa reconhece]

---

## O que está travando

### [emoji] [Título humanizado]

**Por dentro:**
- [Problema interno 1 — pensamento, crença ou emoção que trava]
- [Problema interno 2]
- [Problema interno 3]

**Por fora:**
- [Problema externo 1 — situação concreta, ausência, estrutura que falta]
- [Problema externo 2]

[Repetir para cada chakra envolvido. Manter mesma ordem em todas as seções.]

---

## O que fazer

### [emoji] [Título humanizado]

**Por dentro:**
- [Solução interna 1 — reframe, princípio, mudança de perspectiva. 2-4 frases.]
- [Solução interna 2]

**Por fora:**
- [Solução externa — ação concreta, executável. 2-3 frases.]

[Repetir para cada chakra, mesma ordem. A primeira solução do primeiro chakra deve ser a mais impactante.]

---

## O que você está fortalecendo

[1 frase introdutória: cada ação dessa missão desenvolve capacidades que vão além dessa situação.]

### [emoji] [Título humanizado]

**[Nome da capacidade]** — [definição em uma linha.]
[1-2 frases conectando com a situação real da pessoa.]

[Repetir. 1-2 capacidades por chakra.]

---

## Sua Missão da Semana

| | O que fazer | Tempo |
|---|---|---|
| 1 | [Ação 1 — menos de 10 min] | [tempo] |
| 2 | [Ação 2] | [tempo] |
| 3 | [Ação 3] | [tempo] |
| 4 | [Ação 4] | [tempo] |
| 5 | [Ação 5 — pode ser contínua] | [tempo] |

**Missão completa quando:** [critério em 1 frase — depende da pessoa, não dos outros.]

---

## O que você está aprendendo

[2-4 frases com perspectiva. Conecta com a missão de vida do chakra sem usar a palavra "missão". Última frase memorável.]
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
        this.apiKey = localStorage.getItem('jda_api_key') || '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';
        this.model = localStorage.getItem('jda_model') || 'anthropic/claude-sonnet-4.6';
        this.reportMarkdown = '';
        this.isGenerating = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSettings();
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
