import plus from '../assets/icons/plus.svg';
import close from '../assets/icons/close.svg';

const createElement = (tag, attributes, ...children) => {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach(key => element[key] = attributes[key]);

  if (attributes.style) {
    Object.keys(attributes.style).forEach(key => element.style[key] = attributes.style[key]);
  }

  if (children.length) {
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }

      element.appendChild(child);
    });
  }

  return element;
};

export const createCard = content => {
  const cardContent = createElement('p', {}, content);
  return createElement('div', { className: 'column__card' }, cardContent);
};

export const createShadowCard = (width, height) => {
  return createElement('div', { className: 'column__shadow-card', style: { width: `${width}px`, height: `${height}px` } });
};

export const createCards = () => {
  const cards = createElement('div', { className: 'column__cards' });
  const cardsContainer = createElement('div', { className: 'column__cards-container' }, cards);

  return cardsContainer;
};

export const createColumn = name => {
  const columnName = createElement('h2', { className: 'column__name' }, name);
  const plusImage = createElement('img', { src: plus, alt: 'открыть форму' });
  const openFormButtonTitle = createElement('span', { className: 'column__button-title' }, 'Добавить ещё одну карточку');
  const openFormButton = createElement('button', { className: 'column__open-form', type: 'button' }, plusImage, openFormButtonTitle);
  const textarea = createElement('textarea', { className: 'column__textarea', placeholder: 'Введите название карточки', autofocus: true, required: true });
  const addCardButton = createElement('button', { className: 'column__add-card-button', type: 'submit' }, 'Добавить карточку');
  const closeImage = createElement('img', { src: close, alt: 'закрыть форму' });
  const closeFormButton = createElement('button', { className: 'column__close-form-button', type: 'click' }, closeImage);
  const buttons = createElement('div', { className: 'column__buttons' }, addCardButton, closeFormButton);
  const addNode = createElement('div', { className: 'column__add column__add_hidden' }, textarea, buttons);
  const form = createElement('form', { className: 'column__form column__add-card-form' }, openFormButton, addNode);
  const column = createElement('div', { className: 'column' }, columnName, form);

  return column;
};
