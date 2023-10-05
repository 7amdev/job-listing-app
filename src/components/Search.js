import {
  API_BASE_URL,
  search_el,
  search_input_el,
  job_results_count_el,
  job_post_list_el
} from "../Common.js";
import render_spinner from "./Spinner.js";
import render_error from './Error.js'

search_el.addEventListener('submit', function (event) {
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

  // fetch call
  fetch(`${API_BASE_URL}/jobs?q=${search_input_value}`)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Response error (e.g Netwok or server problem occured...)');
    }

    return response.json();
  })
  .then(function (data) {

    // hide spinner
    render_spinner('job-list');

    // render # of results 
    job_results_count_el.textContent = data.length;

    // clear job list
    job_post_list_el.innerHTML = '';

    // remove focus from search form
    search_input_el.blur();

    // render job items
    data.forEach(function (job_item, index) {
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
  })
  .catch(function (error) {
    render_error(error.message);
    render_spinner('job-list');
  });
});