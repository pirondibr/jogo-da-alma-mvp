/* ============================================================
   JOGO DA ALMA — Diagnóstico Visual Limpo
   A IA devolve JSON estruturado; o frontend monta o HTML
   do molde jogo_da_alma_diagnostico_visual_limpo.html
   ============================================================ */

const CHAKRAS = {
    raiz:      { nome: 'Básico',       label: 'Chakra Básico',       glyph: '🔴', css: 'var(--root)',    soft: 'var(--root2)',    lane: 'Segurança e base' },
    sacral:    { nome: 'Sacral',       label: 'Chakra Sacral',       glyph: '🟠', css: 'var(--sacral)',  soft: 'var(--sacral2)',  lane: 'Emoção e vitalidade' },
    plexo:     { nome: 'Plexo Solar',  label: 'Chakra Plexo Solar',  glyph: '☀️', css: 'var(--plexo)',   soft: 'var(--plexo2)',   lane: 'Limite e posição' },
    cardiaco:  { nome: 'Cardíaco',     label: 'Chakra Cardíaco',     glyph: '💚', css: 'var(--green)',   soft: 'var(--green2)',   lane: 'Amor e vínculo' },
    laringeo:  { nome: 'Laríngeo',     label: 'Chakra Laríngeo',     glyph: '🔵', css: 'var(--blue)',    soft: 'var(--blue2)',    lane: 'Voz e verdade' },
    frontal:   { nome: 'Frontal',      label: 'Chakra Frontal',      glyph: '👁', css: 'var(--frontal)', soft: 'var(--frontal2)', lane: 'Clareza e discernimento' },
    coronario: { nome: 'Coronário',    label: 'Chakra Coronário',    glyph: '👑', css: '#8B5CF6',        soft: '#F3EEFF',         lane: 'Propósito e sentido' },
};

const CHAKRA_ORDER_MINI = ['raiz', 'sacral', 'plexo', 'cardiaco', 'laringeo', 'frontal', 'coronario'];

