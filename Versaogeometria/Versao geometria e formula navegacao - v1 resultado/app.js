/* ============================================================
   JOGO DA ALMA — GPS da Alma · Mapa & Ressonância
   ------------------------------------------------------------
   Combina a GEOMETRIA determinística (radar dos 7 chakras +
   mergulho do vértice-chave) com a FÓRMULA DA NAVEGAÇÃO:

     Mapa + Ressonância → Conhecimento

   A IA não dá respostas diretas. Ela gera MAPAS POSSÍVEIS em
   três níveis de visão (Amplo / Médio / Específico) e faz
   perguntas. O usuário NAVEGA por ressonância:

     Etapa 1 — Gerador de Mapas (chamada 1): 2–3 mapas possíveis,
               cada um percorrendo o GPS da Alma
               (Continente → País/Chakra → Cidade/Tema →
                Rua/Elemento → Casa) com perguntas de ressonância.
     Etapa 2 — Geometria (chamada 2): sobre o mapa que ressoou,
               a IA devolve o JSON dos 7 chakras e o frontend
               desenha o SVG (radar + dois triângulos), antes e
               depois, + a Ponte Não-Dual traduzida pro idioma
               nativo da pessoa.
   ============================================================ */

/* ---------- Catálogo fixo dos 7 chakras (ordem dos eixos do radar) ---------- */
const CHAKRA_ORDER = ['coronario', 'frontal', 'laringeo', 'cardiaco', 'plexo', 'sacral', 'raiz'];
const CHAKRAS = {
    coronario: { nome: 'Coronário', sub: 'Propósito & Visão',     color: '#2E3192' },
    frontal:   { nome: 'Frontal',   sub: 'Discernimento',         color: '#2D6CDF' },
    laringeo:  { nome: 'Laríngeo',  sub: 'Comunicação & Verdade', color: '#7B2D8E' },
    cardiaco:  { nome: 'Cardíaco',  sub: 'Amor & Conexão',        color: '#4CAF82' },
    plexo:     { nome: 'Plexo',     sub: 'Poder & Ação',          color: '#E8A317' },
    sacral:    { nome: 'Sacral',    sub: 'Criatividade',          color: '#E67E22' },
    raiz:      { nome: 'Raiz',      sub: 'Segurança & Estrutura', color: '#C0392B' },
};

/* ---------- Continentes (áreas da vida — visão Ampla) ---------- */
const CONTINENTES = [
    { id: 'saude',          emoji: '🌿', nome: 'Saúde' },
    { id: 'relacionamentos',emoji: '❤️', nome: 'Relacionamentos' },
    { id: 'dinheiro',       emoji: '💰', nome: 'Dinheiro' },
    { id: 'trabalho',       emoji: '🏢', nome: 'Trabalho' },
    { id: 'proposito',      emoji: '🎯', nome: 'Propósito' },
    { id: 'aprendizado',    emoji: '📚', nome: 'Aprendizado' },
    { id: 'diversao',       emoji: '🎨', nome: 'Diversão' },
    { id: 'espiritualidade',emoji: '✨', nome: 'Espiritualidade' },
];

/* =========================================================================
   GLIFOS DOS 3 NÍVEIS — Constelação (Amplo) / Estrela (Médio) / Triângulo (Específico)
   "Constelação → Estrela → Triângulo": cada nível de visão tem sua forma.
   ========================================================================= */
function glyphConstelacao(stroke = '#C9A84C', size = 46) {
    return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<path d="M10 12 L24 26 L37 10 M24 26 L16 38 M24 26 L40 33" fill="none" stroke="${stroke}" stroke-width="1" opacity="0.55"/>
<circle cx="10" cy="12" r="2.4" fill="${stroke}"/>
<circle cx="37" cy="10" r="2.4" fill="${stroke}"/>
<circle cx="24" cy="26" r="3" fill="${stroke}"/>
<circle cx="16" cy="38" r="2.2" fill="${stroke}"/>
<circle cx="40" cy="33" r="2.2" fill="${stroke}"/>
</svg>`;
}
function glyphEstrela(stroke = '#4338CA', size = 46) {
    return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<polygon points="24,7 36,33 12,33" fill="none" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
<polygon points="24,41 12,15 36,15" fill="none" stroke="${stroke}" stroke-width="2" stroke-linejoin="round" opacity="0.78"/>
</svg>`;
}
function glyphTriangulo(stroke = '#2F7A52', size = 46) {
    return `<svg viewBox="0 0 48 48" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<polygon points="24,8 40,38 8,38" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linejoin="round"/>
<circle cx="24" cy="29" r="2.6" fill="${stroke}"/>
</svg>`;
}

/* =========================================================================
   RADAR (zoom Amplo) — geometria fixa: centro (300,300), raio = nível×20
   ========================================================================= */
const RADAR_CENTER = 300;
const RADAR_STEP = 20;

function radarXY(axisIndex, level) {
    const ang = (90 - axisIndex * (360 / 7)) * Math.PI / 180;
    const r = level * RADAR_STEP;
    const x = RADAR_CENTER + r * Math.cos(ang);
    const y = RADAR_CENTER - r * Math.sin(ang);
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}
function radarPoints(levels) {
    return levels.map((lvl, i) => radarXY(i, lvl).join(',')).join(' ');
}

/* grade do radar (anéis + raios + números) — idêntica em antes/depois */
const RADAR_GRID = `
<polygon points="300.0,260.0 331.3,275.1 339.0,308.9 317.4,336.0 282.6,336.0 261.0,308.9 268.7,275.1" fill="none" stroke="#D8D4CB" stroke-width="1"/>
<polygon points="300.0,220.0 362.5,250.1 378.0,317.8 334.7,372.1 265.3,372.1 222.0,317.8 237.5,250.1" fill="none" stroke="#D8D4CB" stroke-width="1"/>
<polygon points="300.0,180.0 393.8,225.2 417.0,326.7 352.1,408.1 247.9,408.1 183.0,326.7 206.2,225.2" fill="none" stroke="#D8D4CB" stroke-width="1"/>
<polygon points="300.0,140.0 425.1,200.2 456.0,335.6 369.4,444.2 230.6,444.2 144.0,335.6 174.9,200.2" fill="none" stroke="#D8D4CB" stroke-width="1"/>
<polygon points="300.0,100.0 456.4,175.3 495.0,344.5 386.8,480.2 213.2,480.2 105.0,344.5 143.6,175.3" fill="none" stroke="#BBB6AA" stroke-width="1"/>
<line x1="300" y1="300" x2="300.0" y2="100.0" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="456.4" y2="175.3" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="495.0" y2="344.5" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="386.8" y2="480.2" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="213.2" y2="480.2" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="105.0" y2="344.5" stroke="#E2DED5" stroke-width="1"/>
<line x1="300" y1="300" x2="143.6" y2="175.3" stroke="#E2DED5" stroke-width="1"/>
<text x="308" y="263.0" font-family="DM Sans" font-size="8" fill="#C2BCAE">2</text>
<text x="308" y="223.0" font-family="DM Sans" font-size="8" fill="#C2BCAE">4</text>
<text x="308" y="183.0" font-family="DM Sans" font-size="8" fill="#C2BCAE">6</text>
<text x="308" y="143.0" font-family="DM Sans" font-size="8" fill="#C2BCAE">8</text>
<text x="308" y="103.0" font-family="DM Sans" font-size="8" fill="#C2BCAE">10</text>`;

/* nós + rótulos dos 7 eixos — posições fixas (nível 10) */
const RADAR_NODES = `
<circle cx="300.0" cy="100.0" r="6.5" fill="#2E3192"/>
<text x="300.0" y="60" text-anchor="middle" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Coronário</text>
<text x="300.0" y="72" text-anchor="middle" font-family="DM Sans" font-size="9" fill="#9A9A9A">Propósito &amp; Visão</text>
<circle cx="456.4" cy="175.3" r="6.5" fill="#2D6CDF"/>
<text x="482.9" y="154.1" text-anchor="start" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Frontal</text>
<text x="482.9" y="166.1" text-anchor="start" font-family="DM Sans" font-size="9" fill="#9A9A9A">Discernimento</text>
<circle cx="495.0" cy="344.5" r="6.5" fill="#7B2D8E"/>
<text x="528.1" y="352.1" text-anchor="start" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Laríngeo</text>
<text x="528.1" y="364.1" text-anchor="start" font-family="DM Sans" font-size="9" fill="#9A9A9A">Comunicação &amp; Verdade</text>
<circle cx="386.8" cy="480.2" r="6.5" fill="#4CAF82"/>
<text x="401.5" y="510.8" text-anchor="start" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Cardíaco</text>
<text x="401.5" y="522.8" text-anchor="start" font-family="DM Sans" font-size="9" fill="#9A9A9A">Amor &amp; Conexão</text>
<circle cx="213.2" cy="480.2" r="6.5" fill="#E8A317"/>
<text x="198.5" y="510.8" text-anchor="end" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Plexo</text>
<text x="198.5" y="522.8" text-anchor="end" font-family="DM Sans" font-size="9" fill="#9A9A9A">Poder &amp; Ação</text>
<circle cx="105.0" cy="344.5" r="6.5" fill="#E67E22"/>
<text x="71.9" y="352.1" text-anchor="end" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Sacral</text>
<text x="71.9" y="364.1" text-anchor="end" font-family="DM Sans" font-size="9" fill="#9A9A9A">Criatividade</text>
<circle cx="143.6" cy="175.3" r="6.5" fill="#C0392B"/>
<text x="117.1" y="154.1" text-anchor="end" font-family="DM Sans" font-size="11.5" font-weight="700" fill="#2D2D2D">Raiz</text>
<text x="117.1" y="166.1" text-anchor="end" font-family="DM Sans" font-size="9" fill="#9A9A9A">Segurança &amp; Estrutura</text>`;

