import { 
  API_BASE_URL, 
  job_post_list_el, 
  job_details_content_el 
} from "../common.js";
import render_spinner from "./Spinner.js";
import render_error from "./Error.js";
import render_job_details from "./JobDetails.js";

const job_post_list_click_handler =  async function (event) {
  const job_post_clicked = event.target.closest('.job-post');
  const job_posts = job_post_list_el.querySelectorAll('.job-post');
  const job_post_id = job_post_clicked?.getAttribute('href').slice(1);
  
  job_posts.forEach(function (job_post) {
    job_post.classList.remove('job-post--active');
  });

  job_post_clicked?.blur();
  job_post_clicked?.classList.add('job-post--active');

  job_details_content_el.innerHTML = '';
  render_spinner('job-details');

  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${job_post_id}`);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error('Resource issue (e.g resource doesn\' exist or server issue...)');
    }
  
    render_spinner('job-details');
    render_job_details(data);
  } catch(error) {
    render_spinner('job-details');
    render_error(error.message);
  };
};

job_post_list_el.addEventListener('click', job_post_list_click_handler);