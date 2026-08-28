/* ════════════════════════════════════════════════════════════════════
   JOGO DA ALMA — SABER Chakras + Personalidade (v08 · abas)
   O modelo gera os dois tab-panels. Este arquivo monta o shell fixo.
   ════════════════════════════════════════════════════════════════════ */

const REPORT_STYLE = `
:root{
  --bg:#F7F6F3; --card:#FFFFFF; --text:#1A1A1A; --text2:#3D3D3D; --text3:#6B6B6B;
  --muted:#9A9A9A; --border:#E8E6E1; --border-light:#F0EFEB; --accent:#C9A84C;
  --accent-soft:rgba(201,168,76,.08); --accent-border:rgba(201,168,76,.25);
  --red-bg:#FEF2F2; --red-border:#FECACA; --red-text:#991B1B;
  --green-bg:#F0FDF4; --green-border:#BBF7D0; --green-text:#065F46;
  --amber-bg:#FFFBEB; --amber-border:#FDE68A; --amber-text:#92400E;
  --blue-bg:#EFF6FF; --blue-border:#BFDBFE; --blue-text:#1E40AF;
  --purple-bg:#FAF5FF; --purple-border:#E9D5FF; --purple-text:#6B21A8;
  --basic:#D95A55; --sacral:#EA8B3A; --plexo:#E8A317; --cardiaco:#4CAF82;
  --laringeo:#4A9FD9; --frontal:#8B5CF6; --coronario:#C77DBA;
}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;-webkit-font-smoothing:antialiased}
.page{max-width:720px;margin:0 auto;padding:40px 20px 80px}
.header{text-align:center;margin-bottom:36px}
.eyebrow{font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.header h1{font-family:'Fraunces',serif;font-size:30px;font-weight:600;line-height:1.2;margin-bottom:6px}
.header-sub{font-size:13px;color:var(--muted);max-width:540px;margin:0 auto}
.situacao{background:var(--text);color:#F5F5F0;border-radius:16px;padding:22px 26px;margin-bottom:28px}
.situacao-label{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:8px}
.situacao-text{font-size:14px;line-height:1.7;color:rgba(255,255,255,.82);font-style:italic}
.section{margin-bottom:30px}
.section-header{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.section-icon{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.section-title{font-family:'Fraunces',serif;font-size:20px;font-weight:600}
.intro-icon{background:var(--accent-soft);border:1px solid var(--accent-border)}
.need-icon{background:#FFF7ED;border:1px solid #FDBA74}
.chakra-icon{background:#F5F3FF;border:1px solid #DDD6FE}
.cap-icon{background:#FDF4FF;border:1px solid #F0ABFC}
.sum-icon{background:var(--green-bg);border:1px solid var(--green-border)}
.choice-icon{background:var(--blue-bg);border:1px solid var(--blue-border)}
.intro-box{background:var(--accent-soft);border:1px solid var(--accent-border);border-radius:14px;padding:18px 20px;font-size:13px;color:var(--text2)}
.intro-box strong{color:var(--text)}
.raiz-strip{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.raiz-item{display:flex;align-items:center;gap:12px;padding:14px 18px;border-bottom:1px solid var(--border-light)}
.raiz-item:last-child{border-bottom:none}
.raiz-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.raiz-chakra{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);width:74px;flex-shrink:0}
.raiz-content{flex:1}
.raiz-need{font-family:'Fraunces',serif;font-size:16px;font-weight:600}
.raiz-desc{font-size:11.5px;color:var(--text3);margin-top:1px}
.chakra-stack{display:flex;flex-direction:column;gap:14px}
.chakra-block{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.chakra-head{padding:16px 18px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border-light)}
.chakra-name{font-family:'Fraunces',serif;font-size:18px;font-weight:600}
.chakra-role{margin-left:auto;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);background:var(--border-light);padding:3px 7px;border-radius:999px}
.mini-dot{width:7px;height:7px;border-radius:50%;display:inline-block}
.chakra-prop{padding:16px 18px;border-bottom:1px solid var(--border-light)}
.chakra-prop-title{font-family:'Fraunces',serif;font-size:16px;font-weight:600;margin-bottom:5px}
.chakra-prop-text{font-size:12.5px;color:var(--text2)}
.chakra-question{margin-top:10px;font-size:11.5px;color:var(--muted);font-style:italic}
.matrix{display:grid;grid-template-columns:1fr 1fr 1fr}
.state{min-width:0}
.state + .state{border-left:1px solid var(--border-light)}
.state-head{padding:10px 12px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.state-lack .state-head{background:#FAFAF8;color:var(--muted)}
.state-excess .state-head{background:var(--red-bg);color:var(--red-text)}
.state-prop .state-head{background:var(--green-bg);color:var(--green-text)}
.factor{padding:11px 12px;border-top:1px solid var(--border-light)}
.factor:first-of-type{border-top:none}
.factor-label{font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:4px}
.factor-text{font-size:11.5px;line-height:1.48;color:var(--text2)}
.state-excess .factor{background:#FFFDFD}
.state-prop .factor{background:#FCFFFD}
.state-lack .factor{background:#FFF}
.cap-list{display:flex;flex-direction:column;gap:8px}
.cap-item{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 16px;display:grid;grid-template-columns:1fr auto;gap:6px 12px;align-items:center}
.cap-main{display:flex;align-items:baseline;gap:8px;min-width:0}
.cap-name{font-size:13px;font-weight:700;white-space:nowrap}
.cap-dash{color:var(--border)}
.cap-desc{font-size:12px;color:var(--text3);font-style:italic}
.cap-tag{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);background:var(--border-light);padding:3px 7px;border-radius:6px;white-space:nowrap;display:flex;align-items:center;gap:4px}
.cap-note{grid-column:1/-1;font-size:10.5px;color:var(--text3);padding-top:5px;border-top:1px solid var(--border-light)}
.summary{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px}
.formula{font-family:'Fraunces',serif;font-size:18px;line-height:1.45}
.formula strong{color:var(--accent)}
.summary-note{font-size:11.5px;color:var(--text3);margin-top:8px}
.choice-box{background:#1F2937;color:#F9FAFB;border-radius:16px;padding:22px 24px}
.choice-label{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9CA3AF;margin-bottom:8px}
.choice-text{font-family:'Fraunces',serif;font-size:19px;line-height:1.45}
.footer{text-align:center;margin-top:42px;padding-top:22px;border-top:1px solid var(--border);color:var(--muted);font-size:10px}
.profile-box{background:var(--text);color:#F5F5F0;border-radius:16px;padding:22px 24px;margin-bottom:28px}
.profile-label{font-size:9px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:10px}
.profile-title{font-family:'Fraunces',serif;font-size:20px;margin-bottom:12px}
.badges{display:flex;gap:7px;flex-wrap:wrap}
.badge{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:999px;font-size:10px;font-weight:700;border:1px solid}
.badge .dot{width:7px;height:7px;border-radius:50%;display:inline-block}
.b-basic{background:#FEF2F2;border-color:#FECACA;color:#991B1B}
.b-sacral{background:#FFF7ED;border-color:#FDBA74;color:#9A4F1F}
.b-card{background:#ECFDF5;border-color:#A7F3D0;color:#047857}
.b-plexo{background:#FFFBEB;border-color:#FDE68A;color:#92400E}
.b-lar{background:#EFF6FF;border-color:#BFDBFE;color:#1E40AF}
.b-frontal{background:#F5F3FF;border-color:#DDD6FE;color:#6B21A8}
.b-coronario{background:#FDF4FF;border-color:#F0ABFC;color:#86198F}
.strip{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.strip-item{display:flex;align-items:flex-start;gap:12px;padding:15px 18px;border-bottom:1px solid var(--border-light)}
.strip-item:last-child{border-bottom:none}
.strip-dot{width:9px;height:9px;border-radius:50%;margin-top:6px;flex-shrink:0}
.strip-chakra{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);width:74px;flex-shrink:0;padding-top:2px}
.strip-content{flex:1}
.strip-title{font-family:'Fraunces',serif;font-size:16px;font-weight:600}
.strip-desc{font-size:11.5px;color:var(--text3);margin-top:2px}
.cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cap-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px}
.cap-card h3{font-family:'Fraunces',serif;font-size:17px;margin-bottom:10px}
.cap-grid .cap-list{display:flex;flex-direction:column;gap:7px}
.cap-row{font-size:12px;color:var(--text2);display:flex;gap:7px;align-items:flex-start}
.cap-row::before{content:'•';color:var(--accent);font-weight:700}
.ease-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ease-card{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.ease-head{padding:13px 15px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.ease-high .ease-head{background:var(--green-bg);color:var(--green-text)}
.ease-low .ease-head{background:var(--amber-bg);color:var(--amber-text)}
.ease-body{padding:14px 15px}
.ease-item{display:flex;align-items:center;gap:8px;font-size:12px;margin-bottom:9px}
.ease-item:last-child{margin-bottom:0}
.ease-note{font-size:10.5px;color:var(--text3);margin-top:10px;padding-top:10px;border-top:1px solid var(--border-light)}
.risk-stack{display:flex;flex-direction:column;gap:10px}
.risk-card{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.risk-head{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid var(--border-light)}
.risk-name{font-family:'Fraunces',serif;font-size:17px;font-weight:600}
.risk-tag{margin-left:auto;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:3px 7px;border-radius:999px}
.tag-excess{background:var(--red-bg);color:var(--red-text)}
.tag-lack{background:var(--amber-bg);color:var(--amber-text)}
.risk-body{padding:14px 16px}
.risk-main{font-size:13px;font-weight:700;margin-bottom:5px}
.risk-desc{font-size:12px;color:var(--text3)}
.pae-stack{display:flex;flex-direction:column;gap:10px}
.pae-card{background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.pae-head{display:flex;align-items:center;gap:8px;padding:13px 15px;border-bottom:1px solid var(--border-light)}
.pae-name{font-family:'Fraunces',serif;font-size:16px;font-weight:600}
.pae-tag{margin-left:auto;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:3px 7px;border-radius:999px}
.tag-principal{background:#F3F4F6;color:#4B5563}
.tag-oposto{background:#FEF3C7;color:#92400E}
.pae-grid{display:grid;grid-template-columns:1fr 1fr 1fr}
.pae-cell{padding:13px}
.pae-cell + .pae-cell{border-left:1px solid var(--border-light)}
.pae-label{font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:5px}
.pae-text{font-size:11.5px;color:var(--text2);line-height:1.5}
.pae-foot{padding:11px 13px;border-top:1px solid var(--border-light);background:var(--green-bg);font-size:11.5px;color:var(--green-text)}
.integration{background:linear-gradient(135deg,#FFF,#F5FFF9);border:1px solid var(--green-border);border-radius:16px;padding:20px}
.integration-title{font-family:'Fraunces',serif;font-size:19px;margin-bottom:12px}
.integration-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.pill{padding:7px 10px;border-radius:999px;border:1px solid;font-size:10px;font-weight:700}
.arr{color:var(--muted)}
.integration-note{font-size:12px;color:var(--text3);margin-top:12px}
.formula-main{font-family:'Fraunces',serif;font-size:18px;line-height:1.5}
.formula-sub{font-size:11.5px;color:var(--muted);margin-top:6px}
.final-box{background:#1F2937;color:#F9FAFB;border-radius:16px;padding:22px 24px}
.final-label{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#9CA3AF;margin-bottom:8px}
.final-text{font-family:'Fraunces',serif;font-size:19px;line-height:1.45}
.saber-shell{max-width:760px;margin:0 auto;padding:28px 20px 80px}
.saber-tabs-wrap{position:sticky;top:0;z-index:20;background:rgba(247,246,243,.96);backdrop-filter:blur(10px);padding:10px 0 14px;margin-bottom:18px;border-bottom:1px solid var(--border)}
.saber-tabs{display:grid;grid-template-columns:1fr 1fr;background:#ECEAE5;border:1px solid var(--border);padding:4px;border-radius:14px;gap:4px}
.saber-tab{appearance:none;border:0;background:transparent;border-radius:10px;padding:11px 12px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;color:var(--text3);cursor:pointer;transition:.18s ease}
.saber-tab.active{background:var(--card);color:var(--text);box-shadow:0 1px 2px rgba(0,0,0,.05)}
.saber-tab small{display:block;font-size:9px;font-weight:500;color:var(--muted);margin-top:1px}
.saber-tab.active small{color:var(--text3)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.tab-panel .page{max-width:720px;padding:0;margin:0 auto}
.master-head{text-align:center;margin-bottom:14px}
.master-eyebrow{font-size:9px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}
.master-title{font-family:'Fraunces',serif;font-size:24px;margin:4px 0}
.master-sub{font-size:11.5px;color:var(--muted)}
@media(max-width:640px){
  .matrix{grid-template-columns:1fr}
  .state + .state{border-left:none;border-top:1px solid var(--border)}
  .raiz-item{align-items:flex-start}
  .raiz-chakra{width:62px}
  .cap-item{grid-template-columns:1fr}
  .cap-tag{justify-self:start}
}
@media(max-width:620px){
  .cap-grid,.ease-grid{grid-template-columns:1fr}
  .pae-grid{grid-template-columns:1fr}
  .pae-cell + .pae-cell{border-left:none;border-top:1px solid var(--border-light)}
  .strip-chakra{width:62px}
}
@media(max-width:520px){
  .saber-shell{padding-left:14px;padding-right:14px}
  .saber-tab{font-size:11px;padding:10px 6px}
}
`;

