export const dragObject = (event, element, elmtBound) => {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // get the mouse cursor position at startup:
  pos3 = event.clientX;
  pos4 = event.clientY;

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
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement(event) {
    element.onmouseup = null;
    elmtBound.onmousemove = null;
  }
};
