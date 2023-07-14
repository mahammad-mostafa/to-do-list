import Tasks from './list.js';
import './icons.css';
import './style.css';

const tasks = new Tasks();
const form = document.querySelector('.section-form');
const list = document.querySelector('.section-list');

const fragment = new DocumentFragment();

const displayList = () => {
  list.innerHTML = '';
  tasks.items.forEach((task, index) => {
    task.index = index;
    const item = document.createElement('li');
    let html = `<input type="checkbox" value="${task.index}"/>`;
    html += `<input type="text" value="${task.description}" readonly/>`;
    html += '<button type="button" class="icon-drag"></button>';
    item.innerHTML = html;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
};

const formEvent = (event) => {
  event.preventDefault();
  if (form.description.value) {
    tasks.add(form.description.value.trim());
    form.reset();
    displayList();
  }
};

form.addEventListener('submit', formEvent);
displayList();