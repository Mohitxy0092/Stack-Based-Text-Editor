import { Stack } from './stack.js';

window.addEventListener('load', function () {
  const textbox = document.getElementById('comment');
  const undo = document.getElementById('undo');
  const clear = document.getElementById('clear');
  const temptext = document.getElementById('temptext');
  textbox.value = "";
  let text = "";
  let stack = new Stack();
  document.addEventListener('keydown', function (event) {
    const isUndo = (event.key === 'z' || event.key === 'Z') && (event.ctrlKey || event.metaKey);
    if (isUndo) {
      event.preventDefault();
    }
  });
  textbox.addEventListener('click', function () {
    textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
  });
  clear.addEventListener('click', function () {
    stack.clear();
    text = "";
    textbox.value = "";
    temptext.innerHTML = "Sequence of operations will be here";
  });
  textbox.addEventListener('input', function (event) {
    const oldVal = text;
    const newVal = textbox.value;
    if (newVal.length > oldVal.length) {
      const inserted = newVal.slice(
        oldVal.length === textbox.selectionStart - (newVal.length - oldVal.length) 
          ? oldVal.length 
          : Math.min(oldVal.length, textbox.selectionStart - (newVal.length - oldVal.length))
      );
      const diff = newVal.split(oldVal).join('');
      const toPush = diff.length ? diff : newVal.slice(oldVal.length);
      stack.push(0, toPush);
      temptext.innerHTML = "On stack " + stack.top() + "<br>" + temptext.innerHTML;
    } else if (newVal.length < oldVal.length) {
      let prefix = 0;
      while (prefix < oldVal.length && prefix < newVal.length && oldVal[prefix] === newVal[prefix]) {
        prefix++;
      }
      let suffix = 0;
      while (
        suffix < oldVal.length - prefix &&
        suffix < newVal.length - prefix &&
        oldVal[oldVal.length - 1 - suffix] === newVal[newVal.length - 1 - suffix]
      ) {
        suffix++;
      }
      const deleted = oldVal.substring(prefix, oldVal.length - suffix);
      stack.push(1, deleted);
      temptext.innerHTML = "On stack " + stack.top() + "<br>" + temptext.innerHTML;
    } else {
      let prefix = 0;
      while (prefix < oldVal.length && oldVal[prefix] === newVal[prefix]) prefix++;
      let suffix = 0;
      while (
        suffix < oldVal.length - prefix &&
        oldVal[oldVal.length - 1 - suffix] === newVal[newVal.length - 1 - suffix]
      ) suffix++;
      const deleted = oldVal.substring(prefix, oldVal.length - suffix);
      const inserted = newVal.substring(prefix, newVal.length - suffix);
      if (deleted.length > 0) {
        stack.push(1, deleted);
      }
      if (inserted.length > 0) {
        stack.push(0, inserted);
      }
      temptext.innerHTML = "On stack " + stack.top() + "<br>" + temptext.innerHTML;
    }
    text = textbox.value;
    const maxLines = 50;
    const parts = temptext.innerHTML.split('<br>');
    if (parts.length > maxLines * 2) {
      temptext.innerHTML = parts.slice(0, maxLines * 2).join('<br>');
    }
  });
  undo.addEventListener('click', function () {
    const operation = stack.pop();
    if (!operation || !Array.isArray(operation)) {
      // nothing to undo
      temptext.innerHTML = "Nothing to undo<br>" + temptext.innerHTML;
      return;
    }
    temptext.innerHTML = "Performing undo operation<br>" + temptext.innerHTML;
    const opType = operation[0];
    const opPayload = operation[1] || "";
    if (opType === 0) {
      const len = opPayload.length;
      if (len > 0) {
        textbox.value = textbox.value.substring(0, textbox.value.length - len);
      }
    } else if (opType === 1) {
      textbox.value += opPayload;
    } else {
      temptext.innerHTML = "Unknown operation on stack<br>" + temptext.innerHTML;
    }
    text = textbox.value;
  });
});
