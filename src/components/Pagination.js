import { 
  state,
  pagination_prev_btn_el, 
  pagination_next_btn_el, 
  pagination_next_btn_description,
  pagination_prev_btn_description,
  pagination_el, 
  calculate_number_of_pages
} from "../common.js";
import { navigate_to } from "./Router.js";


const render_pagination = function () {
  const number_of_pages = calculate_number_of_pages(state.job_list_count, state.limit);

  if (number_of_pages < 1) {
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
    pagination_next_btn_el.classList.remove('pagination__button--visible');
    return;
  }

  if (state.offset <= 1) {
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
    pagination_next_btn_el.classList.add('pagination__button--visible');

    pagination_next_btn_description.textContent = `Page ${state.offset + 1}`;
  }

  if (state.offset > 1 && state.offset < number_of_pages) {
    pagination_prev_btn_el.classList.add('pagination__button--visible');
    pagination_next_btn_el.classList.add('pagination__button--visible');

    pagination_next_btn_description.textContent = `Page ${state.offset + 1}`;
    pagination_prev_btn_description.textContent = `Page ${state.offset}`;
  }

  if (state.offset >= number_of_pages) {
    pagination_prev_btn_description.textContent = `Page ${state.offset - 1}`;
    pagination_next_btn_el.classList.remove('pagination__button--visible');
    pagination_prev_btn_el.classList.add('pagination__button--visible');
  }
};

const click_handler = function (event) {
  const current_el = event.target;
  const prev_page_action = current_el.closest('.pagination__button')?.className.includes('--prev');
  const next_page_action = current_el.closest('.pagination__button')?.className.includes('--next');
  const number_of_pages = calculate_number_of_pages(state.job_list_count, state.limit);

  // UPDATE STATE
  if (prev_page_action) {
    state.offset -= 1;

    if (state.offset <= 1) 
      state.offset = 1;
  }
    
  if (next_page_action) {
    state.offset += 1;
  
    if (state.offset >= number_of_pages) 
      state.offset = number_of_pages;
  }

  navigate_to(`/jobs?q=${state.q}&offset=${state.offset}&sort=${state.sort}`);
};

pagination_el.addEventListener('click', click_handler);

export default render_pagination;

