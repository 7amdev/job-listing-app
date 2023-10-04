import { job_post_list_el, job_details_content_el } from "../Common.js";
import render_spinner from "./Spinner.js";

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

  fetch(`http://localhost:3000/jobs/${job_post_id}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Response error (e.g Netwok or server problem occured...)');
      }
      return response.json();
    })
    .then(function (data) {
      // console.log(data);

      render_spinner('job-details');
      // spinner_job_details_el.classList.remove('spinner--visible');

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