function radarDots(levels, kind) {
    return levels.map((lvl, i) => {
        const [x, y] = radarXY(i, lvl);
        return kind === 'sit'
            ? `<circle class="p-sit" cx="${x}" cy="${y}" r="3.4" fill="#fff" stroke="#C9A84C" stroke-width="1.6"/>`
            : `<circle class="p-ind" cx="${x}" cy="${y}" r="3" fill="#2F7A52"/>`;
    }).join('\n');
}

function buildRadarSVG(sitLevels, indLevels, depois) {
    const indFill = depois ? 'rgba(76,175,130,0.20)' : 'rgba(47,122,82,0.26)';
    const indPoly = `<polygon class="p-ind" points="${radarPoints(indLevels)}" fill="${indFill}" stroke="#2F7A52" stroke-width="2.5" stroke-linejoin="round"/>`;
    const sitPoly = `<polygon class="p-sit" points="${radarPoints(sitLevels)}" fill="none" stroke="#C9A84C" stroke-width="2.2" stroke-dasharray="5 4" stroke-linejoin="round"/>`;
    const tag = depois
        ? `\n<text x="300" y="358" text-anchor="middle" font-family="DM Sans" font-size="9" font-weight="700" fill="#6BAE8C" letter-spacing="1">✦ verde encostou na dourada</text>`
        : '';
    return `<svg viewBox="0 0 600 568" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
${RADAR_GRID}
${indPoly}
${sitPoly}
${radarDots(sitLevels, 'sit')}
${radarDots(indLevels, 'ind')}
${RADAR_NODES}${tag}
</svg>`;
}

/* =========================================================================
   MERGULHO (zoom Específico) — dois triângulos sobrepostos num eixo 0–10
   ========================================================================= */
const TRI_CY = 200;
const TRI_R = 82;
const TRI_HALF = +(TRI_R * Math.sqrt(3) / 2).toFixed(1);
const TRI_MID = +(TRI_R / 2).toFixed(1);
const xOf = (lvl) => +(150 + lvl * 30).toFixed(1);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function triPoints(cx, up) {
    if (up) {
        return `${cx},${TRI_CY - TRI_R} ${cx - TRI_HALF},${TRI_CY + TRI_MID} ${cx + TRI_HALF},${TRI_CY + TRI_MID}`;
    }
    return `${cx},${TRI_CY + TRI_R} ${cx - TRI_HALF},${TRI_CY - TRI_MID} ${cx + TRI_HALF},${TRI_CY - TRI_MID}`;
}
function hexPoints(cx, r) {
    return [0, 60, 120, 180, 240, 300].map(a => {
        const rad = a * Math.PI / 180;
        return `${+(cx + r * Math.cos(rad)).toFixed(1)},${+(TRI_CY - r * Math.sin(rad)).toFixed(1)}`;
    }).join(' ');
}

function buildTriSVG(prop, nivel, poloFalta, poloExcesso, aligned) {
    const cxSit = xOf(prop);
    const cxInd = xOf(nivel);
    const w = 1.75;
    const faltaEnd = xOf(clamp(prop - w, 0, 10));
    const excStart = xOf(clamp(prop + w, 0, 10));
    const loX = xOf(0), hiX = xOf(10);

    const isExcess = nivel > prop;
    const indAccent = isExcess ? '#A33327' : '#9A6313';

    let field = '';
    if (aligned) {
        field = `
<polygon class="fld" points="${hexPoints(cxSit, 55.9)}" fill="#FBF6E6" opacity="0.55"/>`;
    }

    const sitPoly = `<polygon class="tri-sit" points="${triPoints(cxSit, false)}" fill="rgba(201,168,76,0.14)" stroke="#C9A84C" stroke-width="2.5" stroke-linejoin="round"/>`;
    const indStroke = aligned
        ? `stroke="#4CAF82" stroke-width="2.5" stroke-linejoin="round"`
        : `stroke="#4CAF82" stroke-width="2.5" stroke-dasharray="7 5" stroke-linejoin="round"`;
    const indFill = aligned ? 'rgba(76,175,130,0.14)' : 'rgba(76,175,130,0.12)';
    const indPoly = `<polygon class="tri-ind" points="${triPoints(cxInd, true)}" fill="${indFill}" ${indStroke}/>`;

    let core = '';
    if (aligned) {
        core = `
<polygon class="fld" points="${hexPoints(cxSit, 47.3)}" fill="#FFFDF8" stroke="#ECE1BE" stroke-width="1.3"/>
<text class="fld" x="${cxSit}" y="204" text-anchor="middle" font-size="12" fill="#C9B36A">✦</text>`;
    }

    const indLabelColor = aligned ? '#2F7A52' : indAccent;
    const indLabel = `<text class="tri-ind" x="${cxInd}" y="104" text-anchor="middle" font-family="DM Sans" font-size="10" font-weight="700" fill="${indLabelColor}">INDIVÍDUO fez · ${fmt(nivel)}</text>`;
    const sitLabel = `<text class="tri-sit" x="${cxSit}" y="300" text-anchor="middle" font-family="DM Sans" font-size="10" font-weight="700" fill="#7A6320">SITUAÇÃO pede · ${fmt(prop)}</text>`;

    let ticks;
    if (aligned) {
        ticks = `
<line x1="${cxSit}" y1="324" x2="${cxSit}" y2="348" stroke="#7A9E5C" stroke-width="3"/>
<text x="${cxSit}" y="362" text-anchor="middle" font-family="Fraunces" font-size="10" font-weight="700" fill="#2F7A52">${fmt(prop)} · alinhados</text>`;
    } else {
        const left = Math.min(cxSit, cxInd), right = Math.max(cxSit, cxInd);
        const gap = fmt(Math.abs(nivel - prop));
        ticks = `
<line x1="${cxSit}" y1="326" x2="${cxSit}" y2="346" stroke="#C9A84C" stroke-width="2.5"/>
<text x="${cxSit}" y="360" text-anchor="middle" font-family="Fraunces" font-size="10" font-weight="700" fill="#93791F">${fmt(prop)}</text>
<line x1="${cxInd}" y1="326" x2="${cxInd}" y2="346" stroke="${indAccent}" stroke-width="2.5"/>
<text x="${cxInd}" y="360" text-anchor="middle" font-family="Fraunces" font-size="10" font-weight="700" fill="${indAccent}">${fmt(nivel)}</text>
<line x1="${left + 7}" y1="378" x2="${right - 7}" y2="378" stroke="#B07A2A" stroke-width="1.5"/>
<polygon points="${right},378 ${right - 10},374 ${right - 10},382" fill="#B07A2A"/>
<polygon points="${left},378 ${left + 10},374 ${left + 10},382" fill="#B07A2A"/>
<text x="${(left + right) / 2}" y="375" text-anchor="middle" font-family="DM Sans" font-size="8.5" font-weight="700" fill="#9A6313">desalinhado · ${gap}</text>`;
    }

    return `<svg class="tri-canvas" viewBox="0 0 600 392" xmlns="http://www.w3.org/2000/svg">${field}
${sitPoly}
${indPoly}${core}
${indLabel}
${sitLabel}
<g class="ax">
<rect x="${loX}" y="332" width="${(faltaEnd - loX).toFixed(1)}" height="10" fill="#FBEAD2"/>
<rect x="${faltaEnd}" y="332" width="${(excStart - faltaEnd).toFixed(1)}" height="10" fill="#E4F4EA"/>
<rect x="${excStart}" y="332" width="${(hiX - excStart).toFixed(1)}" height="10" fill="#FBE0DD"/>
<line x1="${loX}" y1="330" x2="${hiX}" y2="330" stroke="#C9C2B4" stroke-width="1.3"/>
<text x="${loX}" y="364" text-anchor="middle" font-family="DM Sans" font-size="8.5" font-weight="700" fill="#9A6313">Falta · ${escapeXml(poloFalta)}</text>
<text x="${hiX}" y="364" text-anchor="middle" font-family="DM Sans" font-size="8.5" font-weight="700" fill="#A33327">Excesso · ${escapeXml(poloExcesso)}</text>${ticks}
</g>
</svg>`;
}

/* ---------- helpers de formatação ---------- */
function fmt(n) {
    const r = Math.round(n * 10) / 10;
    return Number.isInteger(r) ? String(r) : String(r);
}
function escapeXml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* =========================================================================
   ESTILO DO RELATÓRIO (documento gerado, renderizado no iframe)
   ========================================================================= */
