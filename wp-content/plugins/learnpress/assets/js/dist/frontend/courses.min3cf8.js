!function(){lpGlobalSettings.courses_url;const e=document.location.href;let t=JSON.parse(window.localStorage.getItem("lp_filter_courses"))||{};lpGlobalSettings.is_course_archive&&(window.location.search.length||-1!==e.search("page")||(t={}));const r=(e,t)=>{const r=new URL(e);return Object.keys(t).forEach((e=>{r.searchParams.set(e,t[e])})),r};let o,s,n=!1,c=1;window.lpArchiveRequestCourse=(e,t)=>{const u=lpGlobalSettings.lp_rest_url;if(!u)return;const i=document.querySelector(".lp-archive-courses"),p=i&&i.querySelector("div.lp-archive-courses .lp-content-area"),d=p&&p.querySelector("ul.learn-press-courses");if(!d)return;if(n)return;n=!0,s?d.append(o):(o=document.querySelector(".lp-archive-course-skeleton"),s=o.outerHTML);const h=r(u+"lp/v1/courses/archive-course",{...lpArchiveSkeleton,...e});wp.apiFetch({path:"lp/v1/courses/archive-course"+h.search,method:"GET"}).then((e=>{void 0!==e.data.content&&d&&(d.innerHTML=e.data.content||"");const r=e.data.pagination;a();const o=document.querySelector(".learn-press-pagination");if(o&&o.remove(),void 0!==r){const e=(new DOMParser).parseFromString(r,"text/html").querySelector(".learn-press-pagination");e&&(d.after(e),l())}wp.hooks.doAction("lp-js-get-courses",e),"function"==typeof t&&t(e)})).catch((e=>{d.innerHTML+=`<div class="lp-ajax-message error" style="display:block">${e.message||"Error: Query lp/v1/courses/archive-course"}</div>`})).finally((()=>{if(n=!1,o&&o.remove(),jQuery("form.search-courses button").removeClass("loading"),c)c=0;else{const e={behavior:"smooth"};i.scrollIntoView(e)}window.localStorage.setItem("lp_filter_courses",JSON.stringify(e));const t=r(document.location,e);window.history.pushState("","",t)}))};const a=()=>{const e=document.querySelectorAll("form.search-courses");let t=JSON.parse(window.localStorage.getItem("lp_filter_courses"))||{};e.forEach((e=>{const r=e.querySelector('input[name="c_search"]'),o=e.querySelector('[type="submit"]');let s;r.addEventListener("keyup",(e=>{e.preventDefault();const r=e.target.value.trim();(!r||r&&r.length>2)&&(void 0!==s&&clearTimeout(s),s=setTimeout((function(){o.classList.add("loading"),t.c_search=r,t.paged=1,lpArchiveRequestCourse({...t})}),800))})),e.addEventListener("submit",(t=>{t.preventDefault();const r=e.querySelector('input[name="c_search"]');r&&r.dispatchEvent(new Event("keyup"))}))}))},l=()=>{const e=document.querySelectorAll(".lp-archive-courses .learn-press-pagination .page-numbers");e.length>0&&e.forEach((t=>t.addEventListener("click",(r=>{r.preventDefault(),r.stopPropagation();let o=JSON.parse(window.localStorage.getItem("lp_filter_courses"))||{};if(r.currentTarget.getAttribute("href")){const s=[...e].filter((e=>e.classList.contains("current"))),n=r.currentTarget.textContent||t.classList.contains("next")&&parseInt(s[0].textContent)+1||t.classList.contains("prev")&&parseInt(s[0].textContent)-1;o.paged=n,lpArchiveRequestCourse({...o})}}))))};document.addEventListener("DOMContentLoaded",(function(e){document.querySelectorAll(".lp-archive-course-skeleton").length&&lpArchiveRequestCourse(t),(()=>{const e=document.querySelectorAll('.lp-archive-courses input[name="lp-switch-layout-btn"]');e.length>0&&e.forEach((e=>e.addEventListener("change",(e=>{e.preventDefault();const t=e.target.value;if(t){const e=document.querySelector(".lp-archive-courses .learn-press-courses[data-layout]");e&&(e.dataset.layout=t),LP.Cookies.set("courses-layout",t)}}))))})(),(()=>{const e=LP.Cookies.get("courses-layout"),t=document.querySelectorAll('.lp-courses-bar .switch-layout [name="lp-switch-layout-btn"]');t.length>0&&[...t].map((t=>t.value===e&&(t.checked=!0)))})()}))}();