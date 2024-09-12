import 'styles/style.scss'

document.addEventListener('DOMContentLoaded', () => {
  // 選單事件
  const navTrigger = document.getElementById('nav-trigger');
  const navMask = document.getElementById('nav-mask');
  const navPanel = document.getElementById('nav-panel');

  // 初始化，隱藏選單且不顯示 transition 效果，並且清除選單的 disable
  navPanel.classList.remove('is-disabled');

  // 切換萬選單狀態的函示
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




