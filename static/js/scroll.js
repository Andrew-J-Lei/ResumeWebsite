document.documentElement.dataset.fixed = false;
document.addEventListener("scroll", () => {
  document.documentElement.dataset.scroll = window.scrollY;
  document.documentElement.dataset.fixed = (window.scrollY > 0);
});