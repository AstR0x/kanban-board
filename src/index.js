import { handleClick, handleSubmit, handleMouseDown } from './scripts/eventHandlers.js';
// import { loadColumns } from './scripts/storage.js';

import './styles/index.css';

const app = document.querySelector('.app');

// Раскомментировать, когда добавлю удаление карточек и колонок
//
// const columns = loadColumns();
//
// if (columns) {
//   app.querySelector('.columns').innerHTML = columns;
// }

app.addEventListener('click', handleClick);
app.addEventListener('submit', handleSubmit);
app.addEventListener('mousedown', handleMouseDown);
app.addEventListener('dragstart', () => false);
