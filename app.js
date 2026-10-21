const services = [
  { id: 'brand', category: 'Дизайн', title: 'Визуальная система бренда, которая запоминается', seller: 'Мария Крылова', initial: 'М', rating: '4.9', reviews: 12, orders: 38, price: 12000, delivery: '5 дней', package: 'Стартовый пакет', packageDescription: 'Айдентика для запуска вашего бренда.', summary: 'Создам узнаваемую визуальную систему, которая точно передаст характер вашего бренда.', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85', tag: 'БРЕНДИНГ' },
  { id: 'landing', category: 'Разработка', title: 'Лендинг для продукта: дизайн и запуск', seller: 'Илья Мартынов', initial: 'И', rating: '5.0', reviews: 24, orders: 51, price: 28000, delivery: '10 дней', package: 'Сайт под ключ', packageDescription: 'Одностраничный сайт для вашей идеи.', summary: 'Соберу быстрый и ясный лендинг, который помогает людям понять ваш продукт и сделать следующий шаг.', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=85', tag: 'ВЕБ-ДИЗАЙН' },
  { id: 'photo', category: 'Контент', title: 'Съемка продукта для каталога и соцсетей', seller: 'Алина Нечаева', initial: 'А', rating: '4.8', reviews: 18, orders: 42, price: 8500, delivery: '4 дня', package: 'Контент-съемка', packageDescription: 'Серия выразительных кадров вашего продукта.', summary: 'Подготовлю серию продуктовых фотографий с живым светом и естественными композициями.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85', tag: 'ФОТО' },
  { id: 'copy', category: 'Контент', title: 'Тексты для сайта, которые звучат по-человечески', seller: 'Ника Орлова', initial: 'Н', rating: '4.9', reviews: 31, orders: 67, price: 6000, delivery: '3 дня', package: 'Тексты для старта', packageDescription: 'Главная страница и описание продукта.', summary: 'Напишу ясный текст без канцелярита, который объяснит ценность продукта и поможет читателю принять решение.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85', tag: 'КОПИРАЙТИНГ' },
  { id: 'social', category: 'Продвижение', title: 'Контент-план для уверенного старта в соцсетях', seller: 'Тимур Беляев', initial: 'Т', rating: '4.9', reviews: 15, orders: 34, price: 7200, delivery: '5 дней', package: 'План на месяц', packageDescription: 'Стратегия контента на четыре недели.', summary: 'Соберу понятную стратегию публикаций, чтобы вы регулярно общались со своей аудиторией и не теряли голос бренда.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85', tag: 'SMM' },
  { id: 'motion', category: 'Дизайн', title: 'Анимированная графика для вашего проекта', seller: 'Мария Крылова', initial: 'М', rating: '4.9', reviews: 9, orders: 21, price: 14500, delivery: '7 дней', package: 'Motion-набор', packageDescription: 'Три анимации для цифровых площадок.', summary: 'Добавлю движению смысл: сделаю выразительную анимацию для сайта, презентации или социальных сетей.', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85', tag: 'MOTION' },
  { id: 'logo', category: 'Дизайн', title: 'Логотип с несколькими идеями на выбор', seller: 'Мария Крылова', initial: 'М', rating: '4.9', reviews: 16, orders: 44, price: 9500, delivery: '4 дня', package: 'Логотип', packageDescription: 'Знак и базовые правила использования.', summary: 'Найду характер вашего проекта и переведу его в лаконичный знак, который хорошо работает в разных форматах.', image: 'https://images.unsplash.com/photo-1634942536790-2539db4a7aa1?auto=format&fit=crop&w=1200&q=85', tag: 'ЛОГОТИП' },
  { id: 'illustration', category: 'Дизайн', title: 'Иллюстрации, созданные для вашего бренда', seller: 'Мария Крылова', initial: 'М', rating: '4.8', reviews: 7, orders: 16, price: 11000, delivery: '6 дней', package: 'Серия иллюстраций', packageDescription: 'Три авторские иллюстрации в едином стиле.', summary: 'Создам авторские иллюстрации, которые добавят вашему бренду индивидуальности и узнаваемого визуального языка.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85', tag: 'ИЛЛЮСТРАЦИЯ' },
  { id: 'audit', category: 'Продвижение', title: 'Разбор сайта и план точечных улучшений', seller: 'Тимур Беляев', initial: 'Т', rating: '5.0', reviews: 11, orders: 28, price: 5000, delivery: '2 дня', package: 'Экспресс-аудит', packageDescription: 'Анализ сайта с планом дальнейших действий.', summary: 'Разберу путь пользователя на вашем сайте и подготовлю конкретные рекомендации, отсортированные по важности.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85', tag: 'АУДИТ' }
];

const formatPrice = value => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
const MISSION_DISTANCE_LIGHT_YEARS = 4.37;
const serviceUrl = service => `service.html?id=${encodeURIComponent(service.id)}`;

function trackActivity(type, details = {}) {
  if (!['http:', 'https:'].includes(location.protocol) || !['localhost', '127.0.0.1'].includes(location.hostname)) return;
  const body = new Blob([JSON.stringify({ type, page: location.pathname, details })], { type: 'application/json' });
  if (navigator.sendBeacon('/__log', body)) return;
  fetch('/__log', {
    method: 'POST',
    body,
    keepalive: true
  }).catch(() => {});
}

document.addEventListener('click', event => {
  const control = event.target.closest('button, a, [role="button"]');
  if (!control) return;
  const target = control.classList.contains('header-login')
    ? 'Кнопка аккаунта'
    : control.getAttribute('aria-label') || control.dataset.filter || control.dataset.mode || control.dataset.buy || control.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);
  trackActivity('click', { target });
}, true);

const transportTabs = [...document.querySelectorAll('[role="tab"][aria-controls^="panel-"]')];
function selectTransportTab(tab, focus = false) {
  transportTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle('is-active', selected);
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    if (panel) panel.hidden = !selected;
  });
  if (focus) tab.focus();
}

transportTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTransportTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % transportTabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + transportTabs.length) % transportTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = transportTabs.length - 1;
    else return;
    event.preventDefault();
    selectTransportTab(transportTabs[nextIndex], true);
  });
});

document.addEventListener('change', event => {
  if (event.target.matches('#service-search')) {
    trackActivity('search_change', { length: event.target.value.length });
  }
});

document.addEventListener('invalid', event => {
  if (event.target.matches('.auth-form input')) {
    trackActivity('auth_validation_failed', { reason: event.target.type === 'email' ? 'invalid_email' : 'missing_or_invalid_field' });
  }
}, true);

window.addEventListener('pagehide', () => trackActivity('page_exit'));

function cardMarkup(service) {
  return `<article class="service-card" data-category="${service.category}" data-title="${service.title.toLowerCase()}">
    <a class="service-card-link" href="${serviceUrl(service)}" aria-label="Открыть услугу: ${service.title}">
      <div class="service-image"><img src="${service.image}" alt="${service.tag.toLowerCase()} — пример работы" loading="lazy"><span class="image-tag">${service.tag}</span></div>
      <div class="card-seller"><span class="mini-avatar">${service.initial}</span><span>${service.seller}</span><span class="card-rating"><span>★</span> ${service.rating}</span></div>
      <h3>${service.title}</h3>
    </a>
    <div class="card-footer"><span>от <strong>${formatPrice(service.price)}</strong></span><span>${service.delivery}</span></div>
  </article>`;
}

document.querySelectorAll('[data-service-grid]').forEach(grid => {
  const mode = grid.dataset.serviceGrid;
  const entries = mode === 'featured' ? services.slice(0, 3) : mode === 'related' ? services.filter(item => item.seller === 'Мария Крылова').slice(1, 4) : mode === 'seller' ? services.filter(item => item.seller === 'Мария Крылова') : services;
  grid.innerHTML = entries.map(cardMarkup).join('');
});

