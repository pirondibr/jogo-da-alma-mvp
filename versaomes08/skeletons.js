/* Esqueletos e montagem fiel ao molde saber-chakras-personalidade-abas */

const CHAKRA_META = {
    'Básico':       { varCss: 'basic',     badge: 'b-basic',     strip: 'Básico',      display: 'Básico',       role: 'Segurança',  pill: { bg: '#FEF2F2', border: '#FECACA', color: '#991B1B', emoji: '🔴' }, ease: 'criar segurança, estabilizar condições' },
    'Sacral':       { varCss: 'sacral',    badge: 'b-sacral',    strip: 'Sacral',      display: 'Sacral',       role: 'Emoção',     pill: { bg: '#FFF7ED', border: '#FDBA74', color: '#9A4F1F', emoji: '🟠' }, ease: 'sentir, perceber, experimentar' },
    'Plexo Solar':  { varCss: 'plexo',     badge: 'b-plexo',     strip: 'Plexo',       display: 'Plexo Solar',  role: 'Posição',    pill: { bg: '#FFFBEB', border: '#FDE68A', color: '#92400E', emoji: '🟡' }, ease: 'escolher, priorizar, sustentar posição' },
    'Cardíaco':     { varCss: 'cardiaco',  badge: 'b-card',      strip: 'Cardíaco',    display: 'Cardíaco',     role: 'Vínculo',    pill: { bg: '#ECFDF5', border: '#A7F3D0', color: '#047857', emoji: '💚' }, ease: 'conectar, cuidar, considerar' },
    'Laríngeo':     { varCss: 'laringeo',  badge: 'b-lar',       strip: 'Laríngeo',    display: 'Laríngeo',     role: 'Expressão',  pill: { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E40AF', emoji: '🔵' }, ease: 'expressar, externalizar, comunicar diretamente' },
    'Frontal':      { varCss: 'frontal',   badge: 'b-frontal',   strip: 'Frontal',     display: 'Frontal',      role: 'Clareza',    pill: { bg: '#F5F3FF', border: '#DDD6FE', color: '#6B21A8', emoji: '🟣' }, ease: 'compreender, discernir, clarificar' },
    'Coronário':    { varCss: 'coronario', badge: 'b-coronario', strip: 'Coronário',   display: 'Coronário',    role: 'Confiança',  pill: { bg: '#FDF4FF', border: '#F0ABFC', color: '#86198F', emoji: '👑' }, ease: 'confiar, soltar controle, aceitar incerteza' }
};

const CHAKRA_ORDER = ['Básico', 'Sacral', 'Plexo Solar', 'Cardíaco', 'Laríngeo', 'Frontal', 'Coronário'];

function meta(name) {
    return CHAKRA_META[name] || CHAKRA_META['Sacral'];
}

function esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function capRowsHtml(rows) {
    return (rows || []).slice(0, 6).map(r => '<div class="cap-row">' + esc(r) + '</div>').join('');
}

function stripItemHtml(chakraName, title, desc) {
    const m = meta(chakraName);
    return '<div class="strip-item">\n'
        + '<span class="strip-dot" style="background:var(--' + m.varCss + ')"></span>\n'
        + '<div class="strip-chakra">' + m.strip + '</div>\n'
        + '<div class="strip-content"><div class="strip-title">' + esc(title) + '</div><div class="strip-desc">' + esc(desc) + '</div></div>\n'
        + '</div>';
}

function badgeHtml(chakraName, role) {
    const m = meta(chakraName);
    const label = role === 'principal' ? 'Principal' : 'Oposto';
    return '<span class="badge ' + m.badge + '"><span class="dot" style="background:var(--' + m.varCss + ')"></span>' + m.display + ' · ' + label + '</span>';
}

function riskCardHtml(chakraName, type, main, desc) {
    const m = meta(chakraName);
    const tag = type === 'excess' ? 'tag-excess' : 'tag-lack';
    const tagLabel = type === 'excess' ? 'Risco de excesso' : 'Risco de falta';
    return '<div class="risk-card">\n'
        + '<div class="risk-head"><span class="mini-dot" style="background:var(--' + m.varCss + ')"></span><span class="risk-name">' + m.display + '</span><span class="risk-tag ' + tag + '">' + tagLabel + '</span></div>\n'
        + '<div class="risk-body"><div class="risk-main">' + esc(main) + '</div><div class="risk-desc">' + esc(desc) + '</div></div>\n'
        + '</div>';
}

function paeCardHtml(chakraName, role, pensamento, emocao, acao, proporcional) {
    const m = meta(chakraName);
    const isPrincipal = role === 'principal';
    const pLabel = isPrincipal ? 'Pensamento natural' : 'Pensamento menos natural';
    const eLabel = isPrincipal ? 'Emoção natural' : 'Emoção menos natural';
    const aLabel = isPrincipal ? 'Ação natural' : 'Ação menos natural';
    const tagClass = isPrincipal ? 'tag-principal' : 'tag-oposto';
    const tagText = isPrincipal ? 'Principal' : 'Oposto';
    return '<div class="pae-card">\n'
        + '<div class="pae-head"><span class="mini-dot" style="background:var(--' + m.varCss + ')"></span><span class="pae-name">' + m.display + '</span><span class="pae-tag ' + tagClass + '">' + tagText + '</span></div>\n'
        + '<div class="pae-grid">\n'
        + '<div class="pae-cell"><div class="pae-label">' + pLabel + '</div><div class="pae-text">“' + esc(pensamento) + '”</div></div>\n'
        + '<div class="pae-cell"><div class="pae-label">' + eLabel + '</div><div class="pae-text">' + esc(emocao) + '</div></div>\n'
        + '<div class="pae-cell"><div class="pae-label">' + aLabel + '</div><div class="pae-text">' + esc(acao) + '</div></div>\n'
        + '</div>\n'
        + '<div class="pae-foot"><strong>Proporcional:</strong> ' + esc(proporcional) + '</div>\n'
        + '</div>';
}

function pillHtml(chakraName, text) {
    const p = meta(chakraName).pill;
    return '<span class="pill" style="background:' + p.bg + ';border-color:' + p.border + ';color:' + p.color + '">' + esc(text) + '</span>';
}

function buildPersonalityPanel(name, chakras, data) {
    const displayName = name || 'Perfil';
    const p1 = chakras.principal1, p2 = chakras.principal2, o1 = chakras.oposto1, o2 = chakras.oposto2;
    const footerCh = meta(p1).strip + '/' + meta(p2).strip + ' × ' + meta(o1).strip + '/' + meta(o2).strip;

    const pills = (data.integration && data.integration.pills) || [];
    const pillNodes = [p1, p2, o1, o2].map((c, i) => pillHtml(c, pills[i] || meta(c).pill.emoji + ' ' + c));
    const integrationRow = pillNodes.join('\n<span class="arr">→</span>\n');

    return '<section id="panel-personalidade" class="tab-panel" role="tabpanel" aria-labelledby="tab-personalidade">\n'
        + '<main class="page">\n'
        + '<header class="header">\n'
        + '<div class="eyebrow">Jogo da Alma · Saber — Personalidade</div>\n'
        + '<h1>Mapa de Personalidade</h1>\n'
        + '<div class="header-sub">Como suas energias principais e opostas moldam necessidades, capacidades, facilidades, riscos e pontos cegos</div>\n'
        + '</header>\n'
        + '<div class="profile-box">\n'
        + '<div class="profile-label">Input de personalidade</div>\n'
        + '<div class="profile-title">' + esc(displayName) + ' · Perfil</div>\n'
        + '<div class="badges">\n'
        + badgeHtml(p1, 'principal') + '\n'
        + badgeHtml(p2, 'principal') + '\n'
        + badgeHtml(o1, 'oposto') + '\n'
        + badgeHtml(o2, 'oposto') + '\n'
        + '</div></div>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon intro-icon">✦</div><div class="section-title">Como ler este mapa</div></div>\n'
        + '<div class="intro-box"><strong>' + esc(data.introStrong) + '</strong> ' + esc(data.introRest) + '</div>\n'
        + '</section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon need-icon">🌱</div><div class="section-title">Necessidades Primárias <span style="font-family:\'DM Sans\',sans-serif;font-size:10px;color:var(--green-text);background:var(--green-bg);border:1px solid var(--green-border);padding:3px 7px;border-radius:999px;vertical-align:middle;margin-left:6px;">Facilidade</span></div></div>\n'
        + '<div class="strip">\n'
        + stripItemHtml(p1, data.primaries[0].title, data.primaries[0].desc) + '\n'
        + stripItemHtml(p2, data.primaries[1].title, data.primaries[1].desc) + '\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon need-icon" style="background:var(--amber-bg);border-color:var(--amber-border);">↔</div><div class="section-title">Necessidades Opostas <span style="font-family:\'DM Sans\',sans-serif;font-size:10px;color:var(--amber-text);background:var(--amber-bg);border:1px solid var(--amber-border);padding:3px 7px;border-radius:999px;vertical-align:middle;margin-left:6px;">Dificuldade</span></div></div>\n'
        + '<div class="strip">\n'
        + stripItemHtml(o1, data.opposites[0].title, data.opposites[0].desc) + '\n'
        + stripItemHtml(o2, data.opposites[1].title, data.opposites[1].desc) + '\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon cap-icon">💎</div><div class="section-title">Capacidades Naturais</div></div>\n'
        + '<div class="cap-grid">\n'
        + '<div class="cap-card"><h3><span class="mini-dot" style="background:var(--' + meta(p1).varCss + ')"></span> ' + meta(p1).display + '</h3><div class="cap-list">' + capRowsHtml(data.capsNatural[0].rows) + '</div></div>\n'
        + '<div class="cap-card"><h3><span class="mini-dot" style="background:var(--' + meta(p2).varCss + ')"></span> ' + meta(p2).display + '</h3><div class="cap-list">' + capRowsHtml(data.capsNatural[1].rows) + '</div></div>\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon cap-icon" style="background:var(--amber-bg);border-color:var(--amber-border);">◇</div><div class="section-title">Capacidades Não Naturais</div></div>\n'
        + '<div class="intro-box" style="margin-bottom:10px;background:var(--amber-bg);border-color:var(--amber-border);"><strong>Não natural não significa incapacidade.</strong> ' + esc(data.capsUnnaturalNote) + '</div>\n'
        + '<div class="cap-grid">\n'
        + '<div class="cap-card"><h3><span class="mini-dot" style="background:var(--' + meta(o1).varCss + ')"></span> ' + meta(o1).display + '</h3><div class="cap-list">' + capRowsHtml(data.capsUnnatural[0].rows) + '</div></div>\n'
        + '<div class="cap-card"><h3><span class="mini-dot" style="background:var(--' + meta(o2).varCss + ')"></span> ' + meta(o2).display + '</h3><div class="cap-list">' + capRowsHtml(data.capsUnnatural[1].rows) + '</div></div>\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon ease-icon">↕</div><div class="section-title">Facilidade de Acesso</div></div>\n'
        + '<div class="ease-grid">\n'
        + '<div class="ease-card ease-high"><div class="ease-head">Alta facilidade · automático</div><div class="ease-body">\n'
        + '<div class="ease-item"><span class="mini-dot" style="background:var(--' + meta(p1).varCss + ')"></span><strong>' + meta(p1).strip + '</strong> — ' + esc(data.easeHigh.items[0]) + '</div>\n'
        + '<div class="ease-item"><span class="mini-dot" style="background:var(--' + meta(p2).varCss + ')"></span><strong>' + meta(p2).strip + '</strong> — ' + esc(data.easeHigh.items[1]) + '</div>\n'
        + '<div class="ease-note">' + esc(data.easeHigh.note) + '</div></div></div>\n'
        + '<div class="ease-card ease-low"><div class="ease-head">Menor facilidade · consciente</div><div class="ease-body">\n'
        + '<div class="ease-item"><span class="mini-dot" style="background:var(--' + meta(o1).varCss + ')"></span><strong>' + meta(o1).strip + '</strong> — ' + esc(data.easeLow.items[0]) + '</div>\n'
        + '<div class="ease-item"><span class="mini-dot" style="background:var(--' + meta(o2).varCss + ')"></span><strong>' + meta(o2).strip + '</strong> — ' + esc(data.easeLow.items[1]) + '</div>\n'
        + '<div class="ease-note">' + esc(data.easeLow.note) + '</div></div></div>\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon risk-icon">⚠</div><div class="section-title">Excessos dos Principais × Faltas dos Opostos</div></div>\n'
        + '<div class="risk-stack">\n'
        + riskCardHtml(p1, 'excess', data.risks[0].main, data.risks[0].desc) + '\n'
        + riskCardHtml(p2, 'excess', data.risks[1].main, data.risks[1].desc) + '\n'
        + riskCardHtml(o1, 'lack', data.risks[2].main, data.risks[2].desc) + '\n'
        + riskCardHtml(o2, 'lack', data.risks[3].main, data.risks[3].desc) + '\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon pae-icon">◐</div><div class="section-title">Pensamento × Emoção × Ação</div></div>\n'
        + '<div class="pae-stack">\n'
        + paeCardHtml(p1, 'principal', data.pae[0].pensamento, data.pae[0].emocao, data.pae[0].acao, data.pae[0].proporcional) + '\n'
        + paeCardHtml(p2, 'principal', data.pae[1].pensamento, data.pae[1].emocao, data.pae[1].acao, data.pae[1].proporcional) + '\n'
        + paeCardHtml(o1, 'oposto', data.pae[2].pensamento, data.pae[2].emocao, data.pae[2].acao, data.pae[2].proporcional) + '\n'
        + paeCardHtml(o2, 'oposto', data.pae[3].pensamento, data.pae[3].emocao, data.pae[3].acao, data.pae[3].proporcional) + '\n'
        + '</div></section>\n'
        + '<section class="section">\n'
        + '<div class="section-header"><div class="section-icon integrate-icon">⇄</div><div class="section-title">Integração Proporcional</div></div>\n'
        + '<div class="integration">\n'
        + '<div class="integration-title">' + esc(data.integration.title) + '</div>\n'
        + '<div class="integration-row">\n' + integrationRow + '\n</div>\n'
        + '<div class="integration-note">' + esc(data.integration.note) + '</div>\n'
        + '</div>\n'
        + '<div class="formula">\n'
        + '<div class="formula-main"><strong>Personalidade</strong> = Tendência → Excesso provável → Ausência provável → Integração proporcional</div>\n'
        + '<div class="formula-sub">Principais indicam acesso mais espontâneo. Opostos indicam energias que podem exigir mais consciência, prática e capacidade.</div>\n'
        + '</div></section>\n'
        + '<div class="final-box">\n'
        + '<div class="final-label">Síntese do Saber — Personalidade</div>\n'
        + '<div class="final-text">' + esc(data.finalText) + '</div>\n'
        + '</div>\n'
        + '<div class="footer">Jogo da Alma · Protótipo SABER — Personalidade · ' + esc(displayName) + ': ' + footerCh + '</div>\n'
        + '</main>\n</section>';
}

const PERSONALIDADE_JSON_PROMPT = `Você gera CONTEÚDO (não HTML) para o Mapa de Personalidade do Jogo da Alma.
Responda APENAS com um objeto JSON válido — sem markdown, sem texto antes ou depois.

Use os chakras principais e opostos EXATAMENTE como informados no input.
Personalize com o nome da pessoa e cruze com a situação quando houver relato.

Schema obrigatório:
{
  "introStrong": "frase forte inicial (ex: Personalidade não diz o que [Nome] necessariamente fará.)",
  "introRest": "resto do parágrafo do intro-box",
  "primaries": [
    { "title": "...", "desc": "..." },
    { "title": "...", "desc": "..." }
  ],
  "opposites": [
    { "title": "...", "desc": "..." },
    { "title": "...", "desc": "..." }
  ],
  "capsNatural": [
    { "rows": ["6 capacidades", "..."] },
    { "rows": ["6 capacidades", "..."] }
  ],
  "capsUnnaturalNote": "frase após o strong do intro amber",
  "capsUnnatural": [
    { "rows": ["6 capacidades", "..."] },
    { "rows": ["6 capacidades", "..."] }
  ],
  "easeHigh": {
    "items": ["verbo curto p1", "verbo curto p2"],
    "note": "nota sobre acesso espontâneo com nome"
  },
  "easeLow": {
    "items": ["verbo curto o1", "verbo curto o2"],
    "note": "nota sobre acesso consciente"
  },
  "risks": [
    { "main": "risco excesso principal 1", "desc": "..." },
    { "main": "risco excesso principal 2", "desc": "..." },
    { "main": "risco falta oposto 1", "desc": "..." },
    { "main": "risco falta oposto 2", "desc": "..." }
  ],
  "pae": [
    { "pensamento": "pergunta/frase", "emocao": "...", "acao": "...", "proporcional": "..." },
    { "pensamento": "...", "emocao": "...", "acao": "...", "proporcional": "..." },
    { "pensamento": "...", "emocao": "...", "acao": "...", "proporcional": "..." },
    { "pensamento": "...", "emocao": "...", "acao": "...", "proporcional": "..." }
  ],
  "integration": {
    "title": "Adicionar o que falta sem abandonar quem você é",
    "pills": ["🟠 Eu sinto", "💚 Eu considero", "🟡 Eu escolho", "🔵 Eu expresso"],
    "note": "nota sobre integração com nome e chakras"
  },
  "finalText": "síntese integradora em 1-2 frases"
}

Tom: claro, educativo, sem guru. JSON puro apenas.`;

const CHAKRAS_HTML_PROMPT = `Você gera APENAS a aba SABER — Chakras do Jogo da Alma.
Devolva somente este bloco HTML, começando em <section id="panel-chakras" e terminando em </section>.
Sem markdown. Sem aba personalidade. Sem shell/tabs/script.

# REGRAS DE FIDELIDADE (obrigatório)
- Copie a ESTRUTURA EXATA do molde: mesmas tags, classes, ordem de seções, aninhamento.
- NÃO invente classes. NÃO omita seções. NÃO resuma a matriz (sempre 3 colunas × 3 factors).
- 7 chakras nesta ordem: Básico, Sacral, Plexo Solar, Cardíaco, Laríngeo, Frontal, Coronário.
- Use var(--basic), var(--sacral), var(--plexo), var(--cardiaco), var(--laringeo), var(--frontal), var(--coronario) nos dots.
- raiz-chakra curto: Básico, Sacral, Plexo, Cardíaco, Laríngeo, Frontal, Coronário.
- chakra-role: Segurança, Emoção, Posição, Vínculo, Expressão, Clareza, Confiança.

# SEÇÕES OBRIGATÓRIAS (nesta ordem)
1. header (eyebrow + h1 + header-sub contextual)
2. situacao (input entre aspas curvas “...”)
3. section intro (intro-icon ✦ + intro-box)
4. section necessidades (need-icon 🌱 + raiz-strip 7 itens)
5. section matriz (chakra-icon ◉ + chakra-stack 7 article.chakra-block)
6. section capacidades (cap-icon 💎 + cap-list 7 cap-item)
7. section síntese (sum-icon Σ + summary/formula)
8. section escolha (choice-icon → + choice-box)
9. footer fixo

# BLOCO article.chakra-block (repita 7× trocando chakra)
<article class="chakra-block">
<div class="chakra-head"><span class="mini-dot" style="background:var(--VAR)"></span><span class="chakra-name">NOME</span><span class="chakra-role">PAPEL</span></div>
<div class="chakra-prop">
<div class="chakra-prop-title">[título proporcional contextual]</div>
<div class="chakra-prop-text">[texto]</div>
<div class="chakra-question">“[pergunta]”</div>
</div>
<div class="matrix">
<div class="state state-lack"><div class="state-head">Falta</div>
<div class="factor"><div class="factor-label">Pensamento</div><div class="factor-text">“...”</div></div>
<div class="factor"><div class="factor-label">Emoção</div><div class="factor-text">...</div></div>
<div class="factor"><div class="factor-label">Ação</div><div class="factor-text">...</div></div></div>
<div class="state state-excess"><div class="state-head">Excesso</div><!-- 3 factors --></div>
<div class="state state-prop"><div class="state-head">Proporcional</div><!-- 3 factors --></div>
</div></article>

# cap-item (7×)
<div class="cap-item"><div class="cap-main"><span class="cap-name">[nome]</span><span class="cap-dash">—</span><span class="cap-desc">[desc]</span></div><span class="cap-tag"><span class="mini-dot" style="background:var(--VAR)"></span>LABEL</span><div class="cap-note">[nota]</div></div>

# WRAPPER
<section id="panel-chakras" class="tab-panel active" role="tabpanel" aria-labelledby="tab-chakras">
<main class="page">
  ... conteúdo ...
  <div class="footer">Jogo da Alma · SABER — Chakras · Falta × Excesso × Proporcional · Pensamento × Emoção × Ação</div>
</main>
</section>

Preencha textos para a situação recebida. Mantenha indentação mínima como no molde (pode ser compacto).`;

function parseJsonFromResponse(raw) {
    let text = raw.trim().replace(/```json/gi, '').replace(/```/g, '').trim();
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('JSON de personalidade inválido');
    return JSON.parse(text.slice(start, end + 1));
}

function wrapPanelChakras(raw) {
    let text = raw.trim().replace(/```html/gi, '').replace(/```/g, '').trim();
    if (text.indexOf('<section id="panel-chakras"') === -1) {
        const mainStart = text.indexOf('<main class="page">');
        if (mainStart === -1) throw new Error('Aba Chakras sem estrutura esperada');
        text = '<section id="panel-chakras" class="tab-panel active" role="tabpanel" aria-labelledby="tab-chakras">\n' + text;
        if (text.indexOf('</section>') === -1) text += '\n</section>';
    }
    if (text.indexOf('chakra-stack') === -1) throw new Error('Aba Chakras incompleta (faltam blocos)');
    return text.trim();
}

function validatePersonalityData(d) {
    const need = ['introStrong', 'primaries', 'opposites', 'capsNatural', 'capsUnnatural', 'easeHigh', 'easeLow', 'risks', 'pae', 'integration', 'finalText'];
    for (let i = 0; i < need.length; i++) {
        if (!d[need[i]]) throw new Error('JSON personalidade incompleto: ' + need[i]);
    }
    if (d.primaries.length < 2 || d.opposites.length < 2) throw new Error('JSON personalidade: faltam chakras');
    if (d.risks.length < 4 || d.pae.length < 4) throw new Error('JSON personalidade: faltam riscos ou PAE');
}
