var e={},t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,n="[^\\s]+",r=/\[([^]*?)\]/gm,o=function(){};function a(e,t){for(var n=[],r=0,o=e.length;r<o;r++)n.push(e[r].substr(0,t));return n}function i(e){return function(t,n,r){var o=r[e].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~o&&(t.month=o)}}function s(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c=["January","February","March","April","May","June","July","August","September","October","November","December"],u=a(c,3),d=a(l,3);e.i18n={dayNamesShort:d,dayNames:l,monthNamesShort:u,monthNames:c,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var h={D:function(e){return e.getDate()},DD:function(e){return s(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return s(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return s(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return s(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return s(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return s(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return s(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return s(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return s(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return s(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return s(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+s(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},m={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+n,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var n=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?n-1:n)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",o],ddd:[n,o],MMM:[n,i("monthNamesShort")],MMMM:[n,i("monthNames")],a:[n,function(e,t,n){var r=t.toLowerCase();r===n.amPm[0]?e.isPm=!1:r===n.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var n,r=(t+"").match(/([+-]|\d\d)/gi);r&&(n=60*r[1]+parseInt(r[2],10),e.timezoneOffset="+"===r[0]?n:-n)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(n,o,a){var i=a||e.i18n;if("number"==typeof n&&(n=new Date(n)),"[object Date]"!==Object.prototype.toString.call(n)||isNaN(n.getTime()))throw new Error("Invalid Date in fecha.format");o=e.masks[o]||o||e.masks.default;var s=[];return(o=(o=o.replace(r,function(e,t){return s.push(t),"@@@"})).replace(t,function(e){return e in h?h[e](n,i):e.slice(1,e.length-1)})).replace(/@@@/g,function(){return s.shift()})},e.parse=function(n,o,a){var i=a||e.i18n;if("string"!=typeof o)throw new Error("Invalid format in fecha.parse");if(o=e.masks[o]||o,n.length>1e3)return null;var s={},l=[],c=[];o=o.replace(r,function(e,t){return c.push(t),"@@@"});var u,d=(u=o,u.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(t,function(e){if(m[e]){var t=m[e];return l.push(t[1]),"("+t[0]+")"}return e});d=d.replace(/@@@/g,function(){return c.shift()});var h=n.match(new RegExp(d,"i"));if(!h)return null;for(var p=1;p<h.length;p++)l[p-1](s,h[p],i);var b,f=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,b=new Date(Date.UTC(s.year||f.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):b=new Date(s.year||f.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),b};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();const p=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}(),b=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot}(),f=e=>{let t;const{views:n}=p.config;return isNaN(e)?n.forEach(r=>{r.title!==e&&r.path!==e||(t=n.indexOf(r))}):t=parseInt(e,10),t},y=e=>{const t="string"==typeof e?e.replace(/\s+/g,"").split(","):e;return t.forEach(e=>{t[t.indexOf(e)]=f(e)}),t},g=e=>{let t={},n=0;return e.exceptions&&e.exceptions.forEach(e=>{const r=function(e){const t={user:document.body.querySelector("home-assistant").hass.user.name,user_agent:navigator.userAgent};let n=0;for(const r in e)if("user"==r&&e[r].includes(","))e[r].split(/[ ,]+/).forEach(e=>{t[r]==e&&n++});else{if(!(t[r]==e[r]||"query_string"==r&&window.location.search.includes(e[r])||"user_agent"==r&&t[r].includes(e[r])||"media_query"==r&&window.matchMedia(e[r]).matches))return 0;n++}return n}(e.conditions);r>n&&(n=r,t=e.config)}),t.hide_tabs&&e.show_tabs&&t.hide_tabs.length&&e.show_tabs.length?delete e.show_tabs:t.show_tabs&&e.hide_tabs&&t.show_tabs.length&&e.hide_tabs.length&&delete e.hide_tabs,{...e,...t}},v=(()=>{const e={},t=Array.from((b.querySelector("paper-tabs")||b).querySelectorAll("paper-tab"));e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",t.forEach(n=>{const r=t.indexOf(n),o=n.cloneNode(!0),a=o.querySelector("ha-icon");a&&a.setAttribute("icon",p.config.views[r].icon),o.addEventListener("click",()=>{b.querySelector("paper-tabs").querySelectorAll("paper-tab")[r].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(o)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const n=(t,n,r)=>{if("options"===t){e[t]=b.querySelector(r).cloneNode(!0),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const n=Array.from(e[t].querySelectorAll("paper-item"));n.forEach(e=>{const t=n.indexOf(e);e.addEventListener("click",()=>{b.querySelector(r).querySelectorAll("paper-item")[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{b.querySelector(r).shadowRoot.querySelector("paper-icon-button").dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))});e[t].setAttribute("icon",n),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};return n("menu","mdi:menu","ha-menu-button"),n("voice","mdi:microphone","ha-start-voice-button"),n("options","mdi:dots-vertical","paper-menu-button"),e.container=document.createElement("cch-header"),e.menu&&e.container.appendChild(e.menu),e.tabContainer&&e.container.appendChild(e.tabContainer),e.voice&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),b.querySelector("ha-app-layout").appendChild(e.container),e})(),S=()=>{let e={footer:!1,background:"var(--primary-color)",elements_color:"var(--text-primary-color)",menu_color:"",voice_color:"",options_color:"",all_tabs_color:"",tabs_color:[],chevrons:!0,indicator_top:!1,hide_tabs:[],show_tabs:[],template_variables:"",exceptions:[],...p.config.custom_header};const t=(e={...e,...g(e)}).template_variables;delete e.template_variables,((e,t)=>{const n=document.body.querySelector("home-assistant").hass.connection,r={user:document.body.querySelector("home-assistant").hass.user.name,browser:navigator.userAgent,hash:location.hash.substr(1)||" ",...t.variables},o=t.template,a=t.entity_ids;n.subscribeMessage(t=>e(t.result),{type:"render_template",template:o,variables:r,entity_ids:a})})(t=>{(e=JSON.parse(t.replace(/"true"/gi,"true").replace(/"false"/gi,"false").replace(/""/,""))).hide_tabs&&(e.hide_tabs=y(e.hide_tabs)),e.show_tabs&&(e.show_tabs=y(e.show_tabs)),e.show_tabs&&e.show_tabs.length&&(e.hide_tabs=(e=>{const t=Array.from(b.querySelectorAll("paper-tab"));if(e&&e.length){const e=[];for(let n=0;n<t.length;n+=1)e.push(n);return e.filter(e=>!userConfig.show_tabs.includes(e))}})(e.show_tabs)),delete e.show_tabs,(e=>{b.querySelector("app-header").style.visibility="hidden";const t=getComputedStyle(b.querySelector("app-header")).getPropertyValue("height");let n=document.createElement("style");n.setAttribute("id","cch_header_style"),n.innerHTML=`\n      cch-header {\n        width:100%;\n        display:flex;\n        justify-content: center;\n        background: ${e.background||"var(--primary-color)"};\n        color: ${e.elements_color||"var(--text-primary-color)"};\n        ${0===v.tabs.length?"margin-top: 48px;":""}\n        ${e.footer?"position: sticky; bottom: 0px;":""}\n      }\n      hui-view, hui-panel-view {\n        margin-top: -${t};\n        padding-top: ${e.footer?"0px;":"53px;"}\n        ${e.footer?"padding-bottom: 48px;":""}\n        ${e.footer?"margin-bottom: -48px;":""}\n      }\n      hui-panel-view {\n        ${e.footer?"":"padding-top: 48px;"}\n      }\n      #view {\n        ${e.footer?"min-height: calc(100vh - 160px) !important;":""}\n      }\n      [buttonElem="menu"] {\n        ${e.menu_color?`color: ${e.menu_color};`:""}\n      }\n      [buttonElem="options"] {\n        ${e.options_color?`color: ${e.options_color};`:""}\n      }\n      [buttonElem="voice"] {\n        ${e.voice_color?`color: ${e.voice_color};`:""}\n      }\n      paper-tab {\n        ${e.all_tabs_color?`color: ${e.all_tabs_color};`:""}\n      }\n    `,e.tabs_color&&Object.keys(e.tabs_color).forEach(t=>{n.innerHTML+=`\n      paper-tab:nth-child(${f(t)+1}) {\n        color: ${e.tabs_color[t]};\n      }\n    `}),e.hide_tabs&&e.hide_tabs.forEach(e=>{n.innerHTML+=`\n      paper-tab:nth-child(${f(e)+1}) {\n        display: none;\n      }\n    `});let r=b.querySelector("#cch_header_style");b.appendChild(n),r&&r.remove(),(n=document.createElement("style")).setAttribute("id","cch_chevron"),n.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',r=v.tabContainer.shadowRoot.querySelector("#cch_chevron"),v.tabContainer.shadowRoot.appendChild(n),r&&r.remove(),e.chevrons||(v.tabContainer.hideScrollButtons=!0),e.indicator_top&&(v.tabContainer.alignBottom=!0),e.footer?v.options.setAttribute("vertical-align","bottom"):v.options.removeAttribute("vertical-align"),e.footer?v.container.removeAttribute("slot"):v.container.setAttribute("slot","header");const o=b.querySelector("ha-menu-button"),a=()=>{o.style.display="none","hidden"===o.style.visibility?(e.footer?v.menu.style.display="none":v.menu.style.display="initial",v.menu.style.visibility="hidden",v.menu.style.marginRight="33px"):(v.menu.style.visibility="initial",v.menu.style.marginRight="",v.menu.style.display="initial")};new MutationObserver(()=>{a()}).observe(o,{attributes:!0,attributeFilter:["style"]}),a()})(e)},{template:JSON.stringify(t).replace(/\\/g,"")+JSON.stringify(e).replace(/\\/g,"")})};S(),new MutationObserver(e=>{e.forEach(({addedNodes:e,target:t})=>{"edit-mode"===t.className&&e.length?(window.scrollTo({top:0,behavior:"smooth"}),b.querySelector("app-header").style.visibility="initial",b.querySelector("cch-header").style.visibility="hidden",b.querySelector("#cch_header_style").remove(),v.menu.style.display="none"):"APP-HEADER"===t.nodeName&&e.length&&(v.menu.style.display="",b.querySelector("cch-header").style.visibility="initial",S())})}).observe(b.querySelector("app-header"),{childList:!0});
