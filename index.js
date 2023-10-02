// GLOBALS
const search_el = document.querySelector('.search');
const search_input_el = document.querySelector('.search__input');
const job_results_count_el = document.querySelector('.filter__job-count');
const job_post_list_el = document.querySelector('.job-post-list');
const spinner_job_list_el = document.querySelector('.spinner__job-list');
const spinner_job_details_el = document.querySelector('.spinner__job-details');

// SEARCH COMPONENT
search_el.addEventListener('submit', function (event) {
  event.preventDefault();
  const search_input_value = search_input_el.value;

  // Validation
  const invalid_chars = /#|%|<script>/;
  const contains_forbidden_chars = invalid_chars.test(search_input_value);

  if (contains_forbidden_chars) {
    console.log('Invalid search text...');
    // Show Message error dialog
    return;
  } 

  if (search_input_value.length === 0) {
    console.log('Invalid search text...');
    // Show Message error dialog
    return;
  }

  // show loading spinner...
  spinner_job_list_el.classList.add('spinner--visible');

  // fetch call
  fetch(`http://localhost:3000/jobs?q=${search_input_value}`)
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Response error (e.g Netwok or server problem occured...)');
    }

    return response.json();
  })
  .then(function (data) {

    // hide spinner
    spinner_job_list_el.classList.remove('spinner--visible');

    // render # of results 
    job_results_count_el.textContent = data.length;

    // clear job list
    job_post_list_el.innerHTML = '';

    // render job items
    data.forEach(function (job_item) {
      const job_post_markup = 
        `<li class="job-post">
            <p class="badge">${job_item.badgeLetters}</p>
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
          </li>`;
  
      job_post_list_el.insertAdjacentHTML('beforeend', job_post_markup);
    });
  })
  .catch(function (error) {
    console.warn(error.message);
    // show dialog messsage
  });
});