const REPORT_STYLE = `
:root{--bg:#F7F6F3;--card:#FFFFFF;--text:#1A1A1A;--text2:#3D3D3D;--text3:#6B6B6B;--text-muted:#9A9A9A;--border:#E8E6E1;--border-light:#F0EFEB;--accent:#C9A84C;--accent-soft:rgba(201,168,76,0.08);--accent-border:rgba(201,168,76,0.25);--indigo:#4338CA;--indigo-soft:rgba(67,56,202,0.07);--indigo-border:rgba(67,56,202,0.22);--green-bg:#F0FDF4;--green-border:#BBF7D0;--green-muted:#047857;--cardiaco:#4CAF82;--falta-st:#E0A23C;}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
.page{max-width:680px;margin:0 auto;padding:40px 20px 80px}
.g-header{text-align:center;margin-bottom:18px;animation:fadeUp .5s ease both}
.zoom-tag{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);background:var(--card);border:1px solid var(--accent-border);padding:3px 10px;border-radius:6px;margin-bottom:12px}
.g-header h1{font-family:'Fraunces',serif;font-size:27px;font-weight:600;line-height:1.2;margin-bottom:6px}
.g-header h1 .chakra{color:var(--cardiaco)}
.g-header-sub{font-size:13px;color:var(--text-muted);max-width:490px;margin:0 auto}
/* breadcrumb GPS */
.gps{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center;margin-bottom:18px;animation:fadeUp .5s ease .03s both}
.gps-item{display:inline-flex;flex-direction:column;align-items:center;background:var(--card);border:1px solid var(--indigo-border);border-radius:10px;padding:6px 11px;min-width:78px}
.gps-geo{font-size:8px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--indigo)}
.gps-val{font-size:11px;font-weight:600;color:var(--text);line-height:1.25;text-align:center}
.gps-arrow{color:var(--text-muted);font-size:12px}
.situacao{background:var(--text);color:#F5F5F0;border-radius:16px;padding:16px 22px;margin-bottom:18px;animation:fadeUp .5s ease .05s both}
.situacao-label{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:6px}
.situacao-text{font-size:13px;line-height:1.65;color:rgba(255,255,255,.82);font-style:italic}
.legend-row{display:flex;flex-wrap:wrap;gap:14px 18px;justify-content:center;margin-bottom:18px}
.legend-item{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:var(--text3)}
.legend-swatch{width:20px;height:0;border-top-width:3px;flex-shrink:0}
.legend-glyph{font-size:14px;line-height:1}
.sw-sit{border-top:3px dashed #C9A84C}
.sw-ind{border-top:3px solid #2F7A52}
.radar-block,.tri-block{background:var(--card);border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-bottom:20px;animation:fadeUp .5s ease .1s both}
.rb-antes,.tb-antes{border-color:var(--falta-st)}
.rb-depois,.tb-depois{border-color:var(--green-border)}
.radar-top,.tri-top{padding:18px 24px 0;text-align:center}
.radar-eyebrow,.tri-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:5px}
.eb-antes{color:#9A6313}.eb-depois{color:var(--green-muted)}
.radar-title,.tri-title{font-family:'Fraunces',serif;font-size:19px;font-weight:600}
.svg-wrap{padding:6px 10px 10px}
.tri-canvas{width:100%;height:auto;display:block}
.note{display:flex;align-items:flex-start;gap:11px;margin:0 22px 18px;padding:13px 16px;border-radius:12px;font-size:12.5px;line-height:1.55}
.note-icon{font-size:15px;flex-shrink:0}
.fn-antes{background:#FBEAD2;border:1px solid var(--falta-st);color:#7A4E10}
.fn-depois{background:var(--green-bg);border:1px solid var(--green-border);color:var(--text2)}
.note b{color:var(--text)}
.closing{background:var(--text);color:#F5F5F0;border-radius:16px;padding:18px 22px;font-size:12.5px;line-height:1.65;margin-bottom:8px}
.closing b{color:#fff}
.divider{display:flex;align-items:center;gap:14px;margin:34px 0 22px;color:var(--text-muted)}
.divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--border)}
.divider-tag{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.key-card{background:var(--accent-soft);border:1px solid var(--accent-border);border-radius:14px;padding:14px 18px;margin-bottom:18px;font-size:12.5px;line-height:1.6;color:var(--text2)}
.key-card b{color:var(--text)}
/* ponte não-dual */
.ponte{background:var(--indigo-soft);border:1px solid var(--indigo-border);border-radius:16px;padding:20px 22px;margin-bottom:20px;animation:fadeUp .5s ease .1s both}
.ponte-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--indigo);margin-bottom:8px}
.ponte-frase{font-family:'Fraunces',serif;font-size:18px;font-weight:600;line-height:1.4;color:var(--text);margin-bottom:10px}
.ponte-frase::before{content:"“";color:var(--indigo);margin-right:2px}
.ponte-frase::after{content:"”";color:var(--indigo);margin-left:2px}
.ponte-text{font-size:12.5px;line-height:1.6;color:var(--text2)}
.ponte-text b{color:var(--text)}
.ch-section{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px 22px;margin-bottom:20px;animation:fadeUp .5s ease .1s both}
.ch-section.is-acao{border-color:var(--green-border)}
.ch-sec-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
.ch-section.is-acao .ch-sec-eyebrow{color:var(--green-muted)}
.ch-sec-title{font-family:'Fraunces',serif;font-size:19px;font-weight:600;margin-bottom:3px}
.ch-sec-sub{font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.5}
.ch-item{padding:12px 0;border-top:1px solid var(--border-light)}
.ch-item:first-of-type{border-top:none;padding-top:2px}
.ch-head{display:flex;align-items:center;gap:9px;margin-bottom:4px;flex-wrap:wrap}
.ch-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.ch-name{font-size:13.5px;font-weight:700;color:var(--text)}
.ch-sub2{font-size:10.5px;color:var(--text-muted);font-weight:500}
.ch-tag{margin-left:auto;font-size:10px;font-weight:700;letter-spacing:.03em;padding:2px 9px;border-radius:20px;white-space:nowrap}
.tag-falta{background:#FBEAD2;color:#9A6313}
.tag-proporcional{background:#E4F4EA;color:#2F7A52}
.tag-excesso{background:#FBE0DD;color:#A33327}
.ch-text{font-size:12.5px;line-height:1.55;color:var(--text2)}
.g-footer{text-align:center;padding:24px 0 6px;font-size:11px;color:var(--text-muted)}
.g-footer-mark{font-size:16px;color:var(--accent);margin-bottom:4px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.p-sit,.tri-sit{animation:fadeUp .7s ease .3s both}.p-ind,.tri-ind{animation:fadeUp .8s ease .5s both}
.fld{animation:fadeUp .9s ease .7s both}.ax{animation:fadeUp .6s ease .55s both}
@media print{body{padding:0}}`;

/* =========================================================================
   MONTAGEM DO DOCUMENTO FINAL (GEOMETRIA)
   ========================================================================= */
function note(kind, icon, html) {
    return `<div class="note fn-${kind}"><span class="note-icon">${icon}</span><div>${html}</div></div>`;
}

const CHAKRA_DISPLAY = ['raiz', 'sacral', 'plexo', 'cardiaco', 'laringeo', 'frontal', 'coronario'];

function verdict(antes, sit) {
    const d = antes - sit;
    if (d <= -0.75) return { key: 'falta', label: 'Falta' };
    if (d >= 0.75) return { key: 'excesso', label: 'Excesso' };
    return { key: 'proporcional', label: 'Proporcional' };
}

function buildGpsBreadcrumb(nav) {
    if (!nav) return '';
    const items = [
        { geo: 'Alvo', val: nav.alvo },
        { geo: 'Continente', val: nav.continente },
        { geo: 'País', val: nav.pais },
        { geo: 'Cidade', val: nav.cidade },
        { geo: 'Rua', val: nav.rua },
        { geo: 'Casa', val: nav.casa },
    ].filter(it => it.val);
    if (!items.length) return '';
    return `<div class="gps">` + items.map((it, i) => {
        const arrow = i < items.length - 1 ? `<span class="gps-arrow">→</span>` : '';
        return `<div class="gps-item"><span class="gps-geo">${escapeHtmlSafe(it.geo)}</span><span class="gps-val">${escapeHtmlSafe(it.val)}</span></div>${arrow}`;
    }).join('') + `</div>`;
}

function buildPonteCard(data) {
    const p = data.ponte || {};
    if (!p.frase && !p.texto) return '';
    const eyebrow = p.idioma
        ? `Ponte Não-Dual · traduzida pro seu ${escapeHtmlSafe(p.idioma)}`
        : 'Ponte Não-Dual';
    return `<div class="ponte">
  <div class="ponte-eyebrow">${eyebrow}</div>
  ${p.frase ? `<div class="ponte-frase">${escapeHtmlLight(p.frase)}</div>` : ''}
  ${p.texto ? `<div class="ponte-text">${escapeHtmlLight(p.texto)}</div>` : ''}
</div>`;
}

function buildChakraAnalysisFez(data, nome) {
    const items = CHAKRA_DISPLAY.map(k => {
        const c = CHAKRAS[k];
        const e = data.chakras?.[k] || {};
        const antes = clamp(num(e.antes), 0, 10);
        const sit = clamp(num(e.sit), 0, 10);
        const v = verdict(antes, sit);
        return `<div class="ch-item">
  <div class="ch-head"><span class="ch-dot" style="background:${c.color}"></span><span class="ch-name">${c.nome}</span><span class="ch-sub2">${c.sub}</span><span class="ch-tag tag-${v.key}">${v.label} · ${fmt(antes)}</span></div>
  <div class="ch-text">${escapeHtmlLight(e.fez || '')}</div>
</div>`;
    }).join('\n');
    return `<div class="ch-section">
  <div class="ch-sec-eyebrow">Leitura · o que ${nome} fez</div>
  <div class="ch-sec-title">O que ${nome} fez em cada chakra</div>
  <div class="ch-sec-sub">Onde deu de menos (falta), de mais (excesso) ou na medida (proporcional) — sempre comparado ao que <b>esta</b> situação pedia.</div>
  ${items}
</div>`;
}

function buildChakraAnalysisAcao(data, nome) {
    const items = CHAKRA_DISPLAY.map(k => {
        const c = CHAKRAS[k];
        const e = data.chakras?.[k] || {};
        const sit = clamp(num(e.sit), 0, 10);
        return `<div class="ch-item">
  <div class="ch-head"><span class="ch-dot" style="background:${c.color}"></span><span class="ch-name">${c.nome}</span><span class="ch-sub2">${c.sub}</span><span class="ch-tag tag-proporcional">Proporcional · ${fmt(sit)}</span></div>
  <div class="ch-text">${escapeHtmlLight(e.acao || '')}</div>
</div>`;
    }).join('\n');
    return `<div class="ch-section is-acao">
  <div class="ch-sec-eyebrow">Ajuste · a versão proporcional</div>
  <div class="ch-sec-title">O que ${nome} pode fazer em cada chakra</div>
  <div class="ch-sec-sub">O movimento do tamanho certo pra encaixar no que a situação pede — não é virar "mais", é chegar no proporcional.</div>
  ${items}
</div>`;
}