const REPORT_STYLE = `
:root{
  --bg:#F6F1E6; --paper:#FFFDF7; --ink:#18211E; --muted:#6D6A5F; --line:#DCCFB9;
  --night:#101820; --night2:#17222C; --gold:#D3A53D; --gold2:#F2D27C;
  --green:#4CAF82; --green2:#EAF8F0; --blue:#4A9FD9; --blue2:#EAF5FF;
  --plexo:#E8A317; --plexo2:#FFF5D7; --sacral:#E67E22; --sacral2:#FFF0E4;
  --frontal:#5C6BC0; --frontal2:#F0F1FF; --root:#C0503F; --root2:#FFEDEC;
  --shadow:0 18px 48px rgba(18,24,32,.14); --softShadow:0 10px 24px rgba(18,24,32,.07);
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI",sans-serif;
  background:radial-gradient(circle at 8% 0%,rgba(76,175,130,.16),transparent 30%),radial-gradient(circle at 90% 14%,rgba(211,165,61,.18),transparent 34%),var(--bg);
  color:var(--ink); line-height:1.5; padding:24px;
}
.wrapper{max-width:1220px;margin:auto}.card{background:rgba(255,253,247,.96);border:1px solid var(--line);border-radius:28px;box-shadow:var(--softShadow);overflow:hidden}
.hero{background:linear-gradient(135deg,#0C131A,#14212B 58%,#101820);color:#F9F1DA;border:1px solid rgba(211,165,61,.48);border-radius:32px;padding:30px;box-shadow:var(--shadow);display:grid;grid-template-columns:118px 1fr;gap:24px;align-items:center;margin-bottom:18px}
.mandala{width:112px;height:112px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:58px;background:radial-gradient(circle,rgba(91,255,166,.32),rgba(76,175,130,.11) 45%,rgba(76,175,130,.02) 68%);border:1px solid rgba(114,255,184,.5);box-shadow:0 0 34px rgba(76,175,130,.38),inset 0 0 24px rgba(255,255,255,.08)}
h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(34px,4.5vw,56px);line-height:1.04;margin-bottom:10px}h1 span{color:var(--gold2)}.hero-sub{font-size:16px;color:#E8E0CC;max-width:820px}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}.step{display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:center;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:12px}.step-num{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:900;background:linear-gradient(135deg,var(--green),#2D7A58)}.step b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#FFF2B9}.step span{font-size:12px;color:#CEC8B8}
.topline{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px;margin-bottom:16px}.top-card{padding:22px;display:grid;grid-template-columns:62px 1fr;gap:14px;align-items:center}.case-card{background:linear-gradient(135deg,#124322,#0C301B);color:#F7F5EA}.ico{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:29px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.2)}.label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:900;color:var(--gold);margin-bottom:6px}.top-card h2{font-family:Georgia,"Times New Roman",serif;font-size:25px;line-height:1.12}.top-card p{font-size:13.3px;color:var(--muted)}.case-card p{color:#F7F2E6;font-style:italic}.case-card .label{color:var(--gold2)}
.main-grid{display:grid;grid-template-columns:1.35fr .9fr;gap:16px;align-items:start}.content{padding:20px}.side{padding:20px;background:linear-gradient(160deg,#0E151B,#14212B 62%,#0E151B);color:#F7F1E4;border-color:rgba(211,165,61,.45);position:sticky;top:20px}.section-title{text-align:center;margin-bottom:18px}.kicker{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:900}.section-title h2{font-family:Georgia,"Times New Roman",serif;font-size:32px;line-height:1.1}.section-title p{font-size:13.5px;color:var(--muted);max-width:720px;margin:7px auto 0}
.block{border:1px solid var(--line);border-radius:26px;background:#FFFDF8;margin-bottom:18px;overflow:hidden}.block-head{display:grid;grid-template-columns:56px 1fr;gap:14px;align-items:center;padding:20px 22px;border-bottom:1px solid var(--line);background:linear-gradient(90deg,#FFFDF8,#FAF3DD)}.num{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--gold);color:white;font-size:23px;font-weight:900}.block-head small{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:900;color:var(--muted);margin-bottom:2px}.block-head h2{font-family:Georgia,"Times New Roman",serif;font-size:28px;line-height:1.1}.block-head p{font-size:13px;color:var(--muted);margin-top:4px}.block-body{padding:20px 22px}
.result-split{display:grid;grid-template-columns:1fr 1fr;gap:14px}.result-box{border:1px solid var(--line);border-radius:20px;padding:18px;background:#FCFBF8}.result-box.internal{border-top:5px solid var(--green);background:var(--green2)}.result-box.external{border-top:5px solid var(--blue);background:var(--blue2)}.result-box h3{font-family:Georgia,"Times New Roman",serif;font-size:22px;margin-bottom:10px}.result-box li:before{background:var(--green)}.external li:before{background:var(--blue)}
ul{list-style:none;display:grid;gap:8px}li{position:relative;padding-left:18px;font-size:13.5px;color:#353A34}li:before{content:"";position:absolute;left:0;top:.65em;width:7px;height:7px;border-radius:50%;background:var(--gold)}
.capacity-board{display:grid;gap:16px}.capacity-row{display:grid;grid-template-columns:210px 1fr;gap:14px;align-items:stretch}.chakra-lane{border-radius:22px;padding:18px;color:#fff;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c),#000 32%));box-shadow:0 10px 22px color-mix(in srgb,var(--c),transparent 78%);display:flex;flex-direction:column;justify-content:space-between}.chakra-lane .glyph{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);margin-bottom:12px}.chakra-lane h3{font-family:Georgia,"Times New Roman",serif;font-size:24px;line-height:1.05}.chakra-lane span{font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:900;opacity:.86}.cap-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.cap-item{border:1px solid var(--line);border-radius:20px;background:#FFFDF8;padding:16px;display:grid;gap:9px}.cap-item h4{font-family:Georgia,"Times New Roman",serif;font-size:20px;line-height:1.12}.cap-item p{font-size:13px;color:var(--muted)}.tag-row{display:flex;flex-wrap:wrap;gap:6px}.tag{font-size:10.5px;font-weight:900;text-transform:uppercase;letter-spacing:.07em;border-radius:999px;padding:5px 9px;background:var(--soft);color:color-mix(in srgb,var(--c),#000 25%);border:1px solid color-mix(in srgb,var(--c),transparent 60%)}
.belief-lanes{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.belief-lane{border:1px solid color-mix(in srgb,var(--c),transparent 60%);border-radius:24px;background:linear-gradient(180deg,var(--soft),#FFFDF8 55%);overflow:hidden}.belief-top{padding:18px;border-bottom:1px solid color-mix(in srgb,var(--c),transparent 70%);display:flex;gap:12px;align-items:center}.belief-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;background:#fff;border:2px solid var(--c);box-shadow:0 0 16px color-mix(in srgb,var(--c),transparent 70%)}.belief-top h3{font-family:Georgia,"Times New Roman",serif;font-size:22px;line-height:1.05}.belief-top span{display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;font-weight:900;color:var(--c);margin-top:3px}.belief-body{padding:18px}.belief-body blockquote{font-family:Georgia,"Times New Roman",serif;font-size:20px;line-height:1.28;color:#2E2A25;margin-bottom:12px}.belief-body p{font-size:13px;color:var(--muted);margin-bottom:14px}.old-new{display:grid;gap:8px}.belief-chip{border-radius:14px;padding:10px 12px;font-size:12.5px;border:1px solid var(--line);background:#fff}.belief-chip b{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}.belief-chip.old{background:#FFF1F0}.belief-chip.old b{color:#B94A48}.belief-chip.new{background:#F0FFF6}.belief-chip.new b{color:#2B8A57}
.quest-open{border:1px solid var(--line);border-left:6px solid var(--gold);background:var(--plexo2);border-radius:20px;padding:18px 20px;margin-bottom:14px}.quest-open .q-label{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A6D1E;font-weight:900;margin-bottom:6px}.quest-open h3{font-family:Georgia,"Times New Roman",serif;font-size:24px;line-height:1.22;margin-bottom:8px}.quest-open p{font-size:14px;color:#5D574E}.training-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.training-card{border:1px solid var(--line);border-radius:20px;padding:16px;background:#FCFBF8}.training-card .field{font-size:10.5px;text-transform:uppercase;letter-spacing:.12em;font-weight:900;color:var(--c);margin-bottom:6px}.training-card h3{font-family:Georgia,"Times New Roman",serif;font-size:20px;margin-bottom:6px}.training-card p{font-size:13px;color:var(--muted)}
.symptom-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch}.version{border-radius:22px;padding:18px;border:1px solid var(--line);background:#FCFBF8}.version.old{border-top:5px solid #B94A48;background:#FFF1F0}.version.new{border-top:5px solid var(--green);background:var(--green2)}.version h4{font-family:Georgia,"Times New Roman",serif;font-size:22px;margin-bottom:10px}.mini-row{border:1px solid var(--line);border-radius:14px;padding:11px 12px;background:rgba(255,255,255,.66);margin-bottom:8px}.mini-row b{display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:2px}.mini-row span{font-family:Georgia,"Times New Roman",serif;font-size:17px;line-height:1.25}.arrow{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--paper);border:1px solid var(--line);color:var(--gold);font-size:26px;font-weight:900;align-self:center}
.diag-title{text-align:center;margin-bottom:16px}.diag-title .kicker{color:var(--gold2)}.diag-title h2{font-family:Georgia,"Times New Roman",serif;font-size:31px;line-height:1.05}.activation-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}.activation{border:1px solid var(--c);border-radius:18px;padding:12px;background:rgba(255,255,255,.045);box-shadow:0 0 22px color-mix(in srgb,var(--c),transparent 80%)}.activation .seal{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;background:#0A1117;border:2px solid var(--c);box-shadow:0 0 16px color-mix(in srgb,var(--c),transparent 62%);margin-bottom:8px}.activation b{font-family:Georgia,"Times New Roman",serif;font-size:17px;color:#F4E5B6}.activation span{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--c);font-weight:900;margin-top:3px}.activation p{font-size:11.5px;color:#C6C8C2;margin-top:5px}.diag-panel{border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:15px;margin-bottom:12px;background:rgba(255,255,255,.045)}.diag-panel.highlight{border-color:rgba(211,165,61,.45);background:rgba(211,165,61,.08)}.diag-panel h4{font-size:11.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--gold2);margin-bottom:7px}.diag-panel p,.diag-panel li{font-size:13px;color:#D9D4C8}.diag-panel li:before{background:#7BE0A7}.mission-box{display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:start}.mission-ico{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:25px;background:rgba(211,165,61,.12);border:1px solid rgba(211,165,61,.35);color:var(--gold2)}.mini-map{display:grid;grid-template-columns:repeat(7,1fr);gap:7px;margin-top:10px}.ck-mini{text-align:center;opacity:.42;filter:saturate(.5)}.ck-mini.on{opacity:1;filter:none}.ck-mini.sup{opacity:.75;filter:none}.ck-dot{width:32px;height:32px;border-radius:50%;margin:0 auto 5px;display:flex;align-items:center;justify-content:center;font-size:15px;background:#0A1117;border:2px solid var(--c);box-shadow:0 0 12px color-mix(in srgb,var(--c),transparent 65%)}.ck-mini b{font-size:9px;color:#C9C4B8}.final{margin-top:18px;text-align:center;background:#1F2933;color:#F7F5F0;border-radius:24px;padding:24px}.final .label{color:#D8C070}.final h2{font-family:Georgia,"Times New Roman",serif;font-size:30px;line-height:1.15;margin-bottom:10px}.final p{color:#EAE6DC;max-width:760px;margin:0 auto;font-size:15px}
@media(max-width:1050px){.hero,.topline,.main-grid,.capacity-row{grid-template-columns:1fr}.side{position:static}.hero{text-align:center}.mandala{margin:auto}.steps,.activation-grid,.belief-lanes,.result-split,.training-grid,.symptom-flow{grid-template-columns:1fr}.cap-list{grid-template-columns:1fr}.arrow{margin:auto;transform:rotate(90deg)}.top-card{text-align:center;grid-template-columns:1fr}.ico{margin:auto}.mini-map{grid-template-columns:repeat(4,1fr)}}
@media(max-width:560px){body{padding:12px}.content,.side{padding:13px}.hero{padding:22px 16px}.block-head{grid-template-columns:1fr;text-align:center}.num{margin:auto}.belief-top{flex-direction:column;text-align:center}}
`;

