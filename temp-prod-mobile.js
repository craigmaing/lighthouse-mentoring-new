// Mobile menu setup function
function setupMobileMenu() {
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (button && menu) {
    // Remove existing listeners by cloning button
    const newButton = button.cloneNode(true);
    button.parentNode?.replaceChild(newButton, button);

    // Add click listener to new button
    newButton.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

// Initialize on page load (works with Astro View Transitions)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileMenu);
} else {
  setupMobileMenu();
}

// Re-initialize after Astro view transitions
document.addEventListener('astro:page-load', setupMobileMenu);