const SHELL_HEAD = `<div class="saber-shell">
  <div class="master-head">
    <div class="master-eyebrow">Jogo da Alma · SABER</div>
    <div class="master-title">Compreender por duas perspectivas</div>
    <div class="master-sub">Chakras mostram o que precisa estar em proporção. Personalidade mostra como você tende naturalmente a funcionar.</div>
  </div>
  <div class="saber-tabs-wrap">
    <div class="saber-tabs" role="tablist" aria-label="Perspectivas do Saber">
      <button class="saber-tab active" id="tab-chakras" type="button" role="tab" aria-selected="true" aria-controls="panel-chakras">
        SABER — Chakras
        <small>O que precisa estar em proporção</small>
      </button>
      <button class="saber-tab" id="tab-personalidade" type="button" role="tab" aria-selected="false" aria-controls="panel-personalidade">
        SABER — Personalidade
        <small>Como eu tendo a funcionar</small>
      </button>
    </div>
  </div>`;

const TAB_SCRIPT = `<script>
(function(){
  const tabs = Array.from(document.querySelectorAll('.saber-tab'));
  const panels = Array.from(document.querySelectorAll('.tab-panel'));
  function activate(id){
    tabs.forEach(function(tab){
      var active = tab.id === id;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function(panel){
      panel.classList.toggle('active',
        (id === 'tab-chakras' && panel.id === 'panel-chakras') ||
        (id === 'tab-personalidade' && panel.id === 'panel-personalidade')
      );
    });
  }
  tabs.forEach(function(tab){ tab.addEventListener('click', function(){ activate(tab.id); }); });
})();
<\/script>`;