function esc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function chakraKey(k) {
    const key = String(k || '').toLowerCase().replace(/[áàâã]/g, 'a').replace(/í/g, 'i');
    if (key.includes('basico') || key === 'raiz' || key === 'root') return 'raiz';
    if (key.includes('sacral')) return 'sacral';
    if (key.includes('plexo')) return 'plexo';
    if (key.includes('card')) return 'cardiaco';
    if (key.includes('lar')) return 'laringeo';
    if (key.includes('front')) return 'frontal';
    if (key.includes('coron')) return 'coronario';
    return CHAKRAS[key] ? key : 'cardiaco';
}

function chakraStyle(k) {
    const c = CHAKRAS[chakraKey(k)];
    return `--c:${c.css};--soft:${c.soft}`;
}

function listItems(arr) {
    return (arr || []).map(i => `<li>${esc(i)}</li>`).join('');
}

function buildCapacityBoard(rows) {
    return (rows || []).map(row => {
        const k = chakraKey(row.chakra);
        const c = CHAKRAS[k];
        const caps = (row.capacidades || []).map(cap => `
              <article class="cap-item"><h4>${esc(cap.titulo)}</h4><p>${esc(cap.descricao)}</p>
              <div class="tag-row">${(cap.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div></article>`).join('');
        return `<div class="capacity-row" style="${chakraStyle(k)}">
            <div class="chakra-lane"><div><div class="glyph">${c.glyph}</div><span>${esc(c.label)}</span><h3>${esc(row.titulo_lane || c.lane)}</h3></div></div>
            <div class="cap-list">${caps}</div>
          </div>`;
    }).join('');
}

