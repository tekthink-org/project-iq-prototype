/* ============================================================
   PROJECT IQ — Common JS
   Shared sidebar, navigation, alerts, chart helpers
   Seven Hills Constructions — Baseline v1.0
   ============================================================ */

// ── Current project (read from URL) ─────────────────────────
function getCurrentProject() {
  const params = new URLSearchParams(window.location.search);
  return params.get('project') || 'skyline';
}

function getProject() {
  const id = getCurrentProject();
  return window.PIQ.projects[id] || window.PIQ.projects.skyline;
}

// ── Navigate to project page ─────────────────────────────────
function goTo(page, projectId) {
  const id = projectId || getCurrentProject();
  if (page === 'portfolio') {
    window.location.href = 'index.html';
  } else if (page === 'project') {
    window.location.href = `project.html?project=${id}`;
  } else {
    window.location.href = `${page}.html?project=${id}`;
  }
}

// ── Sidebar renderer — Portfolio level ───────────────────────
function renderPortfolioSidebar(activePage) {
  const b = window.PIQ.builder;
  return `
  <div class="sidebar">
    <div class="sb-brand">
      <div class="sb-brand-name">${b.name}</div>
      <div class="sb-brand-sub">Project IQ Platform</div>
    </div>
    <div class="sb-project">
      <div class="sb-project-pill" onclick="goTo('portfolio')">
        <span>All Projects</span><span style="color:#888;">⌄</span>
      </div>
    </div>

    <div class="sb-section">Portfolio</div>
    <div class="sb-item ${activePage==='portfolio'?'active':''}" onclick="goTo('portfolio')">
      <span class="sb-dot" style="background:#1B3A6B;"></span>Portfolio dashboard
    </div>
    <div class="sb-item" onclick="goTo('portfolio')">
      <span class="sb-dot" style="background:#888;"></span>All projects
    </div>

    <div class="sb-section">Intelligence</div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#E24B4A;"></span>Regulatory calendar
      <span class="sb-badge">5</span>
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#1D9E75;"></span>Social intel feed
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#7F77DD;"></span>Market heatmap
    </div>

    <div class="sb-section">Portfolio finance</div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#EF9F27;"></span>Consolidated cash flow
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#EF9F27;"></span>Portfolio P&L
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#EF9F27;"></span>Receivables tracker
    </div>

    <div class="sb-section">Controls</div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#D85A30;"></span>Governance
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#D85A30;"></span>Risk register
    </div>

    <div class="sb-section">Settings</div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#888;"></span>Team & roles
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#888;"></span>Integrations
    </div>

    <div class="sb-iq">
      <button class="iq-btn" onclick="openIQ()">
        <span class="star">✦</span> Ask Project IQ
      </button>
    </div>
  </div>`;
}