function buildReportDocument(data) {
    const nome = escapeHtmlSafe(data.nome || 'você');
    const sitResumo = escapeHtmlSafe(data.situacao_resumo || '');

    const sit = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.sit), 0, 10));
    const antes = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.antes), 0, 10));
    const depois = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.depois), 0, 10));

    const m = data.mergulho || {};
    const mKey = CHAKRAS[m.chakra] ? m.chakra : 'cardiaco';
    const mChakra = CHAKRAS[mKey];
    const prop = clamp(num(m.proporcional), 0, 10);
    const indAntes = clamp(num(m.individuo_antes), 0, 10);
    const indDepois = clamp(num(m.individuo_depois ?? prop), 0, 10);
    const recorte = escapeHtmlSafe(m.recorte_situacao || data.situacao_resumo || '');
    const poloFalta = m.polo_falta || 'Falta';
    const poloExcesso = m.polo_excesso || 'Excesso';

    const radarSub = escapeHtmlSafe(data.radar_sub ||
        'A linha dourada é o que a situação pede em cada chakra. A área verde é o que ' + nome + ' fez. Dentro da dourada = falta; fora = excesso.');

    const gps = buildGpsBreadcrumb(data.navegacao);
    const mapaTag = data.mapa_titulo
        ? `<div class="zoom-tag">Mapa que ressoou · ${escapeHtmlSafe(data.mapa_titulo)}</div>`
        : `<div class="zoom-tag">Fórmula Rafael · zoom Amplo · radar</div>`;

    const radarBody = `
<div class="g-header">
  ${mapaTag}
  <h1>Os 7 chakras de ${nome} — Situação vs Indivíduo</h1>
  <div class="g-header-sub">${radarSub}</div>
</div>

${gps}

<div class="situacao">
  <div class="situacao-label">Situação — ${nome}</div>
  <div class="situacao-text">${sitResumo}</div>
</div>

<div class="legend-row">
  <div class="legend-item"><span class="legend-swatch sw-sit"></span> Situação — o que pede (proporcional por chakra)</div>
  <div class="legend-item"><span class="legend-swatch sw-ind"></span> Indivíduo — o que ${nome} fez</div>
</div>

<div class="radar-block rb-antes">
  <div class="radar-top"><div class="radar-eyebrow eb-antes">Antes · perfil torto</div><div class="radar-title">A área verde não acompanha a dourada</div></div>
  <div class="svg-wrap">${buildRadarSVG(sit, antes, false)}</div>
  ${note('antes', '⚠️', escapeHtmlLight(data.radar_nota_antes || ''))}
</div>

<div class="radar-block rb-depois">
  <div class="radar-top"><div class="radar-eyebrow eb-depois">Depois · perfil encaixado</div><div class="radar-title">A área verde pousa sobre a dourada</div></div>
  <div class="svg-wrap">${buildRadarSVG(sit, depois, true)}</div>
  ${note('depois', '✦', escapeHtmlLight(data.radar_nota_depois || ''))}
</div>

<div class="closing">${escapeHtmlLight(data.radar_fechamento || 'A linha dourada é o proporcional <b>desta</b> situação — ela é o gabarito, não o máximo. O alvo é <b>tocar a linha dourada</b>, que muda de forma a cada situação.')}</div>`;

    const vertice = escapeHtmlLight(data.vertice_chave || `O <b>${mChakra.nome}</b> é o vértice-chave: o ponto onde o menor movimento gera a maior mudança. Mover ele reorganiza o resto da estrela.`);

    const mergulhoBody = `
<div class="divider"><span class="divider-tag">✦ Mergulho · vértice-chave</span></div>

<div class="g-header">
  <div class="zoom-tag">Fórmula Rafael · zoom Específico</div>
  <h1>Chakra <span class="chakra" style="color:${mChakra.color}">${mChakra.nome}</span> — os dois triângulos</h1>
  <div class="g-header-sub">Um triângulo é o que a situação pede neste chakra; o outro é o que ${nome} fez. Encaixe simétrico = bateu. Encaixe torto = não bateu.</div>
</div>

<div class="key-card">${vertice}</div>

<div class="situacao">
  <div class="situacao-label">Situação — ${nome} · recorte do ${mChakra.nome}</div>
  <div class="situacao-text">${recorte}</div>
</div>

<div class="legend-row">
  <div class="legend-item"><span class="legend-glyph" style="color:#C9A84C">▼</span> Situação — o que pede neste chakra</div>
  <div class="legend-item"><span class="legend-glyph" style="color:#4CAF82">▲</span> Indivíduo — o que ${nome} fez</div>
</div>

<div class="tri-block tb-antes">
  <div class="tri-top"><div class="tri-eyebrow eb-antes">Antes · encaixe torto</div><div class="tri-title">O que ${nome} fez ficou deslocado do que a situação pedia</div></div>
  <div class="svg-wrap">${buildTriSVG(prop, indAntes, poloFalta, poloExcesso, false)}</div>
  ${note('antes', '⚠️', escapeHtmlLight(m.nota_antes || ''))}
</div>

<div class="tri-block tb-depois">
  <div class="tri-top"><div class="tri-eyebrow eb-depois">Depois · encaixe simétrico</div><div class="tri-title">O que ${nome} fez coincide com o que a situação pede</div></div>
  <div class="svg-wrap">${buildTriSVG(prop, indDepois, poloFalta, poloExcesso, Math.abs(indDepois - prop) < 0.05)}</div>
  ${note('depois', '✦', escapeHtmlLight(m.nota_depois || ''))}
</div>

${buildPonteCard(data)}

${buildChakraAnalysisFez(data, nome)}

${buildChakraAnalysisAcao(data, nome)}`;

    return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Geometria do Jogo da Alma — ${nome}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet">
<style>${REPORT_STYLE}</style></head><body><div class="page">
${radarBody}
${mergulhoBody}
<div class="g-footer"><div class="g-footer-mark">✦</div>Jogo da Alma · GPS da Alma · Mapa &amp; Ressonância → Geometria</div>
</div></body></html>`;
}

/* ---------- coerção / escapes ---------- */
function num(v) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
}
function escapeHtmlSafe(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeHtmlLight(s) {
    let t = String(s == null ? '' : s);
    t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/&lt;(\/?(?:b|i|strong|em))&gt;/g, '<$1>');
    return t;
}

/* Markdown leve para as bolhas do chat: **negrito**, *itálico*, listas com - e parágrafos. */
function renderChatMarkdown(raw) {
    let t = String(raw == null ? '' : raw)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/__([^_]+)__/g, '<b>$1</b>');
    t = t.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g, '$1<i>$2</i>');
    const lines = t.split('\n');
    let html = '', inList = false;
    for (const line of lines) {
        const m = line.match(/^\s*[-•]\s+(.*)$/);
        if (m) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += '<li>' + m[1] + '</li>';
        } else {
            if (inList) { html += '</ul>'; inList = false; }
            if (line.trim() !== '') html += '<p>' + line + '</p>';
        }
    }
    if (inList) html += '</ul>';
    return html || '<p></p>';
}

/* =========================================================================
   SYSTEM PROMPT 1 — GERADOR DE MAPAS (Ressonância)
   ========================================================================= */
const SYSTEM_PROMPT_MAPAS = `Você é o **GPS da Alma**, o motor de navegação do método **Jogo da Alma**. Sua função NÃO é dar respostas diretas. Sua função é ser um **gerador de mapas possíveis**: você devolve hipóteses organizadas e faz perguntas, para que a pessoa NAVEGUE por **ressonância** (sinta qual mapa tem aderência à realidade dela).

## FILOSOFIA CENTRAL (não quebrar)
- **Mapa + Ressonância = Conhecimento.** A IA gera mapas; o humano escolhe por ressonância; a realidade valida pela experiência.
- A IA **nunca** dá um veredito fechado ("faça X"). Ela apresenta caminhos possíveis e pergunta "isso ressoa com você?".
- Toda comunicação acontece em **três níveis de visão simultâneos**, porque ver algo por um único ângulo é limitado:
  - **Amplo** = o princípio universal (Constelação / Área da vida).
  - **Médio** = o padrão (Estrela / Chakra + Tema).
  - **Específico** = o caso concreto (Triângulo / Elemento + Situação).
- Você só precisa do **Amplo** e do **Médio** que a pessoa trouxe; o **Específico** você infere por lógica.

## O GPS DA ALMA (a hierarquia de navegação)
Cada mapa é uma rota descendo os níveis, como um GPS geográfico:
- **Alvo** = o resultado desejado (o destino).
- **Continente** = a área da vida (visão Ampla).
- **País** = o **chakra** dominante daquele mapa (visão Média).
- **Cidade** = o **tema** dentro do chakra (ex.: no Laríngeo → "posicionamento", "verdade", "convite").
- **Rua** = o **elemento** específico (o gesto/recorte concreto).
- **Casa** = a **situação concreta** atual + se ali há **falta**, **proporcional** ou **excesso**.

## OS 7 CHAKRAS (dimensões; cada um é uma "porta" legítima, nenhum é superior)
- **raiz** — segurança, estrutura. Falta: inseguro, sem base. Excesso: rígido, controlador.
- **sacral** — vitalidade, prazer, criatividade. Falta: apático. Excesso: impulsivo.
- **plexo** — poder pessoal, posição, autovalor. Falta: se apaga. Excesso: domina, atropela.
- **cardiaco** — amor, conexão. Falta: frieza, distância. Excesso: anulação (some pra não magoar).
- **laringeo** — voz, verdade, comunicação. Falta: se cala. Excesso: fala demais, machuca.
- **frontal** — discernimento, clareza. Falta: confuso, se ilude. Excesso: analisa demais, paralisa.
- **coronario** — propósito, sentido, visão. Falta: perdido. Excesso: na nuvem, desconectado.

