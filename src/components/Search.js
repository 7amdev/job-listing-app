import {
  search_el,
  search_input_el
} from "../common.js";
import render_spinner from "./Spinner.js";
import render_error from './Error.js'
import render_job_list from "./JobList.js";
import render_pagination from "./Pagination.js";
import { navigate_to } from "./Router.js";

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


  navigate_to(`/jobs?q=${search_input_value}`);
 
};

search_el.addEventListener('submit', search_form_submit_handler);