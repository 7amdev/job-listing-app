import { state } from "../common.js";


const bookmark_button_markup = function (job_item_id, options = {}) {
  const { style_xl = null } = options;
  const is_bookmarked = state.bookmarks.some(function (bookmark) {
    return bookmark.id === job_item_id;
  });
  
  return (
    `<button data-ref="${job_item_id}" class="bookmark-button ${style_xl ? 'bookmark-button--xl' : '' } ${ is_bookmarked ? 'bookmark-button--active' : ''}">
       <i class="fa-solid fa-bookmark bookmark-button__icon"></i>
     </button>`
  ); 
};

const bookmark_button_click_handler = function (job_item, parent_el) {
  const bookmark_button_el = parent_el.querySelector('.bookmark-button');

  const bookmark_found = state.bookmarks.find(function (bookmark) {
    return bookmark.id === job_item.id;
  });
  const bookmark_buttons = document.querySelectorAll(`.bookmark-button[data-ref='${job_item.id}']`);

  if (bookmark_found) {
    state.bookmarks = state.bookmarks.filter(function (bookmark) {
      return bookmark.id !== bookmark_found.id;
    });
    
    bookmark_buttons.forEach(function (bookmark_btn) {
      bookmark_btn.classList.remove('bookmark-button--active');
    });
    bookmark_button_el.blur();

    return;
  }

  state.bookmarks.push(job_item);

  bookmark_buttons.forEach(function (bookmark_btn) {
    bookmark_btn.classList.add('bookmark-button--active');
  });
};

export {
  bookmark_button_markup,
  bookmark_button_click_handler
}