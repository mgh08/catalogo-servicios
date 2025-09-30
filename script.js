// script.js — búsqueda con debounce + orden por precio/nombre
(async () => {
  const $  = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

  // ----- utils -----
  async function loadJSON(path){
    const res = await fetch(path, { cache: "no-store" });
    if(!res.ok) throw new Error("No se pudo cargar " + path);
    return await res.json();
  }
  function numCOP(v){
    try{
      return new Intl.NumberFormat("es-CO", { style:"currency", currency:"COP", maximumFractionDigits:0 }).format(v);
    }catch(_){ return "$"+v; }
  }
  const debounce = (fn, delay=300) => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  };

  // ----- state -----
  let services = [];
  const state = { q: "", cat: "Todos", sort: "none" }; // sort: none | price-asc | price-desc | name-asc

  // ----- UI helpers -----
  function ensureSortControl(){
    const toolbar = $(".toolbar");
    if(!toolbar) return;
    if ($("#sort")) return; // ya existe

    const searchDiv = toolbar.querySelector(".search");
    const wrap = document.createElement("div");
    wrap.className = "sort";
    wrap.innerHTML = `
      <label for="sort" class="sr-only">Ordenar</label>
      <select id="sort" aria-label="Ordenar">
        <option value="none">Ordenar: Relevancia</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name-asc">Nombre (A–Z)</option>
      </select>
    `;
    // Coloca el select al lado del buscador (misma fila) y antes de los chips
    if (searchDiv) toolbar.insertBefore(wrap, searchDiv.nextSibling);
    else toolbar.appendChild(wrap);
  }

  function renderCategories(cats){
    const bar = $("#cats");
    if(!bar) return;
    const all = ["Todos", ...cats];
    bar.innerHTML = all.map(c =>
      `<button class="chip ${state.cat===c?'active':''}" data-cat="${c}" role="tab" aria-selected="${state.cat===c}">${c}</button>`
    ).join("");
  }

  function match(s){
    if(state.cat && state.cat!=="Todos" && s.category !== state.cat) return false;
    if(state.q){
      const q = state.q.toLowerCase();
      const hay = [s.name, s.description, s.category, s.duration].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    }
    return true;
  }

  function applySort(arr){
    switch(state.sort){
      case "price-asc":
        return arr.slice().sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      case "price-desc":
        return arr.slice().sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      case "name-asc":
        return arr.slice().sort((a,b) => (a.name||"").localeCompare(b.name||"", "es", {sensitivity:"base"}));
      default:
        return arr; // orden original del JSON
    }
  }

  function renderGrid(){
    const grid = $("#grid");
    if(!grid) return;
    const filtered = services.filter(match);
    const list = applySort(filtered);

    if(!list.length){
      grid.innerHTML = `<p class="muted">No hay servicios que coincidan con tu búsqueda.</p>`;
      return;
    }
    grid.innerHTML = list.map(s => `
      <article class="card">
        ${s.image ? `<img src="${s.image}" alt="${s.name}" loading="lazy">` : `<div class="img" aria-hidden="true"></div>`}
        <div class="body">
          <h3 class="title">${s.name}</h3>
          ${s.category ? `<span class="tag">${s.category}</span>` : ""}
          <div class="meta">
            ${s.duration ? `<span class="muted">Duración: ${s.duration}</span>` : "<span></span>"}
            ${s.price ? `<span class="price">${numCOP(s.price)}</span>` : ""}
          </div>
          ${s.description ? `<p class="muted">${s.description}</p>` : ""}
        </div>
      </article>
    `).join("");
  }

  // ----- init -----
  try{
    const [cfg, data] = await Promise.all([loadJSON("config.json"), loadJSON("services.json")]);
    services = data;

    // Branding / enlaces
    $("#brand").textContent = cfg.title || "Catálogo";
    document.querySelector('[data-bind="brand"]').textContent = cfg.title || "Tu Marca";
    $("#tagline").textContent = cfg.tagline || "";

    const wsp = $("#cta-wsp");
    if (cfg.whatsapp){
      const num = String(cfg.whatsapp).replace(/[^0-9]/g,"");
      const msg = cfg.whatsapp_msg ? `?text=${encodeURIComponent(cfg.whatsapp_msg)}` : "";
      wsp.href = `https://wa.me/${num}${msg}`;
    } else { wsp.style.display = "none"; }

    const ig = $("#cta-ig");
    if (cfg.instagram){ ig.href = cfg.instagram; } else { ig.style.display = "none"; }

    // UI inicial
    const cats = [...new Set(services.map(s => s.category).filter(Boolean))].sort();
    ensureSortControl();
    renderCategories(cats);
    renderGrid();
  }catch(e){
    console.error(e);
    const grid = $("#grid");
    if (grid) grid.innerHTML = '<p class="muted">Error cargando el catálogo.</p>';
  }

  // ----- events -----
  const debouncedRender = debounce(renderGrid, 300);

  document.addEventListener("input", (ev) => {
    if (ev.target.id === "search"){
      state.q = ev.target.value.trim();
      debouncedRender();
    }
  });

  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".chip");
    if (btn){
      state.cat = btn.dataset.cat;
      $$(".chip").forEach(b => b.classList.toggle("active", b===btn));
      renderGrid(); // categoría puede cambiar poco; sin debounce aquí
    }
  });

  document.addEventListener("change", (ev) => {
    if (ev.target.id === "sort"){
      state.sort = ev.target.value;
      renderGrid();
    }
  });
})();
