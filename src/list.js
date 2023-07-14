import Task from './task.js';

export default class List {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  }

  add = (descripiton) => {
    const task = new Task(descripiton);
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