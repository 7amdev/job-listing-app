import {
  API_BASE_URL,
  state,
  search_el,
  search_input_el,
  job_results_count_el,
  job_post_list_el
} from "../common.js";
import render_spinner from "./Spinner.js";
import render_error from './Error.js'
import render_job_list from "./JobList.js";
import { sort_by_relevance  } from "./Sort.js";

const search_form_submit_handler = async function (event) {
  event.preventDefault();  
  const search_input_value = search_input_el.value;

  // Validation
  const invalid_chars = /#|%|<script>/;
  const contains_forbidden_chars = invalid_chars.test(search_input_value);

  if (contains_forbidden_chars) {
    render_error('Invalid search text. Search text doesnt support these caracters: #,%,<script>');
    return;
  } 

  if (search_input_value.length === 0) {
    render_error('Please provide a text...');
    return;
  }

  // show loading spinner...
  render_spinner('job-list');

  try {

    // fetch call
    const response = await fetch(`${API_BASE_URL}/jobs?q=${search_input_value}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Resource issue (e.g resource doesn\' exist or server issue...)');
    }

    // update STATE
    state.job_list = data;

    // Sort by Relevance
    sort_by_relevance();

    // hide spinner
    render_spinner('job-list');

    // render # of results 
    job_results_count_el.textContent = state.job_list.length;

    // clear job list
    job_post_list_el.innerHTML = '';

    // remove focus from search form
    search_input_el.blur();

    // render job items
    render_job_list();

  } catch(error) {
    console.warn(error);
    render_error(error.message);
    render_spinner('job-list');
  }
};

search_el.addEventListener('submit', search_form_submit_handler);