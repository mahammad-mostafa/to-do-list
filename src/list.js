import Task from './task.js';

export default class List {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  }

  add = (description) => {
    const task = new Task(description);
    this.items.push(task);
    this.store();
  }

  remove = (index) => {
    this.items = this.items.filter((item) => item.index !== index);
    this.store();
  }

  store = () => {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}