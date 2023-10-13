import render_job_details from "./JobDetails.js";
import render_job_list from "./JobList.js";

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
    render: function () {
      // UPDATE STATE 
      // RENDER
      render_job_list();
    },
    title: "Jobs listing",
    description: "Some meta description data"
  },
  { 
    path: "/jobs/:id", 
    render: function () {
      // UPDATE STATE
      // RENDER
      render_job_details();
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
  
  const current_location = location.hash.slice(1);

  const potential_matches = routes.map(function (route) {
    const path_rx = convert_route_path_to_regex(route.path);
    
    return (
      {
        ...route, 
        is_match: path_rx.test(current_location),
        path_rx: path_rx
      }
    );
  });  

  const match = potential_matches.find(function (match) {
    return match.is_match;
  });

  if (!match) return;

  console.log(match);

  // Set Tab Title and document meta description
  document.title = match.title;
  document.querySelector('meta[name="description"]').setAttribute('content', match.description);

  // QUERY & PARAMS 
  const params_rx = /\/:(\w+)/g;
  const params_names = match.path.match(params_rx).map(function (param) {
    return param.substring(2);
  });
 
  const params_values = match.path_rx.exec(current_location);
  const route_params = {};
  for (let i = 0; i < params_names.length; i++) {
    route_params[params_names[i]] = params_values[i+1];
  } 
  const route_query = params_values[params_values.length-1];

  console.log(route_params);
  console.log(route_query);
  
  // MATCH render();
};

// REGISTERING EVENTS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);




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