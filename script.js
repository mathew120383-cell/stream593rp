const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");
const connect = "cfx.re/join/kqq6kva";

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(connect);
    toast.textContent = "Dirección copiada";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  } catch {
    toast.textContent = connect;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }
});

const menu = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));


// Mercado: filtrar artículos por categoría.
document.querySelectorAll(".market-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".market-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    document.querySelectorAll(".market-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});
