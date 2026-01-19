function goBack() {
  window.history.back();
}

let startX = 0;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 80) {
    goBack();
  }
});
