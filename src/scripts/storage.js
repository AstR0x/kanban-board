export const loadColumns = () => JSON.parse(localStorage.getItem('columns'));

export const saveColumns = () => {
  const columns = document.querySelector('.columns');
  localStorage.setItem('columns', JSON.stringify(columns.innerHTML));
};
