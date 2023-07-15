import Task from './task.js';

export default class List {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  }

  add = (description) => {
    const task = new Task(this.items.length + 1, description);
    this.items.push(task);
    this.store();
  }

  remove = (index) => {
    this.items = this.items.filter((item) => item.index !== index);
    for (let i = index - 1; i < this.items.length; i += 1) {
      this.items[i].index -= 1;
    }
    this.store();
  }

  update = (index, description) => {
    this.items.find((item, position) => {
      if (item.index === index) {
        this.items[position].description = description;
        return true;
      }
      return false;
    });
    this.store();
  }

  complete = (index) => {
    this.items.find((item, position) => {
      if (item.index === index) {
        this.items[position].completed = !this.items[position].completed;
        return true;
      }
      return false;
    });
    this.store();
  }

  store = () => {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}