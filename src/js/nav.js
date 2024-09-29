// 定義一個策略物件，用來映射不同頁面對應的 H1 標題
const pageTitleStrategy = {
  'index.html': () => 'Home Page',
  'topic.html': () => 'RWD: Topics',
  'products.html': () => 'RWD: Products',
  'js-day-1.html': () => 'Javascript DAY-1: 資料型別與型別轉換',
  'js-day-2.html': () => 'Javascript DAY-2: 變數、作用域、運算子與物件',
  'default': () => 'Welcome to Our Website',  // 預設標題
};

/** 判斷當前頁面並設定標題 */

const getCurrentPageName = () => {
  const path = window.location.pathname;

  // 取得最後的文件名部分，排除任何基礎 URL
  return path.substring(path.lastIndexOf('/') + 1);
};

// 根據當前頁面的名稱取得對應的標題
const getCurrentPageTitle = () => {
  const pageName = getCurrentPageName();

  // 根據頁面名稱從策略中取得對應標題，沒有的話回傳 default 標題
  return pageTitleStrategy[pageName] ? pageTitleStrategy[pageName]() : pageTitleStrategy['default']();
};

// 動態將nav相關的內容加入到頁面上
const appContent = document.getElementById('app');
appContent.insertAdjacentHTML('afterbegin', `
  <nav class="navigator">
    <div class="navigator-title">${getCurrentPageTitle()}</div>
    <div id="nav-trigger" class="navigator-trigger"><i></i></div>
  </nav>
  <div id="nav-mask" class="nav-mask"></div>
  <div id="nav-panel" class="nav-panel">
    <b>HTML/CSS</b>
    <ul class="nav-list">
      <li>
        <a href="index.html">HOME</a>
      </li>
      <li>
        <a href="topic.html">TOPIC</a>
      </li>
      <li>
        <a href="products.html">PRODUCTS</a>
      </li>
    </ul>
    <b>Javascript</b>
    <ul class="nav-list">
      <li>
        <a href="js-day-1.html">Day-1: 資料型別與型別轉換</a>
      </li>
      <li>
        <a href="js-day-2.html">Day-2: 變數、作用域、運算子與物件</a>
      </li>
    </ul>
  </div>
`);

document.addEventListener('DOMContentLoaded', () => {
  /** 選單事件 */
  const navTrigger = document.getElementById('nav-trigger');
  const navMask = document.getElementById('nav-mask');
  const navPanel = document.getElementById('nav-panel');

  // 初始化，隱藏選單且不顯示 transition 效果，並且清除選單的 disabled 狀態
  navPanel.classList.remove('is-disabled');

  // 切換選單狀態的函式 toggle 是反覆add和remove的意思
  const toggleNav = (isOpen) => {
    navPanel.classList.toggle('is-active', isOpen);
    navPanel.classList.toggle('is-disabled', !isOpen);
    navMask.classList.toggle('is-active', isOpen);
  };

  // 監聽觸發器的點擊事件，開啟選單
  navTrigger.addEventListener('click', () => toggleNav(true));

  // 監聽遮罩的點擊事件，關閉選單
  navMask.addEventListener('click', () => toggleNav(false));
});