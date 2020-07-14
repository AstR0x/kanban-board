import { createCard, createCards, createColumn } from './elementCreators.js';

const addCard = (parentNode, content) => parentNode.appendChild(createCard(content));
const addCards = (parentNode, beforeNode) => parentNode.insertBefore(createCards(), beforeNode);

export const handleSubmit = event => {
  event.preventDefault();

  const form = event.target;
  const column = form.closest('.column');
  const addNode = column.querySelector('.column__add');
  const openFormNode = column.querySelector('.column__open-form');

  if (form.classList.contains('column__add-card-form')) {
    const cards = column.querySelector('.column__cards') || addCards(column, form);
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
  if (target.closest('.column__open-form') || target.closest('.column__close-form-button')) {
    const form = target.closest('.column__form');
    const openFormNode = form.querySelector('.column__open-form');
    const addCardNode = form.querySelector('.column__add');

    openFormNode.classList.toggle('column__open-form_hidden');
    addCardNode.classList.toggle('column__add_hidden');
  }
};
