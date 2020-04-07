/**
 * Combine multiple class names into single string
 *
 * @param {string} cns Class names
 * @return {string} Single class string
 */
export const cn = (...cns) => cns.reduce((acc, curr) => `${acc} ${curr}`);

/**
 * Sets cookie with options
 *
 * @param {string} name Cookie name
 * @param {string} value Cookie value
 * @param {object} options Cookie options
 * @return {any} Cookie value
 */
export const setCookie = (name, value, options = {}) => {
  let data = [ encodeURIComponent(name) + '=' + encodeURIComponent(value) ];

  for (let opt in options) {
    data.push(opt + '=' + options[opt]);
  }

  document.cookie = data.join('; ');
};

/**
 * Gets cookie value
 *
 * @param {string} name Cookie name
 * @return {string} Cookie value
 */
export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * Checks if a class exists
 *
 * @param {HTMLElement} el HTML element for checking
 * @param {string} clazz Class name
 * @return {boolean} Result
 */
export function hasClass(el, clazz) {
  return new RegExp(`(^| )(${clazz})($| )`).test(el.className);
}

/**
 * Adds new class to HTML element
 *
 * @param {HTMLElement} el HTML element for adding
 * @param {string} clazz New class name
 * @return {string | boolean} Class names includes new class or false if class exists
 */
export function addClass(el, clazz) {
  return (!hasClass(el, clazz)) ? el.className += ` ${clazz}` : false;
}

/**
 * Removes class from HTML element
 *
 * @param {HTMLElement} el HTML element for removing
 * @param {string} clazz Class name
 * @return {string | boolean} Class names w/o passed class or false if class not exists
 */
export function removeClass(el, clazz) {
  return (hasClass(el, clazz)) ? el.className = el.className.split(' ').filter((c) => c !== clazz).join(' ') : false;
}

/**
 * Replace class
 *
 * @param {HTMLElement} el HTML element for replacing
 * @param {string} oldClazz Old class
 * @param {string} claznewClazzz New class
 * @return {string | boolean} New class string or false if class doesn't exists
 */
export function replaceClass(el, oldClazz, newClazz) {
  removeClass(el, oldClazz);
  return addClass(el, newClazz);
}