## A RÉGUA: falta / proporcional / excesso
O objetivo nunca é "mais". É **proporcional à situação**. O mesmo gesto pode ser pouco numa hora e demais em outra. A solução é sempre o proporcional, nunca um polo.

## IDIOMA NATIVO (Lei Não-Dual)
Se a pessoa informar seu chakra dominante, esse é o **idioma nativo** dela — não o obstáculo. Ela acessa os outros chakras *através* dele. Não mande "vire outra pessoa": mostre como a energia que falta já vive dentro do que ela já é. (Ex.: pra alguém Cardíaco, em vez de "tenha mais limites", diga "porque você ama, precisa se incluir no amor".)

## SUA TAREFA AGORA (etapa 1 de 2)
Gere **2 ou 3 MAPAS POSSÍVEIS** — leituras diferentes e plausíveis de ONDE a raiz da situação pode estar. Cada mapa aponta para um **chakra/tema diferente** (não repita o mesmo país). Não decida qual é o certo: é a pessoa quem vai ressoar. Para cada mapa, faça perguntas e dê um exemplo concreto para a pessoa testar a aderência.

## FORMATO DE SAÍDA (CRÍTICO)
Responda **APENAS com um objeto JSON válido**, sem markdown, sem cercas de código, sem texto antes ou depois. Estrutura exata:

{
  "nome": "Anna",
  "continente": "Relacionamentos",
  "alvo": "Frase curta com o destino/resultado desejado (≤ 120 caracteres).",
  "leitura_ampla": "1–2 frases com o PRINCÍPIO UNIVERSAL (visão Ampla) que rege essa área da vida aqui — o que, no geral, esse tipo de movimento sempre exige.",
  "mapas": [
    {
      "id": "slug-curto",
      "titulo": "Título do mapa começando com 'Se a raiz for…' (≤ 60 caracteres).",
      "chakra": "uma chave: raiz|sacral|plexo|cardiaco|laringeo|frontal|coronario",
      "amplo": "1 frase: o princípio universal por trás deste mapa (visão Ampla).",
      "medio": "1 frase: o padrão — como esse chakra+tema costuma aparecer em várias áreas (visão Média).",
      "especifico": "1 frase: como isso apareceria concretamente NO caso da pessoa (visão Específica, inferida por lógica).",
      "tema": "a Cidade — o tema dentro do chakra (1–3 palavras).",
      "elemento": "a Rua — o elemento/gesto específico (1–4 palavras).",
      "casa": "a Casa — a situação concreta hipotética (≤ 90 caracteres).",
      "dualidade": "falta|excesso|proporcional — o veredito hipotético deste mapa.",
      "ressonancia": ["Pergunta 1 pra testar se ressoa?", "Pergunta 2?", "Pergunta 3 (opcional)?"],
      "exemplo": "1–2 frases com um exemplo concreto do dia a dia que ilustra este mapa."
    }
  ]
}

Regras: 2 a 3 mapas, cada um com um **chakra diferente**. Tom acolhedor, preciso, português do Brasil, sem misticismo. Perguntas abertas e específicas (nunca sim/não vazios). Devolva SOMENTE o JSON.`;

/* =========================================================================
   SYSTEM PROMPT 2 — GEOMETRIA do mapa escolhido
   ========================================================================= */
const SYSTEM_PROMPT_GEOMETRIA = `Você é o motor analítico do **Jogo da Alma**. A pessoa já navegou pelos mapas e **escolheu por ressonância** um caminho. Agora você faz o **mergulho na geometria**: lê a situação como o encontro de duas formas — o que a SITUAÇÃO pede e o que o INDIVÍDUO fez — e devolve os DADOS de uma análise geométrica. Respeite o mapa que ressoou (use o chakra/tema dele como centro do diagnóstico), mas corrija se o relato pedir.

## FILOSOFIA (não quebrar)
- O objetivo nunca é "mais". É **proporcional à situação**. Coragem demais vira imprudência; amor demais vira anulação; clareza demais vira paralisia.
- Em cada dimensão a pessoa pode fazer **de menos** (falta), **na medida** (proporcional) ou **de mais** (excesso).
- O "na medida" depende da situação e **se move**. Um número sozinho não diz nada: 5 só significa algo lido contra o que a situação pede.
- **Integração não é fusão.** O "depois" é encaixe (estrela simétrica), não virar o que o outro quer.
- **Anel aberto:** o depois não é permanente; a próxima situação reabre o jogo.
- A solução é **sempre o proporcional**, nunca um polo.
- **Só o indivíduo é medido.** A situação mostra o que pede; nunca diagnostique o outro.

## OS 7 CHAKRAS
- **raiz** — segurança, estrutura. Falta: inseguro. Excesso: rígido, controlador.
- **sacral** — vitalidade, prazer, criatividade. Falta: apático. Excesso: impulsivo.
- **plexo** — poder pessoal, posição, autovalor. Falta: se apaga. Excesso: domina.
- **cardiaco** — amor, conexão. Falta: frieza. Excesso: anulação.
- **laringeo** — voz, verdade. Falta: se cala. Excesso: fala demais, machuca.
- **frontal** — discernimento, clareza. Falta: confuso. Excesso: paralisa.
- **coronario** — propósito, sentido. Falta: perdido. Excesso: desconectado do concreto.

## PROCESSO
1. **Situação (linha dourada):** para cada um dos 7 chakras, defina de 0 a 10 quanto ESTA situação pede (o proporcional/gabarito). Nem tudo é alto — a maioria pede valores médios (4–7) e alguns baixos.
2. **Indivíduo ANTES (área verde):** quanto a pessoa trouxe em cada chakra. Abaixo do dourado = falta; acima = excesso. Capture o desencaixe real.
3. **Indivíduo DEPOIS:** o ajuste que encaixa — em geral igual (ou bem próximo) ao dourado, a pessoa pousando sobre o que a situação pede, SEM se anular.
4. **Vértice-chave:** o ÚNICO chakra cujo movimento reorganiza o resto. Vira o "mergulho" (priorize o chakra do mapa escolhido, se fizer sentido).
5. **Mergulho:** nesse chakra, nomeie o eixo Falta↔Excesso com os DOIS polos específicos do caso, o proporcional pedido, onde a pessoa estava (antes) e o ajuste (depois = proporcional).
6. **Ponte Não-Dual:** traduza o ajuste-chave para o **idioma nativo** da pessoa (chakra dominante informado). Frase curta no formato "A melhor forma de [energia nativa] é [incluir o chakra que falta]." Se não houver idioma nativo informado, use o próprio chakra do vértice-chave.

## NAVEGAÇÃO (preencha o breadcrumb do GPS)
Reaproveite a rota do mapa escolhido: alvo (destino), continente (área), país (nome do chakra do vértice), cidade (tema), rua (elemento), casa (situação concreta + dualidade).

## REGRAS DOS NÍVEIS
- Inteiros ou .5 (ex.: 2, 6, 7.5), de 0 a 10.
- A linha dourada (sit) é **constante** entre antes e depois.
- "depois" de cada chakra coincide (ou quase) com o "sit" daquele chakra.
- No mergulho, "individuo_depois" deve ser igual a "proporcional".
- Os polos do mergulho são modos de ERRAR; a solução é o proporcional no meio. Ex.: Cardíaco → falta="Frieza", excesso="Anulação".

## LINGUAGEM
- Português do Brasil, usando o nome da pessoa. Acolhedor, preciso, sem misticismo.
- Verbos de movimento ("recuar", "sustentar", "subir", "encaixar"), nunca "resolver".
- Nas notas, pode usar <b>negrito</b> (apenas <b> e <i>).

## FORMATO DE SAÍDA (CRÍTICO)
Responda **APENAS com um objeto JSON válido**, sem markdown, sem cercas de código. Estrutura exata:

{
  "nome": "Anna",
  "situacao_resumo": "Frase curta em 3ª pessoa resumindo a situação para o cartão escuro (≤ 240 caracteres).",
  "radar_sub": "1 frase explicando o radar com o nome da pessoa (opcional).",
  "navegacao": {
    "alvo": "o destino/resultado (curto)",
    "continente": "a área da vida",
    "pais": "nome do chakra do vértice-chave (ex.: Plexo)",
    "cidade": "o tema",
    "rua": "o elemento específico",
    "casa": "a situação concreta + dualidade (ex.: 'engole há 4 dias · falta')"
  },
  "chakras": {
    "raiz":      {"sit": 5, "antes": 4, "depois": 5, "fez": "...", "acao": "..."},
    "sacral":    {"sit": 5, "antes": 5, "depois": 5, "fez": "...", "acao": "..."},
    "plexo":     {"sit": 7, "antes": 2, "depois": 7, "fez": "...", "acao": "..."},
    "cardiaco":  {"sit": 6, "antes": 9, "depois": 6, "fez": "...", "acao": "..."},
    "laringeo":  {"sit": 7, "antes": 2, "depois": 7, "fez": "...", "acao": "..."},
    "frontal":   {"sit": 5, "antes": 4, "depois": 5, "fez": "...", "acao": "..."},
    "coronario": {"sit": 6, "antes": 2, "depois": 6, "fez": "...", "acao": "..."}
  },
  "radar_nota_antes": "1–2 frases: quais chakras estouram pra fora (excesso) e quais afundam pra dentro (falta). Pode usar <b>.",
  "radar_nota_depois": "1–2 frases: como o verde passa a rastrear o dourado. Inclua a ideia de anel aberto.",
  "radar_fechamento": "1–2 frases lembrando que a dourada é o proporcional desta situação, não o máximo.",
  "vertice_chave": "1–2 frases nomeando o chakra-chave e por que mover ele reorganiza o resto. Pode usar <b>.",
  "mergulho": {
    "chakra": "plexo",
    "recorte_situacao": "Frase curta recortando a situação pela lente desse chakra (≤ 200 caracteres).",
    "polo_falta": "nome curto do polo de falta (1–2 palavras)",
    "polo_excesso": "nome curto do polo de excesso (1–2 palavras)",
    "proporcional": 7,
    "individuo_antes": 2,
    "individuo_depois": 7,
    "nota_antes": "1–2 frases: os triângulos não encaixam; onde a pessoa ficou e a distância do proporcional. Pode usar <b>.",
    "nota_depois": "1–2 frases: a pessoa se move ao proporcional, a estrela fica simétrica, o campo acende. Pode usar <b>."
  },
  "ponte": {
    "idioma": "Nome do chakra nativo (ex.: Cardíaco) ou vazio",
    "frase": "A frase-ponte não-dual, curta e memorável.",
    "texto": "1–2 frases explicando como, pela energia nativa, a pessoa acessa o que falta sem deixar de ser quem é. Pode usar <b>."
  }
}

