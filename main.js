const screens = document.querySelectorAll('.screen');
const backBtn = document.getElementById('backBtn');
let current = 0;

// Screen transition
function showScreen(index) {
  const from = screens[current];
  const to = screens[index];

  if (from === to) return;

  // Back button
  index === 0 ? backBtn.classList.add('hidden') : backBtn.classList.remove('hidden');

  gsap.to(from, {
    opacity: 0,
    y: -30,
    duration: 0.3,
    onComplete: () => from.classList.add('hidden')
  });

  to.classList.remove('hidden');
  gsap.fromTo(to,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  );

  current = index;

  if (index === 3) startFloatingIcons();
}

function goHome() { showScreen(0); }
function goYes() { showScreen(2); }
function goNo() { showScreen(1); }

//
// 🔹 Swipe-back on mobile
//
let touchStartX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 80 && current !== 0) {
    goHome();
  }
});

//
// 🔹 Floating icon animation
//
function startFloatingIcons() {
  gsap.to('.floating-icon', {
    y: -20,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'sine.inOut',
    stagger: 0.5
  });
}
