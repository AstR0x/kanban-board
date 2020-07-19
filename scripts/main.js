import { handleClick, handleSubmit, handleMouseDown } from './eventHandlers.js';
import { loadColumns } from './storage.js';

const app = document.querySelector('.app');

const columns = loadColumns();

if (columns) {
  app.querySelector('.columns').innerHTML = columns;
}

app.addEventListener('click', handleClick);
app.addEventListener('submit', handleSubmit);
app.addEventListener('mousedown', handleMouseDown);
app.addEventListener('dragstart', () => false);