// ── Sidebar renderer — Project level ─────────────────────────
function renderProjectSidebar(activePage, projectId) {
  const id = projectId || getCurrentProject();
  const p = window.PIQ.projects[id];
  const b = window.PIQ.builder;
  const name = p ? p.name : 'Project';

  return `
  <div class="sidebar">
    <div class="sb-brand">
      <div class="sb-brand-name">${b.name}</div>
      <div class="sb-brand-sub">Project IQ Platform</div>
    </div>
    <div class="sb-project">
      <div class="sb-project-pill" onclick="showProjectSwitcher()">
        <span style="font-size:11px;font-weight:600;color:#1B3A6B;">${name}</span>
        <span style="color:#888;">⌄</span>
      </div>
    </div>

    <div class="sb-section">Overview</div>
    <div class="sb-item ${activePage==='project'?'active':''}" onclick="goTo('project','${id}')">
      <span class="sb-dot" style="background:#1B3A6B;"></span>Dashboard
    </div>
    <div class="sb-item" onclick="goTo('portfolio')">
      <span class="sb-dot" style="background:#888;"></span>All projects
    </div>

    <div class="sb-section">Construction</div>
    <div class="sb-item ${activePage==='construction'?'active':''}" onclick="goTo('construction','${id}')">
      <span class="sb-dot" style="background:#1D9E75;"></span>Site progress
    </div>
    <div class="sb-item ${activePage==='construction'?'active':''}" onclick="goTo('construction','${id}')">
      <span class="sb-dot" style="background:#1D9E75;"></span>Work packages
    </div>
    <div class="sb-item" onclick="goTo('construction','${id}')">
      <span class="sb-dot" style="background:#1D9E75;"></span>Issue log
      ${p&&p.open_issues>0?`<span class="sb-badge">${p.open_issues}</span>`:''}
    </div>
    <div class="sb-item" onclick="goTo('construction','${id}')">
      <span class="sb-dot" style="background:#1D9E75;"></span>QA / QC
    </div>

    <div class="sb-section">Finance</div>
    <div class="sb-item ${activePage==='finance'?'active':''}" onclick="goTo('finance','${id}')">
      <span class="sb-dot" style="background:#EF9F27;"></span>Cash flow
    </div>
    <div class="sb-item ${activePage==='finance'?'active':''}" onclick="goTo('finance','${id}')">
      <span class="sb-dot" style="background:#EF9F27;"></span>Accounts payable
    </div>
    <div class="sb-item ${activePage==='finance'?'active':''}" onclick="goTo('finance','${id}')">
      <span class="sb-dot" style="background:#EF9F27;"></span>P&L summary
    </div>

    <div class="sb-section">Leasing & Sales</div>
    <div class="sb-item ${activePage==='sales'?'active':''}" onclick="goTo('sales','${id}')">
      <span class="sb-dot" style="background:#E24B4A;"></span>Sales pipeline
    </div>
    <div class="sb-item ${activePage==='sales'?'active':''}" onclick="goTo('sales','${id}')">
      <span class="sb-dot" style="background:#E24B4A;"></span>Unit inventory
    </div>
    <div class="sb-item ${activePage==='sales'?'active':''}" onclick="goTo('sales','${id}')">
      <span class="sb-dot" style="background:#E24B4A;"></span>Revenue forecast
    </div>

    <div class="sb-section">Stakeholder & CX</div>
    <div class="sb-item ${activePage==='cx'?'active':''}" onclick="goTo('cx','${id}')">
      <span class="sb-dot" style="background:#7F77DD;"></span>CX dashboard
    </div>
    <div class="sb-item ${activePage==='cx'?'active':''}" onclick="goTo('cx','${id}')">
      <span class="sb-dot" style="background:#7F77DD;"></span>Escalations
      ${p&&p.cx_issues>0?`<span class="sb-badge">${p.cx_issues}</span>`:''}
    </div>
    <div class="sb-item ${activePage==='cx'?'active':''}" onclick="goTo('cx','${id}')">
      <span class="sb-dot" style="background:#7F77DD;"></span>Payment tracker
    </div>

    <div class="sb-section">Controls</div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#D85A30;"></span>Regulatory
      <span class="sb-badge">3</span>
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#D85A30;"></span>Procurement
    </div>
    <div class="sb-item">
      <span class="sb-dot" style="background:#D85A30;"></span>Risk register
    </div>

    <div class="sb-iq">
      <button class="iq-btn" onclick="openIQ()">
        <span class="star">✦</span> Ask Project IQ
      </button>
    </div>
  </div>`;
}

// ── Project switcher dropdown ────────────────────────────────
function showProjectSwitcher() {
  const projects = window.PIQ.projects;
  const existing = document.getElementById('proj-switcher');
  if (existing) { existing.remove(); return; }

  const el = document.createElement('div');
  el.id = 'proj-switcher';
  el.style.cssText = `position:fixed;top:80px;left:14px;background:white;border:1px solid #e0dfd8;
    border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:999;width:192px;overflow:hidden;`;

  let html = '<div style="padding:8px 0;">';
  Object.values(projects).forEach(p => {
    const color = p.status==='delayed'?'#E24B4A':p.status==='on-track'?'#1D9E75':'#EF9F27';
    html += `<div onclick="goTo('project','${p.id}')" style="padding:8px 14px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:12px;transition:background 0.15s;" onmouseover="this.style.background='#f4f4f2'" onmouseout="this.style.background='white'">
      <span style="width:6px;height:6px;border-radius:50%;background:${color};flex-shrink:0;"></span>
      <span style="font-weight:600;color:#1B3A6B;">${p.name}</span>
    </div>`;
  });
  html += '<div onclick="goTo(\'portfolio\')" style="padding:8px 14px;cursor:pointer;font-size:11px;color:#888;border-top:1px solid #e0dfd8;margin-top:4px;padding-top:8px;" onmouseover="this.style.background=\'#f4f4f2\'" onmouseout="this.style.background=\'white\'">← Back to portfolio</div>';
  html += '</div>';
  el.innerHTML = html;
  document.body.appendChild(el);
  setTimeout(() => document.addEventListener('click', () => el.remove(), { once: true }), 100);
}