function buildReportDocument(name, panelsHtml) {
    const title = name ? ('Jogo da Alma — SABER · ' + name) : 'Jogo da Alma — SABER | Chakras + Personalidade';
    return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        + '<title>' + title + '</title>\n'
        + '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">\n'
        + '<style>' + REPORT_STYLE + '</style>\n</head>\n<body>\n'
        + SHELL_HEAD + '\n'
        + panelsHtml + '\n</div>\n'
        + TAB_SCRIPT + '\n</body>\n</html>';
}

const LOADING_MESSAGES = [
    'Gerando aba Chakras (mapa proporcional)...',
    'Montando matriz Falta × Excesso × Proporcional...',
    'Finalizando necessidades e capacidades dos 7 chakras...',
    'Gerando conteúdo da aba Personalidade...',
    'Mapeando necessidades primárias e opostas...',
    'Calculando riscos, PAE e integração...',
    'Montando layout fiel ao molde de referência...',
    'Finalizando as duas abas...'
];

class SaberChakrasGerador {
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
        this.principal1 = document.getElementById('principal1');
        this.principal2 = document.getElementById('principal2');
        this.oposto1 = document.getElementById('oposto1');
        this.oposto2 = document.getElementById('oposto2');
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

    getChakraSelections() {
        return {
            principal1: this.principal1.value,
            principal2: this.principal2.value,
            oposto1: this.oposto1.value,
            oposto2: this.oposto2.value
        };
    }

