/**
 * @param {HTMLElement} element
 */
export default function(element) {
  if (element && element instanceof HTMLElement) {
    element.scrollTop = element.scrollHeight;
    console.log(element.scrollTop, element.scrollHeight);
    return;
  }
  throw new Error("param must be a HTMLElement");
}
