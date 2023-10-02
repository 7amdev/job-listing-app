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

  // show loading spinner...
  spinner_job_list_el.classList.add('spinner--visible');

  // fetch call
  fetch('http://localhost:3000/jobs')
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
    job_results_count_el.textContent = data.jobItems.length;

    // clear job list
    job_post_list_el.innerHTML = '';


    // render job items. show 
    // only 7 items

    console.log(data);
  })
  .catch(function (error) {
    console.warn(error.message);
    // show dialog messsage
  });

  

  
});

