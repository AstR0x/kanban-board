const createElement = (tag, attributes, ...children) => {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach(key => element[key] = attributes[key]);

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

export const createCards = () => {
  const cards = createElement('div', { className: 'column__cards' });
  const scrollBarContainer = createElement('div', { className: 'column__scrollbar-container' }, cards);

  return scrollBarContainer;
};

export const createColumn = name => {
  const columnName = createElement('h2', { className: 'column__name' }, name);
  const plusImage = createElement('img', { src: 'assets/icons/plus.svg', alt: 'открыть форму' });
  const openFormButtonTitle = createElement('span', { className: 'column__button-title' }, 'Добавить ещё одну карточку');
  const openFormButton = createElement('button', { className: 'column__open-form', type: 'button' }, plusImage, openFormButtonTitle);
  const textarea = createElement('textarea', { className: 'column__textarea', placeholder: 'Введите название карточки', autofocus: true, required: true });
  const addCardButton = createElement('button', { className: 'column__add-card-button', type: 'submit' }, 'Добавить карточку');
  const closeImage = createElement('img', { src: 'assets/icons/close.svg', alt: 'закрыть форму' });
  const closeFormButton = createElement('button', { className: 'column__close-form-button', type: 'click' }, closeImage);
  const buttons = createElement('div', { className: 'column__buttons' }, addCardButton, closeFormButton);
  const addNode = createElement('div', { className: 'column__add column__add_hidden' }, textarea, buttons);
  const form = createElement('form', { className: 'column__form column__add-card-form' }, openFormButton, addNode);
  const column = createElement('div', { className: 'column' }, columnName, form);

  return column;
};
