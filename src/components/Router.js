
const router = function () {
  console.log('Router...');
};

// REGISTERING EVENTS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

// SINCE our app uses HASH, this code is not necessary

// window.addEventListener('popstate', router);

// document && document.addEventListener('click', function (event) {
//   const { target } = event;
//   const anchor_el = target.closest('a');

//   if (!anchor_el) return;

//   event.preventDefault();

//   // Register href attribute to Browser History Api
//   history.pushState(null, null, anchor_el.href);

//   // Call Router to find a math and render the view
//   router();
// });