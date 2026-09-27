
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


/* ===== STREAM593 RP · FICHA DE PRODUCTO ===== */
(function(){
  function escapeHTML(v){
    return String(v ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[c]));
  }

  function openProduct(item){
    let modal=document.getElementById("productModal");
    if(!modal){
      modal=document.createElement("div");
      modal.id="productModal";
      modal.className="product-modal";
      modal.innerHTML=`
        <div class="product-modal-backdrop" data-close-modal></div>
        <div class="product-modal-card" role="dialog" aria-modal="true">
          <button class="product-modal-close" aria-label="Cerrar" data-close-modal>×</button>
          <div class="product-modal-image-wrap"><img id="modalProductImage" alt=""></div>
          <div class="product-modal-info">
            <span class="product-modal-category" id="modalProductCategory"></span>
            <h2 id="modalProductName"></h2>
            <div class="product-modal-price" id="modalProductPrice"></div>
            <div class="product-modal-meta" id="modalProductMeta"></div>
            <p id="modalProductDescription"></p>
            <div class="product-modal-actions">
              <a href="https://discord.gg/wcqVMVRjY" target="_blank" rel="noopener" class="modal-buy">CONTACTAR POR DISCORD</a>
              <button class="modal-back" data-close-modal>VOLVER AL CATÁLOGO</button>
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);
      modal.addEventListener("click",e=>{
        if(e.target.matches("[data-close-modal]")) closeProduct();
      });
      document.addEventListener("keydown",e=>{
        if(e.key==="Escape") closeProduct();
      });
    }

    document.getElementById("modalProductImage").src=item.imagen;
    document.getElementById("modalProductImage").alt=item.nombre;
    document.getElementById("modalProductName").textContent=item.nombre;
    document.getElementById("modalProductCategory").textContent=
      item.categoria==="vehiculos" ? "VEHÍCULO" :
      item.categoria==="casas" ? "PROPIEDAD" : "ARMA VIP";

    const price = document.getElementById("modalProductPrice");
    price.innerHTML = item.precioAnterior
      ? `<span class="old-price">${escapeHTML(item.precioAnterior)}</span><strong>${escapeHTML(item.precio)}</strong>`
      : `<strong>${escapeHTML(item.precio)}</strong>`;

    document.getElementById("modalProductMeta").textContent=item.meta || "Disponible";
    document.getElementById("modalProductDescription").textContent=item.descripcion || "";

    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeProduct(){
    const modal=document.getElementById("productModal");
    if(modal) modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  function attachProductClicks(){
    document.querySelectorAll(".product-card").forEach(card=>{
      if(card.dataset.detailBound) return;
      card.dataset.detailBound="1";
      card.style.cursor="pointer";
      card.addEventListener("click",e=>{
        if(e.target.closest("a,button")) return;
        const id=card.dataset.productId;
        const item=(window.CATALOGO || []).find(x=>x.id===id);
        if(item) openProduct(item);
      });
    });
  }

  // Make the existing renderer expose the product id to each card.
  const oldRender=window.render;
  if(typeof oldRender==="function"){
    const original=oldRender;
    window.render=function(){
      original();
      document.querySelectorAll(".product-card").forEach((card,i)=>{
        const grid=card.closest("[id]");
        const cat=grid?.id==="vehiclesGrid"?"vehiculos":grid?.id==="housesGrid"?"casas":"armas-vip";
        const items=(window.CATALOGO||[]).filter(x=>x.categoria===cat);
        if(items[i]) card.dataset.productId=items[i].id;
      });
      attachProductClicks();
    };
    window.render();
  } else {
    setTimeout(attachProductClicks,300);
  }

  // Fallback: observe dynamically rendered cards.
  new MutationObserver(attachProductClicks).observe(document.body,{childList:true,subtree:true});
})();
