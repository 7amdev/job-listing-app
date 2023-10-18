import { 
  state,
  job_details_content_el,
  bookmark_dropdown_el, 
  bookmark_dropdown_btn_el, 
  bookmark_dropdown_list 
} from "../common.js";
import { job_list_item_markup } from "./JobList.js";

const render_bookmarks = function () {
  if (state.bookmarks.length === 0) {
    bookmark_dropdown_list.innerHTML = 
      `<p class="bookmark-dropdown__title">
        Bookmark list
      </p>
      <p class="bookmark-dropdown__text">
        The bookmark list is empty...
      </p>`;  
    return;
  }
  
  bookmark_dropdown_list.innerHTML = '';
  
  state.bookmarks.forEach(function (job_item, index) {
    const job_post_markup = job_list_item_markup(job_item, index);
    bookmark_dropdown_list.insertAdjacentHTML('beforeend', job_post_markup);
  });
};

const dropdown_btn_mouseenter_handler = function (event) {
  bookmark_dropdown_list.classList.add('bookmark-dropdown__list--active');

  render_bookmarks();
};

const dropdown_list_mouseenter_handler = function (event) {
  bookmark_dropdown_btn_el.classList.add('bookmark-dropdown__button--active');
};
const dropdown_list_mouseleave_handler = function (event) {
  bookmark_dropdown_list.classList.remove('bookmark-dropdown__list--active');
  bookmark_dropdown_btn_el.classList.remove('bookmark-dropdown__button--active');
};

bookmark_dropdown_btn_el.addEventListener('mouseenter', dropdown_btn_mouseenter_handler);
bookmark_dropdown_list.addEventListener('mouseleave', dropdown_list_mouseleave_handler);
bookmark_dropdown_list.addEventListener('mouseenter', dropdown_list_mouseenter_handler);

export default render_bookmarks;