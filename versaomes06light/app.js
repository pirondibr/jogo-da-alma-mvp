/* ════════════════════════════════════════════════════════════════════
   JOGO DA ALMA — GERADOR DE ANÁLISE (4 ABAS)
   VERSÃO LIGHT: o modelo de IA gera APENAS o Mapa da Situação (um <div class="page">).
   Este arquivo monta o documento final injetando esse conteúdo no SHELL fixo
   (CSS + tab-bar + script switchTab), idêntico ao molde visual.
   ════════════════════════════════════════════════════════════════════ */

/* ── SHELL FIXO: head + style + tab-bar + script. {{VIEWS}} = conteúdo gerado ── */
const REPORT_STYLE = `
:root {
    --bg: #F7F6F3;
    --card: #FFFFFF;
    --text: #1A1A1A;
    --text2: #3D3D3D;
    --text3: #6B6B6B;
    --text-muted: #9A9A9A;
    --border: #E8E6E1;
    --border-light: #F0EFEB;
    --accent: #C9A84C;
    --accent-soft: rgba(201,168,76,0.08);
    --accent-border: rgba(201,168,76,0.25);
    --red-bg: #FEF2F2;
    --red-border: #FECACA;
    --red-text: #991B1B;
    --red-muted: #B45309;
    --green-bg: #F0FDF4;
    --green-border: #BBF7D0;
    --green-text: #065F46;
    --green-muted: #047857;
    --amber-bg: #FFFBEB;
    --amber-border: #FDE68A;
    --amber-text: #92400E;
    --purple-bg: #FAF5FF;
    --purple-border: #E9D5FF;
    --purple-text: #6B21A8;
    --accent-laringeo: #3B82F6;
    --accent-cardiaco: #10B981;
    --accent-plexo: #F59E0B;
    --accent-frontal: #8B5CF6;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* ── TAB BAR ── */
.tab-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(247,246,243,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
    display: flex;
    justify-content: center;
    gap: 4px;
}
.tab-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 14px 24px;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
}
.tab-btn:hover { color: var(--text3); }
.tab-btn.active { color: var(--text); }
.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px 2px 0 0;
}
.tab-btn .tab-badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 1px 6px;
    border-radius: 4px;
    margin-left: 6px;
    vertical-align: middle;
}
.tab-badge-leve { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green-border); }
.tab-badge-completo { background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.tab-badge-lembrete { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
.tab-badge-acoes { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }

/* VIEW 4: AÇÕES */
.acoes-page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.acoes-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.acoes-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.acoes-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.acoes-header-sub { font-size: 13px; color: var(--text-muted); max-width: 440px; margin: 0 auto; }
.acao-principal { background: var(--text); color: #F5F5F0; border-radius: 20px; padding: 28px; margin-bottom: 10px; animation: fadeUp 0.5s ease 0.05s both; }
.acao-principal-label { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 12px; }
.acao-principal-titulo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #F5F5F0; line-height: 1.3; margin-bottom: 10px; }
.acao-principal-porque { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; }
.acao-principal-porque strong { color: rgba(255,255,255,0.9); }
.ferramenta-amostra { background: var(--card); border: 1px solid var(--border); border-radius: 16px; margin-bottom: 32px; overflow: hidden; animation: fadeUp 0.5s ease 0.08s both; }
.ferramenta-amostra-header { padding: 14px 20px; background: var(--border-light); display: flex; align-items: center; gap: 10px; }
.ferramenta-amostra-badge { font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 10px; border-radius: 6px; background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.ferramenta-amostra-nome { font-size: 13px; font-weight: 700; color: var(--text); }
.ferramenta-amostra-body { padding: 18px 20px; }
.ferramenta-amostra-script { font-size: 14px; color: var(--text2); line-height: 1.65; font-style: italic; background: var(--accent-soft); border-radius: 10px; padding: 16px 18px; border-left: 3px solid var(--accent); }
.ferramenta-amostra-script strong { color: var(--text); font-style: normal; }
.ferramenta-amostra-nota { font-size: 12px; color: var(--text-muted); margin-top: 12px; line-height: 1.5; display: flex; align-items: flex-start; gap: 6px; }
.ferramenta-amostra-nota-icon { flex-shrink: 0; margin-top: 1px; }
.timing-section { margin-bottom: 28px; }
.timing-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.timing-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 8px; }
.timing-agora { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red-border); }
.timing-semana { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
.timing-continuo { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
.timing-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); }
.acao-list { display: flex; flex-direction: column; gap: 10px; }
.acao-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px 22px; transition: border-color 0.2s; }
.acao-card:hover { border-color: var(--accent-border); }
.acao-card-top { display: flex; gap: 14px; align-items: flex-start; }
.acao-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; margin-top: 1px; }
.acao-content { flex: 1; }
.acao-titulo { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.acao-desc { font-size: 13px; color: var(--text3); line-height: 1.55; margin-bottom: 8px; }
.acao-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.acao-tag { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; }
.acao-tag-chakra { background: var(--border-light); color: var(--text-muted); }
.acao-tag-tipo-prescritivo { background: var(--green-bg); color: var(--green-text); }
.acao-tag-tipo-capacidade { background: var(--purple-bg); color: var(--purple-text); }
.acao-ferramenta-hint { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-light); display: flex; align-items: flex-start; gap: 8px; }
.acao-ferramenta-hint-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.acao-ferramenta-hint-text { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.acao-ferramenta-hint-text strong { color: var(--text3); }
.travar-box { background: var(--amber-bg); border: 1px solid var(--amber-border); border-radius: 16px; padding: 20px 22px; margin-bottom: 28px; }
.travar-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber-text); margin-bottom: 10px; }
.travar-item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
.travar-item:last-child { margin-bottom: 0; }
.travar-sinal { font-size: 13px; font-weight: 700; color: var(--amber-text); flex-shrink: 0; margin-top: 1px; }
.travar-text { font-size: 13px; color: var(--text2); line-height: 1.55; }
.resultado-box { background: var(--green-bg); border: 1px solid var(--green-border); border-radius: 16px; padding: 22px; }
.resultado-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--green-text); margin-bottom: 12px; }
.resultado-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .resultado-grid { grid-template-columns: 1fr; } }
.resultado-item { display: flex; gap: 8px; align-items: flex-start; }
.resultado-check { color: var(--green-muted); font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.resultado-text { font-size: 13px; color: var(--green-text); line-height: 1.5; }
.tab-view { display: none; }
.tab-view.active { display: block; }

/* VIEW 1: MAPA */
.page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.m-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.m-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.m-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.m-header-sub { font-size: 13px; color: var(--text-muted); }
.situacao { background: var(--text); color: #F5F5F0; border-radius: 16px; padding: 22px 26px; margin-bottom: 28px; animation: fadeUp 0.5s ease 0.05s both; }
.situacao-label { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
.situacao-text { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.82); font-style: italic; }
.section { margin-bottom: 24px; }
.section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.section-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.section-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); }
.nec-raiz-icon { background: #FFF7ED; border: 1px solid #FDBA74; }
.raiz-strip { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.raiz-item { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-bottom: 1px solid var(--border-light); transition: background 0.2s; }
.raiz-item:last-child { border-bottom: none; }
.raiz-item:hover { background: var(--border-light); }
.raiz-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; position: relative; }
.raiz-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1.5px solid; opacity: 0.2; }
.raiz-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); width: 80px; flex-shrink: 0; }
.raiz-need { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--text); flex: 1; }
.estrat-atuais-icon { background: var(--red-bg); border: 1px solid var(--red-border); }
.estrat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .estrat-grid { grid-template-columns: 1fr; } }
.estrat-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; transition: border-color 0.2s; }
.estrat-card:hover { border-color: var(--red-border); }
.estrat-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
.estrat-chakra-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.estrat-text { font-size: 14px; color: var(--text2); line-height: 1.55; font-weight: 500; }
.estrat-tag { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; margin-top: 10px; }
.tag-bloqueado { background: #FEF3C7; color: #92400E; }
.tag-excessivo { background: #FEE2E2; color: #991B1B; }
.nec-icon { background: var(--green-bg); border: 1px solid var(--green-border); }
.nec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .nec-grid { grid-template-columns: 1fr; } }
.nec-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; transition: border-color 0.2s; }
.nec-card:hover { border-color: var(--green-border); }
.nec-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
.nec-chakra-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.nec-text { font-size: 14px; color: var(--text2); line-height: 1.55; font-weight: 500; }
.res-icon { background: #EFF6FF; border: 1px solid #BFDBFE; }
.res-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.res-cols { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 480px) { .res-cols { grid-template-columns: 1fr; } }
.res-col { padding: 20px 22px; }
.res-col-want { border-right: 1px solid var(--border-light); }
@media (max-width: 480px) { .res-col-want { border-right: none; border-bottom: 1px solid var(--border-light); } }
.res-col-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
.res-col-want .res-col-label { color: var(--green-text); }
.res-col-have .res-col-label { color: var(--red-text); }
.res-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
.res-item:last-child { margin-bottom: 0; }
.res-bullet { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.res-col-want .res-bullet { background: var(--green-muted); }
.res-col-have .res-bullet { background: var(--red-text); opacity: 0.5; }
.res-item-text { font-size: 13.5px; line-height: 1.55; color: var(--text2); }
.res-gap-bar { display: flex; align-items: center; gap: 12px; padding: 14px 22px; background: var(--border-light); }
.res-gap-label { font-size: 11px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
.res-gap-track { flex: 1; height: 6px; background: var(--red-bg); border-radius: 99px; overflow: hidden; }
.res-gap-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--red-border), var(--amber-border), var(--green-border)); }
.cap-icon { background: #FDF4FF; border: 1px solid #F0ABFC; }
.cap-list { display: flex; flex-direction: column; gap: 8px; }
.cap-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; display: flex; align-items: baseline; gap: 12px; transition: border-color 0.2s; }
.cap-item:hover { border-color: var(--accent-border); }
.cap-name { font-size: 14px; font-weight: 700; color: var(--text); white-space: nowrap; flex-shrink: 0; }
.cap-dash { color: var(--border); flex-shrink: 0; }
.cap-desc { font-size: 13px; color: var(--text3); line-height: 1.5; font-style: italic; }
.cap-chakra-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); background: var(--border-light); padding: 3px 8px; border-radius: 6px; margin-left: auto; flex-shrink: 0; white-space: nowrap; }
.cap-chakra-tag-dot { width: 5px; height: 5px; border-radius: 50%; }
.lic-icon { background: var(--purple-bg); border: 1px solid var(--purple-border); }
.lic-list { display: flex; flex-direction: column; gap: 10px; }
.lic-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 22px; display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.2s; }
.lic-item:hover { border-color: var(--accent-border); }
.lic-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--accent); line-height: 1; flex-shrink: 0; padding-top: 2px; }
.lic-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.lic-desc { font-size: 13px; color: var(--text3); line-height: 1.6; }
.rec-icon { background: var(--green-bg); border: 1px solid var(--green-border); }
.rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
@media (max-width: 520px) { .rec-grid { grid-template-columns: 1fr 1fr; } }
.rec-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 16px; text-align: center; transition: all 0.25s; }
.rec-card:hover { border-color: var(--green-border); background: var(--green-bg); }
.rec-emoji { font-size: 22px; margin-bottom: 8px; }
.rec-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.rec-sub { font-size: 11px; color: var(--text-muted); line-height: 1.4; }
.trans-icon { background: var(--accent-soft); border: 1px solid var(--accent-border); }
.trans-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.trans-header-row { display: grid; grid-template-columns: 1fr 40px 1fr; border-bottom: 1px solid var(--border); }
.trans-col-header { padding: 14px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
.trans-col-before { background: var(--red-bg); color: var(--red-text); }
.trans-col-arrow { display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 14px; background: var(--border-light); }
.trans-col-after { background: var(--green-bg); color: var(--green-text); }
.trans-row { display: grid; grid-template-columns: 1fr 40px 1fr; border-bottom: 1px solid var(--border-light); }
.trans-row:last-child { border-bottom: none; }
.trans-row-label { grid-column: 1 / -1; padding: 12px 20px 0; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
.trans-cell { padding: 8px 20px 14px; font-size: 13px; line-height: 1.55; }
.trans-cell-before { color: var(--red-muted); }
.trans-cell-arrow { display: flex; align-items: center; justify-content: center; color: var(--border); font-size: 16px; }
.trans-cell-after { color: var(--green-muted); font-weight: 500; }
.trans-badge-row { display: grid; grid-template-columns: 1fr 40px 1fr; padding: 16px 20px; background: var(--border-light); }
.trans-badge { display: inline-flex; align-items: center; justify-content: center; padding: 4px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; }
.badge-10 { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red-border); }
.badge-30 { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green-border); }
.trans-badge-center { display: flex; align-items: center; justify-content: center; }
.int-ext-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.int-ext-cols { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 480px) { .int-ext-cols { grid-template-columns: 1fr; } }
.int-ext-col { padding: 20px 22px; }
.int-ext-col-int { border-right: 1px solid var(--border-light); }
@media (max-width: 480px) { .int-ext-col-int { border-right: none; border-bottom: 1px solid var(--border-light); } }
.int-ext-col-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.int-ext-col-int .int-ext-col-label { color: var(--accent-plexo); }
.int-ext-col-ext .int-ext-col-label { color: var(--accent-laringeo); }
.int-ext-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
.int-ext-item:last-child { margin-bottom: 0; }
.int-ext-bullet { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.int-ext-col-int .int-ext-bullet { background: var(--accent-plexo); opacity: 0.6; }
.int-ext-col-ext .int-ext-bullet { background: var(--accent-laringeo); opacity: 0.6; }
.int-ext-item-text { font-size: 13.5px; line-height: 1.55; color: var(--text2); }
.int-ext-badge { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; }
.int-ext-badge-pode { background: #DBEAFE; color: #1E40AF; }
.int-ext-badge-nao { background: #FEE2E2; color: #991B1B; }
.int-ext-footer { padding: 14px 22px; background: var(--border-light); font-size: 13px; color: var(--text3); line-height: 1.5; text-align: center; }
.int-ext-footer strong { color: var(--text2); }
.int-ext-icon { background: #EFF6FF; border: 1px solid #BFDBFE; }
.cta-deep { background: var(--card); border: 2px dashed var(--accent-border); border-radius: 16px; padding: 22px 18px; text-align: center; cursor: pointer; transition: all 0.25s; }
.cta-deep:hover { border-color: var(--accent); background: var(--accent-soft); }
.cta-deep-icon { font-size: 22px; margin-bottom: 6px; }
.cta-deep-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.cta-deep-sub { font-size: 12px; color: var(--text3); line-height: 1.4; }
.m-footer { text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 11px; }
.m-footer-mark { font-family: 'Fraunces', serif; font-size: 14px; color: var(--accent); margin-bottom: 4px; }

/* VIEW 2: RELATÓRIO COMPLETO */
.full-page { max-width: 720px; margin: 0 auto; padding: 24px 16px 80px; }
.full-header { text-align: center; margin-bottom: 40px; padding-top: 20px; }
.full-header-label { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.18em; }
.full-header h1 { font-family: 'Fraunces', serif; font-size: 30px; color: var(--text); margin-top: 6px; font-weight: 600; }
.full-header-sub { font-size: 14px; color: var(--text3); margin-top: 8px; }
.caso-box { background: #1F2937; color: #F9FAFB; border-radius: 16px; padding: 24px 28px; margin-bottom: 40px; }
.caso-box .label { font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
.caso-box p { font-size: 15px; line-height: 1.7; color: #E5E7EB; font-style: italic; }
.modulo { margin-bottom: 48px; }
.modulo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--border-light); }
.modulo-num { background: var(--text); color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.modulo-title { font-family: 'Fraunces', serif; font-size: 22px; color: var(--text); font-weight: 600; }
.modulo p { font-size: 15px; margin-bottom: 16px; color: var(--text); line-height: 1.7; }
.modulo .destaque { background: var(--border-light); border-left: 3px solid var(--text-muted); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--text); line-height: 1.7; }
.modulo .destaque-positivo { background: var(--green-bg); border-left: 3px solid var(--accent-cardiaco); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--green-text); line-height: 1.7; }
.modulo .destaque-alerta { background: var(--amber-bg); border-left: 3px solid var(--accent-plexo); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--amber-text); line-height: 1.7; }
.formula-step { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; margin: 12px 0; }
.formula-step .step-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.formula-step p { font-size: 14px; margin-bottom: 0; line-height: 1.7; }
.protocolo-etapa { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 16px; }
.protocolo-etapa .etapa-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.etapa-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
.etapa-title { font-size: 17px; font-weight: 700; color: var(--text); }
.lembrete-box { padding: 12px 16px; border-radius: 10px; margin: 8px 0; font-size: 15px; line-height: 1.5; font-style: italic; }
.lembrete-p1 { background: #FEF2F2; border-left: 3px solid #EF4444; color: #991B1B; }
.lembrete-p2 { background: var(--green-bg); border-left: 3px solid var(--accent-cardiaco); color: var(--green-text); }
.ext-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; font-size: 13px; }
.ext-table th { background: var(--border-light); padding: 10px 14px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text3); }
.ext-table th:first-child { border-radius: 10px 0 0 0; }
.ext-table th:last-child { border-radius: 0 10px 0 0; }
.ext-table td { padding: 10px 14px; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.6; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.badge-sim { background: #DBEAFE; color: #1E40AF; }
.badge-nao { background: #FEE2E2; color: #991B1B; }
.hud-divider { text-align: center; margin: 56px 0 40px; position: relative; }
.hud-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
.hud-divider span { background: var(--bg); padding: 0 20px; position: relative; font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; }
.hud-container { max-width: 460px; margin: 0 auto; }
.hud-header { text-align: center; margin-bottom: 24px; }
.hud-header .hud-label { font-size: 10px; font-weight: 700; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.18em; }
.hud-header .hud-title { font-size: 22px; font-weight: 700; color: var(--text); margin-top: 4px; }
.hud-score { background: #111827; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 16px; }
.hud-score-circle { width: 52px; height: 52px; border-radius: 50%; border: 3px solid var(--accent-laringeo); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: var(--accent-laringeo); flex-shrink: 0; }
.hud-score-info { flex: 1; }
.hud-score-title { font-size: 13px; font-weight: 600; color: #F9FAFB; }
.hud-score-sub { font-size: 11px; color: #9CA3AF; margin-top: 2px; }
.xp-bar { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.xp-bar-track { flex: 1; height: 6px; background: #374151; border-radius: 99px; overflow: hidden; }
.xp-bar-fill { height: 100%; border-radius: 99px; }
.xp-bar-label { font-size: 11px; font-weight: 700; color: #9CA3AF; min-width: 32px; text-align: right; }
.xp-bar-light .xp-bar-track { background: #E5E7EB; }
.hud-lembrete { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; }
.hud-lembrete .lem-label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.hud-lembrete .lem-text { font-size: 13px; color: var(--text); line-height: 1.5; font-style: italic; }
.hud-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border-light); margin-bottom: 12px; overflow: hidden; }
.hud-card-header { padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
.hud-card-emoji { font-size: 28px; line-height: 1; }
.hud-card-info { flex: 1; }
.hud-card-name { font-size: 16px; font-weight: 700; color: var(--text); }
.hud-card-badges { display: flex; align-items: center; gap: 6px; margin-top: 2px; flex-wrap: wrap; }
.hud-badge { padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.hud-badge-blocked { background: #FEF3C7; color: #D97706; }
.hud-badge-excessive { background: #EDE9FE; color: #7C3AED; }
.hud-badge-role { color: #9CA3AF; font-weight: 600; font-size: 10px; }
.hud-card-body { padding: 0 18px 18px; }
.hud-card-tema { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 14px; }
.hud-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hud-col-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
.hud-col-label .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; }
.hud-col-red .hud-col-label { color: #DC2626; }
.hud-col-red .dot { background: #EF4444; }
.hud-col-green .hud-col-label { color: #059669; }
.hud-col-green .dot { background: #10B981; }
.hud-item { font-size: 12px; padding: 7px 10px; border-radius: 8px; margin-bottom: 4px; line-height: 1.4; }
.hud-item-red { background: #FEF3C7; color: #92400E; }
.hud-item-green { background: #ECFDF5; color: #065F46; }
.hud-missao { margin-top: 14px; border: 1px dashed; border-radius: 10px; padding: 10px 14px; }
.hud-missao-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.hud-missao-text { font-size: 13px; color: var(--text); line-height: 1.5; }
.hud-footer { text-align: center; padding: 28px 0 16px; font-size: 10px; color: #CBD5E1; }

/* VIEW 3: LEMBRETES */
.lem-page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.lem-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.lem-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.lem-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.lem-header-sub { font-size: 13px; color: var(--text-muted); max-width: 400px; margin: 0 auto; }
.lem-central { background: var(--text); color: #F5F5F0; border-radius: 20px; padding: 32px 28px; text-align: center; margin-bottom: 32px; animation: fadeUp 0.5s ease 0.05s both; }
.lem-central-icon { font-size: 28px; margin-bottom: 12px; }
.lem-central-frase { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; line-height: 1.4; color: #F5F5F0; margin-bottom: 12px; }
.lem-central-sub { font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic; }
.lem-section { margin-bottom: 28px; }
.lem-section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; padding-left: 2px; }
.frase-list { display: flex; flex-direction: column; gap: 10px; }
.frase-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px 22px; transition: all 0.25s; }
.frase-card:hover { border-color: var(--accent-border); box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.frase-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.frase-chakra-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.frase-chakra-name { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
.frase-texto { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
.frase-contexto { font-size: 13px; color: var(--text3); line-height: 1.55; }
.conceito-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .conceito-grid { grid-template-columns: 1fr; } }
.conceito-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.25s; }
.conceito-card:hover { border-color: var(--green-border); background: var(--green-bg); }
.conceito-emoji { font-size: 20px; margin-bottom: 10px; }
.conceito-titulo { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.conceito-desc { font-size: 12px; color: var(--text3); line-height: 1.5; }
.antidoto-list { display: flex; flex-direction: column; gap: 8px; }
.antidoto-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; }
.antidoto-antiga { padding: 14px 16px; font-size: 13px; color: var(--red-text); background: var(--red-bg); line-height: 1.5; font-style: italic; }
.antidoto-seta { display: flex; align-items: center; justify-content: center; padding: 0 8px; color: var(--text-muted); font-size: 14px; background: var(--border-light); }
.antidoto-nova { padding: 14px 16px; font-size: 13px; color: var(--green-muted); background: var(--green-bg); line-height: 1.5; font-weight: 500; }
.mantra-strip { background: var(--accent-soft); border: 1px solid var(--accent-border); border-radius: 16px; padding: 24px; text-align: center; }
.mantra-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.mantra-frase { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
.mantra-sub { font-size: 12px; color: var(--text3); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@media print { body { padding: 0; } .tab-bar { display: none; } }
`;

