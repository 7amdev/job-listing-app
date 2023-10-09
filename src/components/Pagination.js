import { 
  pagination_prev_btn_el, 
  pagination_next_btn_el, 
  pagination_el 
} from "../common.js";

const click_handler = function (event) {
  console.log(event.target);
};

pagination_el.addEventListener('click', click_handler);