    validateChakras(ch) {
        const all = [ch.principal1, ch.principal2, ch.oposto1, ch.oposto2];
        if (all.some(v => !v)) return 'Selecione os 2 chakras principais e os 2 opostos';
        const unique = new Set(all);
        if (unique.size < 4) return 'Os 4 chakras devem ser diferentes entre si';
        return null;
    }

    async handleGenerate() {
        const situation = this.userInput.value.trim();
        const name = this.nameInput.value.trim();
        const chakras = this.getChakraSelections();
        if (this.isGenerating) return;

        if (!this.apiKey) {
            this.showToast('Configure sua chave de API primeiro (clique em Configurações)', true);
            this.settingsPanel.classList.add('open');
            return;
        }
        const chakraErr = this.validateChakras(chakras);
        if (chakraErr) {
            this.showToast(chakraErr, true);
            return;
        }
        if (situation.length < 10) {
            this.showToast('Descreva a situação ou faça uma pergunta com mais contexto', true);
            return;
        }

        this.lastName = name;
        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.userInput.disabled = true;
        [this.principal1, this.principal2, this.oposto1, this.oposto2, this.nameInput].forEach(el => { el.disabled = true; });
        this.errorMsg.style.display = 'none';
        this.resultSection.style.display = 'none';
        this.statusBox.style.display = 'flex';
        this.startLoadingMessages();

        await this.generate(name, situation, chakras);
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

    async streamCompletion(systemPrompt, userContent, onDelta) {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey,
                'HTTP-Referer': window.location.href,
                'X-Title': 'Jogo da Alma SABER'
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userContent }
                ],
                stream: true,
                max_tokens: 32000,
                temperature: 0.6
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error((errData.error && errData.error.message) || ('Erro ' + response.status + ': ' + response.statusText));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

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
                        if (onDelta) onDelta(fullText.length);
                    }
                } catch (_) { /* skip malformed chunks */ }
            }
        }
        return fullText;
    }

    async generate(name, situation, chakras) {
        let userContent = '';
        if (name) userContent += 'Nome: ' + name + '\n';
        userContent += 'Chakras principais: ' + chakras.principal1 + ', ' + chakras.principal2 + '\n';
        userContent += 'Chakras opostos: ' + chakras.oposto1 + ', ' + chakras.oposto2 + '\n\n';
        userContent += 'Input (situação ou pergunta):\n' + situation;

        const onDelta = (len) => {
            this.loadingCount.textContent = len.toLocaleString('pt-BR') + ' caracteres';
        };

        try {
            this.loadingText.textContent = 'Gerando aba Chakras...';
            const chakrasRaw = await this.streamCompletion(CHAKRAS_HTML_PROMPT, userContent, onDelta);
            const panelChakras = wrapPanelChakras(chakrasRaw);

            this.loadingText.textContent = 'Gerando aba Personalidade...';
            const persRaw = await this.streamCompletion(PERSONALIDADE_JSON_PROMPT, userContent, onDelta);
            const persData = parseJsonFromResponse(persRaw);
            validatePersonalityData(persData);
            const panelPersonalidade = buildPersonalityPanel(name, chakras, persData);

            this.reportHtml = buildReportDocument(name, panelChakras + '\n\n' + panelPersonalidade);
            this.renderResult();

        } catch (err) {
            this.stopLoadingMessages();
            this.statusBox.style.display = 'none';
            this.errorMsg.innerHTML = '<strong>Erro ao gerar mapa:</strong> ' + this.escapeHtml(err.message) + '<br><br>Verifique sua chave de API e o modelo, e tente novamente.';
            this.errorMsg.style.display = 'block';
        } finally {
            this.stopLoadingMessages();
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.userInput.disabled = false;
            [this.principal1, this.principal2, this.oposto1, this.oposto2, this.nameInput].forEach(el => { el.disabled = false; });
        }
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
        const slug = (this.lastName ? this.lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'saber');
        const date = new Date().toISOString().slice(0, 10);
        this.downloadFile(this.reportHtml, 'saber-chakras-personalidade-' + slug + '-' + date + '.html', 'text/html');
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
        this.principal1.value = 'Sacral';
        this.principal2.value = 'Cardíaco';
        this.oposto1.value = 'Plexo Solar';
        this.oposto2.value = 'Laríngeo';
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
    new SaberChakrasGerador();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
