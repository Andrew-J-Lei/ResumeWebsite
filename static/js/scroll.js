document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.fixed = (window.scrollY > 100);
});