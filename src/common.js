// STATE
export const state = {
  job_list: [],
  job_details: {},
  current_page_idx: 0,
  sort: '-relevant'
};

// CONSTANTS
export const API_BASE_URL = 'http://localhost:3000';
export const MSG_DISPLAY_TIME = 3000;
export const ITEMS_PER_PAGE = 7;

// SELECTORS
export const search_el = document.querySelector('.search');
export const search_input_el = document.querySelector('.search__input');
export const job_results_count_el = document.querySelector('.filter__job-count');
export const job_post_list_el = document.querySelector('.job-post-list');
export const spinner_job_list_el = document.querySelector('.spinner--job-list');
export const spinner_job_details_el = document.querySelector('.spinner--job-details');
export const job_details_el = document.querySelector('.job-details');
export const job_details_content_el = document.querySelector('.job-details__content');
export const error_el = document.querySelector('.error');
export const error_title = error_el.querySelector('.error__title');
export const error_description = error_el.querySelector('.error__description');
export const filter_el = document.querySelector('.filter');
export const filter_relevant_btn_el = filter_el.querySelector('.filter--relevant');
export const filter_recent_btn_el = filter_el.querySelector('.filter--recent');
export const pagination_el = document.querySelector('.pagination');
export const pagination_prev_btn_el = pagination_el.querySelector('.pagination__button--prev');
export const pagination_next_btn_el = pagination_el.querySelector('.pagination__button--next');
export const pagination_next_btn_description = pagination_el.querySelector('.pagination__description--next');
export const pagination_prev_btn_description = pagination_el.querySelector('.pagination__description--prev');


// UTILITY/HELPER FUNCTION
export const calculate_number_of_pages = function (list_length) {
  let pages = Math.floor(list_length / ITEMS_PER_PAGE);
  
  // if ((list_length % ITEMS_PER_PAGE) > 0)
  //   pages += 1;

  return pages;
};
