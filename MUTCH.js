// フッターの年を自動で今年にする
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 3本線メニュー =====
const menuBtn  = document.querySelector(".menu-btn");
const siteMenu = document.getElementById("site-menu");

if (menuBtn && siteMenu) {
  function setMenu(open) {
    menuBtn.classList.toggle("is-open", open);
    siteMenu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    siteMenu.setAttribute("aria-hidden", !open);
  }

  // ボタンで開け閉め
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenu(!siteMenu.classList.contains("is-open"));
  });

  // メニューの外を押したら閉じる
  document.addEventListener("click", (e) => {
    if (!siteMenu.contains(e.target)) setMenu(false);
  });

  // Escキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
}