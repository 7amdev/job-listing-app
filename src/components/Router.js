
const router = function () {
  console.log('Router...');
};

// REGISTERING EVENTS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);
document && document.addEventListener('click', function (event) {
  const { target } = event;
  
  if (!target.closest('a')) return;

  event.preventDefault();

  console.log('Anchor tag has been clicked...');

  // Register href attribute to Browser History Api

  // Call Router to find a math and render the view
});