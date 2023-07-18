import Task from './task.js';

export default class List {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('items')) || [];
  }

  displayList = () => {
    const fragment = new DocumentFragment();
    this.items.forEach((item) => {
      fragment.appendChild(Task.displayItem(item));
    });
    return fragment;
  }

  createItem = (description) => {
    this.items.push(new Task(this.items.length + 1, description));
    this.storeList();
  }

  removeItem = (index) => {
    this.items = this.items.filter(this.sortIndexes.bind(this, { counter: 1, type: 'task', position: index }));
    this.storeList();
  }

  updateDescription = (index, description) => {
    const position = this.searchIndex(index);
    if (position !== -1) {
      Task.updateDescription(this.items[position], description);
    }
    this.storeList();
  }

  changeStatus = (index) => {
    const position = this.searchIndex(index);
    if (position !== -1) {
      Task.changeStatus(this.items[position]);
    }
    this.storeList();
  }

  clearCompleted = () => {
    this.items = this.items.filter(this.sortIndexes.bind(this, { counter: 1, type: 'status', position: null }));
    this.storeList();
  }

  insertItem = (elements, id) => {
    const [first, second] = this.extractIndexes(elements, id);
    if (first !== second) {
      this.items.splice(second, 0, this.items.splice(first, 1)[0]);
    }
    this.items.forEach(this.sortIndexes.bind(this, { counter: 1, type: 'task', position: 0 }));
    this.storeList();
  }

  searchIndex = (index) => this.items.findIndex((item) => Task.compareTask(item, index));

  sortIndexes = (options, item) => {
    if (this.compareItems(options.type, item, options.position) === false) {
      Task.setIndex(item, options.counter);
      options.counter += 1;
      return item;
    }
    return null;
  }

  compareItems = (type, task, index = null) => {
    switch (type) {
      case 'task':
        return Task.compareTask(task, index);
      case 'status':
        return Task.isCompleted(task);
      default:
        return null;
    }
  }

  extractIndexes = (elements, id) => {
    let second = 0;
    while (elements[second].id !== id) {
      second += 1;
    }
    return [parseInt(id, 10) - 1, second];
  }

  storeList = () => {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}