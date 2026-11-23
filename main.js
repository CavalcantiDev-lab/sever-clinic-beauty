/* Sever Clinic & Beauty — comportamento do site.
   Dados de serviços/valores: agendamento online da clínica (severclinicbeauty.belasis.app), consulta em 23/11/2026. */
(() => {
  'use strict';

  const WA = '5511998474093';
  const waUrl = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const money = (n) => 'R$ ' + n.toLocaleString('pt-BR');

  /* ------------------------------------------------------------------ *
   * Catálogo (nome, duração, valor em R$)
   * ------------------------------------------------------------------ */
  const CATS = [
    { id: 'nanoblading', name: 'Nanoblading',
      intro: 'Técnica avançada de nanopigmentação de sobrancelhas que reproduz fios extremamente finos e realistas, com resultado natural e sofisticado.',
      items: [
        ['Nanoblading Bloom Brows', '1h30', 1500],
        ['Sever Shine — fios + sombra', '2h', 1750],
        ['Consultoria de nanopigmentação', '30 min', 90],
      ] },
    { id: 'sobrancelha', name: 'Sobrancelha',
      intro: 'Design personalizado, respeitando o formato do rosto, e tratamentos para alinhar, fortalecer e regenerar os fios.',
      items: [
        ['Design de sobrancelhas', '30 min', 60],
        ['Design com henna', '1h', 75],
        ['Design com coloração', '50 min', 75],
        ['Sever Lamination', '1h30', 180],
        ['Sever Grow Up — tratamento de sobrancelhas', '30 min', 250],
        ['Laserterapia', '10 min', 200],
        ['Regeneração de sobrancelha (exossomos)', '30 min', 1000],
        ['Somente aplicação de henna/coloração', '30 min', 50],
      ] },
    { id: 'cilios', name: 'Cílios',
      intro: 'Alongamento personalizado, manutenção a cada 15 a 21 dias e o Soft Lifting, que realça a curvatura natural dos fios.',
      items: [
        ['Alongamento de cílios', '2h', 180],
        ['Manutenção de alongamento de cílios', '1h30', 90],
        ['Soft Lifting', '1h30', 160],
        ['Remoção de cílios', '1h', 65],
      ] },
    { id: 'labios', name: 'Lábios',
      intro: 'Pigmentação que define o contorno e uniformiza a tonalidade, e hidratação profunda com o HidraGloss.',
      items: [
        ['Micropigmentação labial — Sever Lips', '2h', 1300],
        ['Hidragloss', '30 min', 200],
      ] },
    { id: 'estetica', name: 'Estética avançada',
      intro: 'O primeiro passo é uma avaliação detalhada das suas necessidades, para montar um protocolo exclusivo e personalizado.',
      items: [
        ['Avaliação estética avançada', '15 min', 100],
        ['Preenchimento facial (1 ml)', '2h', 1500],
        ['Preenchimento labial', '1h', null],
        ['Botox', '40 min', null],
        ['Bioestimulador — ácido L-polilático Elleva', '2h', 2800],
        ['Bioestimulador — ácido L-polilático Sculptra', '2h', 3500],
        ['Enzimas — acelerador metabólico', '15 min', 240],
        ['Secagem de vasinhos', '15 min', 240],
      ] },
    { id: 'facial', name: 'Facial',
      intro: 'Limpeza, renovação e estímulo de colágeno em protocolos personalizados para cada tipo de pele.',
      items: [
        ['Limpeza de pele profunda', '1h30', 180],
        ['Microagulhamento', '1h', 290],
        ['Lifting facial', '30 min', 80],
        ['Consultoria de sobrancelhas', '30 min', 90],
      ] },
    { id: 'epilacao', name: 'Epilação egípcia',
      intro: 'Remoção de pelos com linha 100% de algodão, desde a raiz, sem cera ou produtos químicos — ideal para peles sensíveis.',
      items: [
        ['Depilação do buço com linha', '10 min', 25],
        ['Depilação do queixo com linha', '5 min', 10],
      ] },
    { id: 'unha', name: 'Unha',
      intro: 'Alongamento, blindagem, banho de gel e cuidados de mãos e pés, com acabamento personalizado.',
      items: [
        ['Alongamento de unha — fibra de vidro', '3h', 160],
        ['Manutenção de alongamento de fibra', '2h', 90],
        ['Banho de gel com cutilagem e esmaltação', '2h30', 80],
        ['Blindagem com cutilagem e esmaltação', '2h30', 80],
        ['Esmaltação em gel', '1h30', 50],
        ['Manicure', '1h', 38],
        ['Pedicure', '1h', 45],
        ['Pé e mão', '2h', 75],
        ['Plástica dos pés com pedicure', '1h', 110],
      ] },
  ];

  const LASER = {
    id: 'laser', name: 'Remoção a laser',
    extra: 'Consultoria para remoção a laser',
    items: [
      ['Consultoria de remoção de tatuagem', '30 min', 90],
      ['Consultoria de remoção de micropigmentação', '30 min', 90],
      ['Despigmentação a laser', '30 min', 400],
      ['Reparo tecidual', '30 min', 400],
      ['BlackPeel', '1h', 600],
    ],
  };

  const price = (p) => (p == null ? 'Sob consulta' : money(p));

  /* ------------------------------------------------------------------ *
   * Render: índice de tratamentos
   * ------------------------------------------------------------------ */
  const itemHtml = ([n, t, p]) => `
    <li>
      <span class="n">${n}</span>
      <span class="t">${t}</span>
      <span class="p">${price(p)}</span>
      <button class="pill pill--sm" type="button" data-service="${n}">Agendar</button>
    </li>`;

  const index = $('#serviceIndex');
  index.innerHTML = CATS.map((c, i) => `
    <li class="cat" data-id="${c.id}">
      <button class="cat__btn" type="button" id="btn-${c.id}" aria-expanded="false" aria-controls="panel-${c.id}">
        <span class="cat__num">${String(i + 1).padStart(2, '0')}</span>
        <span class="cat__name">${c.name}</span>
        <span class="cat__count">${c.items.length} ${c.items.length > 1 ? 'procedimentos' : 'procedimento'}</span>
        <span class="cat__icon" aria-hidden="true"></span>
      </button>
      <div class="cat__panel" id="panel-${c.id}" role="region" aria-labelledby="btn-${c.id}">
        <div class="cat__inner"><div class="cat__content">
          <p class="body body--narrow">${c.intro}</p>
          <ul class="plist">${c.items.map(itemHtml).join('')}</ul>
        </div></div>
      </div>
    </li>`).join('') + `
    <li class="cat">
      <a class="cat__btn" href="#laser">
        <span class="cat__num">${String(CATS.length + 1).padStart(2, '0')}</span>
        <span class="cat__name">${LASER.name}</span>
        <span class="cat__count">ver seção</span>
        <span class="cat__icon" aria-hidden="true">→</span>
      </a>
    </li>`;

  index.addEventListener('click', (e) => {
    const btn = e.target.closest('button.cat__btn');
    if (!btn) return;
    const li = btn.closest('.cat');
    const open = !li.classList.contains('is-open');
    $$('.cat.is-open', index).forEach((el) => {
      el.classList.remove('is-open');
      $('.cat__btn', el).setAttribute('aria-expanded', 'false');
    });
    if (open) {
      li.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Lista da seção de laser
  $('#laserList').classList.add('plist--static');
  $('#laserList').innerHTML = LASER.items.map(([n, t, p]) =>
    `<li><span class="n">${n}</span><span class="t">${t}</span><span class="p">${price(p)}</span></li>`).join('');

  /* ------------------------------------------------------------------ *
   * Formulário → WhatsApp
   * ------------------------------------------------------------------ */
  const form = $('#bookForm');
  const fName = $('#fName'), fService = $('#fService'), fDate = $('#fDate'), fMsg = $('#fMsg');
  const note = $('#dateNote'), preview = $('#preview');

  const opt = (v, label = v) => `<option value="${v}">${label}</option>`;
  fService.innerHTML =
    `<option value="" disabled selected>Escolha um procedimento</option>` +
    `<option value="Ainda não sei — quero uma avaliação">Ainda não sei — quero uma avaliação</option>` +
    CATS.map((c) => `<optgroup label="${c.name}">${c.items.map(([n]) => opt(n)).join('')}</optgroup>`).join('') +
    `<optgroup label="${LASER.name}">${opt(LASER.extra)}${LASER.items.map(([n]) => opt(n)).join('')}</optgroup>`;

  // data mínima: hoje (horário local)
  const today = new Date();
  fDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const parseDate = (v) => { if (!v) return null; const [y, m, d] = v.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmtDate = (d) => d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
  const period = () => (form.elements.periodo.value || 'Tanto faz');

  function buildMessage(forPreview = false) {
    const ph = (t) => (forPreview ? `<span class="ph">${t}</span>` : '…');
    const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const name = fName.value.trim();
    const serv = fService.value;
    const d = parseDate(fDate.value);
    const obs = fMsg.value.trim();
    const lines = [
      'Olá! Vim pelo site da Sever Clinic & Beauty e gostaria de agendar.',
      '',
      `Nome: ${name ? (forPreview ? esc(name) : name) : ph('seu nome')}`,
      `Procedimento: ${serv ? (forPreview ? esc(serv) : serv) : ph('escolha um procedimento')}`,
    ];
    if (d) lines.push(`Dia de preferência: ${fmtDate(d)}`);
    lines.push(`Período: ${period()}`);
    if (obs) lines.push(`Observações: ${forPreview ? esc(obs) : obs}`);
    return lines.join('\n');
  }

  function checkDate() {
    const d = parseDate(fDate.value);
    if (d && d.getDay() === 0) {
      note.textContent = 'Aos domingos a clínica está fechada. Escolha um dia de segunda a sábado.';
      fDate.setAttribute('aria-invalid', 'true');
      return false;
    }
    if (note.dataset.kind === 'date') note.textContent = '';
    fDate.removeAttribute('aria-invalid');
    return true;
  }
  note.dataset.kind = 'date';

  function refresh() { preview.innerHTML = buildMessage(true); }
  ['input', 'change'].forEach((ev) => form.addEventListener(ev, () => {
    fName.removeAttribute('aria-invalid');
    fService.removeAttribute('aria-invalid');
    if (note.dataset.kind === 'err') { note.textContent = ''; note.dataset.kind = 'date'; }
    checkDate();
    refresh();
  }));
  refresh();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let bad = null;
    if (!fName.value.trim()) { fName.setAttribute('aria-invalid', 'true'); bad = bad || fName; }
    if (!fService.value) { fService.setAttribute('aria-invalid', 'true'); bad = bad || fService; }
    if (!checkDate()) bad = bad || fDate;
    if (bad) {
      if (bad !== fDate) { note.dataset.kind = 'err'; note.textContent = 'Preencha seu nome e escolha o procedimento para continuar.'; }
      bad.focus();
      return;
    }
    note.dataset.kind = 'date'; note.textContent = '';
    const url = waUrl(buildMessage(false));
    if (matchMedia('(pointer: coarse)').matches) {
      // celular/tablet: navegar direto é o jeito mais confiável de abrir o app do WhatsApp
      window.location.href = url;
    } else {
      // computador: abre o WhatsApp Web em nova aba
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
    }
  });

  // Botões "Agendar" dos tratamentos → pré-seleciona e rola até o formulário
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-service]');
    if (!b) return;
    const v = b.dataset.service;
    if ($$('option', fService).some((o) => o.value === v)) fService.value = v;
    refresh();
    $('#agendar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => fName.focus({ preventScroll: true }), 700);
  });

  // Links de WhatsApp fixos
  $('#courseLink').href = waUrl('Olá, vim pelo site, gostaria de saber mais informações sobre os cursos.');
  $('#waLink').href = waUrl('Olá! Vim pelo site da Sever Clinic & Beauty.');

  /* ------------------------------------------------------------------ *
   * Status "aberto agora" (horário de Brasília)
   * Seg–sáb: 08:00–12:00 e 13:30–19:00 · domingo fechado
   * ------------------------------------------------------------------ */
  function openStatus() {
    const el = $('#openStatus');
    if (!el) return;
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const day = now.getDay();
    const m = now.getHours() * 60 + now.getMinutes();
    let txt;
    if (day === 0) txt = 'Fechado hoje · abre amanhã às 8h';
    else if (m >= 480 && m < 720) txt = 'Aberto agora · pausa às 12h';
    else if (m >= 810 && m < 1140) txt = 'Aberto agora · fecha às 19h';
    else if (m < 480) txt = 'Fechado · abre hoje às 8h';
    else if (m < 810) txt = 'Em pausa · volta às 13h30';
    else txt = day === 6 ? 'Fechado · abre segunda às 8h' : 'Fechado · abre amanhã às 8h';
    el.textContent = txt + ' — Caieiras';
  }
  openStatus();

  /* ------------------------------------------------------------------ *
   * Menu mobile
   * ------------------------------------------------------------------ */
  const menu = $('#menu'), menuBtn = $('#menuBtn');
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fechar' : 'Menu';
    document.documentElement.classList.toggle('menu-open', open);
  }
  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  /* ------------------------------------------------------------------ *
   * Reveal, parallax e botão flutuante
   * ------------------------------------------------------------------ */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      let k = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.style.setProperty('--d', `${Math.min(k++, 4) * 90}ms`);
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  const floats = $$('.float');
  const imgs = $$('.card-img img');
  const fab = $('#fab');
  const hero = $('.hero');
  let bookVisible = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { bookVisible = en.isIntersecting; update(); }, { threshold: 0.15 }).observe($('#agendar'));
  }

  let ticking = false;
  function update() {
    ticking = false;
    const y = window.scrollY, vh = window.innerHeight;
    if (!reduce) {
      floats.forEach((el) => el.style.setProperty('--py', `${(y * parseFloat(el.dataset.speed || 0)).toFixed(1)}px`));
      imgs.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const p = ((r.top + r.height / 2) - vh / 2) / vh;
        img.style.setProperty('--py', `${(p * -36).toFixed(1)}px`);
      });
    }
    fab.classList.toggle('is-visible', y > hero.offsetHeight * 0.7 && !bookVisible);
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
