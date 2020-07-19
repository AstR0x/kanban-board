import { LEFT_MOUSE_BUTTON_CODE } from './constants.js'
import { saveColumns } from './storage.js';

import {
  createCard,
  createCards,
  createColumn,
  createShadowCard,
} from './elementCreators.js';

import {
  moveElement,
  insertAfter,
  getElementBelow,
  setMovingCardStyles,
  resetMovingCardStyles,
} from './utils.js';

const shouldAddShadowCard = (cardBelowCard, cardsBelowCard) => Boolean(cardBelowCard || !cardsBelowCard.children.length);
const addCard = (parentNode, content) => parentNode.appendChild(createCard(content));

export const addCardsContainer = parentNode => {
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
    const cardsContainer = column.querySelector('.column__cards-container') || addCardsContainer(column);
    const cards = cardsContainer.querySelector('.column__cards');
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
  saveColumns();
};

export const handleClick = event => {
  const { target } = event;
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
  const { target, button, pageX, pageY } = event;

  if (button === LEFT_MOUSE_BUTTON_CODE) {
    const card = target.closest('.column__card');

    if (card) {
      const { top, left, height, width } = card.getBoundingClientRect();
      const shiftX = pageX - left + pageXOffset;
      const shiftY = pageY - top + pageYOffset;
      const columns = card.closest('.columns');

      setMovingCardStyles(card, width, height);

      const cards = card.parentNode;
      const nextCard = card.nextSibling;
      const shadowCard = createShadowCard(width, height);

      document.body.appendChild(card);
      moveElement(event, card, shiftX, shiftY);

      nextCard
        ? cards.insertBefore(shadowCard, nextCard)
        : cards.appendChild(shadowCard);

      document.onmousemove = event => {
        moveElement(event, card, shiftX, shiftY);

        const elementBelowCard = getElementBelow(card, event.clientX, event.clientY);

        if (elementBelowCard) {
          const columnBelowCard = elementBelowCard.closest('.column');
          const cardBelowCard = elementBelowCard.closest('.column__card');

          if (columnBelowCard && !columnBelowCard.classList.contains('column-form')) {
            if (!columnBelowCard.querySelector('.column__cards-container')) {
              addCardsContainer(columnBelowCard);
            }

            const cardsBelowCard = columnBelowCard.querySelector('.column__cards');
            const shadowCard = columns.querySelector('.column__shadow-card');

            if (shouldAddShadowCard(cardBelowCard, cardsBelowCard)) {
              if (shadowCard) {
                const shadowCardParent = shadowCard.parentNode;

                if (shadowCardParent.children.length === 1) {
                  shadowCardParent.parentNode.remove();
                }

                shadowCard.remove()
              }

              const newShadowCard = createShadowCard(width, height);

              cardBelowCard
                ? insertAfter(cardsBelowCard, newShadowCard, cardBelowCard)
                : cardsBelowCard.appendChild(newShadowCard);
            }
          }
        }
      };

      document.onmouseup = () => {
        const shadowCard = columns.querySelector('.column__shadow-card');
        const shadowCardParent = shadowCard.parentNode;

        if (shadowCard) {
          shadowCardParent.replaceChild(card, shadowCard);
          resetMovingCardStyles(card);
        }

        document.onmousemove = null;
        document.onmouseup = null;
        saveColumns();
      };
    }
  }
};
