export default class Task {
  constructor(index, description) {
    this.index = parseInt(index, 10);
    this.description = description;
    this.completed = false;
  }

  static display = (task) => {
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

  static identical = (task, index) => task.index === parseInt(index, 10);

  static finished = (task) => task.completed;

  static position = (task, index) => {
    task.index = parseInt(index, 10);
    return task;
  }

  static update = (task, description) => {
    task.description = description;
    return task;
  }

  static complete = (task) => {
    task.completed = !task.completed;
    return task;
  }
}