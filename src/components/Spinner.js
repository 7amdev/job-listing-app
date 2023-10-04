import { spinner_job_details_el, spinner_job_list_el } from '../Common.js'

const render_spinner = function (which_spinner) {
  if (which_spinner === 'job-list') 
    spinner_job_list_el.classList.toggle('spinner--visible');
  else if (which_spinner === 'job-details')
    spinner_job_details_el.classList.toggle('spinner--visible');
};

export default render_spinner;