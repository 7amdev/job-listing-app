import { 
  bookmark_dropdown_el, 
  bookmark_dropdown_btn_el, 
  bookmark_dropdown_list 
} from "../common.js";
import render_job_list from "./JobList.js";

const dropdown_btn_mouseenter_handler = function (event) {
  bookmark_dropdown_list.classList.add('bookmark-dropdown__list--active');

  render_job_list('bookmark')
};

const dropdown_list_mouseleave_handler = function (event) {
  bookmark_dropdown_list.classList.remove('bookmark-dropdown__list--active');
};

bookmark_dropdown_btn_el.addEventListener('mouseenter', dropdown_btn_mouseenter_handler)
bookmark_dropdown_list.addEventListener('mouseleave', dropdown_list_mouseleave_handler)