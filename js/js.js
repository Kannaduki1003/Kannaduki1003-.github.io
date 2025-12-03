document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  // ▼ ハンバーガー開閉
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // ▼ ドロップダウン開閉（スマホのみ）
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector("a");

    let tappedOnce = false; // 1回目タップ検知用

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        // 1回目タップ時は開閉のみ
        if (!tappedOnce) {
          e.preventDefault(); // ページ遷移を防ぐ
          dropdown.classList.toggle("open");

          // 他のドロップダウンを閉じる
          dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove("open");
          });

          tappedOnce = true;

          // 1.5秒以内に2回目がなければリセット
          setTimeout(() => tappedOnce = false, 1500);
        } else {
          // 2回目タップで通常リンク動作
          tappedOnce = false;
        }
      }
    });
  });

  // ▼ リサイズ時リセット
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mainNav.classList.remove("active");
      dropdowns.forEach(d => d.classList.remove("open"));
    }
  });
});


// 🌗 テーマ切り替え処理

// ボタン要素を取得
const toggleButton = document.getElementById("theme-toggle");

// <body>を取得（クラスの付け外しでテーマを変える）
const body = document.body;

// ---- 起動時処理 ----
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  // ライトテーマ
  body.classList.add("light");
  toggleButton.textContent = "☀️ ダークテーマ";

} else if (savedTheme === "dark") {
  // ダークテーマ
  body.classList.remove("light");
  toggleButton.textContent = "🌙 ライトテーマ";

} else {
  // 初回訪問（localStorageがない）
  // OSの色設定に合わせる
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (systemDark) {
    body.classList.remove("light");
    toggleButton.textContent = "🌙 ライトテーマ";
  } else {
    body.classList.add("light");
    toggleButton.textContent = "☀️ ダークテーマ";
  }
}

// ---- ボタンをクリックしたときの処理 ----
toggleButton.addEventListener("click", () => {

  // body に .light クラスをトグル（ON/OFF切替）
  body.classList.toggle("light");

  // 現在がライトテーマかどうかを判定
  const isLight = body.classList.contains("light");

  // ボタンの表示テキストを切り替え
  toggleButton.textContent = isLight
    ? "\u{2600}\u{FE0F}ダークテーマ " // ライト中 → ダークに切り替えボタンを表示
    : "\u{1F319}\u{FE0F} ライトテーマ"; // ダーク中 → ライトに切り替えボタンを表示

  // 現在のテーマをブラウザに保存（次回も同じ状態で開ける）
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// ---- OS設定の変更をリアルタイムで反映（任意機能） ----
// ※OSテーマが変わったら自動で切り替わるようにしたい場合のみ有効化
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  const systemPrefersDark = event.matches;
  if (!localStorage.getItem("theme")) { // 手動設定がないときのみ追従
    if (systemPrefersDark) {
      body.classList.remove("light");
      toggleButton.textContent = "\u{1F319}\u{FE0F} ライトテーマ";
    } else {
      body.classList.add("light");
      toggleButton.textContent = "\u{2600}\u{FE0F} ダークテーマ";
    }
  }
});