import {
  state,
  job_post_list_el
} from "../common.js";
import { 
  bookmark_button_markup, 
  bookmark_button_click_handler 
} from "./BookmarkButton.js";

const job_list_item_markup = function (data, index) {

  const { id: active_job_item_id } = state.active_job_item;

  const markup = 
    `<li class="job-post-list__item">
        <a href="#/jobs/${data.id}" data-id="${data.id}" class="job-post ${ data.id === active_job_item_id ? 'job-post--active' : ''}">
          <p class="badge badge--${(index) % 4 + 1}">${data.badgeLetters}</p>
          <div class="job-post__content">
            <h4 class="job-post__title">${data.title}</h4>
            <p class="job-post__company">${data.company}</p>
            <ul class="job-post__info">
              <li class="job-post__type">
                <i class="fa-solid fa-clock job-post__icon"></i>
                ${data.duration}
              </li>
              <li class="job-post__salary">
                <i class="fa-solid fa-money-bill job-post__icon"></i>
                ${data.salary}
              </li>
              <li class="job-post__location">
                <i class="fa-solid fa-location-dot job-post__icon"></i>
                ${data.location}
              </li>
            </ul>
          </div>
          <div class="job-post__meta">
            ${ bookmark_button_markup(data.id) }
            <p class="job-post__date">${data.daysAgo}d</p>
          </div>
        </a>
      </li>`;

  return markup;
};

const render_job_list = function (container = 'job_post_list') {

  let results = [...state.job_list];
  
  job_post_list_el.innerHTML = '';

  // FILTER

  // SORT 
  // if (state.sort === '-relevant') {
  //   results = results.sort(function (a, b) {
  //     // Descending Order
  //     if (a.relevanceScore > b.relevanceScore) return -1;
  //     else if (a.relevanceScore < b.relevanceScore) return 1;
  
  //     return 0;
  //   });    
  // }   

  // if (state.sort === '+recent') {
  //   results = results.sort(function (a, b) {
  //     if (a.daysAgo > b.daysAgo) return 1;
  //     else if (a.daysAgo < b.daysAgo) return -1;

  //     return 0;
  //   });
  // } 

  // PAGINATION
  // const range_start = state.offset * state.limit;
  // const range_end   = range_start + state.limit;

  // results = results.slice(range_start, range_end);

  results.forEach(function (job_item, index) {
    const job_post_markup = job_list_item_markup(job_item, index);

    job_post_list_el.insertAdjacentHTML('beforeend', job_post_markup);
  });
};

const job_post_list_click_handler =  async function (event) {
  const job_post_clicked = event.target.closest('.job-post');
  const job_posts = job_post_list_el.querySelectorAll('.job-post');
  const bookmark_action = event.target.className.includes('bookmark-button');

  if (bookmark_action) {
    const { id } = job_post_clicked.dataset;
    const active_item = state.job_list.find(function (job_item) {
      return job_item.id === +id;
    });

    bookmark_button_click_handler(active_item, job_post_clicked);
  }

  job_posts.forEach(function (job_post) {
    job_post.classList.remove('job-post--active');
  });

  job_post_clicked?.blur();
  job_post_clicked?.classList.add('job-post--active');
  
};

job_post_list_el.addEventListener('click', job_post_list_click_handler);

export default render_job_list;
export { job_list_item_markup };