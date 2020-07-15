import { LEFT_MOUSE_BUTTON_CODE } from './constants.js'

import {
  createCard,
  createCards,
  createColumn,
} from './elementCreators.js';

import {
  moveElement,
  insertAfter,
  getElementBelow,
  setMovingCardStyles,
  resetMovingCardStyles,
} from './utils.js';

const addCard = (parentNode, content) => parentNode.appendChild(createCard(content));

export const addCards = parentNode => {
  const form = parentNode.querySelector('.column__form');
  return parentNode.insertBefore(createCards(), form);
};

export const handleSubmit = event => {
  event.preventDefault();

  const form = event.target;
  const column = form.closest('.column');
  const addNode = column.querySelector('.column__add');
  const openFormNode = column.querySelector('.column__open-form');

  if (form.classList.contains('column__add-card-form')) {
    const cards = column.querySelector('.column__cards') || addCards(column);
    const textarea = addNode.querySelector('.column__textarea');

    addCard(cards, textarea.value);
    textarea.value = '';
  } else if (form.classList.contains('column__add-column-form')) {
    const columns = document.querySelector('.columns');
    const input = form.querySelector('.column__input');
    const columnName = input.value;

    input.value = '';
    columns.insertBefore(createColumn(columnName), form.closest('.column'));
  }

  addNode.classList.toggle('column__add_hidden');
  openFormNode.classList.toggle('column__open-form_hidden');
};

export const handleClick = ({ target }) => {
  const openForm = target.closest('.column__open-form');
  const closeFormButton = target.closest('.column__close-form-button');

  if (openForm || closeFormButton) {
    const form = target.closest('.column__form');
    const openFormNode = form.querySelector('.column__open-form');
    const addCardNode = form.querySelector('.column__add');

    openFormNode.classList.toggle('column__open-form_hidden');
    addCardNode.classList.toggle('column__add_hidden');
  }
};

export const handleMouseDown = event => {
  if (event.button === LEFT_MOUSE_BUTTON_CODE) {

    const card = event.target.closest('.column__card');

    if (card) {
      const { top, left, height, width } = card.getBoundingClientRect();
      const shiftX = event.pageX - left + pageXOffset;
      const shiftY = event.pageY - top + pageYOffset;

      setMovingCardStyles(card, width, height);

      document.onmousemove = event => moveElement(event, card, shiftX, shiftY);

      document.onmouseup = event => {
        const elementBelowCard = getElementBelow(card, event.clientX, event.clientY);
        const column = elementBelowCard.closest('.column');

        if (column && !column.classList.contains('only-create-column-form')) {
          const cardParent = card.parentNode;

          if (cardParent.children.length === 1) {
            cardParent.parentNode.remove();
          }

          const cardsContainer = column.querySelector('.column__cards-container') || addCards(column);
          const cards = cardsContainer.querySelector('.column__cards');
          const belowCard = elementBelowCard.closest('.column__card');

          belowCard
            ? insertAfter(cards, card, belowCard)
            : cards.appendChild(card);
        }

        document.onmousemove = null;
        document.onmouseup = null;

        resetMovingCardStyles(card);
      };
    }
  }
};
