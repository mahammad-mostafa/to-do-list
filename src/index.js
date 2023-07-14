import './style.css';

const tasks = [
  {
    index: 1,
    completed: false,
    description: 'Buy gorcery',
  },
  {
    index: 2,
    completed: false,
    description: 'Clean house',
  },
  {
    index: 3,
    completed: false,
    description: 'Repair car',
  },
];

const list = document.querySelector('.section-list');

const fragment = new DocumentFragment();
tasks.forEach((task) => {
  const item = document.createElement('li');
  let html = '<input type="checkbox" value="1"/>';
  html += `<input type="text" value="${task.description}" readonly/>`;
  html += '<button type="button"></button>';
  item.innerHTML = html;
  fragment.appendChild(item);
});
list.appendChild(fragment);