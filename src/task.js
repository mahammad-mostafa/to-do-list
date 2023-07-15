import reverse from './status.js';

export default class Task {
  constructor(index, description) {
    this.index = parseInt(index, 10);
    this.description = description;
    this.completed = false;
  }

  static displayItem = (task) => {
    const item = document.createElement('li');
    let html = '';
    if (task.completed) {
      html += '<input type="checkbox" checked/>';
      html += `<input type="text" class="completed" name="completed" value="${task.description}" readonly/>`;
    } else {
      html += '<input type="checkbox" name="completed"/>';
      html += `<input type="text" name="description" value="${task.description}" readonly/>`;
    }
    html += '<button type="button" class="icon-drag"></button>';
    item.id = task.index;
    item.innerHTML = html;
    return item;
  }

  static compareTask = (task, index) => task.index === parseInt(index, 10);

  static isCompleted = (task) => task.completed;

  static setIndex = (task, index) => {
    task.index = parseInt(index, 10);
    return task;
  }

  static updateDescription = (task, description) => {
    task.description = description;
    return task;
  }

  static changeStatus = (task) => {
    task.completed = reverse(task.completed);
    return task;
  }
}