function buildBeliefLanes(crencas) {
    return (crencas || []).map(b => {
        const k = chakraKey(b.chakra);
        const c = CHAKRAS[k];
        return `<article class="belief-lane" style="${chakraStyle(k)}">
            <div class="belief-top"><div class="belief-icon">${c.glyph}</div><div><h3>${esc(c.nome)}</h3><span>${esc(b.subtitulo || '')}</span></div></div>
            <div class="belief-body"><blockquote>“${esc(b.frase_chave)}”</blockquote><p>${esc(b.explicacao)}</p>
            <div class="old-new">
              <div class="belief-chip old"><b>Crença antiga</b>${esc(b.crenca_antiga)}</div>
              <div class="belief-chip new"><b>Crença nova</b>${esc(b.crenca_nova)}</div>
            </div></div>
          </article>`;
    }).join('');
}

function buildTrainingGrid(items) {
    return (items || []).map(t => {
        const k = chakraKey(t.chakra);
        return `<article class="training-card" style="${chakraStyle(k)}">
            <div class="field">${esc(t.campo)}</div><h3>${esc(t.titulo)}</h3><p>${esc(t.descricao)}</p></article>`;
    }).join('');
}

function buildActivationGrid(items) {
    return (items || []).map(a => {
        const k = chakraKey(a.chakra);
        const c = CHAKRAS[k];
        return `<div class="activation" style="${chakraStyle(k)}">
          <div class="seal">${c.glyph}</div><b>${esc(c.nome)}</b><span>${esc(a.papel || 'Principal')}</span><p>${esc(a.resumo)}</p></div>`;
    }).join('');
}

function buildMiniMap(mapa) {
    const states = mapa || {};
    return CHAKRA_ORDER_MINI.map(k => {
        const c = CHAKRAS[k];
        const st = states[k] || 'off';
        const cls = st === 'on' ? 'on' : st === 'sup' ? 'sup' : '';
        const short = k === 'coronario' ? 'Coron.' : k === 'laringeo' ? 'Laríngeo' : c.nome;
        return `<div class="ck-mini ${cls}" style="--c:${c.css}"><div class="ck-dot">${c.glyph}</div><b>${esc(short)}</b></div>`;
    }).join('');
}

