import { 
  state, 
  filter_el, 
  filter_recent_btn_el, 
  filter_relevant_btn_el 
} from "../common.js";
import render_job_list from "./JobList.js";

const sort_by_relevance = function () {
  state.job_list.sort(function (a, b) {
    if (a.relevanceScore > b.relevanceScore) return 1;
    else if (a.relevanceScore < b.relevanceScore) return -1;

    return 0;
  });    
};

const sort_by_recent = function () {
  state.job_list.sort(function (a, b) {
    if (a.daysAgo > b.daysAgo) return 1;
    else if (a.daysAgo < b.daysAgo) return -1;

    return 0;
  });
};

filter_el.addEventListener('click', function (event) {
  const current_el = event.target;

  const sort_by_relevant_action = current_el.className.includes('--relevant');
  const sort_by_recent_action = current_el.className.includes('--recent');

  if (!sort_by_relevant_action && !sort_by_recent_action) return;

  if (sort_by_relevant_action) {

    if (filter_relevant_btn_el.classList.contains('filter__button--active')) 
      return;
    
    // console.log('sort_by_relevant_action');
    
    filter_recent_btn_el.classList.remove('filter__button--active');
    filter_relevant_btn_el.classList.add('filter__button--active');

    // UPDATE STATE
    sort_by_relevance();

    // RENDER
    render_job_list();

    return;
  }

  if (sort_by_recent_action) {

    if (filter_recent_btn_el.classList.contains('filter__button--active')) 
      return;

    // console.log('sort_by_recent_action');
    
    filter_relevant_btn_el.classList.remove('filter__button--active');
    filter_recent_btn_el.classList.add('filter__button--active');
    
    // UPDATE STATE
    sort_by_recent()

    // RENDER
    render_job_list();
    return;
  }
});

export {
  sort_by_recent,
  sort_by_relevance 
};