const query = new URLSearchParams(location.search);
const currentService = services.find(item => item.id === query.get('id')) || services[0];
if (document.querySelector('[data-product-title]')) {
  document.title = `${currentService.title} — перевозка грузов.мкс`;
  document.querySelector('[data-product-title]').textContent = currentService.title;
  document.querySelectorAll('[data-product-category]').forEach(node => node.textContent = currentService.category.toUpperCase());
  document.querySelector('[data-product-rating]').textContent = currentService.rating;
  document.querySelector('[data-product-reviews]').textContent = `${currentService.reviews} отзывов`;
  document.querySelector('[data-product-orders]').textContent = `${currentService.orders} раз`;
  document.querySelector('[data-product-summary]').textContent = currentService.summary;
  document.querySelector('[data-product-image]').src = currentService.image.replace('w=1200', 'w=1400');
  document.querySelector('[data-product-image]').alt = currentService.tag.toLowerCase() + ' — пример работы';
  document.querySelector('[data-product-price]').textContent = formatPrice(currentService.price);
  document.querySelector('[data-product-delivery]').textContent = currentService.delivery;
  document.querySelector('[data-product-package]').textContent = currentService.package;
  document.querySelector('[data-product-package-description]').textContent = currentService.packageDescription;
  document.querySelector('[data-seller-name]').textContent = currentService.seller;
  document.querySelector('[data-seller-avatar]').textContent = currentService.initial;
}

const searchInput = document.querySelector('#service-search');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
if (searchInput) {
  let activeCategory = query.get('category') || 'Все';
  const updateCatalog = () => {
    const needle = searchInput.value.trim().toLocaleLowerCase('ru');
    let visibleCount = 0;
    document.querySelectorAll('.catalog-grid .service-card').forEach(card => {
      const match = (activeCategory === 'Все' || card.dataset.category === activeCategory) && card.dataset.title.toLocaleLowerCase('ru').includes(needle);
      card.hidden = !match;
      if (match) visibleCount++;
    });
    document.querySelector('#result-count').textContent = needle ? `${visibleCount} найдено` : activeCategory === 'Все' ? 'Все услуги' : activeCategory;
    document.querySelector('.empty-state').hidden = visibleCount !== 0;
    filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === activeCategory));
  };
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    trackActivity('filter_change', { category: activeCategory });
    updateCatalog();
  }));
  searchInput.addEventListener('input', updateCatalog);
  if ([...filterButtons].some(button => button.dataset.filter === activeCategory)) updateCatalog();
}

