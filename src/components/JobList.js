import { 
  API_BASE_URL, 
  job_post_list_el, 
  job_details_content_el 
} from "../Common.js";
import render_spinner from "./Spinner.js";
import render_job_details from "./JobDetails.js";

job_post_list_el.addEventListener('click', function (event) {
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
  // spinner_job_details_el.classList.add('spinner--visible');

  fetch(`${API_BASE_URL}/jobs/${job_post_id}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Response error (e.g Netwok or server problem occured...)');
      }
      return response.json();
    })
    .then(function (data) {
      render_spinner('job-details');
      render_job_details(data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
});