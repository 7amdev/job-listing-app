import { 
  state, 
  job_results_count_el, 
  job_post_list_el,
  job_details_content_el,
  search_input_el,
  API_BASE_URL
} from "../common.js";
import render_job_details from "./JobDetails.js";
import render_job_list from "./JobList.js";
import render_spinner from "./Spinner.js";
import render_pagination from "./Pagination.js";
import render_error from "./Error.js";

const routes = {
  ['/jobs']: /\/jobs[\/|\?]?/,
  ['/jobs/:id']: /\/jobs\/(\w+)$/,
  ['/jobs/:id/:code']: /\/jobs\/(\w+)\/(\w+)$/
};

const navigate_to = function (path) {
  window.location.href = `#${path}`;
};

const route_jobs_render = async function (params, query) {
  // const search_input_value = query.get('q');

  // Set input search element value
  search_input_el.value = query.get('q');

  // show loading spinner...
  render_spinner('job-list');

  try {

    // fetch call
    const response = await fetch(`${API_BASE_URL}/jobs?${query.toString()}`);
    const data     = await response.json();

    if (!response.ok) {
      throw new Error('Resource issue (e.g resource doesn\' exist or server issue...)');
    }

    // -- UPDATE STATE
    state.job_list        = data;
    state.job_list_count  = +response.headers.get('x-total-count');
    state.q               = query.get('q') || '';
    state.offset          = +query.get('offset') || state.offset;
    state.sort            = +query.get('sort') || state.sort;

    // -- UPDATE UI
    // hide spinner
    render_spinner('job-list');

    // render # of results 
    job_results_count_el.textContent = state.job_list_count;

    // clear job list
    job_post_list_el.innerHTML = '';

    // remove focus from search form
    search_input_el.blur();

    // render job items
    render_job_list();

    // render pagination
    render_pagination();

  } catch(error) {
    render_error(error.message);
    render_spinner('job-list');
    console.warn(error);
    return true;
  }

  return false;
};

const route_jobs_get_by_id_render = async function (params, query) {
  const { id } = params;

  job_details_content_el.innerHTML = '';

  render_spinner('job-details');

  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error('Resource issue (e.g resource doesn\'t exist or server issue...)');
    }
  
    // UPDATE STATE
    state.active_job_item = data;

    // UPDATE UI
    render_spinner('job-details');
    render_job_details();
    render_job_list();  // Room from improvement, performance wise
  } catch(error) {
    render_spinner('job-details');
    render_error(error.message);
    console.warn(error);
    return true;  
  };

  return false;
}

const query_create = function () {
  const url_location = location.hash.slice(1);
  const query_rx    = /\?[^#]*/;
  const url_query   = url_location.match(query_rx) ? url_location.match(query_rx)[0] : null;

  if (!url_query) return new URLSearchParams(); 

  // -- Encode url_query
  // [link] https://stackoverflow.com/questions/59889140/different-output-from-encodeuricomponent-vs-urlsearchparams
  const url_query_encoded = url_query.slice(1).split('&').map(function (query_item) {
    const result =  query_item.split('=').map(function(s_item) {
      return encodeURIComponent(s_item);
    }).join('=');

    return result;
  }).join('&');  

  return new URLSearchParams(url_query_encoded);
};

const params_create = function (path, path_rx, url_location) {
  
  if (!path) return {};
  if (!url_location) return {};
  if (!path_rx) return {};
  if (!(path_rx instanceof RegExp)) return {};

  const params = {};
  const url_params_values   = path_rx.exec(url_location);
  const path_params_rx  = /\/:(\w+)/g;
  const path_params_names = path.match(path_params_rx);

  let params_keys = [];

  if (path_params_names) {
    params_keys = path_params_names.map(function (param) {
      return param.substring(2);
    });

    for (let i = 0; i < params_keys.length; i++) {
      params[params_keys[i]] = url_params_values[i+1];
    } 
  }

  return params;
};

const route = async function (path, render_fn, query, { title = '', description = '' }) {
  if (!path) return true;

  const url_location = location.hash.slice(1);

  const path_rx = routes[path];
  
  if (!path_rx.test(url_location)) return true;

  const params = params_create(path, path_rx, url_location);

  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  
  const render_error = await render_fn(params, query);
  if (render_error) return true;

  return false;
}

const router = async function (event) {

  const query = query_create();

  const r_jobs_error = await route('/jobs', route_jobs_render, query, {});
  if (r_jobs_error) {
    console.log('/jobs route is not a match...');
  }

  const r_jobs_id_error = await route('/jobs/:id', route_jobs_get_by_id_render, query, {});
  if (r_jobs_id_error) {
    console.log('/jobs/:id route is not a match...');
  }

  const r_err = await route('/jobs/:id/:code', route_jobs_get_by_id_render, query, {});
  if (r_err) {
    console.log('/jobs/:id/:code route is not a match...');
  }

};

// REGISTERING EVENTS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);


export { navigate_to }



// SINCE our app uses HASH, this code is not necessary

// window.addEventListener('popstate', router);

// document && document.addEventListener('click', function (event) {
//   const { target } = event;
//   const anchor_el = target.closest('a');

//   if (!anchor_el) return;

//   event.preventDefault();

//   // Register href attribute to Browser History Api
//   history.pushState(null, null, anchor_el.href);

//   // Call Router to find a math and render the view
//   router();
// });