function installAuthModal() {
  const backdrop = document.createElement('div');
  backdrop.className = 'auth-backdrop';
  backdrop.hidden = true;
  backdrop.innerHTML = `<section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
    <button class="modal-close" type="button" aria-label="Закрыть">×</button>
    <a class="wordmark" href="index.html"><span class="brand-symbol">✦</span>перевозка грузов.мкс</a>
    <div class="auth-content"></div>
  </section>`;
  document.body.append(backdrop);
  const content = backdrop.querySelector('.auth-content');
  let mode = 'login';
  let pendingBuy = false;

  const renderAuth = () => {
    const signup = mode === 'signup';
    content.innerHTML = `<h2 id="auth-title">${pendingBuy ? 'Войдите, чтобы продолжить' : signup ? 'Создать аккаунт' : 'С возвращением'}</h2>
      <p class="auth-subtitle">${pendingBuy ? 'Покупка услуг доступна только авторизованным пользователям.' : 'Один аккаунт для ваших проектов и заказов.'}</p>
      <div class="auth-tabs"><button class="auth-tab ${signup ? '' : 'active'}" data-mode="login">Войти</button><button class="auth-tab ${signup ? 'active' : ''}" data-mode="signup">Регистрация</button></div>
      <form class="auth-form"><label>Электронная почта<input name="email" type="email" placeholder="you@example.com" autocomplete="email" required></label><label>Пароль<input name="password" type="password" placeholder="Не менее 6 символов" minlength="6" autocomplete="${signup ? 'new-password' : 'current-password'}" required></label><p class="auth-error" aria-live="polite"></p><button class="button button-dark" type="submit">${signup ? 'Зарегистрироваться' : 'Войти'} <span class="arrow">↗</span></button></form>
      <p class="auth-terms">Продолжая, вы соглашаетесь с условиями использования «перевозка грузов.мкс».</p>`;
    content.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
      mode = button.dataset.mode;
      trackActivity('auth_mode', { mode });
      renderAuth();
    }));
    content.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      trackActivity('auth_submit', { mode });
      const data = new FormData(event.currentTarget);
      const email = String(data.get('email')).trim();
      const password = String(data.get('password'));
      if (password.length < 6) {
        trackActivity('auth_validation_failed', { reason: 'short_password' });
        content.querySelector('.auth-error').textContent = 'Пароль должен содержать не менее 6 символов.';
        return;
      }
      localStorage.setItem('womenNetUser', JSON.stringify({ email, name: email.split('@')[0] }));
      trackActivity('auth_demo_success', { mode });
      renderUserButton();
      if (pendingBuy) renderCheckout();
      else closeModal();
    });
  };

  const renderCheckout = () => {
    content.innerHTML = `<div class="success-mark">✓</div><h2 id="auth-title">Аккаунт подтвержден</h2><p class="auth-subtitle">Теперь можно перейти к оформлению услуги.</p>
      <div class="checkout-summary"><img src="${currentService.image}" alt=""><div><b>${currentService.title}</b><span>${currentService.seller} · ${currentService.delivery}</span><strong>${formatPrice(currentService.price)}</strong></div></div>
      <button class="button button-lime button-wide" data-confirm-order>Подтвердить заказ <span class="arrow">↗</span></button><p class="auth-terms">Это демонстрационный шаблон: платеж не списывается.</p>`;
    content.querySelector('[data-confirm-order]').addEventListener('click', () => {
      content.innerHTML = `<div class="success-mark">✓</div><h2 id="auth-title">Заявка оформлена</h2><p class="auth-subtitle">Исполнитель получит ваш запрос. Здесь можно подключить реальную оплату и обработку заказа.</p><button class="button button-dark button-wide" data-finish>Готово</button>`;
      content.querySelector('[data-finish]').addEventListener('click', closeModal);
    });
  };

  function closeModal() { backdrop.hidden = true; document.body.classList.remove('modal-open'); }
  function openModal(buy = false) {
    pendingBuy = buy;
    const user = localStorage.getItem('womenNetUser');
    backdrop.hidden = false;
    document.body.classList.add('modal-open');
    if (buy && user) renderCheckout();
    else { mode = 'login'; renderAuth(); }
    trackActivity('auth_open', { purchase: buy });
    backdrop.querySelector('.modal-close').focus();
  }
  backdrop.addEventListener('click', event => { if (event.target === backdrop || event.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !backdrop.hidden) closeModal(); });
  document.querySelectorAll('[data-open-auth]').forEach(button => button.addEventListener('click', () => {
    if (button.classList.contains('header-login') && localStorage.getItem('womenNetUser')) {
      localStorage.removeItem('womenNetUser');
      trackActivity('auth_logout');
      renderUserButton();
      return;
    }
    openModal(false);
  }));
  document.querySelectorAll('[data-buy]').forEach(button => button.addEventListener('click', () => openModal(true)));
  window.addEventListener('storage', renderUserButton);
}

function renderUserButton() {
  const user = JSON.parse(localStorage.getItem('womenNetUser') || 'null');
  document.querySelectorAll('.header-login').forEach(button => {
    button.innerHTML = user ? `${user.name} <span class="arrow">↗</span>` : 'Войти <span class="arrow">↗</span>';
  });
}

installAuthModal();
renderUserButton();

const clampProgress = value => Math.min(1, Math.max(0, value));
const earthrise = document.querySelector('[data-earthrise]');
const trajectory = document.querySelector('[data-trajectory]');
const missionReel = document.querySelector('[data-mission-reel]');
const routeCurve = document.querySelector('#route-curve');

if (trajectory && routeCurve) {
  const routePaths = trajectory.querySelectorAll('[data-route-track], [data-trajectory-path]');
  const routeCurveValue = trajectory.querySelector('[data-route-curve-value]');
  const updateRouteCurve = () => {
    const curve = (Number(routeCurve.value) - 50) / 50;
    const path = `M40 160 C 170 ${160 + 25 * curve} 180 ${55 - 25 * curve} 320 75 C 430 ${130 + 55 * curve} 500 ${190 - 50 * curve} 610 132 C 730 ${165 - 50 * curve} 830 ${20 + 50 * curve} 960 70`;
    routePaths.forEach(routePath => routePath.setAttribute('d', path));
    routeCurveValue.value = `${routeCurve.value}%`;
    routeCurveValue.textContent = `${routeCurve.value}%`;
  };

  routeCurve.addEventListener('input', updateRouteCurve);
  updateRouteCurve();
}

