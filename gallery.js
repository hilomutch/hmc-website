// フッターの年
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 拡大表示 =====
const links    = Array.from(document.querySelectorAll(".gallery-item a"));
const lightbox = document.getElementById("lightbox");
const lbImg    = lightbox.querySelector(".lb-img");
const lbCap    = lightbox.querySelector(".lb-caption");
const lbOrig   = lightbox.querySelector(".lb-original");
let current = 0;

function show(index) {
  current = (index + links.length) % links.length; // 最後の次は最初に戻る
  const link = links[current];
  const img  = link.querySelector("img");
  const cap  = link.closest("figure").querySelector("figcaption");

  lbImg.src = link.href;            // 元の画像ファイルをそのまま表示
  lbImg.alt = img.alt;
  lbCap.textContent = cap ? cap.textContent : "";
  lbOrig.href = link.href;
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

links.forEach((link, i) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    open(i);
  });
});

lightbox.querySelector(".lb-close").addEventListener("click", close);
lightbox.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => show(current + 1));

// 写真の外側（黒い部分）をクリックで閉じる
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

// スマホのスワイプ
let startX = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) show(current + (diff < 0 ? 1 : -1));
});