Para CADA um dos 7 chakras, preencha "fez" (1 frase: o que fez e por que é falta/proporcional/excesso, comparando antes vs sit) e "acao" (1 frase: o movimento proporcional, com verbo de movimento; nunca um polo). Os 7 chakras são obrigatórios. "chakra" do mergulho deve ser: raiz, sacral, plexo, cardiaco, laringeo, frontal ou coronario. Devolva SOMENTE o JSON.`;

const LOADING_MESSAGES_MAPAS = [
    'Lendo onde você quer chegar...',
    'Localizando o continente da sua situação...',
    'Traçando rotas possíveis no GPS da Alma...',
    'Gerando mapas em três níveis de visão...',
    'Formulando perguntas de ressonância...',
    'Conferindo se cada mapa abre uma porta diferente...',
    'Finalizando os mapas possíveis...'
];
const LOADING_MESSAGES_GEO = [
    'Mergulhando no mapa que ressoou...',
    'Mapeando o que a situação pede em cada chakra...',
    'Lendo onde você está — falta, proporcional ou excesso...',
    'Desenhando a linha dourada do gabarito...',
    'Encontrando o vértice-chave...',
    'Sobrepondo os dois triângulos do mergulho...',
    'Traduzindo a Ponte Não-Dual pro seu idioma...',
    'Finalizando sua geometria...'
];

/* =========================================================================
   APP
   ========================================================================= */
class GpsDaAlma {
    constructor() {
        this.apiKey = localStorage.getItem('ja_gps_api_key') || localStorage.getItem('ja_geo_api_key') || '';
        this.model = localStorage.getItem('ja_gps_model') || 'anthropic/claude-sonnet-4.6';
        this.continente = '';
        this.idiomaNativo = '';
        this.mapsData = null;
        this.selectedMap = null;
        this.lastDoc = '';
        this.lastData = null;
        this.chatHistory = [];
        this.chatStreaming = false;
        this.loadingTimer = null;
        this.loadingIdx = 0;
        this.cacheEls();
        this.renderChips();
        this.bind();
        this.hydrateSettings();
        this.initReveal();
    }

    cacheEls() {
        this.$ = (id) => document.getElementById(id);
        this.ctaBtn = this.$('ctaBtn');
        this.settingsToggle = this.$('settingsToggle');
        this.settingsPanel = this.$('settingsPanel');
        this.apiKeyInput = this.$('apiKeyInput');
        this.modelInput = this.$('modelInput');
        this.saveSettingsBtn = this.$('saveSettingsBtn');
        this.nameInput = this.$('nameInput');
        this.destinoInput = this.$('destinoInput');
        this.ondeInput = this.$('ondeInput');
        this.continentChips = this.$('continentChips');
        this.nativeChips = this.$('nativeChips');
        this.generateBtn = this.$('generateBtn');
        this.statusBox = this.$('statusBox');
        this.loadingText = this.$('loadingText');
        this.loadingCount = this.$('loadingCount');
        this.errorMsg = this.$('errorMsg');
        this.mapsSection = this.$('mapsSection');
        this.mapsGrid = this.$('mapsGrid');
        this.amploBanner = this.$('amploBanner');
        this.remapBtn = this.$('remapBtn');
        this.resultSection = this.$('resultSection');
        this.resultFrame = this.$('resultFrame');
        this.downloadHtmlBtn = this.$('downloadHtmlBtn');
        this.openTabBtn = this.$('openTabBtn');
        this.backToMapsBtn = this.$('backToMapsBtn');
        this.newAnalysisBtn = this.$('newAnalysisBtn');
        this.inputCard = this.$('inputCard');
        this.chatSection = this.$('chatSection');
        this.chatMessages = this.$('chatMessages');
        this.chatSuggest = this.$('chatSuggest');
        this.chatInput = this.$('chatInput');
        this.chatSend = this.$('chatSend');
    }

    renderChips() {
        this.continentChips.innerHTML = CONTINENTES.map(c =>
            `<button type="button" class="chip" data-cont="${c.id}" data-nome="${c.nome}"><span class="chip-emoji">${c.emoji}</span>${c.nome}</button>`
        ).join('');
        this.nativeChips.innerHTML = CHAKRA_DISPLAY.map(k =>
            `<button type="button" class="chip gold" data-chakra="${k}" data-nome="${CHAKRAS[k].nome}">${CHAKRAS[k].nome}</button>`
        ).join('');

        this.continentChips.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const already = chip.classList.contains('selected');
                this.continentChips.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
                if (!already) { chip.classList.add('selected'); this.continente = chip.dataset.nome; }
                else this.continente = '';
            });
        });
        this.nativeChips.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const already = chip.classList.contains('selected');
                this.nativeChips.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
                if (!already) { chip.classList.add('selected'); this.idiomaNativo = chip.dataset.nome; }
                else this.idiomaNativo = '';
            });
        });
    }

    bind() {
        this.ctaBtn?.addEventListener('click', () => {
            document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.destinoInput.focus(), 600);
        });
        this.settingsToggle.addEventListener('click', () => this.settingsPanel.classList.toggle('open'));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.generateBtn.addEventListener('click', () => this.handleGenerateMaps());
        this.remapBtn.addEventListener('click', () => this.handleGenerateMaps());
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.openTabBtn.addEventListener('click', () => this.openInNewTab());
        this.backToMapsBtn.addEventListener('click', () => this.backToMaps());
        this.newAnalysisBtn.addEventListener('click', () => this.resetForm());

        this.chatSend.addEventListener('click', () => this.sendChat());
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendChat(); }
        });
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 150) + 'px';
        });
    }

    hydrateSettings() {
        if (this.apiKey) this.apiKeyInput.value = this.apiKey;
        this.modelInput.value = this.model;
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value.trim() || 'anthropic/claude-sonnet-4.6';
        localStorage.setItem('ja_gps_api_key', this.apiKey);
        localStorage.setItem('ja_gps_model', this.model);
        this.settingsPanel.classList.remove('open');
        this.showToast('Configurações salvas', 'success');
    }

    initReveal() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.15 });
        document.querySelectorAll('.animate-in').forEach(el => obs.observe(el));
    }

    startLoading(messages) {
        this.loadingIdx = 0;
        this.loadingText.textContent = messages[0];
        this.loadingTimer = setInterval(() => {
            this.loadingIdx = (this.loadingIdx + 1) % messages.length;
            this.loadingText.textContent = messages[this.loadingIdx];
        }, 2600);
    }
    stopLoading() {
        if (this.loadingTimer) { clearInterval(this.loadingTimer); this.loadingTimer = null; }
    }

    /* -------------------- ETAPA 1: GERAR MAPAS -------------------- */
    async handleGenerateMaps() {
        const destino = this.destinoInput.value.trim();
        const onde = this.ondeInput.value.trim();
        const nome = this.nameInput.value.trim();
        this.errorMsg.style.display = 'none';

        if (!this.apiKey) {
            this.showError('Configure sua <strong>chave de API do OpenRouter</strong> nas configurações (engrenagem) antes de gerar.');
            this.settingsPanel.classList.add('open');
            return;
        }
        if (!this.continente) {
            this.showError('Escolha o <strong>continente</strong> (a área da vida) onde você quer gerar movimento.');
            return;
        }
        if (destino.length < 4 && onde.length < 12) {
            this.showError('Diga ao menos <strong>aonde quer chegar</strong> ou <strong>onde está agora</strong> com um pouco mais de detalhe.');
            return;
        }

        this.generateBtn.disabled = true;
        this.remapBtn.disabled = true;
        this.statusBox.style.display = 'flex';
        this.resultSection.style.display = 'none';
        this.loadingCount.textContent = '';
        this.startLoading(LOADING_MESSAGES_MAPAS);

        try {
            const userMsg = this.buildMapsUserMsg(nome, destino, onde);
            const raw = await this.streamAnalysis(SYSTEM_PROMPT_MAPAS, userMsg, 3500);
            const data = this.parseJSON(raw, ['mapas']);
            if (nome && !data.nome) data.nome = nome;
            if (!data.continente) data.continente = this.continente;
            this.mapsData = data;
            this.renderMaps(data);
        } catch (err) {
            console.error(err);
            this.showError('Erro ao gerar mapas: ' + (err?.message || err) + '<br><br>Verifique sua chave de API e o modelo, e tente novamente.');
        } finally {
            this.stopLoading();
            this.generateBtn.disabled = false;
            this.remapBtn.disabled = false;
            this.statusBox.style.display = 'none';
        }
    }

    buildMapsUserMsg(nome, destino, onde) {
        const parts = [];
        if (nome) parts.push(`Nome da pessoa: ${nome}`);
        parts.push(`Continente (área da vida onde quer gerar movimento): ${this.continente}`);
        if (destino) parts.push(`Alvo (aonde quer chegar): ${destino}`);
        if (onde) parts.push(`Onde está agora (o atrito atual):\n${onde}`);
        if (this.idiomaNativo) parts.push(`Idioma nativo (chakra dominante da pessoa): ${this.idiomaNativo}`);
        parts.push(`\nGere os 2–3 mapas possíveis (visão Amplo/Médio/Específico) com perguntas de ressonância. Não dê uma resposta direta.`);
        return parts.join('\n');
    }

    renderMaps(data) {
        // banner do nível Amplo (princípio universal + continente)
        const cont = CONTINENTES.find(c => c.nome === (data.continente || this.continente));
        const emoji = cont ? cont.emoji : '🧭';
        this.amploBanner.innerHTML = `<div class="amplo-banner">
            <div class="glyph-wrap">${glyphConstelacao('#C9A84C', 42)}</div>
            <div><b>Visão ampla · ${emoji} ${escapeHtmlSafe(data.continente || this.continente)}</b><br>${escapeHtmlSafe(data.leitura_ampla || '')}</div>
        </div>`;

        const mapas = Array.isArray(data.mapas) ? data.mapas : [];
        this.mapsGrid.innerHTML = mapas.map((mp, i) => this.renderMapCard(mp, i)).join('');

        this.mapsGrid.querySelectorAll('[data-pick]').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                this.selectMap(parseInt(btn.dataset.pick, 10));
            });
        });
        this.mapsGrid.querySelectorAll('.map-card').forEach(card => {
            card.addEventListener('click', () => this.selectMap(parseInt(card.dataset.idx, 10)));
        });

        this.selectedMap = null;
        this.mapsSection.style.display = 'block';
        setTimeout(() => this.mapsSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }

    renderMapCard(mp, i) {
        const chakra = CHAKRAS[mp.chakra] || CHAKRAS.cardiaco;
        const dual = (mp.dualidade || '').toLowerCase();
        const dualClass = dual === 'falta' ? 'dual-falta' : dual === 'excesso' ? 'dual-excesso' : 'dual-proporcional';
        const dualLabel = dual ? (dual.charAt(0).toUpperCase() + dual.slice(1)) : '';
        const reson = Array.isArray(mp.ressonancia) ? mp.ressonancia : [];

        return `<div class="map-card" data-idx="${i}" style="animation-delay:${i * 0.08}s">
  <div class="map-top">
    <div class="map-glyph">${glyphEstrela(chakra.color, 46)}</div>
    <div class="map-title">${escapeHtmlSafe(mp.titulo || 'Mapa ' + (i + 1))}</div>
  </div>

  <div class="map-route">
    <div class="route-step"><span class="route-level">País · Chakra</span><span class="route-val"><b>${chakra.nome}</b> · ${escapeHtmlSafe(chakra.sub)}</span></div>
    <div class="route-step"><span class="route-level">Cidade · Tema</span><span class="route-val">${escapeHtmlSafe(mp.tema || '—')}</span></div>
    <div class="route-step"><span class="route-level">Rua · Elemento</span><span class="route-val">${escapeHtmlSafe(mp.elemento || '—')}</span></div>
    <div class="route-step"><span class="route-level">Casa</span><span class="route-val">${escapeHtmlSafe(mp.casa || '—')}</span></div>
  </div>
  ${dualLabel ? `<span class="dualidade-tag ${dualClass}">${dualLabel}</span>` : ''}

  <div class="map-block" style="margin-top:0.9rem">
    <div class="map-block-label gold">Amplo</div>
    <p>${escapeHtmlSafe(mp.amplo || '')}</p>
  </div>
  <div class="map-block">
    <div class="map-block-label">Médio</div>
    <p>${escapeHtmlSafe(mp.medio || '')}</p>
  </div>
  <div class="map-block">
    <div class="map-block-label" style="color:#2F7A52">Específico</div>
    <p>${escapeHtmlSafe(mp.especifico || '')}</p>
  </div>

  ${reson.length ? `<div class="map-block">
    <div class="map-block-label">Isso ressoa?</div>
    <ul class="reson-list">${reson.map(q => `<li>${escapeHtmlSafe(q)}</li>`).join('')}</ul>
  </div>` : ''}

  ${mp.exemplo ? `<div class="map-block">
    <div class="map-block-label">Exemplo</div>
    <p style="font-style:italic">${escapeHtmlSafe(mp.exemplo)}</p>
  </div>` : ''}

  <div class="map-pick">
    <span class="pick-q">É este o mais próximo?</span>
    <button class="pick-btn" data-pick="${i}">
      Mergulhar neste
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  </div>
</div>`;
    }

    /* -------------------- ETAPA 2: GEOMETRIA DO MAPA -------------------- */
    async selectMap(i) {
        const mapas = this.mapsData?.mapas || [];
        const mp = mapas[i];
        if (!mp) return;
        this.selectedMap = mp;

        this.mapsGrid.querySelectorAll('.map-card').forEach((c, idx) => {
            c.classList.toggle('selected', idx === i);
            c.classList.toggle('dimmed', idx !== i);
        });

        if (!this.apiKey) {
            this.showError('Configure sua chave de API antes de mergulhar.');
            return;
        }

        this.errorMsg.style.display = 'none';
        this.statusBox.style.display = 'flex';
        this.loadingCount.textContent = '';
        this.generateBtn.disabled = true;
        this.remapBtn.disabled = true;
        this.startLoading(LOADING_MESSAGES_GEO);

        try {
            const userMsg = this.buildGeoUserMsg(mp);
            const raw = await this.streamAnalysis(SYSTEM_PROMPT_GEOMETRIA, userMsg, 4200);
            const data = this.parseJSON(raw, ['chakras', 'mergulho']);
            if (this.mapsData?.nome && !data.nome) data.nome = this.mapsData.nome;
            data.mapa_titulo = mp.titulo || '';
            // fallback de navegação com base no mapa escolhido
            data.navegacao = data.navegacao || {};
            const cont = this.mapsData?.continente || this.continente;
            if (!data.navegacao.continente) data.navegacao.continente = cont;
            if (!data.navegacao.alvo) data.navegacao.alvo = this.mapsData?.alvo || this.destinoInput.value.trim();
            if (!data.navegacao.cidade) data.navegacao.cidade = mp.tema;
            if (!data.navegacao.rua) data.navegacao.rua = mp.elemento;
            if (!data.navegacao.casa) data.navegacao.casa = mp.casa;
            const doc = buildReportDocument(data);
            this.lastDoc = doc;
            this.lastData = data;
            this.renderResult(doc);
            this.initChat(data);
        } catch (err) {
            console.error(err);
            this.showError('Erro ao gerar a geometria: ' + (err?.message || err) + '<br><br>Tente novamente ou escolha outro mapa.');
        } finally {
            this.stopLoading();
            this.generateBtn.disabled = false;
            this.remapBtn.disabled = false;
            this.statusBox.style.display = 'none';
        }
    }

    buildGeoUserMsg(mp) {
        const d = this.mapsData || {};
        const parts = [];
        if (d.nome) parts.push(`Nome da pessoa: ${d.nome}`);
        parts.push(`Continente (área da vida): ${d.continente || this.continente}`);
        if (d.alvo || this.destinoInput.value.trim()) parts.push(`Alvo (destino desejado): ${d.alvo || this.destinoInput.value.trim()}`);
        const onde = this.ondeInput.value.trim();
        if (onde) parts.push(`Onde a pessoa está agora (relato cru):\n${onde}`);
        if (this.idiomaNativo) parts.push(`Idioma nativo (chakra dominante): ${this.idiomaNativo}`);
        parts.push('');
        parts.push(`A pessoa escolheu por RESSONÂNCIA o seguinte mapa — use o chakra/tema dele como centro do diagnóstico:`);
        parts.push(`• Título: ${mp.titulo || ''}`);
        parts.push(`• País (chakra): ${(CHAKRAS[mp.chakra] || {}).nome || mp.chakra || ''}`);
        parts.push(`• Cidade (tema): ${mp.tema || ''}`);
        parts.push(`• Rua (elemento): ${mp.elemento || ''}`);
        parts.push(`• Casa (situação): ${mp.casa || ''}`);
        parts.push(`• Dualidade hipotética: ${mp.dualidade || ''}`);
        parts.push(`• Leitura específica: ${mp.especifico || ''}`);
        parts.push('');
        parts.push(`Faça o mergulho na geometria (radar dos 7 chakras + dois triângulos no vértice-chave) e a Ponte Não-Dual. Devolva SOMENTE o JSON.`);
        return parts.join('\n');
    }

    /* -------------------- CHAMADA À API (streaming) -------------------- */
    async streamAnalysis(systemPrompt, userMsg, maxTokens) {
        const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': location.origin,
                'X-Title': 'Jogo da Alma GPS'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userMsg }
                ],
                temperature: 0.75,
                max_tokens: maxTokens || 4000,
                stream: true
            })
        });

        if (!resp.ok) {
            let detail = '';
            try { const j = await resp.json(); detail = j?.error?.message || JSON.stringify(j); }
            catch { detail = await resp.text().catch(() => ''); }
            throw new Error(`${resp.status} ${resp.statusText}${detail ? ' — ' + detail : ''}`);
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let full = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();
            for (const line of lines) {
                const t = line.trim();
                if (!t || !t.startsWith('data:')) continue;
                const payload = t.slice(5).trim();
                if (payload === '[DONE]') continue;
                try {
                    const json = JSON.parse(payload);
                    const delta = json.choices?.[0]?.delta?.content || '';
                    if (delta) {
                        full += delta;
                        this.loadingCount.textContent = `${full.length} caracteres`;
                    }
                } catch { /* keep-alive / partial */ }
            }
        }
        return full;
    }

    parseJSON(raw, requiredKeys) {
        if (!raw || !raw.trim()) throw new Error('Resposta vazia do modelo.');
        let t = raw.trim();
        t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
        const first = t.indexOf('{');
        const last = t.lastIndexOf('}');
        if (first === -1 || last === -1) throw new Error('Não encontrei um JSON na resposta do modelo.');
        t = t.slice(first, last + 1);
        let data;
        try {
            data = JSON.parse(t);
        } catch (e) {
            throw new Error('JSON inválido retornado pelo modelo. Tente gerar novamente.');
        }
        for (const k of (requiredKeys || [])) {
            if (!data[k]) throw new Error(`JSON incompleto (faltou "${k}"). Tente novamente.`);
        }
        return data;
    }

    renderResult(doc) {
        this.resultFrame.srcdoc = doc;
        this.resultSection.style.display = 'block';
        setTimeout(() => {
            this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
    }

    /* -------------------- CHAT sobre o resultado -------------------- */
    initChat(data) {
        this.chatHistory = [];
        this.chatMessages.innerHTML = '';
        const nome = data.nome || 'você';
        const mKey = (data.mergulho && CHAKRAS[data.mergulho.chakra]) ? data.mergulho.chakra : 'cardiaco';
        const vertice = CHAKRAS[mKey].nome;

        const welcome = `Pronto, ${nome}. Sua geometria mostra o <b>${vertice}</b> como vértice-chave — o ponto onde o menor movimento reorganiza o resto. Pode me perguntar o que quiser: por que esse é o ponto, qual o primeiro passo, como agir sem se anular, ou peça um exemplo de fala.`;
        this.appendChat('ai', welcome, true);
        this.chatHistory.push({ role: 'assistant', content: `Pronto, ${nome}. Sua geometria mostra o ${vertice} como vértice-chave — o ponto onde o menor movimento reorganiza o resto. Pode me perguntar o que quiser.` });

        this.renderChatSuggestions(data, vertice);
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
    }

    renderChatSuggestions(data, vertice) {
        const sugestoes = [
            `Por que o ${vertice} é o vértice-chave?`,
            'Qual é o primeiro passo prático?',
            'Como faço isso sem me anular?',
            'Me dá um exemplo de fala pra essa situação?',
            'O que muda se eu não me mover?'
        ];
        this.chatSuggest.innerHTML = sugestoes.map(s =>
            `<button type="button" class="chat-chip">${escapeHtmlSafe(s)}</button>`
        ).join('');
        this.chatSuggest.querySelectorAll('.chat-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                if (this.chatStreaming) return;
                this.chatInput.value = chip.textContent;
                this.sendChat();
            });
        });
    }

    appendChat(role, html, isHtml) {
        const wrap = document.createElement('div');
        wrap.className = `chat-msg ${role === 'user' ? 'user' : 'ai'}`;
        const avatar = document.createElement('div');
        avatar.className = `chat-avatar ${role === 'user' ? 'me' : 'ai'}`;
        avatar.textContent = role === 'user' ? 'Eu' : '✦';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = isHtml ? html : renderChatMarkdown(html);
        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        this.chatMessages.appendChild(wrap);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        return bubble;
    }

    async sendChat() {
        if (this.chatStreaming) return;
        const text = this.chatInput.value.trim();
        if (!text) return;
        if (!this.apiKey) {
            this.appendChat('ai', 'Preciso da sua chave de API (na engrenagem ⚙️) para conversar.', false);
            return;
        }

        this.appendChat('user', text, false);
        this.chatHistory.push({ role: 'user', content: text });
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';

        this.chatStreaming = true;
        this.chatSend.disabled = true;
        const bubble = this.appendChat('ai', '', true);
        bubble.classList.add('streaming');

        try {
            const messages = [
                { role: 'system', content: this.buildChatSystemPrompt(this.lastData) },
                ...this.chatHistory
            ];
            let acc = '';
            const full = await this.streamChat(messages, (delta) => {
                acc += delta;
                bubble.innerHTML = renderChatMarkdown(acc);
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            });
            bubble.classList.remove('streaming');
            bubble.innerHTML = renderChatMarkdown(full || acc);
            this.chatHistory.push({ role: 'assistant', content: full || acc });
        } catch (err) {
            console.error(err);
            bubble.classList.remove('streaming');
            bubble.innerHTML = renderChatMarkdown('Tive um problema pra responder agora: ' + (err?.message || err) + '\n\nTente de novo em instantes.');
        } finally {
            this.chatStreaming = false;
            this.chatSend.disabled = false;
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }

    buildChatSystemPrompt(data) {
        const ctx = {
            nome: data?.nome || '',
            continente: this.mapsData?.continente || this.continente || '',
            alvo: data?.navegacao?.alvo || this.mapsData?.alvo || this.destinoInput.value.trim(),
            onde_esta: this.ondeInput.value.trim(),
            idioma_nativo: this.idiomaNativo || '',
            mapa_escolhido: this.selectedMap ? {
                titulo: this.selectedMap.titulo,
                chakra: this.selectedMap.chakra,
                tema: this.selectedMap.tema,
                elemento: this.selectedMap.elemento,
                casa: this.selectedMap.casa,
                dualidade: this.selectedMap.dualidade
            } : null,
            analise: data
        };
        return `Você é o companheiro de conversa do **Jogo da Alma**. A pessoa acabou de receber uma análise geométrica da situação dela e agora quer APROFUNDAR e TIRAR DÚVIDAS. Responda às perguntas dela com base no contexto da análise abaixo.