// ── Project IQ chat panel ────────────────────────────────────
function openIQ() {
  const existing = document.getElementById('iq-panel-overlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'iq-panel-overlay';
  overlay.style.cssText = `position:fixed;bottom:20px;right:20px;width:340px;
    background:white;border:1px solid #e0dfd8;border-radius:14px;
    box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:999;overflow:hidden;`;

  const suggestions = [
    'What are the top 3 risks I should act on today?',
    'Show me all projects at risk of delay in next 90 days',
    'What is the RERA penalty exposure across portfolio?',
    'Which buyers are at possession risk?',
    'Summarise cash flow for this week',
  ];

  overlay.innerHTML = `
    <div style="background:#1B3A6B;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:13px;font-weight:700;color:white;">✦ Project IQ</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.6);">Decision Intelligence Engine</div>
      </div>
      <button onclick="document.getElementById('iq-panel-overlay').remove()" 
        style="color:rgba(255,255,255,0.6);font-size:18px;background:none;border:none;cursor:pointer;line-height:1;">×</button>
    </div>
    <div style="padding:12px 14px;max-height:300px;overflow-y:auto;" id="iq-messages">
      <div style="background:#E6EDF7;border-radius:8px;padding:10px 12px;font-size:11px;color:#185FA5;line-height:1.5;margin-bottom:10px;">
        Hello! I am Project IQ — your Decision Intelligence engine. I can see across all your projects, dimensions, and data. What would you like to know?
      </div>
      <div style="font-size:10px;color:#888;margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Suggested questions</div>
      ${suggestions.map(s => `
        <div onclick="askIQ('${s}')" style="padding:7px 10px;background:#f4f4f2;border-radius:6px;font-size:11px;color:#1B3A6B;cursor:pointer;margin-bottom:4px;transition:background 0.15s;" onmouseover="this.style.background='#E6EDF7'" onmouseout="this.style.background='#f4f4f2'">
          ${s}
        </div>`).join('')}
    </div>
    <div style="padding:10px 14px;border-top:1px solid #e0dfd8;display:flex;gap:8px;">
      <input id="iq-input" type="text" placeholder="Ask anything about your projects..." 
        style="flex:1;border:1px solid #e0dfd8;border-radius:6px;padding:7px 10px;font-size:11px;font-family:'DM Sans',sans-serif;outline:none;"
        onkeydown="if(event.key==='Enter')askIQ(this.value)">
      <button onclick="askIQ(document.getElementById('iq-input').value)"
        style="background:#1B3A6B;color:white;border-radius:6px;padding:7px 12px;font-size:11px;font-weight:600;cursor:pointer;">Ask</button>
    </div>`;

  document.body.appendChild(overlay);
  document.getElementById('iq-input').focus();
}

// ── IQ Response simulator ────────────────────────────────────
const iqResponses = {
  'risk': 'Top 3 risks today:\n1. Skyline Heights — Tower B delay creates Rs.1.2 Cr RERA penalty + Q3 cash gap. Needs MD decision on night shift (Rs.4.2L saves 30 days).\n2. Water board connection blocking OC — assign liaison today or OC delays 45+ days.\n3. Green Valley pre-registrations going cold — 134 leads, no RERA filed yet. Window closing.',
  'delay': 'Projects at delay risk in next 90 days:\n• Skyline Heights — Tower B 44 days behind. Possession risk: 23 buyers. RERA penalty: Rs.1.2 Cr.\n• Green Valley — Pre-launch delayed if HMDA approval does not come this week.\nPrestige Oaks and TekTower One are on track.',
  'rera': 'RERA penalty exposure:\n• Skyline Heights: Rs.1.2 Cr if Tower B delay continues and 23 possession dates breach.\n• Prestige Oaks: Quarterly update due tomorrow — file today.\n• Green Valley: RERA not yet filed — cannot sell until filed.\nTotal exposure: Rs.1.2 Cr immediate + regulatory risk.',
  'buyer': '23 buyers at possession risk in Skyline Heights — all Tower B floors 8-12. Recommended action: proactive WhatsApp communication with revised possession date and recovery plan. I have drafted the message — want to see it?',
  'cash': 'This week cash position:\n• Opening balance: Rs.8.4 Cr\n• Expected inflows: Rs.3.2 Cr (4 buyer collections due)\n• Payables due: Rs.6 Cr (3 bills pending PM cert)\n• Net position: Rs.5.6 Cr\n• Warning: Q3 gap of Rs.3.8 Cr projected if Tower B delay continues.',
  'default': 'I am analysing your project data across all dimensions. Based on what I see, the most important thing requiring your attention today is the Tower B recovery plan at Skyline Heights — it has a cascading impact on 23 buyers, RERA compliance, and Q3 cash flow. Would you like me to detail the recovery options?'
};

function askIQ(question) {
  if (!question || !question.trim()) return;
  const messages = document.getElementById('iq-messages');
  if (!messages) return;

  // User message
  messages.innerHTML += `<div style="background:#1B3A6B;border-radius:8px;padding:8px 12px;font-size:11px;color:white;margin-bottom:8px;margin-left:20px;">${question}</div>`;

  // Find response
  const q = question.toLowerCase();
  let response = iqResponses.default;
  if (q.includes('risk')) response = iqResponses.risk;
  else if (q.includes('delay') || q.includes('90 days')) response = iqResponses.delay;
  else if (q.includes('rera') || q.includes('penalty')) response = iqResponses.rera;
  else if (q.includes('buyer') || q.includes('possession')) response = iqResponses.buyer;
  else if (q.includes('cash') || q.includes('flow')) response = iqResponses.cash;

  // IQ response with typing delay
  setTimeout(() => {
    messages.innerHTML += `<div style="background:#E6EDF7;border-radius:8px;padding:10px 12px;font-size:11px;color:#185FA5;line-height:1.6;margin-bottom:8px;white-space:pre-line;">✦ ${response}</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 600);

  const input = document.getElementById('iq-input');
  if (input) input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

// ── Bar colour helper ────────────────────────────────────────
function scoreColor(score) {
  if (score >= 70) return '#1D9E75';
  if (score >= 50) return '#EF9F27';
  return '#E24B4A';
}

function scoreBarClass(score) {
  if (score >= 70) return 'bar-green';
  if (score >= 50) return 'bar-amber';
  return 'bar-red';
}

function statusTagClass(status) {
  if (status === 'delayed')    return 'tag-delayed';
  if (status === 'on-track')   return 'tag-ontrack';
  if (status === 'pre-launch') return 'tag-prelaunch';
  return 'tag-info';
}

// ── Render alert bar ─────────────────────────────────────────
function renderAlertBar(alerts) {
  if (!alerts || !alerts.length) return '';
  const rows = alerts.slice(0, 3).map(a => `
    <div class="alert-row">
      <span class="alert-tag at-${a.severity}">${a.severity.toUpperCase()}</span>
      <span>${a.message}</span>
    </div>`).join('');
  return `<div class="alert-bar">${rows}</div>`;
}

// ── Format currency ──────────────────────────────────────────
function fmtCr(val) {
  if (!val) return 'Rs.0';
  return `Rs.${val} Cr`;
}

// ── Progress bar html ────────────────────────────────────────
function progressBar(actual, plan, height) {
  const h = height || 6;
  const cls = scoreBarClass(actual);
  return `
    <div class="progress-wrap" style="height:${h}px;">
      <div class="progress-bar ${cls}" style="width:${actual}%;"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:9px;color:#888;margin-top:2px;">
      <span>${actual}% actual</span><span>${plan}% plan</span>
    </div>`;
}
