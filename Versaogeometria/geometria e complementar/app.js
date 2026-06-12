/* ============================================================
   JOGO DA ALMA — Geometria da Situação & do Indivíduo
   A IA devolve JSON (níveis 0–10 + textos). O frontend desenha
   o SVG de forma DETERMINÍSTICA (radar dos 7 chakras + mergulho
   do vértice-chave), antes e depois.
   ============================================================ */

/* ---------- Catálogo fixo dos 7 chakras (ordem dos eixos do radar) ---------- */
const CHAKRA_ORDER = ['coronario', 'frontal', 'laringeo', 'cardiaco', 'plexo', 'sacral', 'raiz'];
const CHAKRAS = {
    coronario: { nome: 'Coronário', sub: 'Propósito & Visão',        color: '#2E3192' },
    frontal:   { nome: 'Frontal',   sub: 'Discernimento',            color: '#2D6CDF' },
    laringeo:  { nome: 'Laríngeo',  sub: 'Comunicação & Verdade',    color: '#7B2D8E' },
    cardiaco:  { nome: 'Cardíaco',  sub: 'Amor & Conexão',           color: '#4CAF82' },
    plexo:     { nome: 'Plexo',     sub: 'Poder & Ação',             color: '#E8A317' },
    sacral:    { nome: 'Sacral',    sub: 'Criatividade',             color: '#E67E22' },
    raiz:      { nome: 'Raiz',      sub: 'Segurança & Estrutura',    color: '#C0392B' },
};

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
   x_of(nível) = 150 + nível×30 ; cy = 200 ; R = 82
   ========================================================================= */