## COMO RESPONDER
- Português do Brasil, acolhedor e preciso, sem misticismo nem jargão esotérico. Use o nome da pessoa.
- Respostas CURTAS e diretas (2 a 4 parágrafos curtos no máximo, ou uma lista enxuta). Não repita o relatório inteiro — responda exatamente o que foi perguntado.
- Use **negrito** com moderação para destacar o essencial. Pode usar listas com "-".
- Verbos de movimento ("recuar", "sustentar", "subir", "encaixar"), nunca "resolver".
- Quando fizer sentido, faça UMA pergunta de volta para a pessoa ressoar e se aprofundar — você é um navegador, não um oráculo.

## PRINCÍPIOS QUE NÃO PODEM QUEBRAR
- O objetivo nunca é "mais". É **proporcional à situação**. A solução é sempre o proporcional, nunca um polo (nem falta, nem excesso).
- O "proporcional" se move conforme a situação; um número sozinho não diz nada — leia sempre contra o que a situação pede.
- **Integração não é fusão**: encaixar não é virar o que o outro quer nem se anular.
- **Anel aberto**: o "depois" não é permanente; a próxima situação reabre o jogo.
- **Só o indivíduo é medido** — nunca diagnostique o outro envolvido.
- **Vértice-chave**: o ponto onde o menor movimento gera a maior mudança.
- **Idioma nativo (Lei Não-Dual)**: se a pessoa tem um chakra dominante, ela acessa os outros através dele — não peça pra ela virar outra pessoa; mostre como o que falta já vive dentro do que ela é.
- Não invente números novos que contradigam a análise. Se a pessoa pedir algo fora do escopo, pode responder com bom senso mantendo o método.

