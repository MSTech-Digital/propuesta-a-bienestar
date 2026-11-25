/* Nutrióloga Nat — interacciones del sitio (JavaScript puro, sin dependencias) */
(function () {
  "use strict";
  var S = window.SITIO || {};
  var doc = document;
  var root = doc.documentElement;

  root.classList.add("js");

  /* ---------- WhatsApp ---------- */
  function waUrl(msg) {
    var n = String(S.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(msg || S.mensaje || "");
  }
  doc.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl(a.getAttribute("data-wa") || S.mensaje);
    a.target = "_blank";
    a.rel = "noopener";
    if (!S.whatsappConfirmado) a.setAttribute("data-pendiente", "Número de WhatsApp pendiente");
  });

  /* ---------- Redes sociales ---------- */
  var redes = S.redes || {};
  doc.querySelectorAll("[data-red]").forEach(function (a) {
    var url = redes[a.getAttribute("data-red")];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.removeAttribute("href");
      a.setAttribute("aria-disabled", "true");
      a.classList.add("pendiente");
      a.setAttribute("data-pendiente", "Enlace pendiente");
    }
  });

  /* ---------- Mapa ---------- */
  doc.querySelectorAll("[data-mapa]").forEach(function (box) {
    var q = (S.mapa || "").trim();
    var link = doc.querySelectorAll("[data-mapa-link]");
    if (!q) {
      box.classList.add("mapa--pendiente");
      link.forEach(function (l) { l.classList.add("pendiente"); l.removeAttribute("href"); l.setAttribute("aria-disabled", "true"); });
      return;
    }
    var f = doc.createElement("iframe");
    f.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
    f.title = "Mapa con la ubicación del consultorio";
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    f.setAttribute("allowfullscreen", "");
    box.innerHTML = "";
    box.appendChild(f);
    link.forEach(function (l) {
      l.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
      l.target = "_blank";
      l.rel = "noopener";
    });
  });

  /* ---------- Marcas de contenido provisional ---------- */
  var toggle = doc.querySelector("[data-toggle-marcas]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var off = doc.body.classList.toggle("sin-marcas");
      toggle.setAttribute("aria-pressed", off ? "true" : "false");
      toggle.textContent = off ? "Mostrar marcas" : "Ocultar marcas";
    });
  }

  /* ---------- Navegación móvil ---------- */
  var btn = doc.querySelector("[data-menu-btn]");
  var menu = doc.getElementById("menu");
  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    doc.body.classList.toggle("menu-abierto", open);
    var txt = btn.querySelector(".menu-btn__txt");
    if (txt) txt.textContent = open ? "Cerrar" : "Menú";
  }
  if (btn && menu) {
    btn.addEventListener("click", function () {
      setMenu(btn.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.body.classList.contains("menu-abierto")) { setMenu(false); btn.focus(); }
    });
    window.matchMedia("(min-width: 64em)").addEventListener("change", function () { setMenu(false); });
  }

  /* ---------- Cabecera al desplazar ---------- */
  var header = doc.querySelector(".cabecera");
  var ticking = false;
  function onScroll() {
    if (header) header.classList.toggle("cabecera--fija", window.scrollY > 24);
    doc.body.classList.toggle("pasado-inicio", window.scrollY > window.innerHeight * 0.6);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Pestañas accesibles ---------- */
  doc.querySelectorAll("[role=tablist]").forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[role=tab]"));
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.tabIndex = on ? 0 : -1;
        doc.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, j = null;
        if (k === "ArrowRight" || k === "ArrowDown") j = (i + 1) % tabs.length;
        if (k === "ArrowLeft" || k === "ArrowUp") j = (i - 1 + tabs.length) % tabs.length;
        if (k === "Home") j = 0;
        if (k === "End") j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ---------- Preguntas frecuentes: solo una abierta ---------- */
  var faqs = doc.querySelectorAll(".faq details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Año ---------- */
  doc.querySelectorAll("[data-anio]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Entrada inicial ---------- */
  window.requestAnimationFrame(function () { root.classList.add("cargado"); });
})();