function buildDiagnosticoDocument(data) {
    const nome = esc(data.nome || 'você');
    const sit = esc(data.situacao_texto || '');
    const area = data.area_identificada || {};
    const obj = data.objetivo || {};
    const quest = data.quest || {};
    const va = data.versao_antiga || {};
    const vn = data.versao_nova || {};
    const side = data.sidebar || {};

    const body = `<main class="wrapper">
  <header class="hero">
    <div class="mandala">🌈</div>
    <div>
      <h1>Diagnóstico <span>da Situação</span></h1>
      <p class="hero-sub">O conteúdo didático do Veda 1 com a apresentação mais lúdica do Veda 2: resultado, capacidade, crença e experiência sem amontoar informação.</p>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div><b>Situação</b><span>A vida apresenta a experiência.</span></div></div>
        <div class="step"><div class="step-num">2</div><div><b>Mapa</b><span>Vemos chakras, capacidades e crenças.</span></div></div>
        <div class="step"><div class="step-num">3</div><div><b>Quest</b><span>A travessia desenvolve a nova versão.</span></div></div>
      </div>
    </div>
  </header>

  <section class="topline">
    <article class="card top-card case-card"><div class="ico">👩‍👧</div><div><div class="label">Situação de ${nome}</div><p>“${sit}”</p></div></article>
    <article class="card top-card"><div class="ico" style="background:#EAF6EE;color:#24794E;border-color:#BEE8CD">🧭</div><div><div class="label">Área identificada</div><h2>${esc(area.titulo)}</h2><p>${esc(area.descricao)}</p></div></article>
    <article class="card top-card"><div class="ico" style="background:#FFF7E1;color:#B07C17;border-color:#E8D5A2">🎯</div><div><div class="label">Objetivo</div><h2>${esc(obj.titulo)}</h2><p>${esc(obj.descricao)}</p></div></article>
  </section>

  <section class="main-grid">
    <article class="card content">
      <div class="section-title"><div class="kicker">Mapa central</div><h2>A jornada da nova versão</h2><p>A estrutura continua didática, mas cada bloco tem mais espaço visual para respirar.</p></div>

      <section class="block">
        <div class="block-head"><div class="num">1</div><div><small>O que eu quero ter?</small><h2>Resultados</h2><p>Separando o que ${nome} quer sentir por dentro e construir por fora.</p></div></div>
        <div class="block-body result-split">
          <div class="result-box internal"><h3>Resultados Internos</h3><ul>${listItems(data.resultados_internos)}</ul></div>
          <div class="result-box external"><h3>Resultados Externos</h3><ul>${listItems(data.resultados_externos)}</ul></div>
        </div>
      </section>

      <section class="block">
        <div class="block-head"><div class="num">2</div><div><small>O que preciso desenvolver?</small><h2>Capacidades ligadas aos Chakras</h2><p>O vínculo com os chakras aparece em faixas separadas, sem virar uma grade apertada.</p></div></div>
        <div class="block-body capacity-board">${buildCapacityBoard(data.capacidades_por_chakra)}</div>
      </section>

      <section class="block">
        <div class="block-head"><div class="num">3</div><div><small>O que preciso compreender?</small><h2>Crenças organizadas por Chakra</h2><p>Cada chakra ganha uma crença-chave com contraste entre padrão antigo e nova compreensão.</p></div></div>
        <div class="block-body belief-lanes">${buildBeliefLanes(data.crencas)}</div>
      </section>

      <section class="block">
        <div class="block-head"><div class="num">4</div><div><small>Como vou aprender isso?</small><h2>Campo de Treinamento / Quest</h2><p>A capacidade não se desenvolve apenas na teoria — ela se desenvolve na travessia.</p></div></div>
        <div class="block-body">
          <div class="quest-open"><div class="q-label">A quest está aberta</div><h3>${esc(quest.titulo)}</h3><p>${esc(quest.texto)}</p></div>
          <div class="training-grid">${buildTrainingGrid(data.treinamentos)}</div>
        </div>
      </section>

      <section class="block">
        <div class="block-head"><div class="num">5</div><div><small>Como sei qual versão está operando?</small><h2>Espelho da versão antiga e nova</h2><p>Pensamento, emoção e ação são sintomas do estado atual.</p></div></div>
        <div class="block-body symptom-flow">
          <article class="version old"><h4>Versão Antiga</h4>
            <div class="mini-row"><b>💭 Pensamento</b><span>“${esc(va.pensamento)}”</span></div>
            <div class="mini-row"><b>🌊 Emoção</b><span>${esc(va.emocao)}</span></div>
            <div class="mini-row"><b>👣 Ação</b><span>${esc(va.acao)}</span></div></article>
          <div class="arrow">→</div>
          <article class="version new"><h4>Versão Nova</h4>
            <div class="mini-row"><b>💭 Pensamento</b><span>“${esc(vn.pensamento)}”</span></div>
            <div class="mini-row"><b>🌊 Emoção</b><span>${esc(vn.emocao)}</span></div>
            <div class="mini-row"><b>👣 Ação</b><span>${esc(vn.acao)}</span></div></article>
        </div>
      </section>

      <section class="final"><div class="label">Resumo do Diagnóstico</div><h2>A experiência revela a capacidade.<br/>A travessia desenvolve.</h2><p>${esc(data.resumo_final || 'A nova versão deixa de ser ideia quando atravessa a experiência. O mapa mostra o que está sendo treinado; a quest transforma isso em vida.')}</p></section>
    </article>

    <aside class="card side">
      <div class="diag-title"><div class="kicker">Seu diagnóstico</div><h2>Chakras ativados</h2></div>
      <div class="activation-grid">${buildActivationGrid(side.chakras_ativados)}</div>
      <div class="diag-panel highlight mission-box"><div class="mission-ico">🚩</div><div><h4>Missão prioritária</h4><p>${esc(side.missao)}</p></div></div>
      <div class="diag-panel"><h4>Crença principal</h4><p>“${esc(side.crenca_principal)}”</p></div>
      <div class="diag-panel"><h4>Capacidades-chave</h4><ul>${listItems(side.capacidades_chave)}</ul></div>
      <div class="diag-panel"><h4>Mapa dos 7 chakras</h4><div class="mini-map">${buildMiniMap(side.mapa_chakras)}</div></div>
    </aside>
  </section>
</main>`;

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Jogo da Alma — Diagnóstico Visual · ${nome}</title>
<style>${REPORT_STYLE}</style>
</head>
<body>${body}</body>
</html>`;
}

const SYSTEM_PROMPT = `Você é o Veda — gerador de diagnósticos visuais do **Jogo da Alma**. A partir do relato de uma situação, devolva os DADOS estruturados para montar um diagnóstico didático em 5 blocos: Resultados, Capacidades por Chakra, Crenças, Campo de Treinamento/Quest, e Espelho Versão Antiga/Nova — mais um painel lateral com chakras ativados e missão.

# TOM E FILOSOFIA
- Educa pelo reconhecimento, nunca pela culpa. Sem guru, sem misticismo vago.
- Chakras = eixos de necessidade humana (stats de personagem): cada um pode estar em **Falta**, **Proporcional** ou **Excesso**.
- A experiência revela a capacidade; a travessia (quest) desenvolve a nova versão.
- Segunda pessoa quando fizer sentido no relato; use o NOME da pessoa.
- Não invente fatos fora do relato. Seja concreto e acolhedor.

# OS 7 CHAKRAS (referência)
| Chave | Nome | Temas | Campo de treinamento |
| raiz | Básico | Segurança, Estabilidade, Base, Proteção | Pressão e necessidade |
| sacral | Sacral | Criatividade, Prazer, Emoções, Fluidez | Tédio ou intensidade |
| plexo | Plexo Solar | Poder pessoal, Autonomia, Limite, Posição | Desafios |
| cardiaco | Cardíaco | Amor, Compaixão, Vínculo, Reciprocidade | Vulnerabilidade |
| laringeo | Laríngeo | Expressão, Verdade, Comunicação, Posicionamento | Argumentação e exposição |
| frontal | Frontal | Clareza, Discernimento, Compreensão, Foco | Não saber |
| coronario | Coronário | Propósito, Significado, Consciência, Unidade | Fé diante do mistério |

Perguntas centrais: Básico=Como sobreviver? · Sacral=Como viver? · Plexo=Como realizar? · Cardíaco=Como amar? · Laríngeo=Como me expressar? · Frontal=Como compreender? · Coronário=Por que viver?

# PROCESSO
1. Resuma a situação (situacao_texto) em 1ª pessoa, condensada.
2. Identifique área da vida (area_identificada) e objetivo plausível (objetivo).
3. Liste 3–4 resultados internos e 3–4 externos alinhados aos chakras ativos.
4. Agrupe 2–3 chakras principais em capacidades_por_chakra (2 capacidades cada, com tags dos chakras envolvidos).
5. Escolha 3 crenças (uma por chakra principal) com frase-chave, explicação, crença antiga e nova.
6. Defina a quest aberta (a experiência formativa) e 4 cartões de treinamento ligados aos campos de treinamento dos chakras.
7. Espelhe versão antiga vs nova (pensamento, emoção, ação).
8. No sidebar: 3 chakras ativados (1–3 "Principal"), missão concreta, crença principal, 4 capacidades-chave, mapa_chakras com estados "on" (principal), "sup" (apoio) ou omitido (inativo).

# FORMATO DE SAÍDA (CRÍTICO)
Responda **APENAS** com JSON válido, sem markdown, sem cercas de código, sem texto antes ou depois:

{
  "nome": "Anna",
  "situacao_texto": "Resumo em 1ª pessoa (≤ 280 caracteres)",
  "area_identificada": { "titulo": "...", "descricao": "..." },
  "objetivo": { "titulo": "...", "descricao": "..." },
  "resultados_internos": ["...", "..."],
  "resultados_externos": ["...", "..."],
  "capacidades_por_chakra": [
    {
      "chakra": "cardiaco",
      "titulo_lane": "Amor e vínculo",
      "capacidades": [
        { "titulo": "...", "descricao": "...", "tags": ["Cardíaco", "Plexo"] }
      ]
    }
  ],
  "crencas": [
    {
      "chakra": "cardiaco",
      "subtitulo": "Amor + Limite",
      "frase_chave": "Sem aspas no JSON",
      "explicacao": "...",
      "crenca_antiga": "...",
      "crenca_nova": "..."
    }
  ],
  "quest": { "titulo": "...", "texto": "..." },
  "treinamentos": [
    { "chakra": "cardiaco", "campo": "Cardíaco · Vulnerabilidade", "titulo": "...", "descricao": "..." }
  ],
  "versao_antiga": { "pensamento": "...", "emocao": "...", "acao": "..." },
  "versao_nova": { "pensamento": "...", "emocao": "...", "acao": "..." },
  "resumo_final": "1 frase opcional para o bloco final",
  "sidebar": {
    "chakras_ativados": [
      { "chakra": "cardiaco", "papel": "Principal", "resumo": "..." }
    ],
    "missao": "Ação concreta e datável quando possível",
    "crenca_principal": "...",
    "capacidades_chave": ["...", "..."],
    "mapa_chakras": {
      "raiz": "sup",
      "sacral": "sup",
      "plexo": "on",
      "cardiaco": "on",
      "laringeo": "on",
      "frontal": "sup",
      "coronario": "off"
    }
  }
}

Regras: chakra sempre em minúsculas (raiz|sacral|plexo|cardiaco|laringeo|frontal|coronario). 2–3 grupos em capacidades_por_chakra, exatamente 3 crenças, 4 treinamentos, 3 chakras_ativados. Português do Brasil. Devolva SOMENTE o JSON.`;

const LOADING_MESSAGES = [
    'Lendo sua situação com atenção...',
    'Identificando a área e o objetivo...',
    'Mapeando chakras e capacidades...',
    'Formulando crenças antigas e novas...',
    'Abrindo a quest formativa...',
    'Espelhando versão antiga e nova...',
    'Montando seu diagnóstico visual...'
];

class DiagnosticoDaAlma {
    constructor() {
        this.apiKey = localStorage.getItem('ja_diag_api_key') || localStorage.getItem('jda_api_key') || '';
        this.model = localStorage.getItem('ja_diag_model') || 'openai/gpt-5.5';
        this.reportHtml = '';
        this.lastName = '';
        this.isGenerating = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSettings();
        if (!this.apiKey) this.settingsPanel.classList.add('open');
    }

    cacheDOM() {
        this.settingsToggle = document.getElementById('settingsToggle');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.modelInput = document.getElementById('modelInput');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.nameInput = document.getElementById('nameInput');
        this.userInput = document.getElementById('userInput');
        this.charCount = document.getElementById('charCount');
        this.generateBtn = document.getElementById('generateBtn');
        this.statusBox = document.getElementById('statusBox');
        this.loadingText = document.getElementById('loadingText');
        this.loadingCount = document.getElementById('loadingCount');
        this.errorMsg = document.getElementById('errorMsg');
        this.resultSection = document.getElementById('resultSection');
        this.resultFrame = document.getElementById('resultFrame');
        this.downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
        this.openTabBtn = document.getElementById('openTabBtn');
        this.newAnalysisBtn = document.getElementById('newAnalysisBtn');
        this.ctaBtn = document.getElementById('ctaBtn');
    }

    bindEvents() {
        this.settingsToggle.addEventListener('click', () => this.settingsPanel.classList.toggle('open'));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.userInput.addEventListener('input', () => this.updateCharCount());
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.handleGenerate();
        });
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.openTabBtn.addEventListener('click', () => this.openInNewTab());
        this.newAnalysisBtn.addEventListener('click', () => this.resetForm());
        this.ctaBtn?.addEventListener('click', () => {
            document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => this.userInput.focus(), 500);
        });
    }

    loadSettings() {
        if (this.apiKey) this.apiKeyInput.value = this.apiKey;
        if (this.model) this.modelInput.value = this.model;
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value.trim() || 'openai/gpt-5.5';
        localStorage.setItem('ja_diag_api_key', this.apiKey);
        localStorage.setItem('ja_diag_model', this.model);
        this.settingsPanel.classList.remove('open');
        this.showToast('Configurações salvas');
    }

    updateCharCount() {
        const len = this.userInput.value.length;
        this.charCount.textContent = len > 0 ? `${len} caracteres` : '';
    }

    async handleGenerate() {
        const situation = this.userInput.value.trim();
        const name = this.nameInput.value.trim();
        if (this.isGenerating) return;

        if (!this.apiKey) {
            this.showToast('Configure sua chave de API primeiro (engrenagem)', true);
            this.settingsPanel.classList.add('open');
            return;
        }
        if (situation.length < 30) {
            this.showToast('Descreva a situação com mais detalhe', true);
            return;
        }

        this.lastName = name;
        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.userInput.disabled = true;
        this.errorMsg.style.display = 'none';
        this.resultSection.style.display = 'none';
        this.statusBox.style.display = 'flex';
        this.startLoadingMessages();

        try {
            const userContent = (name ? `Nome: ${name}\n\n` : '') + `Relato:\n${situation}`;
            const raw = await this.streamAPI(userContent);
            const data = this.parseJSON(raw);
            if (name && !data.nome) data.nome = name;
            this.reportHtml = buildDiagnosticoDocument(data);
            this.renderResult();
        } catch (err) {
            this.errorMsg.innerHTML = `<strong>Erro ao gerar diagnóstico:</strong> ${this.escapeHtml(err.message)}<br><br>Verifique sua chave de API e o modelo.`;
            this.errorMsg.style.display = 'block';
        } finally {
            this.stopLoadingMessages();
            this.statusBox.style.display = 'none';
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.userInput.disabled = false;
        }
    }

    async streamAPI(userContent) {
        const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'Jogo da Alma Diagnóstico Visual'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userContent }
                ],
                stream: true,
                max_tokens: 8000,
                temperature: 0.75
            })
        });

        if (!resp.ok) {
            const errData = await resp.json().catch(() => ({}));
            throw new Error(errData.error?.message || `Erro ${resp.status}`);
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
            buffer = lines.pop() || '';
            for (const line of lines) {
                const t = line.trim();
                if (!t.startsWith('data: ')) continue;
                const payload = t.slice(6);
                if (payload === '[DONE]') continue;
                try {
                    const json = JSON.parse(payload);
                    const delta = json.choices?.[0]?.delta?.content || '';
                    if (delta) {
                        full += delta;
                        this.loadingCount.textContent = `${full.length.toLocaleString('pt-BR')} caracteres`;
                    }
                } catch { /* partial chunk */ }
            }
        }
        return full;
    }

    parseJSON(raw) {
        let t = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
        const first = t.indexOf('{');
        const last = t.lastIndexOf('}');
        if (first === -1 || last === -1) throw new Error('Resposta sem JSON válido.');
        const data = JSON.parse(t.slice(first, last + 1));
        if (!data.situacao_texto && !data.resultados_internos) {
            throw new Error('JSON incompleto — tente gerar novamente.');
        }
        return data;
    }

    startLoadingMessages() {
        let idx = 0;
        this.loadingText.textContent = LOADING_MESSAGES[0];
        this.loadingInterval = setInterval(() => {
            idx = (idx + 1) % LOADING_MESSAGES.length;
            this.loadingText.textContent = LOADING_MESSAGES[idx];
        }, 3200);
    }

    stopLoadingMessages() {
        if (this.loadingInterval) clearInterval(this.loadingInterval);
        this.loadingInterval = null;
    }

    renderResult() {
        this.resultFrame.srcdoc = this.reportHtml;
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    downloadHTML() {
        if (!this.reportHtml) return;
        const slug = (this.lastName || 'diagnostico').toLowerCase().normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        this.downloadFile(this.reportHtml, `jogo-da-alma-diagnostico-${slug}.html`, 'text/html');
        this.showToast('HTML baixado');
    }

    openInNewTab() {
        if (!this.reportHtml) return;
        const url = URL.createObjectURL(new Blob([this.reportHtml], { type: 'text/html;charset=utf-8' }));
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    downloadFile(content, filename, mime) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([content], { type: mime + ';charset=utf-8' }));
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    resetForm() {
        this.userInput.value = '';
        this.nameInput.value = '';
        this.charCount.textContent = '';
        this.reportHtml = '';
        this.resultFrame.srcdoc = '';
        this.resultSection.style.display = 'none';
        this.errorMsg.style.display = 'none';
        document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
        this.userInput.focus();
    }

    escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }

    showToast(message, isError) {
        document.querySelector('.toast')?.remove();
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DiagnosticoDaAlma();
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.animate-in').forEach(el => obs.observe(el));
});
