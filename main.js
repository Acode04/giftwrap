const screens = document.querySelectorAll('.screen');
const backBtn = document.getElementById('backBtn');
let current = 0;
const screenHistory = [0];

const giftData = [
  {
    image: 'assets/gifts/gift1.jpeg',
    title: 'Do you remember our first kiss?',
    message:
      'You played this song that night. Everything felt right, paused just for us.'
  },
  {
    image: 'assets/gifts/gift2.jpeg',
    title: 'A little reminder',
    message:
      'No matter how busy life gets, you will always be my favorite place to return to.'
  },
  {
    image: 'assets/gifts/gift3.jpeg',
    title: 'For you ❤️',
    message:
      'This is just a small way of saying how much you mean to me.'
  }
];

//Open gift function
function openGift(index) {
  const gift = giftData[index];

  document.getElementById('giftImage').src = gift.image;
  document.getElementById('giftTitle').textContent = gift.title;
  document.getElementById('giftMessage').textContent = gift.message;

  showScreen(3);
}



// Screen transition
// function showScreen(index) {
//   const from = screens[current];
//   const to = screens[index];

//   if (from === to) return;

//   // Back button
//   index === 0 ? backBtn.classList.add('hidden') : backBtn.classList.remove('hidden');

//   gsap.to(from, {
//     opacity: 0,
//     y: -30,
//     duration: 0.3,
//     onComplete: () => from.classList.add('hidden')
//   });

//   to.classList.remove('hidden');
//   gsap.fromTo(to,
//     { opacity: 0, y: 40 },
//     { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
//   );

//   current = index;

//   if (index === 3) startFloatingIcons();
// }

function showScreen(index, isBack = false) {
  const from = screens[current];
  const to = screens[index];

  if (from === to) return;

  // Update history only if NOT going back
  if (!isBack) {
    screenHistory.push(index);
  }

  // Back button visibility
  screenHistory.length > 1
    ? backBtn.classList.remove('hidden')
    : backBtn.classList.add('hidden');

  // Animate out
  gsap.to(from, {
    opacity: 0,
    y: -30,
    duration: 0.3,
    onComplete: () => from.classList.add('hidden')
  });

  // Animate in
  to.classList.remove('hidden');
  gsap.fromTo(
    to,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  );

  current = index;

  // Restart floating icons if needed
  if (index === 3) startFloatingIcons();
}


function goHome() { showScreen(0); }
function goYes() { showScreen(2); }
function goNo() { showScreen(1); }

function goBack() {
  if (screenHistory.length <= 1) return;

  // Remove current screen
  screenHistory.pop();

  // Go to previous screen
  const previous = screenHistory[screenHistory.length - 1];
  showScreen(previous, true);
}


//
// 🔹 Swipe-back on mobile
//
let touchStartX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 80) {
    goBack();
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