const TRI_CY = 200;
const TRI_R = 82;
const TRI_HALF = +(TRI_R * Math.sqrt(3) / 2).toFixed(1);   // ≈ 71
const TRI_MID = +(TRI_R / 2).toFixed(1);                   // 41
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
    const w = 1.75; // largura (em níveis) da faixa proporcional, recentrada em prop
    const faltaEnd = xOf(clamp(prop - w, 0, 10));
    const excStart = xOf(clamp(prop + w, 0, 10));
    const loX = xOf(0), hiX = xOf(10);

    const isExcess = nivel > prop;
    const indAccent = isExcess ? '#A33327' : '#9A6313';

    // campo central (só quando encaixa)
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

    // rótulos dos vértices
    const indLabelColor = aligned ? '#2F7A52' : indAccent;
    const indLabel = `<text class="tri-ind" x="${cxInd}" y="104" text-anchor="middle" font-family="DM Sans" font-size="10" font-weight="700" fill="${indLabelColor}">INDIVÍDUO fez · ${fmt(nivel)}</text>`;
    const sitLabel = `<text class="tri-sit" x="${cxSit}" y="300" text-anchor="middle" font-family="DM Sans" font-size="10" font-weight="700" fill="#7A6320">SITUAÇÃO pede · ${fmt(prop)}</text>`;

    // eixo falta ↔ excesso (faixas recentradas no proporcional)
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
:root{--bg:#F7F6F3;--card:#FFFFFF;--text:#1A1A1A;--text2:#3D3D3D;--text3:#6B6B6B;--text-muted:#9A9A9A;--border:#E8E6E1;--border-light:#F0EFEB;--accent:#C9A84C;--accent-soft:rgba(201,168,76,0.08);--accent-border:rgba(201,168,76,0.25);--green-bg:#F0FDF4;--green-border:#BBF7D0;--green-muted:#047857;--cardiaco:#4CAF82;--falta-st:#E0A23C;}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
.page{max-width:680px;margin:0 auto;padding:40px 20px 80px}
.g-header{text-align:center;margin-bottom:18px;animation:fadeUp .5s ease both}
.zoom-tag{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);background:var(--card);border:1px solid var(--accent-border);padding:3px 10px;border-radius:6px;margin-bottom:12px}
.g-header h1{font-family:'Fraunces',serif;font-size:27px;font-weight:600;line-height:1.2;margin-bottom:6px}
.g-header h1 .chakra{color:var(--cardiaco)}
.g-header-sub{font-size:13px;color:var(--text-muted);max-width:490px;margin:0 auto}
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
/* ── ABAS ── */
.tabs{position:sticky;top:0;z-index:20;display:flex;gap:6px;background:rgba(247,246,243,.88);backdrop-filter:blur(8px);padding:10px 0 12px;margin-bottom:6px}
.tab-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 8px;background:var(--card);border:1px solid var(--border);border-radius:13px;cursor:pointer;font-family:'DM Sans',sans-serif;color:var(--text3);transition:all .2s ease;line-height:1.2}
.tab-btn .tb-glyph{font-size:15px}
.tab-btn .tb-label{font-size:12.5px;font-weight:700;letter-spacing:.01em}
.tab-btn .tb-hint{font-size:9.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--text-muted)}
.tab-btn:hover{border-color:var(--text3);color:var(--text2)}
.tab-btn.active{color:var(--text);border-color:var(--accent-border);background:var(--accent-soft)}
.tab-btn.active.t-bridge{border-color:var(--cardiaco);background:rgba(76,175,130,.07)}
.tab-panel{display:none}
.tab-panel.active{display:block;animation:fadeUp .45s ease both}
/* ── PONTE NÃO-DUAL ── */
.nd-center{border-radius:18px;padding:20px 22px;margin-bottom:18px;color:#F5F5F0;animation:fadeUp .5s ease .05s both}
.nd-center-eyebrow{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;opacity:.62;margin-bottom:8px}
.nd-center-name{font-family:'Fraunces',serif;font-size:23px;font-weight:600;line-height:1.15;margin-bottom:8px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.nd-center-chip{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,.16)}
.nd-center-q{font-size:13.5px;font-style:italic;opacity:.9;margin-bottom:10px}
.nd-center-why{font-size:12.5px;line-height:1.6;opacity:.85}
.nd-center-why b{color:#fff}
.nd-diag{background:var(--accent-soft);border:1px solid var(--accent-border);border-radius:14px;padding:14px 18px;margin-bottom:18px;font-size:12.5px;line-height:1.6;color:var(--text2)}
.nd-diag b{color:var(--text)}
.nd-quote{border-left:3px solid var(--cardiaco);background:var(--card);border-radius:0 14px 14px 0;padding:16px 20px;margin-bottom:20px;font-family:'Fraunces',serif;font-size:17px;font-weight:500;line-height:1.45;color:var(--text);animation:fadeUp .5s ease .1s both}
.nd-quote b{color:var(--cardiaco)}
.nd-bridges{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px 22px;margin-bottom:20px;animation:fadeUp .5s ease .12s both}
.nd-bridges-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--green-muted);margin-bottom:4px}
.nd-bridges-title{font-family:'Fraunces',serif;font-size:19px;font-weight:600;margin-bottom:3px}
.nd-bridges-sub{font-size:12px;color:var(--text-muted);margin-bottom:14px;line-height:1.5}
.nd-item{padding:12px 0;border-top:1px solid var(--border-light)}
.nd-item:first-of-type{border-top:none;padding-top:2px}
.nd-head{display:flex;align-items:center;gap:9px;margin-bottom:4px;flex-wrap:wrap}
.nd-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.nd-name{font-size:13.5px;font-weight:700;color:var(--text)}
.nd-sub2{font-size:10.5px;color:var(--text-muted);font-weight:500}
.nd-text{font-size:12.5px;line-height:1.55;color:var(--text2)}
.nd-text b{color:var(--text)}
.nd-interp{background:var(--green-bg);border:1px solid var(--green-border);border-radius:14px;padding:14px 18px;margin-bottom:18px;font-size:12.5px;line-height:1.6;color:var(--text2)}
.nd-interp b{color:var(--green-muted)}
.nd-actions{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px 22px;margin-bottom:20px}
.nd-actions-eyebrow{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.nd-actions ol{list-style:none;counter-reset:nd;display:flex;flex-direction:column;gap:10px}
.nd-actions li{counter-increment:nd;display:flex;gap:11px;font-size:12.5px;line-height:1.55;color:var(--text2)}
.nd-actions li::before{content:counter(nd);flex-shrink:0;width:22px;height:22px;border-radius:50%;background:var(--accent-soft);border:1px solid var(--accent-border);color:var(--accent);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center}
.nd-final{text-align:center;background:var(--text);color:#F5F5F0;border-radius:16px;padding:22px;font-family:'Fraunces',serif;font-size:17px;font-style:italic;line-height:1.45;margin-bottom:8px}
.nd-final::before{content:"∞";display:block;font-size:20px;font-style:normal;color:var(--cardiaco);margin-bottom:8px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.p-sit,.tri-sit{animation:fadeUp .7s ease .3s both}.p-ind,.tri-ind{animation:fadeUp .8s ease .5s both}
.fld{animation:fadeUp .9s ease .7s both}.ax{animation:fadeUp .6s ease .55s both}
@media print{body{padding:0}}`;

/* =========================================================================
   MONTAGEM DO DOCUMENTO FINAL
   ========================================================================= */
function note(kind, icon, html) {
    return `<div class="note fn-${kind}"><span class="note-icon">${icon}</span><div>${html}</div></div>`;
}

/* ordem de exibição dos blocos de análise (raiz → coronário) */
const CHAKRA_DISPLAY = ['raiz', 'sacral', 'plexo', 'cardiaco', 'laringeo', 'frontal', 'coronario'];

function verdict(antes, sit) {
    const d = antes - sit;
    if (d <= -0.75) return { key: 'falta', label: 'Falta' };
    if (d >= 0.75) return { key: 'excesso', label: 'Excesso' };
    return { key: 'proporcional', label: 'Proporcional' };
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

    // ---- níveis do radar em ordem de eixo ----
    const sit = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.sit), 0, 10));
    const antes = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.antes), 0, 10));
    const depois = CHAKRA_ORDER.map(k => clamp(num(data.chakras?.[k]?.depois), 0, 10));

    // ---- mergulho ----
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

    const radarBody = `
<div class="g-header">
  <div class="zoom-tag">Fórmula Rafael · zoom Amplo · radar</div>
  <h1>Os 7 chakras de ${nome} — Situação vs Indivíduo</h1>
  <div class="g-header-sub">${radarSub}</div>
</div>

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

${buildChakraAnalysisFez(data, nome)}

${buildChakraAnalysisAcao(data, nome)}`;

    const ponteBody = buildPonteNaoDualBody(data, nome);

    return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Geometria do Jogo da Alma — ${nome}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet">
<style>${REPORT_STYLE}</style></head><body><div class="page">

<div class="tabs">
  <button class="tab-btn active" data-tab="geo" onclick="jaTab('geo')">
    <span class="tb-glyph">✦</span><span class="tb-label">Geometria</span><span class="tb-hint">Situação × Indivíduo</span>
  </button>
  <button class="tab-btn t-bridge" data-tab="ponte" onclick="jaTab('ponte')">
    <span class="tb-glyph">∞</span><span class="tb-label">Ponte Não-Dual</span><span class="tb-hint">Integração pela sua linguagem</span>
  </button>
</div>

<div class="tab-panel active" id="tab-geo">
${radarBody}
${mergulhoBody}
</div>

<div class="tab-panel" id="tab-ponte">
${ponteBody}
</div>

<div class="g-footer"><div class="g-footer-mark">✦</div>Jogo da Alma · Geometria da Situação &amp; do Indivíduo</div>
</div>
<script>
function jaTab(t){
  document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.toggle('active', b.getAttribute('data-tab')===t);});
  document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.toggle('active', p.id==='tab-'+t);});
  window.scrollTo({top:0,behavior:'smooth'});
}
</script>
</body></html>`;
}

/* =========================================================================
   ABA 2 — PONTE NÃO-DUAL (integração pela linguagem do chakra central)
   ========================================================================= */
function buildPonteNaoDualBody(data, nome) {
    const p = data.ponte_nao_dual || {};
    const centralKey = CHAKRAS[p.chakra_central] ? p.chakra_central : (CHAKRAS[data.mergulho?.chakra] ? data.mergulho.chakra : 'cardiaco');
    const central = CHAKRAS[centralKey];

    const perguntaPadrao = {
        raiz: 'Como isso me sustenta?',
        sacral: 'Como isso me faz viver e sentir prazer?',
        plexo: 'Como isso me ajuda a criar e realizar?',
        cardiaco: 'Como isso gera mais amor e conexão?',
        laringeo: 'Como isso me faz expressar minha verdade?',
        frontal: 'Como isso aumenta minha compreensão?',
        coronario: 'Como isso se conecta ao todo?'
    };
    const pergunta = escapeHtmlSafe(p.pergunta_central || perguntaPadrao[centralKey] || '');
    const porque = escapeHtmlLight(p.porque_central || `O <b>${central.nome}</b> é o idioma nativo de ${nome} nesta situação: a energia pela qual ${nome} naturalmente lê o mundo. A integração não pede abandoná-la — pede traduzir os outros chakras para dentro dela.`);
    const diagnostico = escapeHtmlLight(p.diagnostico || data.situacao_resumo || '');
    const pontePrincipal = escapeHtmlLight(p.ponte_principal || 'A melhor forma de honrar quem você é não é abandonar sua força — é incluir nela o que ainda falta.');
    const novaInterp = escapeHtmlLight(p.nova_interpretacao || '');
    const fraseFinal = escapeHtmlLight(p.frase_integracao || 'Eu não deixo de ser quem sou para integrar. Eu descubro o resto de mim dentro da minha própria linguagem.');

    // pontes: todos os chakras menos o central, na ordem de exibição
    const pontes = p.pontes || {};
    const bridgeItems = CHAKRA_DISPLAY.filter(k => k !== centralKey).map(k => {
        const c = CHAKRAS[k];
        const txt = pontes[k];
        if (!txt) return '';
        return `<div class="nd-item">
  <div class="nd-head"><span class="nd-dot" style="background:${c.color}"></span><span class="nd-name">${c.nome}</span><span class="nd-sub2">${c.sub}</span></div>
  <div class="nd-text">${escapeHtmlLight(txt)}</div>
</div>`;
    }).filter(Boolean).join('\n');

    const acoes = Array.isArray(p.acoes) ? p.acoes.filter(Boolean) : [];
    const acoesHtml = acoes.length
        ? `<div class="nd-actions">
  <div class="nd-actions-eyebrow">Ação prática · pela linguagem do ${central.nome}</div>
  <ol>${acoes.map(a => `<li>${escapeHtmlLight(a)}</li>`).join('')}</ol>
</div>`
        : '';

    const grad = `linear-gradient(135deg, ${central.color} 0%, #1A1A1A 92%)`;

    return `
<div class="g-header">
  <div class="zoom-tag">Técnica da Ponte Não-Dual · integração</div>
  <h1>A integração de <span class="chakra" style="color:${central.color}">${nome}</span> pela própria linguagem</h1>
  <div class="g-header-sub">Cada chakra é uma porta legítima para o todo. ${nome} não precisa virar outra pessoa: a integração nasce ao traduzir os chakras que faltam para a língua nativa do <b>${central.nome}</b>.</div>
</div>

<div class="nd-center" style="background:${grad}">
  <div class="nd-center-eyebrow">Chakra central · idioma nativo</div>
  <div class="nd-center-name">${central.nome} <span class="nd-center-chip">${central.sub}</span></div>
  <div class="nd-center-q">Pergunta-guia: “${pergunta}”</div>
  <div class="nd-center-why">${porque}</div>
</div>

${diagnostico ? `<div class="nd-diag"><b>Diagnóstico.</b> ${diagnostico}</div>` : ''}

<div class="nd-quote">${pontePrincipal}</div>

<div class="nd-bridges">
  <div class="nd-bridges-eyebrow">As pontes · cada chakra traduzido para o ${central.nome}</div>
  <div class="nd-bridges-title">Os outros chakras na linguagem de ${nome}</div>
  <div class="nd-bridges-sub">Não é "ter mais" de cada um — é reconhecer como cada energia já serve àquilo que o ${central.nome} mais valoriza.</div>
  ${bridgeItems || '<div class="nd-text">As pontes específicas aparecerão aqui quando o modelo retorná-las.</div>'}
</div>

${novaInterp ? `<div class="nd-interp"><b>Nova leitura.</b> ${novaInterp}</div>` : ''}

${acoesHtml}

<div class="nd-final">${fraseFinal}</div>`;
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
/* mantém <b> e <i> que a IA pode usar nas notas, escapa o resto */
function escapeHtmlLight(s) {
    let t = String(s == null ? '' : s);
    t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/&lt;(\/?(?:b|i|strong|em))&gt;/g, '<$1>');
    return t;
}

/* =========================================================================
   SYSTEM PROMPT — metodologia + schema JSON estrito
   ========================================================================= */
const SYSTEM_PROMPT = `Você é o motor analítico do **Jogo da Alma**, um método de autoconhecimento que lê qualquer situação como o encontro de duas formas: o que a SITUAÇÃO pede e o que o INDIVÍDUO fez. Seu trabalho é diagnosticar uma situação relatada e devolver os DADOS de uma análise geométrica.

## FILOSOFIA (não quebrar)
- O objetivo nunca é "mais". É **proporcional à situação**. Coragem demais vira imprudência; amor demais vira anulação; clareza demais vira paralisia.
- Em cada dimensão a pessoa pode fazer **de menos** (falta), **na medida** (proporcional) ou **de mais** (excesso).
- O "na medida" depende da situação e **se move**. Um número sozinho não diz nada: 5 só significa algo lido contra o que a situação pede.
- **Integração não é fusão.** O "depois" é encaixe (estrela simétrica), não virar o que o outro quer.
- **Anel aberto:** o depois não é um estado permanente; a próxima situação reabre o jogo.
- A solução é **sempre o proporcional**, nunca um polo (nem falta, nem excesso).
- **Só o indivíduo é medido.** A situação mostra o que pede; nunca diagnostique o outro.

## OS 7 CHAKRAS (dimensões de como a pessoa aparece na situação)
- **raiz** — segurança, estrutura. Falta: inseguro, sem base. Excesso: rígido, controlador.
- **sacral** — vitalidade, prazer, criatividade. Falta: apático. Excesso: impulsivo.
- **plexo** — poder pessoal, posição, autovalor. Falta: se apaga. Excesso: domina, atropela.
- **cardiaco** — amor, conexão. Falta: frieza, distância. Excesso: anulação (some pra não magoar).
- **laringeo** — voz, verdade, comunicação. Falta: se cala. Excesso: fala demais, machuca.
- **frontal** — discernimento, clareza. Falta: confuso, se ilude. Excesso: analisa demais, paralisa.
- **coronario** — propósito, sentido, visão. Falta: perdido. Excesso: na nuvem, desconectado do concreto.

## PROCESSO DE DIAGNÓSTICO
1. **Situação (linha dourada):** para cada um dos 7 chakras, defina de 0 a 10 quanto ESTA situação pede (o proporcional/gabarito). Nem tudo precisa ser alto — a maioria das situações pede valores médios (4–7) e alguns baixos.
2. **Indivíduo ANTES (área verde):** para cada chakra, quanto a pessoa de fato trouxe. Onde está abaixo do dourado = falta; acima = excesso. Capture o desencaixe real do relato (ex.: cardíaco em excesso, plexo/laríngeo em falta).
3. **Indivíduo DEPOIS:** o ajuste que encaixa — em geral igual (ou bem próximo) ao dourado em cada chakra. É a pessoa pousando sobre o que a situação pede, SEM se anular.
4. **Vértice-chave:** escolha o ÚNICO chakra cujo movimento reorganiza o resto (o ponto onde o menor movimento gera a maior mudança). Ele vira o "mergulho".
5. **Mergulho (zoom no vértice-chave):** nesse chakra, nomeie o eixo Falta↔Excesso com os DOIS polos específicos do caso, defina o proporcional que a situação pede, onde a pessoa estava (antes) e o ajuste (depois = proporcional).
6. **Ponte Não-Dual (integração pela linguagem nativa):** veja a 2ª parte abaixo.

## A PONTE NÃO-DUAL (2ª parte do relatório)
Aqui muda a lógica: não existe um único centro "mais evoluído". Cada chakra é uma **porta legítima** para a integração. O chakra dominante da pessoa não é o obstáculo dela — é o **idioma nativo** pelo qual ela compreende o mundo. A integração NÃO acontece abandonando a energia base e virando outro tipo de pessoa; acontece **descobrindo os outros chakras dentro da própria linguagem dela**.

- **chakra_central (a lente/idioma nativo):** escolha o chakra pelo qual ESTA pessoa naturalmente interpreta a vida nesta situação. Em geral é o chakra que aparece em **excesso** (aquele em que ela mais se apoia / sua força natural). Não force a pessoa a virar Coronário nem trate o Coronário como superior.
- **pontes:** para cada um dos OUTROS 6 chakras (especialmente os que estão em falta e que a situação pede), traduza a verdade dele **para a linguagem do chakra central**, contextualizada ao relato. Não diga "você precisa de mais X"; mostre como X já vive dentro daquilo que a pessoa já valoriza naturalmente.

Pergunta fundamental de cada chakra como centro:
- **raiz** → "Como isso me sustenta?"  | **sacral** → "Como isso me faz viver/sentir prazer?"  | **plexo** → "Como isso me faz criar e realizar?"  | **cardiaco** → "Como isso gera mais amor e conexão?"  | **laringeo** → "Como isso me faz expressar minha verdade?"  | **frontal** → "Como isso aumenta minha compreensão?"  | **coronario** → "Como isso se conecta ao todo?"

Exemplos de tradução (adapte SEMPRE ao caso, não copie literal):
- Centro Cardíaco → Plexo: "A força me permite servir e cuidar melhor."  | Laríngeo: "A verdade aprofunda os vínculos."  | Raiz: "Cuidar também é proteger."
- Centro Plexo → Cardíaco: "Servir amplia meu impacto."  | Laríngeo: "Minha voz aumenta minha influência."  | Coronário: "Meu propósito faz parte de algo maior."
- Centro Frontal → Cardíaco: "Compreender alguém é uma forma de amor."  | Plexo: "A ação testa minhas hipóteses."  | Laríngeo: "Expressar ideias refina o pensamento."
- Centro Raiz → Cardíaco: "A conexão cria tribo e apoio."  | Plexo: "A força protege o que construí."  | Coronário: "Confiar na vida reduz o medo."

A frase-ponte principal costuma ter a forma: **"A melhor forma de [energia dominante] não é [armadilha do excesso]. É incluir [chakra que falta]."** Ex.: "A melhor forma de cuidar do outro é cuidar de mim."

## REGRAS DOS NÍVEIS
- Use inteiros ou .5 (ex.: 2, 6, 7.5), de 0 a 10.
- A linha dourada (sit) é **constante** entre antes e depois (a situação não muda enquanto a pessoa se move).
- "depois" de cada chakra deve coincidir (ou quase) com o "sit" daquele chakra — é o encaixe.
- No mergulho, "individuo_depois" deve ser igual a "proporcional".
- Os polos do mergulho são modos de ERRAR; a solução é o proporcional no meio, nunca um polo. Ex.: Cardíaco → falta="Frieza", excesso="Anulação".

## LINGUAGEM
- Português do Brasil, 2ª/3ª pessoa usando o nome da pessoa. Tom acolhedor, preciso, sem misticismo nem jargão esotérico.
- Verbos de movimento ("recuar", "sustentar", "subir", "encaixar"), nunca "resolver".
- Nas notas, você pode usar <b>negrito</b> para destacar (apenas <b> e <i>).

## FORMATO DE SAÍDA (CRÍTICO)
Responda **APENAS com um objeto JSON válido**, sem markdown, sem cercas de código, sem texto antes ou depois. Estrutura exata:

{
  "nome": "Anna",
  "situacao_resumo": "Frase curta em 3ª pessoa resumindo a situação para o cartão escuro (≤ 240 caracteres).",
  "radar_sub": "1 frase explicando o radar com o nome da pessoa (opcional).",
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
  "ponte_nao_dual": {
    "chakra_central": "cardiaco",
    "porque_central": "1–2 frases: por que este é o idioma nativo da pessoa nesta situação (em geral o chakra em excesso/dominante). Pode usar <b>.",
    "pergunta_central": "A pergunta fundamental do chakra central (ex.: 'Como isso gera mais amor e conexão?').",
    "diagnostico": "1–2 frases: o conflito — o que a situação pede vs. a energia natural da pessoa. Pode usar <b>.",
    "ponte_principal": "A frase-ponte central, no formato 'A melhor forma de [energia dominante] não é [armadilha]. É incluir [chakra que falta].' Pode usar <b>.",
    "pontes": {
      "raiz":      "Tradução não-dual da raiz pela linguagem do chakra central, contextualizada ao relato.",
      "sacral":    "...",
      "plexo":     "...",
      "cardiaco":  "...",
      "laringeo":  "...",
      "frontal":   "...",
      "coronario": "..."
    },
    "nova_interpretacao": "1–2 frases mostrando como a pessoa pode reenxergar a situação SEM abandonar quem ela é. Pode usar <b>.",
    "acoes": ["Ação prática 1 (concreta e simples).", "Ação prática 2.", "Ação prática 3."],
    "frase_integracao": "Frase curta, memorável e energética que sintetiza a integração."
  }
}

No objeto "pontes", inclua os 7 chakras MENOS o chakra_central (6 entradas). Cada ponte traduz a verdade daquele chakra para a linguagem do central, ancorada na situação relatada — priorize traduzir os chakras que estão em FALTA e que a situação pede. "chakra_central" deve ser uma das chaves: raiz, sacral, plexo, cardiaco, laringeo, frontal, coronario.

Para CADA um dos 7 chakras, além dos níveis, preencha:
- **"fez"**: 1 frase descrevendo concretamente o que a pessoa fez nesse chakra nesta situação e por que é falta, proporcional ou excesso (compare antes vs sit). Se já estava na medida, diga que ali ela acertou.
- **"acao"**: 1 frase com o movimento proporcional — o que fazer nesse chakra do tamanho certo (verbo de movimento: sustentar, recuar, subir, dar voz...). Nunca proponha um polo (nem "mais", nem o extremo); proponha o proporcional. Onde já está na medida, diga apenas para manter.

Os 7 chakras são obrigatórios (com sit, antes, depois, fez, acao). "chakra" do mergulho deve ser uma destas chaves: raiz, sacral, plexo, cardiaco, laringeo, frontal, coronario. O objeto "ponte_nao_dual" também é obrigatório. Devolva SOMENTE o JSON.`;

const LOADING_MESSAGES = [
    'Lendo sua situação com atenção...',
    'Mapeando o que a situação pede em cada chakra...',
    'Lendo onde você está — falta, proporcional ou excesso...',
    'Desenhando a linha dourada do gabarito...',
    'Medindo o desencaixe entre as duas formas...',
    'Encontrando o vértice-chave...',
    'Montando o radar dos 7 chakras...',
    'Sobrepondo os dois triângulos do mergulho...',
    'Finalizando sua geometria...'
];

/* =========================================================================
   APP
   ========================================================================= */
class JogoDaAlmaGerador {
    constructor() {
        this.apiKey = localStorage.getItem('ja_geo_api_key') || '';
        this.model = localStorage.getItem('ja_geo_model') || 'anthropic/claude-sonnet-4.6';
        this.lastDoc = '';
        this.loadingTimer = null;
        this.loadingIdx = 0;
        this.cacheEls();
        this.bind();
        this.hydrateSettings();
        this.updateCharCount();
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
        this.userInput = this.$('userInput');
        this.charCount = this.$('charCount');
        this.generateBtn = this.$('generateBtn');
        this.statusBox = this.$('statusBox');
        this.loadingText = this.$('loadingText');
        this.loadingCount = this.$('loadingCount');
        this.errorMsg = this.$('errorMsg');
        this.resultSection = this.$('resultSection');
        this.resultFrame = this.$('resultFrame');
        this.downloadHtmlBtn = this.$('downloadHtmlBtn');
        this.openTabBtn = this.$('openTabBtn');
        this.newAnalysisBtn = this.$('newAnalysisBtn');
        this.inputCard = this.$('inputCard');
    }

    bind() {
        this.ctaBtn?.addEventListener('click', () => {
            document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.userInput.focus(), 600);
        });
        this.settingsToggle.addEventListener('click', () => this.settingsPanel.classList.toggle('open'));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.userInput.addEventListener('input', () => this.updateCharCount());
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.openTabBtn.addEventListener('click', () => this.openInNewTab());
        this.newAnalysisBtn.addEventListener('click', () => this.resetForm());
    }

    hydrateSettings() {
        if (this.apiKey) this.apiKeyInput.value = this.apiKey;
        this.modelInput.value = this.model;
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value.trim() || 'anthropic/claude-sonnet-4.6';
        localStorage.setItem('ja_geo_api_key', this.apiKey);
        localStorage.setItem('ja_geo_model', this.model);
        this.settingsPanel.classList.remove('open');
        this.showToast('Configurações salvas', 'success');
    }

    updateCharCount() {
        const n = this.userInput.value.trim().length;
        this.charCount.textContent = n ? `${n} caracteres` : '';
    }

    initReveal() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.15 });
        document.querySelectorAll('.animate-in').forEach(el => obs.observe(el));
    }

    startLoading() {
        this.loadingIdx = 0;
        this.loadingText.textContent = LOADING_MESSAGES[0];
        this.loadingTimer = setInterval(() => {
            this.loadingIdx = (this.loadingIdx + 1) % LOADING_MESSAGES.length;
            this.loadingText.textContent = LOADING_MESSAGES[this.loadingIdx];
        }, 2600);
    }
    stopLoading() {
        if (this.loadingTimer) { clearInterval(this.loadingTimer); this.loadingTimer = null; }
    }

    async handleGenerate() {
        const relato = this.userInput.value.trim();
        const nome = this.nameInput.value.trim();
        this.errorMsg.style.display = 'none';

        if (!this.apiKey) {
            this.showError('Configure sua <strong>chave de API do OpenRouter</strong> nas configurações (engrenagem) antes de gerar.');
            this.settingsPanel.classList.add('open');
            return;
        }
        if (relato.length < 20) {
            this.showError('Descreva a situação com um pouco mais de detalhe (pelo menos algumas frases).');
            return;
        }

        this.generateBtn.disabled = true;
        this.statusBox.style.display = 'flex';
        this.resultSection.style.display = 'none';
        this.loadingCount.textContent = '';
        this.startLoading();

        try {
            const raw = await this.streamAnalysis(relato, nome);
            const data = this.parseJSON(raw);
            if (nome && !data.nome) data.nome = nome;
            const doc = buildReportDocument(data);
            this.lastDoc = doc;
            this.renderResult(doc);
        } catch (err) {
            console.error(err);
            this.showError('Erro ao gerar geometria: ' + (err?.message || err) + '<br><br>Verifique sua chave de API e o modelo, e tente novamente.');
        } finally {
            this.stopLoading();
            this.generateBtn.disabled = false;
            this.statusBox.style.display = 'none';
        }
    }

    async streamAnalysis(relato, nome) {
        const userMsg = (nome ? `Nome da pessoa: ${nome}\n\n` : '') +
            `Relato da situação (o que aconteceu, o que sentiu, como agiu e o resultado desejado):\n${relato}`;

        const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': location.origin,
                'X-Title': 'Jogo da Alma Geometria'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userMsg }
                ],
                temperature: 0.7,
                max_tokens: 6000,
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

    parseJSON(raw) {
        if (!raw || !raw.trim()) throw new Error('Resposta vazia do modelo.');
        let t = raw.trim();
        // remove cercas de código se vierem
        t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
        // recorta do primeiro { ao último }
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
        if (!data.chakras || !data.mergulho) {
            throw new Error('JSON incompleto (faltam "chakras" ou "mergulho"). Tente novamente.');
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

    downloadHTML() {
        if (!this.lastDoc) return;
        const nome = (this.nameInput.value.trim() || 'analise').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        this.downloadFile(`jogo-da-alma-geometria-${nome}.html`, this.lastDoc, 'text/html');
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
        this.userInput.value = '';
        this.updateCharCount();
        this.lastDoc = '';
        document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => this.userInput.focus(), 500);
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

document.addEventListener('DOMContentLoaded', () => { window.__gerador = new JogoDaAlmaGerador(); });
