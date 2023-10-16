import { state, job_details_content_el } from '../common.js';


const render_job_details = function () {
  const { active_job_item: data } = state;

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
              data.qualifications && 
              (
                data.qualifications
                  .map(function (qualification) {
                    return `<p class="skill-tag">${qualification}</p>`;
                  })
                  .join('')
              ) ||
              ''
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
              data.reviews &&
              data.reviews.map(function (review) {
                return `<p class="review-quote">${review}</p>`;
              }).join('') ||
              ''
            }
          </div>
        </div>
      </section>
      <footer class="job-details__footer">if possible, please reference that you found the job on this site, we would appreciate it!</footer>`;

    // Render job details view
    job_details_content_el.insertAdjacentHTML('beforeend', job_details_content_markup);
};

export default render_job_details;