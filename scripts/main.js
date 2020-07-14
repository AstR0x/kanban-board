import { handleClick, handleSubmit } from './eventHandlers.js';

const app = document.querySelector('.app');

app.addEventListener('click', handleClick);
app.addEventListener('submit', handleSubmit);
