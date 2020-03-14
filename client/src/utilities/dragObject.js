/**
 * This function is designed to make a node
 * element draggable between an element boundary.
 * @param {Object} event
 * @param {Node} element
 * @param {Node} elmtBound
 */
export const dragObject = (event, element, elmtBound) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // get the mouse cursor position at startup:
  pos3 = event.clientX;
  pos4 = event.clientY;
  // console.log("The Client X:", pos3);
  // console.log("The Client Y:", pos4);

  element.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  elmtBound.onmousemove = elementDrag;

  function elementDrag(event) {
    event = event || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    // set the element's new position:
    element.style.marginLeft = 0;
    element.style.marginRight = 0;
    // element.style.right = "auto";
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement(event) {
    element.onmouseup = null;
    elmtBound.onmousemove = null;
  }
};
