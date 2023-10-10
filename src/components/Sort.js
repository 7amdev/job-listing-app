import { 
  state, 
  filter_el, 
  filter_recent_btn_el, 
  filter_relevant_btn_el 
} from "../common.js";
import render_job_list from "./JobList.js";

const sort_by_relevance = function () {
  if (filter_relevant_btn_el.classList.contains('filter__button--active')) 
      return;
        
  // UPDATES UI
  filter_recent_btn_el.classList.remove('filter__button--active');
  filter_relevant_btn_el.classList.add('filter__button--active');

  // UPDATES STATE
  state.sort = '-relevant';

};

const sort_by_recent = function () {
  if (filter_recent_btn_el.classList.contains('filter__button--active')) 
      return;
  
  // UPDATES UI
  filter_relevant_btn_el.classList.remove('filter__button--active');
  filter_recent_btn_el.classList.add('filter__button--active');

  // UPDATE STATE
  state.sort = '+recent';

};

filter_el.addEventListener('click', function (event) {
  const current_el = event.target;

  const sort_by_relevant_action = current_el.className.includes('--relevant');
  const sort_by_recent_action = current_el.className.includes('--recent');

  if (!sort_by_relevant_action && !sort_by_recent_action) return;

  if (sort_by_relevant_action) sort_by_relevance();

  if (sort_by_recent_action) sort_by_recent();

  // RENDER
  render_job_list();
});