import './icons.css';
import './style.css';
import Tasks from './list.js';

const tasks = new Tasks();
const refresh = document.querySelector('.icon-refresh');
const form = document.querySelector('.section-form');
const list = document.querySelector('.section-list');
const button = document.querySelector('.section-button');

const displayList = () => {
  list.innerHTML = '';
  list.appendChild(tasks.displayList());
};

const formEvent = (event) => {
  event.preventDefault();
  if (form.description.value) {
    tasks.createItem(form.description.value.trim());
    form.reset();
    displayList();
  }
};

const editEvent = (event) => {
  const index = event.target.parentNode.id;
  if (event.target.value.trim()) {
    tasks.updateDescription(index, event.target.value.trim());
  } else {
    tasks.removeItem(index);
  }
  event.target.removeEventListener('change', editEvent);
  displayList();
};

const listEvent = (event) => {
  const index = event.target.parentNode.id;
  switch (event.target.type) {
    case 'checkbox':
      tasks.changeStatus(index);
      displayList();
      break;
    case 'text':
      event.target.removeAttribute('readonly');
      event.target.addEventListener('change', editEvent);
      event.target.nextSibling.className = 'icon-remove';
      event.target.parentNode.classList.add('selected');
      event.target.addEventListener('blur', (event) => {
        setTimeout(() => {
          if (event.target !== null) {
            event.target.nextSibling.className = 'icon-drag';
            event.target.parentNode.classList.remove('selected');
          }
        }, 100);
      });
      break;
    case 'button':
      if (event.target.className === 'icon-remove') {
        tasks.removeItem(index);
        displayList();
      }
      break;
    default:
  }
};

const buttonEvent = () => {
  tasks.clearCompleted();
  displayList();
};

form.addEventListener('submit', formEvent);
list.addEventListener('click', listEvent);
button.addEventListener('click', buttonEvent);
refresh.addEventListener('click', displayList);
displayList();