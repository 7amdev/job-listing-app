import { 
  state,
  pagination_prev_btn_el, 
  pagination_next_btn_el, 
  pagination_el, 
  ITEMS_PER_PAGE
} from "../common.js";


const render_pagination = function () {
  if (state.job_list.length === 0) {
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
    pagination_next_btn_el.classList.remove('pagination__button--visible');
  }

  if ((state.job_list.length / ITEMS_PER_PAGE) > 1) 
    pagination_next_btn_el.classList.add('pagination__button--visible');
  else 
    pagination_next_btn_el.classList.remove('pagination__button--visible');
};

const click_handler = function (event) {
  const current_el = event.target;

  const prev_page_action = current_el.className.includes('--prev');
  const next_page_action = current_el.className.includes('--next');

  if (prev_page_action) {
    state.pagination_index -= 1;

    if (state.pagination_index < 1)
      state.pagination_index = 1; 
  } 

  if (next_page_action) {
    state.pagination_index += 1;
  } 
  console.log(state);
};

pagination_el.addEventListener('click', click_handler);

export default render_pagination;

