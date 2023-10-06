import {
  state,
  API_BASE_URL, 
  job_post_list_el, 
  job_details_content_el 
} from "../common.js";
import render_spinner from "./Spinner.js";
import render_error from "./Error.js";
import render_job_details from "./JobDetails.js";

const render_job_list = function () {
  state.job_list.forEach(function (job_item, index) {
    const job_post_markup = 
      `<li class="job-post-list__item">
          <a href="#${job_item.id}" class="job-post">
            <p class="badge badge--${(index) % 4 + 1}">${job_item.badgeLetters}</p>
            <div class="job-post__content">
              <h4 class="job-post__title">${job_item.title}</h4>
              <p class="job-post__company">${job_item.company}</p>
              <ul class="job-post__info">
                <li class="job-post__type">
                  <i class="fa-solid fa-clock job-post__icon"></i>
                  ${job_item.duration}
                </li>
                <li class="job-post__salary">
                  <i class="fa-solid fa-money-bill job-post__icon"></i>
                  $${job_item.salary}
                </li>
                <li class="job-post__location">
                  <i class="fa-solid fa-location-dot job-post__icon"></i>
                  ${job_item.location}
                </li>
              </ul>
            </div>
            <div class="job-post__meta">
              <button class="bookmark">
                <i class="fa-solid fa-bookmark bookmark__icon"></i>
              </button>
              <p class="job-post__date">${job_item.daysAgo}d</p>
            </div>
          </a>
        </li>`;

    job_post_list_el.insertAdjacentHTML('beforeend', job_post_markup);
  });
};

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
  
    // UPDATE STATE
    state.job_details = data;

    // Rendering
    render_spinner('job-details');
    render_job_details();

  } catch(error) {
    console.warn(error);
    render_spinner('job-details');
    render_error(error.message);
  };
};

job_post_list_el.addEventListener('click', job_post_list_click_handler);

export default render_job_list;