## OS 7 CHAKRAS (referência)
raiz=segurança/estrutura · sacral=vitalidade/criatividade · plexo=poder/posição · cardiaco=amor/conexão · laringeo=voz/verdade · frontal=discernimento/clareza · coronario=propósito/sentido. Em cada um: falta (de menos), proporcional (na medida) ou excesso (de mais).

## CONTEXTO DA ANÁLISE (use isto como base de tudo)
${JSON.stringify(ctx, null, 1)}`;
    }

    async streamChat(messages, onDelta) {
        const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': location.origin,
                'X-Title': 'Jogo da Alma GPS Chat'
            },
            body: JSON.stringify({
                model: this.model,
                messages,
                temperature: 0.7,
                max_tokens: 1400,
                stream: true
            })
        });

        if (!resp.ok) {
            let detail = '';
            try { const j = await resp.json(); detail = j?.error?.message || JSON.stringify(j); }
            catch { detail = await resp.text().catch(() => ''); }
            throw new Error(`${resp.status} ${resp.statusText}${detail ? ' — ' + detail : ''}`);
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let full = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();
            for (const line of lines) {
                const t = line.trim();
                if (!t || !t.startsWith('data:')) continue;
                const payload = t.slice(5).trim();
                if (payload === '[DONE]') continue;
                try {
                    const json = JSON.parse(payload);
                    const delta = json.choices?.[0]?.delta?.content || '';
                    if (delta) { full += delta; onDelta && onDelta(delta); }
                } catch { /* keep-alive / partial */ }
            }
        }
        return full;
    }

    backToMaps() {
        this.resultSection.style.display = 'none';
        this.mapsGrid.querySelectorAll('.map-card').forEach(c => { c.classList.remove('selected', 'dimmed'); });
        this.mapsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    downloadHTML() {
        if (!this.lastDoc) return;
        const nome = (this.nameInput.value.trim() || 'analise').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        this.downloadFile(`jogo-da-alma-gps-${nome}.html`, this.lastDoc, 'text/html');
        this.showToast('HTML baixado', 'success');
    }

    openInNewTab() {
        if (!this.lastDoc) return;
        const blob = new Blob([this.lastDoc], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    downloadFile(filename, content, mime) {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    resetForm() {
        this.resultSection.style.display = 'none';
        this.mapsSection.style.display = 'none';
        this.destinoInput.value = '';
        this.ondeInput.value = '';
        this.mapsData = null;
        this.selectedMap = null;
        this.lastDoc = '';
        this.lastData = null;
        this.chatHistory = [];
        this.chatMessages.innerHTML = '';
        this.chatSuggest.innerHTML = '';
        document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => this.destinoInput.focus(), 500);
    }

    showError(html) {
        this.errorMsg.innerHTML = html;
        this.errorMsg.style.display = 'block';
    }

    showToast(msg, kind) {
        const t = document.createElement('div');
        t.className = `toast toast-${kind === 'error' ? 'error' : 'success'}`;
        t.textContent = msg;
        document.body.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
    }
}

document.addEventListener('DOMContentLoaded', () => { window.__gps = new GpsDaAlma(); });
