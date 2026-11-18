// フッターの年
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 拡大表示 =====
const items    = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.getElementById("lightbox");
const lbImg    = lightbox.querySelector(".lb-img");
const lbTitle  = lightbox.querySelector(".lb-title");
const lbDate   = lightbox.querySelector(".lb-date");
const lbPlace  = lightbox.querySelector(".lb-place");
const lbDesc   = lightbox.querySelector(".lb-desc");
const lbOrig   = lightbox.querySelector(".lb-original");
let current = 0;

function getText(item, selector) {
  const el = item.querySelector(selector);
  return el ? el.textContent.trim() : "";
}

// 日時・場所が空なら、その行ごと隠す
function setRow(dd, text) {
  dd.textContent = text;
  dd.parentElement.hidden = !text;
}

function show(index) {
  current = (index + items.length) % items.length;
  const item = items[current];
  const link = item.querySelector("a");
  const img  = item.querySelector("img");
  const desc = item.querySelector(".d-desc");

  lbImg.src = link.href;   // 元の画像ファイルをそのまま表示
  lbImg.alt = img.alt;
  lbTitle.textContent = getText(item, "figcaption");
  setRow(lbDate,  getText(item, ".d-date"));
  setRow(lbPlace, getText(item, ".d-place"));
  lbDesc.innerHTML = desc ? desc.innerHTML : "";
  lbOrig.href = link.href;
  lightbox.scrollTop = 0;
}

function open(index) {
  show(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function close() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

items.forEach((item, i) => {
  item.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    open(i);
  });
});

lightbox.querySelector(".lb-close").addEventListener("click", close);
lightbox.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => show(current + 1));

// 写真の外側（ぼやけた部分）を押したら閉じる
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) close();
});

// キーボード操作
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape")     close();
  if (e.key === "ArrowLeft")  show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

// スマホの左右スワイプ（縦スクロールとは区別）
let startX = 0, startY = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
    show(current + (dx < 0 ? 1 : -1));
  }
});