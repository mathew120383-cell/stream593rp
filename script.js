const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const connect = "cfx.re/join/kqq6kva";

copyBtn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(connect); toast.textContent="Dirección copiada"; }
  catch { toast.textContent=connect; }
  toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),1800);
});

const menu=document.querySelector(".menu-toggle"), nav=document.getElementById("nav");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function card(item){
  const image = item.imagen
    ? `<img class="market-image" src="${escapeHtml(item.imagen)}" alt="${escapeHtml(item.nombre)}" loading="lazy">`
    : `<div class="market-image placeholder">📷</div>`;
  return `<article class="market-card" data-category="${escapeHtml(item.categoria)}">
    ${image}
    <div class="market-body">
      <span class="market-category">${escapeHtml(item.categoria)}</span>
      <h3>${escapeHtml(item.nombre)}</h3>
      <p class="market-meta">${escapeHtml(item.meta)}</p>
      <div class="market-bottom"><strong>${escapeHtml(item.precio)}</strong><span>STREAM593 RP</span></div>
      <span class="market-action">VER DETALLES ↓</span>
      <p class="market-description">${escapeHtml(item.descripcion)}</p>
    </div>
  </article>`;
}
function render(){
  const grid=document.getElementById("catalogGrid");
  grid.innerHTML=CATALOGO.map(card).join("");
  const map={vehiculos:"vehiclesGrid",casas:"housesGrid",negocios:"businessesGrid",otros:"othersGrid"};
  Object.entries(map).forEach(([cat,id])=>{
    const items=CATALOGO.filter(x=>x.categoria===cat);
    document.getElementById(id).innerHTML=items.length ? items.map(card).join("") : `<div class="empty-market">Todavía no hay publicaciones en esta categoría.</div>`;
  });
}
render();

document.querySelectorAll(".market-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".market-tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    const filter=tab.dataset.filter;
    document.querySelectorAll("#catalogGrid .market-card").forEach(c=>{
      c.classList.toggle("hidden",filter!=="all" && c.dataset.category!==filter);
    });
  });
});

document.querySelectorAll("[data-back]").forEach(btn=>{
  btn.addEventListener("click",()=>location.hash="catalogo");
});
