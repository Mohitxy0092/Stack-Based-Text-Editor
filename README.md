# Stack-Based Text Editor

A lightweight, browser-based text editor built with HTML, Tailwind CSS, and JavaScript. It features a custom stack for undo functionality and a real-time log of editing operations, perfect for exploring text manipulation, DOM interactions, and stack Data Structure.

## Features
- **Real-time Typing**: Log every keypress instantly.
- **Undo Support**: Revert changes using a custom stack.
- **Clear Functionality**: Reset text and logs with one click.
- **Operation History**: Track edits visually in a log panel.
- **Batched Undo**: Groups characters (default: 7) for intuitive undos.
- **Responsive UI**: Sleek, mobile-friendly design with Tailwind CSS.

## Preview
![Stack-Based Text Editor UI](./images/Screenshot%202025-06-25%20220658.png)

## Tech Stack
- **HTML5**: Core structure and layout.
- **Tailwind CSS**: Responsive styling.
- **JavaScript**: Logic, interactivity, and stack implementation.

## Project Structure
```
text-editor/
├── index.html    # Main HTML layout
├── script.js     # Editor logic and UI behavior
├── stack.js      # Custom stack for undo functionality
└── README.md     # Project documentation
```

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/Mohitxy0092/text-editor.git
   cd text-editor
   ```
2. Open `index.html` in your browser.
3. No dependencies or build tools required!

## How It Works
### Stack Mechanics
- Each keypress is stored as an operation in the `Stack` class.
- Characters are batched (default: 7) for smoother undo steps.
- Undo restores text by reversing the last operation.

### Operation Types
- `0`: Insertion (typed character).
- `1`: Deletion (backspace).

### `stack.js` Methods
```js
push(type, char)  // Logs an operation
pop()             // Undoes last operation
top()             // Peeks at top operation
clear()           // Resets stack
```

### Example Workflow
1. Type "Hey" → Stack: `[0, "H"], [0, "e"],[0, "y"] `
2. Backspace "y" → Stack logs: `[1, "y"]`
3. Undo → Text restores to "He"
4. Operations display in a real-time log below the editor.

## UI Overview
- **Navbar**: Displays title.
- **Text Area**: Editable with placeholder.
- **Buttons**: Undo and Clear actions.
- **History Log**: Shows operation history.
- **Footer**: Includes branding.

## Acknowledgements
- [Tailwind CSS](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)