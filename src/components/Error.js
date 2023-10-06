import { error_el, error_description } from '../common.js';
import { MSG_DISPLAY_TIME } from '../common.js';

const render_error = function (message) {
  // error_title.textContent = title;
  error_description.textContent = message;

  error_el.classList.add('error--visible');
  setTimeout(function () {
    error_el.classList.remove('error--visible');
  }, MSG_DISPLAY_TIME);
};

export default render_error;