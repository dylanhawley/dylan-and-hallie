document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuButton || !mobileMenu) {
    return;
  }

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    menuButton.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return !mobileMenu.classList.contains('hidden');
  }

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    const target = e.target;
    if (mobileMenu.contains(target) || menuButton.contains(target)) {
      return;
    }
    closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
});