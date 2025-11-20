export class Stack {
  constructor(buffer = 7) {
    this.size = 0;
    this.buffer = buffer;
    this.stack = [];
  }
  clear() {
    this.size = 0;
    this.stack.length = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  top() {
    return this.isEmpty() ? null : this.stack[this.size - 1];
  }
  pop() {
    if (this.isEmpty()) return null;
    this.size--;
    return this.stack.pop();
  }
  push(type, char) {
    if (type !== 0 && type !== 1) {
      throw new Error('Stack.push: unknown type ' + type);
    }
    char = String(char ?? '');

    if (this.isEmpty()) {
      this.stack.push([type, char]);
      this.size++;
      return;
    }
    const tmp = this.top();
    if (tmp[0] === type && tmp[1].length < this.buffer) {
      if (type === 0) {
        tmp[1] = tmp[1] + char;
      } else {
        tmp[1] = char + tmp[1];
      }
    } else {
      this.stack.push([type, char]);
      this.size++;
    }
  }
}