function buildReportDocument(name, viewsHtml) {
    const title = name ? ('Jogo da Alma — ' + name) : 'Jogo da Alma';
    return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        + '<title>' + title + '</title>\n'
        + '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet">\n'
        + '<style>' + REPORT_STYLE + '</style>\n</head>\n<body>\n'
        + viewsHtml + '\n'
        + '</body>\n</html>';
}

/* ── SYSTEM PROMPT: metodologia + regras de saída ── */
const SYSTEM_PROMPT = `Você é o Veda — o gerador de diagnósticos do Jogo da Alma. A partir do relato de uma pessoa sobre uma situação que a incomoda, você devolve APENAS o MAPA DA SITUAÇÃO — a visão leve em uma página (sem Relatório Completo, sem Lembretes, sem Ações).

# PAPEL E TOM
Você mostra à pessoa: (1) o que a situação está PEDINDO (necessidades), (2) por que ela TRAVA (o padrão por trás), (3) o que FAZER (prescrição concreta), (4) o que ela NÃO CONTROLA (a parte externa).
Tom: educa pelo reconhecimento, nunca pela culpa. Sem energia de guru, sem misticismo. Os chakras são um SISTEMA DE DIAGNÓSTICO — eixos de necessidade humana, como "stats" de um personagem: cada um pode estar em FALTA (bloqueado), PROPORCIONAL ou EXCESSO.
Fale na SEGUNDA PESSOA, usando o NOME da pessoa, com firmeza acolhedora. Não invente fatos fora do relato; quando supor (ex: história de infância), marque como hipótese ("Talvez...", "Em algum momento você aprendeu que...").
PRINCÍPIO DO ANEL ABERTO: integração não é estado permanente, é capacidade de retorno. O padrão vai reativar; evolução se mede pela velocidade com que a pessoa volta. Toda análise termina apontando isso.

# OS 7 CHAKRAS (eixos de necessidade)
Use SÓ os chakras que a situação ativa (normalmente 3 a 4). Um é o PRINCIPAL (maior alavancagem). Os outros são Secundário / Apoio.
| Chakra | Emoji | Cor do dot | Tema | Necessidade Raiz |
| Raiz | 🔴 | #C0564B | Segurança & Pertencimento | Sentir-se seguro e pertencente |
| Sacral | 🟠 | #D97A3D | Prazer, Emoção & Criatividade | Sentir prazer e fluir |
| Plexo Solar | ☀️ | #E8A317 | Poder & Identidade | Sentir-se digno e capaz |
| Cardíaco | 💚 | #4CAF82 | Amor & Compaixão | Sentir-se amado e conectado |
| Laríngeo | 🔵 | #4A9FD9 | Comunicação & Verdade | Sentir-se ouvido e autêntico |
| Frontal | 👁️ | #7C6BB0 | Percepção, Clareza & Intuição | Enxergar com clareza |
| Coronário | 👑 | #C77DBA | Propósito, Sentido & Confiança | Sentir que faz sentido / confiar no processo |
Cores de destaque (bordas/missões/labels): Laríngeo #3B82F6 (var --accent-laringeo) · Cardíaco #10B981 (--accent-cardiaco) · Plexo #F59E0B (--accent-plexo) · Frontal/Coronário #8B5CF6 (--accent-frontal). Para Raiz/Sacral, use a própria cor do dot.
Pares de oposição (um lado em excesso compensa o outro em falta): Raiz↔Coronário · Sacral↔Frontal · Plexo↔Cardíaco. O Laríngeo é a exceção: media a expressão dos outros.

# ESTADOS
- FALTA (Bloqueado): a necessidade existe mas não está sendo atendida. Função travada (ex: Laríngeo bloqueado = engole o que sente).
- PROPORCIONAL (Equilibrado): atendida na medida certa. É o alvo.
- EXCESSO: a função domina e desequilibra (ex: Cardíaco excessivo = compaixão virou autoanulação).
Diagnostique cada chakra ativo como Falta ou Excesso. Frequentemente um excesso ALIMENTA uma falta (ex: Cardíaco excessivo sustenta o Laríngeo bloqueado). Mostre essa cadeia.

# AS DUAS FORÇAS
Quase toda situação trava porque há duas forças opostas. Nomeie ambas logo no início: a força LEGÍTIMA que quer agir (raiva, desejo, necessidade real) e a que FREIA (culpa antecipada, medo, vergonha — geralmente chega ANTES da ação). O desconforto da pessoa É o atrito entre elas.

# MENTE ANTIGA × MENTE NOVA
Mente Antiga: programa automático e rápido (dispara culpa/medo, racionaliza o recuo). Mente Nova: a parte que já sabe o que fazer, mas é mais lenta. O problema não é SABER — é que a Mente Antiga é mais rápida. A prescrição dá à Mente Nova ferramentas para vencer a corrida.

# INTENÇÃO POSITIVA
O programa antigo NÃO é inimigo. Foi solução inteligente para uma situação passada e tenta proteger algo que a pessoa ama. "Seu sistema não é seu inimigo — ele está cuidando de algo, só que com uma estratégia que não serve mais."

# AS DUAS CAMADAS DO CÓDIGO (Módulo 2)
Camada 1 — Código da Espécie: raiz evolutiva/ancestral do comportamento. Legitima sem patologizar.
Camada 2 — Código da História: onde, na vida DESSA pessoa, o padrão foi aprendido (hipótese). Fecha sempre com: não foi fraqueza, foi inteligência da criança/pessoa que ela era.

# INTERNO × EXTERNO
Separe o que DEPENDE da pessoa ("Pode mudar") do que NÃO depende (reação do outro, decisões alheias — "Não controla"). O trabalho é paralelo: resolve o interno para ter condição de agir, age no externo para provar que o programa antigo estava errado.

# O PREÇO A ACEITAR
Cada estratégia nova cobra um pedágio — e ele não é o obstáculo, é o custo saudável de sair do bloqueio. Nomeie o preço de cada chakra (ex: Laríngeo — a exposição de desagradar; Cardíaco — a culpa de não agradar; Plexo — a tensão de sustentar a posição). Aceitar o preço conscientemente É a saúde.

# VERSÃO 1.0 → 3.0
Antes/depois em cinco linhas: Pensamento, Emoção, Ação, Resultado, Identidade. 1.0 é reativa (engole, finge, acumula). 3.0 sustenta verdade e amor ao mesmo tempo. A linha Identidade é a mais forte.

# PROCESSO (pense antes de escrever)
1. Resuma a situação em 2-3 frases, na voz da pessoa. 2. Identifique as duas forças. 3. Mapeie 3-4 chakras ativos, marcando estado e qual é o Principal. 4. Encontre a cadeia (qual excesso alimenta qual falta). 5. Formule a Intenção Positiva. 6. Defina a prescrição central. 7. Separe interno × externo. 8. Nomeie a ferramenta principal (script replicável, ex: "Confronto Respeitoso = amor + o que magoou + o que preciso").

# REGRAS DE LINGUAGEM
Segunda pessoa + nome. Reconhecer, não culpar. Verbos de movimento (navegar, sustentar, atravessar) — evite prometer cura permanente (o anel reabre). Concreto: scripts prontos, frases para repetir, ações datadas (48h / 7 dias). Sem guru, sem místico. O externo é honesto — nunca prometa controle sobre o outro. Termina sempre no anel aberto.

═══════════════════════════════════════════════════════════════════
# FORMATO DE SAÍDA — REGRAS ABSOLUTAS
═══════════════════════════════════════════════════════════════════
Você devolve APENAS HTML cru: exatamente UM bloco <div class="page"> com o Mapa da Situação.
- NÃO escreva texto antes ou depois. NÃO use blocos de código markdown (nada de tres crases). NÃO inclua <!DOCTYPE>, <html>, <head>, <style> nem <script> — tudo isso já existe no molde.
- Comece a resposta DIRETAMENTE com: <div class="page">
- Termine a resposta com o </div> que fecha esse <div class="page">.
- NÃO gere Relatório Completo, Lembretes nem Ações. APENAS o Mapa.
- Use EXATAMENTE os nomes de classe e a estrutura do esqueleto abaixo. Preencha o conteúdo para o relato recebido. Os dots de chakra usam as cores da tabela acima (inline style). Use as mesmas variáveis CSS (var(--...)) mostradas.
- Os emojis dos ícones de seção podem variar conforme o tema, mas mantenha as CLASSES.

ESQUELETO (preencha o conteúdo; [colchetes] = preencher; os textos de exemplo são do caso da Anna apenas para ilustrar — NÃO copie, gere para o novo relato):

<div class="page">
  <div class="m-header"><div class="m-header-eyebrow">Jogo da Alma</div><h1>Mapa da Situação</h1><div class="m-header-sub">O que a vida está pedindo, ensinando e oferecendo</div></div>
  <div class="situacao"><div class="situacao-label">Sua Situação</div><div class="situacao-text">[resumo do relato em 1ª pessoa, condensado]</div></div>
  <div class="section">
    <div class="section-header"><div class="section-icon nec-raiz-icon">🌱</div><div class="section-title">Necessidades Raiz</div></div>
    <div class="raiz-strip">
      <div class="raiz-item"><div class="raiz-dot" style="background:#4CAF82;border-color:#4CAF82"></div><div class="raiz-chakra">[Chakra]</div><div class="raiz-need">[necessidade raiz]</div></div>
      <!-- repita 1 raiz-item por chakra ativo -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon estrat-atuais-icon">🔴</div><div class="section-title">Estratégias Atuais</div></div>
    <div class="estrat-grid">
      <div class="estrat-card"><div class="estrat-chakra"><span class="estrat-chakra-dot" style="background:#4CAF82"></span>[Chakra] — [Excessivo|Bloqueado]</div><div class="estrat-text">[estratégia velha]</div><div class="estrat-tag tag-excessivo">Excessivo</div></div>
      <!-- repita por chakra; use tag-bloqueado/Bloqueado quando for falta -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon nec-icon">🟢</div><div class="section-title">Estratégias Novas</div></div>
    <div class="nec-grid">
      <div class="nec-card"><div class="nec-chakra"><span class="nec-chakra-dot" style="background:#4CAF82"></span>[Chakra]</div><div class="nec-text">[versão saudável]</div></div>
      <!-- repita por chakra -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon res-icon">🪙</div><div class="section-title">O Preço a Aceitar</div></div>
    <p style="font-size:13px;color:var(--text3);margin:-4px 0 14px;line-height:1.6">Cada estratégia nova cobra um preço. Ele não é o obstáculo — é o custo saudável de sair do bloqueio.</p>
    <div class="nec-grid">
      <div class="nec-card"><div class="nec-chakra"><span class="nec-chakra-dot" style="background:#4CAF82"></span>[Chakra]</div><div class="nec-text">[o pedágio honesto]</div></div>
      <!-- repita por chakra -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon res-icon">🎯</div><div class="section-title">Resultado</div></div>
    <div class="res-container">
      <div class="res-cols">
        <div class="res-col res-col-want"><div class="res-col-label">✦ O que você quer</div>
          <div class="res-item"><div class="res-bullet"></div><div class="res-item-text">[item]</div></div><!-- 3 itens -->
        </div>
        <div class="res-col res-col-have"><div class="res-col-label">◆ O que você tem hoje</div>
          <div class="res-item"><div class="res-bullet"></div><div class="res-item-text">[item]</div></div><!-- 3 itens -->
        </div>
      </div>
      <div class="res-gap-bar"><div class="res-gap-label">Gap</div><div class="res-gap-track"><div class="res-gap-fill" style="width:35%"></div></div><div class="res-gap-label" style="color:var(--text3)">A distância entre os dois é o desafio</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon int-ext-icon">🔀</div><div class="section-title">Interno vs Externo</div></div>
    <div class="int-ext-container"><div class="int-ext-cols">
      <div class="int-ext-col int-ext-col-int"><div class="int-ext-col-label">☀️ Depende de você</div>
        <div class="int-ext-item"><div class="int-ext-bullet"></div><div class="int-ext-item-text">[ação] <span class="int-ext-badge int-ext-badge-pode">Pode mudar</span></div></div><!-- repita -->
      </div>
      <div class="int-ext-col int-ext-col-ext"><div class="int-ext-col-label">🌍 Não depende de você</div>
        <div class="int-ext-item"><div class="int-ext-bullet"></div><div class="int-ext-item-text">[variável externa] <span class="int-ext-badge int-ext-badge-nao">Não controla</span></div></div><!-- repita -->
      </div>
    </div><div class="int-ext-footer"><strong>O trabalho é paralelo</strong> — [frase]</div></div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon cap-icon">💎</div><div class="section-title">Capacidades em Desenvolvimento</div></div>
    <div class="cap-list">
      <div class="cap-item"><div class="cap-name">[Capacidade]</div><div class="cap-dash">—</div><div class="cap-desc">[descrição curta]</div><div class="cap-chakra-tag"><span class="cap-chakra-tag-dot" style="background:#4CAF82"></span> [Chakra]</div></div><!-- 5 a 6 itens -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon lic-icon">📖</div><div class="section-title">Lições</div></div>
    <div class="lic-list">
      <div class="lic-item"><div class="lic-num">1</div><div><div class="lic-title">[título]</div><div class="lic-desc">[descrição]</div></div></div><!-- 2 a 3 lições -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon rec-icon">🏆</div><div class="section-title">Recompensas</div></div>
    <div class="rec-grid">
      <div class="rec-card"><div class="rec-emoji">💚</div><div class="rec-name">[nome curto]</div><div class="rec-sub">[subtítulo]</div></div><!-- 6 cards -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon trans-icon">⚡</div><div class="section-title">Antes → Depois</div></div>
    <div class="trans-container">
      <div class="trans-header-row"><div class="trans-col-header trans-col-before">Versão 1.0</div><div class="trans-col-arrow">→</div><div class="trans-col-header trans-col-after">Versão 3.0</div></div>
      <div class="trans-row"><div class="trans-row-label">💭 Pensamento</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[antes]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[depois]</div></div>
      <div class="trans-row"><div class="trans-row-label">❤️‍🔥 Emoção</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[antes]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[depois]</div></div>
      <div class="trans-row"><div class="trans-row-label">⚡ Ação</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[antes]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[depois]</div></div>
      <div class="trans-row"><div class="trans-row-label">🎯 Resultado</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[antes]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[depois]</div></div>
      <div class="trans-row"><div class="trans-row-label">🪪 Identidade</div></div>
      <div class="trans-row" style="border-bottom:none"><div class="trans-cell trans-cell-before">[antes]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[depois]</div></div>
      <div class="trans-badge-row"><div style="text-align:center"><span class="trans-badge badge-10">Adolescente</span></div><div class="trans-badge-center" style="color:var(--text-muted);font-size:12px">→</div><div style="text-align:center"><span class="trans-badge badge-30">Maduro</span></div></div>
    </div>
  </div>
  <div class="m-footer"><div class="m-footer-mark">✦</div>Jogo da Alma · Mapa da Situação</div>
</div>

CHECKLIST ANTES DE ENTREGAR: usei só os chakras que a situação ativa, com um Principal claro; nomeei a cadeia falta/excesso; separei interno × externo com honestidade sobre o que não se controla; nomeei O Preço a Aceitar; fechei no espírito do anel aberto; mantive a estrutura e as classes do molde; tom firme, acolhedor, sem guru.
LEMBRE: responda só com UM <div class="page">, sem mais nada.`;

