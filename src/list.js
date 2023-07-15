import Task from './task.js';

export default class List {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  }

  display = () => {
    const fragment = new DocumentFragment();
    this.items.forEach((item) => {
      fragment.appendChild(Task.display(item));
    });
    return fragment;
  }

  add = (description) => {
    const task = new Task(this.items.length + 1, description);
    this.items.push(task);
    this.store();
  }

  remove = (index) => {
    let counter = 1;
    this.items = this.items.filter((item) => {
      if (Task.identical(item, index) === false) {
        Task.position(item, counter);
        counter += 1;
        return item;
      }
      return null;
    });
    this.store();
  }

  update = (index, description) => {
    const position = this.search(index);
    if (position !== -1) {
      Task.update(this.items[position], description);
    }
    this.store();
  }

  complete = (index) => {
    const position = this.search(index);
    if (position !== -1) {
      Task.complete(this.items[position]);
    }
    this.store();
  }

  clear = () => {
    let counter = 1;
    this.items = this.items.filter((item) => {
      if (Task.finished(item) === false) {
        Task.position(item, counter);
        counter += 1;
        return item;
      }
      return null;
    });
    this.store();
  }

  search = (index) => this.items.findIndex((item) => Task.identical(item, index));

  store = () => {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}