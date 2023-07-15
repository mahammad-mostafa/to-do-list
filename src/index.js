import './icons.css';
import './style.css';
import Tasks from './list.js';

const tasks = new Tasks();
const form = document.querySelector('.section-form');
const list = document.querySelector('.section-list');

const displayList = () => {
  const fragment = new DocumentFragment();
  list.innerHTML = '';
  tasks.items.forEach((task) => {
    const item = document.createElement('li');
    let html = '';
    if (task.completed) {
      html += '<input type="checkbox" checked/>';
      html += `<input type="text" class="completed" value="${task.description}" readonly/>`;
    } else {
      html += '<input type="checkbox"/>';
      html += `<input type="text" value="${task.description}" readonly/>`;
    }
    html += '<button type="button" class="icon-drag"></button>';
    item.id = task.index;
    item.innerHTML = html;
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
};

const editEvent = (event) => {
  const index = parseInt(event.target.parentNode.id, 10);
  if (event.target.value.trim()) {
    tasks.update(index, event.target.value.trim());
  } else {
    tasks.remove(index);
  }
  event.target.removeEventListener('change', editEvent);
  displayList();
};

const listEvent = (event) => {
  const index = parseInt(event.target.parentNode.id, 10);
  switch (event.target.type) {
    case 'checkbox':
      tasks.complete(index);
      displayList();
      break;
    case 'text':
      event.target.removeAttribute('readonly');
      event.target.addEventListener('change', editEvent);
      event.target.nextSibling.className = 'icon-remove';
      event.target.addEventListener('blur', (event) => {
        setTimeout(() => {
          if (event.target !== null) {
            event.target.nextSibling.className = 'icon-drag';
          }
        }, 100);
      });
      break;
    case 'button':
      if (event.target.className === 'icon-remove') {
        tasks.remove(index);
        displayList();
      }
      break;
    default:
  }
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
list.addEventListener('click', listEvent);
displayList();