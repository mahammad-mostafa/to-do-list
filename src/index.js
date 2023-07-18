import './icons.css';
import './style.css';
import Tasks from './list.js';

let dragged = null;
let position = null;
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

const dragEvent = (event) => {
  dragged = event.target;
  position = event.clientY;
  event.dataTransfer.effectAllowed = 'move';
  setTimeout(() => dragged.setAttribute('class', 'dragged'));
};

const dropEvent = (event) => {
  event.preventDefault();
  dragged.removeAttribute('class');
  dragged.removeAttribute('draggable');
  const items = document.querySelectorAll('.section-list li');
  tasks.insertItem(items, dragged.id);
  displayList();
};

const mouseEvent = (event) => {
  if (event.target.className === 'icon-drag') {
    event.target.parentNode.draggable = true;
    event.target.parentNode.addEventListener('dragstart', dragEvent);
    event.target.parentNode.addEventListener('dragend', dropEvent);
  }
};

const moveEvent = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  if (event.target.tagName === 'LI' && event.target !== dragged) {
    list.removeChild(dragged);
    if (position < event.clientY) {
      event.target.insertAdjacentHTML('afterEnd', dragged.outerHTML);
      dragged = event.target.nextSibling;
    } else {
      event.target.insertAdjacentHTML('beforeBegin', dragged.outerHTML);
      dragged = event.target.previousSibling;
    }
  }
};

form.addEventListener('submit', formEvent);
list.addEventListener('click', listEvent);
button.addEventListener('click', buttonEvent);
refresh.addEventListener('click', displayList);
list.addEventListener('mousedown', mouseEvent);
list.addEventListener('dragover', moveEvent);
displayList();