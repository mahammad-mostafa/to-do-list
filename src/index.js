import './icons.css';
import './style.css';
import Tasks from './list.js';

const tasks = new Tasks();
const form = document.querySelector('.section-form');
const list = document.querySelector('.section-list');
const button = document.querySelector('.section-button');

const displayList = () => {
  list.innerHTML = '';
  list.appendChild(tasks.display());
};

const formEvent = (event) => {
  event.preventDefault();
  if (form.description.value) {
    tasks.add(form.description.value.trim());
    form.reset();
    displayList();
  }
};

const editEvent = (event) => {
  const index = event.target.parentNode.id;
  if (event.target.value.trim()) {
    tasks.update(index, event.target.value.trim());
  } else {
    tasks.remove(index);
  }
  event.target.removeEventListener('change', editEvent);
  displayList();
};

const listEvent = (event) => {
  const index = event.target.parentNode.id;
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

const buttonEvent = () => {
  tasks.clear();
  displayList();
};

form.addEventListener('submit', formEvent);
list.addEventListener('click', listEvent);
button.addEventListener('click', buttonEvent);
displayList();