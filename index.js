// GLOBALS
const search_el = document.querySelector('.search');
const search_input_el = document.querySelector('.search__input');
const job_results_count_el = document.querySelector('.filter__job-count');
const job_post_list_el = document.querySelector('.job-post-list');
<<<<<<< HEAD
const spinner_job_list_el = document.querySelector('.spinner__job-list');
const spinner_job_details_el = document.querySelector('.spinner__job-details');
=======
const spinner_job_list_el = document.querySelector('.spinner--job-list');
const spinner_job_details_el = document.querySelector('.spinner--job-details');
const job_details_el = document.querySelector('.job-details');
const job_details_content_el = document.querySelector('.job-details__content');
const get_random_int = function (min, max) {
  // The maximum is exclusive and the minimum is inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

>>>>>>> 9c416d1 (feat: render job details)

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

    // remove focus from search form
    search_input_el.blur();

    // render job items
    data.forEach(function (job_item, index) {
      const job_post_markup = 
        `<li class="job-post">
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
          </li>`;
  
      job_post_list_el.insertAdjacentHTML('beforeend', job_post_markup);
    });
  })
  .catch(function (error) {
    console.warn(error.message);
    // show dialog messsage
  });
});

// JOB-LIST COMPONENT
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
  spinner_job_details_el.classList.add('spinner--visible');

  fetch(`http://localhost:3000/jobs/${job_post_id}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Response error (e.g Netwok or server problem occured...)');
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      spinner_job_details_el.classList.remove('spinner--visible');

      const job_details_content_markup = 
        `<img src="${data.coverImgURL}" class="job-details__img" alt="office smile coworking">
    
        <button class="apply">
          Apply
          <i class="fa-solid fa-square-caret-right apply__icon"></i>
        </button>
        
        <section class="job-details__info">
          <div class="job-details__col-left">
            <p class="badge badge--yellow badge--xl">${data.badgeLetters}</p>
            <div class="job-details__wrapper">
              <p class="job-details__date job-details__date--md">${data.daysAgo}d</p>
              <button class="bookmark bookmark--xl">
                <i class="fa-solid fa-bookmark bookmark__icon"></i>
              </button> 
            </div>
          </div>
          <div class="job-details__col-right">
            <h1 class="job-details__title">${data.title}</h1>
            <p class="job-details__company">${data.company}</p>
            <p class="job-details__description">
              ${data.description}
            </p>
            <ul class="job-details__other-info">
              <li class="job-details__type">
                <i class="fa-solid fa-clock job-details__icon"></i>
                ${data.duration}
              </li>
              <li class="job-details__salary">
                <i class="fa-solid fa-money-bill job-details__icon"></i>
                ${data.salary}
              </li>
              <li class="job-details__location">
                <i class="fa-solid fa-location-dot job-details__icon"></i>
                ${data.location}
              </li>
            </ul>
          </div>
        </section>

        <section class="job-details__others">
          <div class="qualification">
            <div class="qualification__col-left">
              <p class="qualification__second-heading">Qualifications</p>
              <p class="qualification__paragraph">
                Other qualifications may apply
              </p>
            </div>
            <div class="qualification__col-right qualification__skills">
              ${
                data.qualifications.map(function (qualification) {
                  return `<p class="skill-tag">${qualification}</p>`;
                }).join('')
              }
            </div>
          </div>

          <div class="reviews">
            <div class="reviews__col-left">
              <p class="reviews__second-heading">Company Reviews</p>
              <p class="reviews__paragraph">
                Recent things people are saying
              </p>
            </div>
            <div class="reviews__col-right">
              ${
                data.reviews.map(function (review) {
                  return `<p class="review-quote">${review}</p>`;
                }).join('')
              }
            </div>
          </div>
        </section>
        <footer class="job-details__footer">if possible, please reference that you found the job on this site, we would appreciate it!</footer>`;

      // Render job details view
      job_details_content_el.insertAdjacentHTML('beforeend', job_details_content_markup);
    })
    .catch(function (error) {
      console.log(error.message);
    });
});