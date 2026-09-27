
const copyBtn=document.getElementById("copyBtn"), toast=document.getElementById("toast");
const connect="cfx.re/join/kqq6kva";
if(copyBtn){copyBtn.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(connect);if(toast)toast.textContent="Dirección copiada"}catch{if(toast)toast.textContent=connect}if(toast){toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800)}});}
const menu=document.querySelector(".menu-toggle"),nav=document.getElementById("nav");
if(menu && nav){menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function card(item){
 return `<article class="market-card"><img class="market-image" src="${esc(item.imagen)}" alt="${esc(item.nombre)}" loading="lazy"><div class="market-body"><span class="market-category">${esc(item.categoria)}</span><h3>${esc(item.nombre)}</h3><p class="market-meta">${esc(item.meta)}</p><div class="market-bottom"><strong>${esc(item.precio)}</strong><span>STREAM593 RP</span></div><p class="market-description">${esc(item.descripcion)}</p></div></article>`;
}
function render(){
 const groups={vehiculos:"vehiclesGrid",casas:"housesGrid","armas-vip":"weaponsGrid"};
 for(const [cat,id] of Object.entries(groups)){
   const items=CATALOGO.filter(x=>x.categoria===cat);
   document.getElementById(id).innerHTML=items.length?items.map(card).join(""):`<div class="empty-market">Todavía no hay publicaciones en esta categoría.</div>`;
 }
}
render();
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>location.hash="mercado"));