const LOADING_MESSAGES = [
    "Lendo sua situação com atenção...",
    "Identificando as duas forças em conflito...",
    "Mapeando os chakras envolvidos...",
    "Encontrando a cadeia falta/excesso...",
    "Formulando a intenção positiva do padrão...",
    "Preparando a prescrição e os scripts...",
    "Separando o que você controla do que não...",
    "Montando estratégias, preço e resultado...",
    "Finalizando seu Mapa da Situação..."
];

class JogoDaAlmaGerador {
    constructor() {
        this.apiKey = localStorage.getItem('jda_api_key') || '';
        this.model = localStorage.getItem('jda_model') || 'anthropic/claude-sonnet-4.6';
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
        this.apiKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.saveSettings(); });
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.userInput.addEventListener('input', () => this.updateCharCount());
        this.userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.handleGenerate(); });
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.openTabBtn.addEventListener('click', () => this.openInNewTab());
        this.newAnalysisBtn.addEventListener('click', () => this.resetForm());
        this.ctaBtn.addEventListener('click', () => document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' }));
    }

    loadSettings() {
        if (this.apiKey) this.apiKeyInput.value = this.apiKey;
        if (this.model) this.modelInput.value = this.model;
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value.trim() || 'anthropic/claude-sonnet-4.6';
        localStorage.setItem('jda_api_key', this.apiKey);
        localStorage.setItem('jda_model', this.model);
        this.settingsPanel.classList.remove('open');
        if (this.apiKey) this.showToast('Configurações salvas');
    }

    updateCharCount() {
        const len = this.userInput.value.length;
        this.charCount.textContent = len > 0 ? (len + ' caracteres') : '';
    }

    async handleGenerate() {
        const situation = this.userInput.value.trim();
        const name = this.nameInput.value.trim();
        if (this.isGenerating) return;

        if (!this.apiKey) {
            this.showToast('Configure sua chave de API primeiro (clique em Configurações)', true);
            this.settingsPanel.classList.add('open');
            return;
        }
        if (situation.length < 30) {
            this.showToast('Descreva a situação com mais detalhes para uma análise precisa', true);
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

        await this.generate(name, situation);
    }

    startLoadingMessages() {
        let idx = 0;
        this.loadingText.textContent = LOADING_MESSAGES[0];
        this.loadingInterval = setInterval(() => {
            idx = (idx + 1) % LOADING_MESSAGES.length;
            this.loadingText.textContent = LOADING_MESSAGES[idx];
        }, 4000);
    }

    stopLoadingMessages() {
        if (this.loadingInterval) { clearInterval(this.loadingInterval); this.loadingInterval = null; }
    }

    async generate(name, situation) {
        const userContent = (name ? ('Nome: ' + name + '\n\n') : '') + 'Relato:\n' + situation;
        let fullText = '';

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.apiKey,
                    'HTTP-Referer': window.location.href,
                    'X-Title': 'Jogo da Alma Mapa Light'
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: userContent }
                    ],
                    stream: true,
                    max_tokens: 16000,
                    temperature: 0.8
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error((errData.error && errData.error.message) || ('Erro ' + response.status + ': ' + response.statusText));
            }

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
                        const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
                        if (delta) {
                            fullText += delta;
                            this.loadingCount.textContent = fullText.length.toLocaleString('pt-BR') + ' caracteres';
                        }
                    } catch (_) { /* skip malformed chunks */ }
                }
            }

            const views = this.extractViews(fullText);
            if (!views || views.indexOf('class="page"') === -1) {
                throw new Error('A resposta do modelo não veio no formato esperado (faltou o Mapa). Tente novamente — modelos maiores costumam acertar o formato.');
            }

            this.reportHtml = buildReportDocument(name, views);
            this.renderResult();

        } catch (err) {
            this.stopLoadingMessages();
            this.statusBox.style.display = 'none';
            this.errorMsg.innerHTML = '<strong>Erro ao gerar análise:</strong> ' + this.escapeHtml(err.message) + '<br><br>Verifique sua chave de API e o modelo, e tente novamente.';
            this.errorMsg.style.display = 'block';
        } finally {
            this.stopLoadingMessages();
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.userInput.disabled = false;
        }
    }

    // Extrai apenas o <div class="page"> da resposta, tolerando fences/preâmbulo/documento completo.
    extractViews(raw) {
        let text = raw.trim();
        text = text.replace(/```html/gi, '').replace(/```/g, '').trim();
        const startIdx = text.indexOf('<div class="page"');
        if (startIdx === -1) return '';
        text = text.slice(startIdx);
        const scriptIdx = text.search(/<script[\s>]/i);
        if (scriptIdx !== -1) text = text.slice(0, scriptIdx);
        text = text.replace(/<\/body>[\s\S]*$/i, '').replace(/<\/html>[\s\S]*$/i, '');
        return text.trim();
    }

    renderResult() {
        this.stopLoadingMessages();
        this.statusBox.style.display = 'none';
        this.resultFrame.srcdoc = this.reportHtml;
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    downloadHTML() {
        if (!this.reportHtml) return;
        const slug = (this.lastName ? this.lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'analise');
        const date = new Date().toISOString().slice(0, 10);
        this.downloadFile(this.reportHtml, 'jogo-da-alma-' + slug + '-' + date + '.html', 'text/html');
    }

    openInNewTab() {
        if (!this.reportHtml) return;
        const blob = new Blob([this.reportHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
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
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, isError) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast ' + (isError ? 'toast-error' : 'toast-success');
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JogoDaAlmaGerador();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