function getSectionProgress(section) {
  const scrollDistance = section.offsetHeight - window.innerHeight;
  return scrollDistance > 0 ? clampProgress(-section.getBoundingClientRect().top / scrollDistance) : 0;
}

function updateScrollScenes() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    document.documentElement.style.setProperty('--star-parallax', `${Math.min(window.scrollY * 0.28, 220)}px`);
    document.documentElement.style.setProperty('--nebula-parallax', `${Math.max(window.scrollY * -0.12, -96)}px`);
  }

  if (earthrise) {
    const progress = getSectionProgress(earthrise);
    const reveal = clampProgress((progress - 0.06) / 0.44);
    const sky = earthrise.querySelector('.layer-sky');
    const earth = earthrise.querySelector('[data-earth-layer]');
    const moon = earthrise.querySelector('[data-moon-layer]');
    const frame = earthrise.querySelector('.layer-frame');
    const astronaut = earthrise.querySelector('[data-astronaut-layer]');
    const ground = earthrise.querySelector('[data-ground-layer]');
    sky.style.transform = `translate3d(0, ${progress * 9}px, 0)`;
    earth.style.transform = `translate3d(0, ${(1 - reveal) * 25}%, 0) scale(${0.9 + reveal * 0.1})`;
    earth.style.opacity = String(reveal);
    moon.style.transform = `translate3d(0, ${-progress * 22}px, 0)`;
    frame.style.transform = `translate3d(0, ${progress * 15}px, 0)`;
    astronaut.style.transform = `translate3d(0, ${-progress * 12}px, 0)`;
    ground.style.transform = `translate3d(0, ${-progress * 7}px, 0)`;
    earthrise.querySelector('[data-dust]').style.opacity = String(1 - reveal * 0.9);
    earthrise.querySelector('.earthrise-copy').style.opacity = String(1 - clampProgress((progress - 0.48) / 0.2));
    earthrise.querySelector('[data-earthrise-progress]').style.width = `${progress * 100}%`;
    earthrise.querySelector('[data-distance]').textContent = (progress * MISSION_DISTANCE_LIGHT_YEARS).toLocaleString('ru-RU', { maximumFractionDigits: 2 });
    earthrise.querySelector('[data-earth-altitude]').textContent = `${(reveal * 90).toFixed(1)}°`;
    const phases = ['01 / ИДЕЯ', '02 / ЭКИПАЖ', '03 / ОРБИТА', '04 / ЗАПУСК'];
    earthrise.querySelector('[data-mission-phase]').textContent = phases[Math.min(3, Math.floor(progress * 4))];
  }

  if (trajectory) {
    const progress = getSectionProgress(trajectory);
    const path = trajectory.querySelector('[data-trajectory-path]');
    path.style.strokeDashoffset = String(1000 * (1 - progress));
    trajectory.querySelector('[data-route-distance]').textContent = (progress * MISSION_DISTANCE_LIGHT_YEARS).toLocaleString('ru-RU', { maximumFractionDigits: 2 });
  }

  if (missionReel) {
    const progress = getSectionProgress(missionReel);
    const track = missionReel.querySelector('[data-mission-track]');
    const cards = [...missionReel.querySelectorAll('[data-mission-card]')];
    if (cards.length) {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const firstCard = cards[0];
      const step = firstCard.getBoundingClientRect().width + gap;
      const inset = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const startOffset = window.innerWidth / 2 - firstCard.getBoundingClientRect().width / 2 - inset;
      track.style.transform = `translate3d(${startOffset - progress * step * (cards.length - 1)}px, 0, 0)`;
      cards.forEach((card, index) => {
        const distance = Math.abs(index - progress * (cards.length - 1));
        card.style.opacity = String(Math.max(0.42, 1 - distance * 0.28));
        card.style.transform = `scale(${1 - Math.min(distance * 0.035, 0.08)})`;
      });
    }
    missionReel.querySelector('[data-reel-progress]').style.width = `${progress * 100}%`;
  }
}

let scrollTicking = false;
function scheduleScrollScenes() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(() => {
    updateScrollScenes();
    scrollTicking = false;
  });
}

window.addEventListener('scroll', scheduleScrollScenes, { passive: true });
window.addEventListener('resize', scheduleScrollScenes);
updateScrollScenes();
