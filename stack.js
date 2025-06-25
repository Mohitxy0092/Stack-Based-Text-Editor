export class Stack {
  constructor() {
    this.size = 0;
    this.buffer = 7;
    this.stack = [];
  }

  clear() {
    this.size = 0;
    this.stack = [];
  }

  isEmpty() {
    return this.size === 0;
  }

  top() {
    return this.stack[this.size - 1];
  }

  pop() {
    if (!this.isEmpty()) {
      this.size--;
      return this.stack.pop();
    } else {
      return null;
    }
  }

  push(type, char) {
    if (this.isEmpty()) {
      this.stack.push([type, char]);
      this.size++;
    } else {
      let tmp = this.top();
      if (tmp[0] === type && tmp[1].length < this.buffer) {
        let top = this.pop();
        top[1] = char + top[1];
        this.stack.push(top);
        this.size++;
      } else {
        this.stack.push([type, char]);
        this.size++;
      }
    }
  }
}
