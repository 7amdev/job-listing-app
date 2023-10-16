import { 
  state,
  pagination_prev_btn_el, 
  pagination_next_btn_el, 
  pagination_next_btn_description,
  pagination_prev_btn_description,
  pagination_el, 
  calculate_number_of_pages
} from "../common.js";
import render_job_list from "./JobList.js";


const render_pagination = function () {
  const number_of_pages = calculate_number_of_pages(state.job_list.length);

  if (number_of_pages === 0) {
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
    pagination_next_btn_el.classList.remove('pagination__button--visible');
  }

  if (number_of_pages > 0) {
    // pagination_next_btn_description.textContent = `Page ${state.current_page_idx}`;
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
    pagination_next_btn_el.classList.add('pagination__button--visible');
    pagination_next_btn_description.textContent = `Page ${state.current_page_idx + 2}`;
  }
};

const click_handler = function (event) {
  const current_el = event.target;

  const prev_page_action = current_el.closest('.pagination__button')?.className.includes('--prev');
  const next_page_action = current_el.closest('.pagination__button')?.className.includes('--next');
  const number_of_pages = calculate_number_of_pages(state.job_list.length);

  console.log(state.current_page_idx, number_of_pages);

  if (state.current_page_idx <= 0) {
    pagination_prev_btn_el.classList.remove('pagination__button--visible');
  }

  if (state.current_page_idx <= number_of_pages) {
    pagination_next_btn_el.classList.add('pagination__button--visible');
  }

  if (prev_page_action) {
    state.current_page_idx -= 1;

    if (state.current_page_idx <= 0) {
      // UPDATE STATE
      state.current_page_idx = 0; 

      pagination_prev_btn_el.classList.remove('pagination__button--visible');
      pagination_next_btn_description.textContent = `Page ${state.current_page_idx + 2}`;
    } else {
      pagination_prev_btn_description.textContent = `Page ${state.current_page_idx}`;
      pagination_next_btn_description.textContent = `Page ${state.current_page_idx + 1}`;
    }
  } 

  if (next_page_action) {
    // UPDATE STATE
    state.current_page_idx += 1;

    if (!pagination_prev_btn_el.classList.contains('pagination__button--visible'))
      pagination_prev_btn_el.classList.add('pagination__button--visible');

    if (state.current_page_idx >= number_of_pages) {
      // UPDATE STATE
      state.current_page_idx = number_of_pages;
      
      pagination_next_btn_el.classList.remove('pagination__button--visible');
    }

    pagination_next_btn_description.textContent = `Page ${state.current_page_idx + 2}`;
    pagination_prev_btn_description.textContent = `Page ${state.current_page_idx}`;
  } 

  render_job_list();
};

pagination_el.addEventListener('click', click_handler);

export default render_pagination;

