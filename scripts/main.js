import { handleClick, handleSubmit, handleMouseDown } from './eventHandlers.js';

const app = document.querySelector('.app');

app.addEventListener('click', handleClick);
app.addEventListener('submit', handleSubmit);
app.addEventListener('mousedown', handleMouseDown);
app.addEventListener('dragstart', () => false);


