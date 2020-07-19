export const insertAfter = (parent, element, reference) => {
  parent.insertBefore(element, reference.nextSibling);
};

export const setMovingCardStyles = (card, width, height) => {
  card.style.position = 'absolute';
  card.style.width = `${width}px`;
  card.style.height = `${height}px`;
  card.style.transform = 'rotate(5deg)';
};

export const resetMovingCardStyles = card => {
  card.style.position = '';
  card.style.width = '';
  card.style.height = '';
  card.style.top = '';
  card.style.left = '';
  card.style.transform = '';
};

export const getElementBelow = (element, clientX, clientY) => {
  element.hidden = true;
  const elementBelow = document.elementFromPoint(clientX, clientY);
  element.hidden = false;
  return elementBelow
};

export const moveElement = (event, element, shiftX, shiftY) => {
  element.style.left = event.pageX - shiftX + 'px';
  element.style.top = event.pageY - shiftY + 'px';
};
