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


const navigate_to = function (path) {
  window.location.href = `#${path}`;
};

const routes = [
  { 
    path: "/",
    render: function () {
      // UPDATE STATE
      // CALL RENDER FUNCTIONS
    },
    title: "Remote work",
    description: "Some meta description data"
  },
  {
    path: "/jobs",
    render: async function (params, query) {
      const search_input_value = query.get('q');

      // Set input search element value
      search_input_el.value = search_input_value;

      // show loading spinner...
      render_spinner('job-list');

      try {

        // fetch call
        const response = await fetch(`${API_BASE_URL}/jobs?${query.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Resource issue (e.g resource doesn\' exist or server issue...)');
        }

        // -- UPDATE STATE
        state.job_list        = data;
        state.job_list_count  = +response.headers.get('x-total-count');
        state.q               = query.get('q');
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
        console.warn(error);
        render_error(error.message);
        render_spinner('job-list');
      }
    },
    title: "Jobs listing",
    description: "Some meta description data"
  },
  { 
    path: "/jobs/:id", 
    render: async function (params, query) {
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
      };
    },
    title: "Job details",
    description: "Some meta description data"
  },
  {
    path: "/jobs/:id/info/:code",
    render: function () {
      // UPDATE STATE 
      // RENDER
      render_job_list();
    },
    title: "Jobs listing",
    description: "Some meta description data"
  },
];

const convert_route_path_to_regex = function (path) {

  // In route path, replace '/' (forward slash) to its 
  // regex escaped equivalent '\/'
  const replace_forward_slash_rx = path.replace(/\//g, "\\\/");

  // In route path, replace any [/:<any_character>] to its regex capturing group,
  // which is: /(\w+) = [0-9A-Z_a-z]+
  const result_rx = replace_forward_slash_rx.replace(/:\w+/g, "([0-9A-Z_a-z]+)");

  const query_rx = '(?<query>\\?[^#]*)?';

  return new RegExp("^" + result_rx + query_rx + "$", "i");
};

const router = function (event) {
  if (!location.hash) return;
  
  const url_location = location.hash.slice(1);

  const potential_matches = routes.map(function (route) {
    const path_rx = convert_route_path_to_regex(route.path);
    
    return (
      {
        ...route, 
        is_match: path_rx.test(url_location),
        path_rx: path_rx
      }
    );
  });  

  const match = potential_matches.find(function (match) {
    return match.is_match;
  });

  if (!match) return; // @todo: route 404

  // Set Tab Title and document meta description
  document.title = match.title;
  document.querySelector('meta[name="description"]').setAttribute('content', match.description);

  const url_parsed = match.path_rx.exec(url_location);
  const params_rx = /\/:(\w+)/g;
  const has_params = match.path.match(params_rx);
  const params = {};
  let params_names = [];
  if (has_params) {
    params_names = match.path.match(params_rx).map(function (param) {
      return param.substring(2);
    });

    for (let i = 0; i < params_names.length; i++) {
      params[params_names[i]] = url_parsed[i+1];
    } 
  }
    
  const query = url_parsed[url_parsed.length-1];

  // [link] https://stackoverflow.com/questions/59889140/different-output-from-encodeuricomponent-vs-urlsearchparams
  const query_encoded = query?.slice(1).split('&').map(function (query_item) {
    const result =  query_item.split('=').map(function(s_item) {
      return encodeURIComponent(s_item);
    }).join('=');

    return result;
  }).join('&');

  match.render(params, new URLSearchParams(query_encoded));
};

// REGISTERING EVENTS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);


export {
  navigate_to
}



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