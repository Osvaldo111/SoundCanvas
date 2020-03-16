/**
 * This function is designed to make a node
 * element draggable between an element boundary.
 * @param {Object} event
 * @param {Node} element
 * @param {Node} elmtBound
 */
export const dragObjectMobile = (event, element, elmtBound) => {
  //   console.log(event.type);
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // get the mouse cursor position at startup:
  pos3 = event.touches[0].clientX;
  pos4 = event.touches[0].clientY;
  console.log("The Client X:", pos3);
  console.log("The Client Y:", pos4);

  // call a function whenever the cursor moves:
  element.ontouchmove = elementDrag;

  function elementDrag(event) {
    // console.log(event.type);
    event = event || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - event.touches[0].clientX;
    pos2 = pos4 - event.touches[0].clientY;
    pos3 = event.touches[0].clientX;
    pos4 = event.touches[0].clientY;

    // set the element's new position:
    element.style.marginLeft = 0;
    element.style.marginRight = 0;
    // element.style.right = "auto";
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  //   function closeDragElement(event) {
  //     console.log(event.type);
  //     element.ontouchend = null;
  //     elmtBound.ontouchmove = null;
  //   }
};
