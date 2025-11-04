// js/profile-menu.js — Perfil con estilo + “Mis publicaciones” + Selector de Idioma desplegable

(function () {
  if (window.__noticiaProfileMenuMounted) return;
  window.__noticiaProfileMenuMounted = true;

  // ===== Datos de usuario desde localStorage (con valores por defecto)
  var NAME_KEY = "noticia_username";
  var FOLLOWERS_KEY = "noticia_followers";
  var FOLLOWING_KEY = "noticia_following";
  var LANG_KEY = "noticia_lang";

  var username = (localStorage.getItem(NAME_KEY) || "Usuario").trim();
  var followers = parseInt(localStorage.getItem(FOLLOWERS_KEY), 10);
  var following = parseInt(localStorage.getItem(FOLLOWING_KEY), 10);
  if (isNaN(followers)) followers = 317;
  if (isNaN(following)) following = 389;

  var lang = (localStorage.getItem(LANG_KEY) || "es").toLowerCase();
  var langFlag = flagFromLang(lang);
  var langName = nameFromLang(lang);

  function flagFromLang(code) {
    var map = { es:"🇪🇸", en:"🇬🇧", fr:"🇫🇷", de:"🇩🇪", it:"🇮🇹", pt:"🇵🇹" };
    return map[code] || "🏳️";
  }
  function nameFromLang(code) {
    var map = { es:"Español", en:"English", fr:"Français", de:"Deutsch", it:"Italiano", pt:"Português" };
    return map[code] || code.toUpperCase();
  }

  // Quitar bloque antiguo si quedó
  var legacy = document.querySelector("[data-profile-legacy]");
  if (!legacy) {
    var cand = Array.from(document.querySelectorAll("header *"))
      .find(function (el) { return el.textContent && el.textContent.trim() === "Mi perfil"; });
    if (cand) {
      var cont = cand.closest("div");
      if (cont && !cont.id && !cont.closest("#profile-menu-root")) cont.remove();
    }
  } else {
    legacy.remove();
  }

  // Hook en header (se crea si no existe)
  var headerEl = document.querySelector("#app-header") || document.querySelector("header");
  var root = document.getElementById("profile-menu-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "profile-menu-root";
    if (headerEl) headerEl.appendChild(root);
  }
  if (!root) return;

  // Render botón + overlay transparente + drawer (derecha → izquierda)
  root.innerHTML =
    '<div class="relative flex flex-col items-center justify-center gap-1">' +
    '  <button id="profile-trigger" aria-haspopup="true" aria-expanded="false" ' +
    '    class="flex items-center justify-center w-12 h-12 rounded-full bg-surface-light dark:bg-surface-dark ' +
    '           border border-subtle-text-light/20 dark:border-subtle-text-dark/20 shadow-sm hover:shadow-md ' +
    '           hover:opacity-90 active:scale-95 transition">' +
    '    <span class="material-symbols-outlined text-subtle-text-light dark:text-subtle-text-dark text-3xl">person</span>' +
    "  </button>" +
    '  <span class="text-sm font-semibold text-text-light dark:text-text-dark">Mi perfil</span>' +
    "</div>" +
    '<div id="profile-overlay" class="hidden fixed z-40 left-0 right-0 bg-transparent"></div>' +
    '<aside id="profile-drawer" ' +
    '  class="hidden fixed z-50 right-0 w-[360px] max-w-[92vw] h-[calc(100vh-var(--header-bottom,64px))] ' +
    '         translate-x-[100%] transition-transform duration-300 bg-white dark:bg-surface-dark ' +
    '         border-l border-subtle-text-light/20 dark:border-subtle-text-dark/30 shadow-lg">' +
    '  <div class="h-full flex flex-col">' +
    '    <div class="px-5 pt-4 pb-3 border-b border-gray-200 dark:border-subtle-text-dark/20">' +
    '      <div class="flex items-center gap-3">' +
    '        <div class="flex items-center justify-center w-14 h-14 rounded-full ring-2 ring-gray-300 dark:ring-subtle-text-dark/40">' +
    '          <span class="material-symbols-outlined text-4xl text-gray-700 dark:text-text-dark">account_circle</span>' +
    "        </div>" +
    '        <div class="min-w-0">' +
    '          <div class="text-lg font-semibold text-gray-900 dark:text-text-dark truncate">' + escapeHtml(username) + "</div>" +
    "        </div>" +
    "      </div>" +
    '      <div class="mt-3 grid grid-cols-2 gap-2 text-center">' +
    '        <div>' +
    '          <div class="text-sm font-medium underline underline-offset-2 text-gray-700 dark:text-text-dark">Seguidores</div>' +
    '          <div class="text-xl font-semibold font-mono text-gray-900 dark:text-text-dark">' + followers + "</div>" +
    "        </div>" +
    '        <div>' +
    '          <div class="text-sm font-medium underline underline-offset-2 text-gray-700 dark:text-text-dark">Seguidos</div>' +
    '          <div class="text-xl font-semibold font-mono text-gray-900 dark:text-text-dark">' + following + "</div>" +
    "        </div>" +
    "      </div>" +
    "    </div>" +
    '    <div class="px-5 py-3 border-b border-gray-200 dark:border-subtle-text-dark/20">' +
    '      <div class="text-xl font-semibold text-gray-900 dark:text-text-dark">Hola, ' + escapeHtml(firstName(username)) + "</div>" +
    "    </div>" +
    '    <nav class="flex-1 overflow-y-auto">' +
      sectionLink("perfilusuario.html#mis-publicaciones", "person", "Perfil") +
      sectionLink("perfilusuario.html#mis-publicaciones", "article", "Mis publicaciones") +
      sectionLink("perfilusuario.html#publicaciones-guardadas", "bookmarks", "Publicaciones guardadas") +
      sectionLink("perfilusuario.html#resumenes-guardados", "notes", "Resúmenes guardados") +
      // separador
      '<div class="my-2 border-t border-gray-200 dark:border-subtle-text-dark/20"></div>' +
      // ===== Selector de Idioma (desplegable)
      '<div class="px-5 py-1">' +
      '  <button type="button" id="lang-toggle" aria-expanded="false" ' +
      '    class="w-full text-left px-0 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-background-dark/60 rounded">' +
      '    <span class="material-symbols-outlined">language</span>' +
      '    <span class="flex-1">Idioma</span>' +
      '    <span id="lang-current" class="inline-flex items-center gap-2 text-sm">' +
      '      <span class="text-xl leading-none">' + langFlag + '</span>' +
      '      <span>' + langName + '</span>' +
      '    </span>' +
      '    <span id="lang-arrow" class="material-symbols-outlined transition-transform duration-200">expand_more</span>' +
      '  </button>' +
      '  <div id="lang-menu" class="hidden mt-2 border border-gray-200 dark:border-subtle-text-dark/20 rounded-md overflow-hidden">' +
           langItem("es") + langItem("en") + langItem("fr") + langItem("de") + langItem("it") + langItem("pt") +
      '  </div>' +
      '</div>' +
      // separador
      '<div class="my-2 border-t border-gray-200 dark:border-subtle-text-dark/20"></div>' +
      // Cerrar sesión
      '<button type="button" id="btn-logout" role="menuitem" ' +
      '  class="w-full text-left px-5 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">' +
      '  <span class="material-symbols-outlined">logout</span>' +
      '  <span class="flex-1">Cerrar sesión</span>' +
      '  <span class="material-symbols-outlined">arrow_forward</span>' +
      '</button>' +
    "    </nav>" +
    "  </div>" +
    "</aside>";

  // Helpers de render
  function sectionLink(href, icon, label) {
    return (
      '<a href="' + href + '" role="menuitem" ' +
      '   class="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-background-dark/60">' +
      '  <span class="material-symbols-outlined">' + icon + "</span>" +
      '  <span class="flex-1">' + label + "</span>" +
      "</a>"
    );
  }
  function langItem(code) {
    return (
      '<button type="button" class="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-background-dark/60" ' +
      '        data-lang="' + code + '">' +
      '  <span class="text-xl">' + flagFromLang(code) + '</span>' +
      '  <span class="flex-1">' + nameFromLang(code) + '</span>' +
      (code === lang ? '<span class="material-symbols-outlined text-primary">check</span>' : '') +
      '</button>'
    );
  }
  function firstName(full) {
    var p = full.split(/\s+/);
    return p[0] || full;
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  // Posicionamiento
  var drawer = root.querySelector("#profile-drawer");
  var overlay = root.querySelector("#profile-overlay");
  var trigger = root.querySelector("#profile-trigger");

  function headerBottomPx() {
    var bottom = 64;
    if (headerEl) {
      var r = headerEl.getBoundingClientRect();
      bottom = r.bottom + window.scrollY;
    }
    return bottom;
  }
  function setDrawerTop() {
    var bottom = headerBottomPx();
    drawer.style.top = bottom + "px";
    drawer.style.setProperty("--header-bottom", bottom + "px");
    overlay.style.top = bottom + "px";
    overlay.style.height = "calc(100vh - " + bottom + "px)";
  }

  function openDrawer() {
    setDrawerTop();
    drawer.classList.remove("hidden");
    overlay.classList.remove("hidden");
    requestAnimationFrame(function () {
      drawer.classList.remove("translate-x-[100%]");
      trigger.setAttribute("aria-expanded", "true");
    });
  }
  function closeDrawer() {
    drawer.classList.add("translate-x-[100%]");
    overlay.classList.add("hidden");
    trigger.setAttribute("aria-expanded", "false");
    setTimeout(function () { drawer.classList.add("hidden"); }, 300);
  }
  function toggleDrawer() {
    var hidden = drawer.classList.contains("hidden") || drawer.classList.contains("translate-x-[100%]");
    hidden ? openDrawer() : closeDrawer();
  }

  // Eventos
  trigger.addEventListener("click", toggleDrawer);
  overlay.addEventListener("click", closeDrawer);
  window.addEventListener("resize", setDrawerTop);
  window.addEventListener("scroll", setDrawerTop);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

  // Acciones: Idioma (toggle desplegable + seleccionar)
  var langToggle = root.querySelector("#lang-toggle");
  var langMenu = root.querySelector("#lang-menu");
  var langArrow = root.querySelector("#lang-arrow");

  if (langToggle && langMenu) {
    langToggle.addEventListener("click", function () {
      var open = !langMenu.classList.contains("hidden");
      if (open) {
        langMenu.classList.add("hidden");
        langToggle.setAttribute("aria-expanded", "false");
        langArrow.classList.remove("rotate-180");
      } else {
        langMenu.classList.remove("hidden");
        langToggle.setAttribute("aria-expanded", "true");
        langArrow.classList.add("rotate-180");
      }
    });

    langMenu.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      var newLang = btn.getAttribute("data-lang");
      localStorage.setItem(LANG_KEY, newLang);
      location.reload();
    });
  }

  // Acciones: Logout
  var logoutBtn = root.querySelector("#btn-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("auth_token");
      closeDrawer();
      location.href = "login.html";
    });
  }
})();
