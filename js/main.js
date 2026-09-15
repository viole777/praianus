/* ============================================================
   PRAIANUS — Interações do site
   Depende de js/data.js (window.PRAIANUS.dishes)
   ============================================================ */
(function () {
  "use strict";

  var dishes = (window.PRAIANUS && window.PRAIANUS.dishes) || [];
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ---------- Header: sombra ao rolar ---------- */
  var header = $(".header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = $("#nav-toggle");
  var nav = $("#nav");

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("nav-locked", open);
  }

  toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      toggle.focus();
    }
  });

  /* ---------- Revelar elementos ao rolar ---------- */
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;

  function observeReveals() {
    if (!io) {
      $$(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    $$(".reveal:not(.is-visible)").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Escapar HTML (segurança ao renderizar dados) ---------- */
  function esc(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /* ---------- Destaques: "Os favoritos da casa" ---------- */
  var featuredGrid = $("#featured-grid");
  featuredGrid.innerHTML = dishes
    .filter(function (d) { return d.featured; })
    .map(function (dish, i) {
      return (
        '<article class="feature-card reveal" style="--d:' + (i * 0.12) + 's">' +
          '<img class="feature-card__img" src="' + dish.image + '" alt="' + esc(dish.name) + '" loading="lazy" decoding="async">' +
          '<div class="feature-card__body">' +
            '<span class="feature-card__tag">' + esc(dish.category) + '</span>' +
            '<h3 class="feature-card__title">' + esc(dish.name) + '</h3>' +
            '<p class="feature-card__text">' + esc(dish.description) + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");

  /* ---------- Cardápio + filtros por categoria ---------- */
  var grid = $("#menu-grid");
  var filters = $("#menu-filters");

  var categories = ["Todos"];
  dishes.forEach(function (d) {
    if (categories.indexOf(d.category) === -1) categories.push(d.category);
  });

  filters.innerHTML = categories.map(function (cat, i) {
    return '<button type="button" class="filter-btn' + (i === 0 ? " is-active" : "") +
      '" data-category="' + esc(cat) + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' +
      esc(cat) + "</button>";
  }).join("");

  function renderMenu(category) {
    var items = category === "Todos"
      ? dishes
      : dishes.filter(function (d) { return d.category === category; });

    grid.innerHTML = items.map(function (dish, i) {
      return (
        '<article class="dish-card reveal" style="--d:' + (i * 0.08) + 's">' +
          '<div class="dish-card__media">' +
            '<img src="' + dish.image + '" alt="' + esc(dish.name) + '" loading="lazy" decoding="async">' +
          '</div>' +
          '<div class="dish-card__body">' +
            '<span class="dish-card__tag">' + esc(dish.category) + '</span>' +
            '<h3 class="dish-card__title">' + esc(dish.name) + '</h3>' +
            '<p class="dish-card__text">' + esc(dish.description) + '</p>' +
            (dish.price ? '<span class="dish-card__price">' + esc(dish.price) + "</span>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");

    observeReveals();
  }

  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn", filters).forEach(function (b) {
      var active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    renderMenu(btn.dataset.category);
  });

  renderMenu("Todos");

  /* ---------- Scrollspy: link ativo conforme a seção visível ---------- */
  var links = $$(".nav__link");
  var sections = links
    .map(function (l) { return document.querySelector(l.hash); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.hash === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Ano atual no rodapé ---------- */
  $("#ano").textContent = String(new Date().getFullYear());

  observeReveals();
})();
