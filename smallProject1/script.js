document.addEventListener('DOMContentLoaded', function () {
   const undoStack = [];
   const redoStack = [];

   // Get the necessary elements
   const redoBtn = document.getElementById('redoBtn');
   const undoBtn = document.getElementById('undoBtn');
   const addTextBtn = document.getElementById('addTextBtn');
   const textArea = document.getElementById('textArea');
   const fontSelect = document.getElementById('fontSelect');
   const textSizeInput = document.getElementById('textSize');
   const textColorInput = document.getElementById('textColor');

   // Function to update undo and redo buttons state
   function updateButtons() {
       undoBtn.disabled = undoStack.length === 0;
       redoBtn.disabled = redoStack.length === 0;
   }

   // Function to save the current state
   function saveState() {
       const currentState = {
           content: textArea.innerHTML,
           font: textArea.style.fontFamily,
           size: textArea.style.fontSize,
           color: textArea.style.color,
       };
       undoStack.push(currentState);
       redoStack.length = 0; // Clear redo stack when a new state is saved
       updateButtons();
   }

   // Event listeners for undo and redo buttons
   undoBtn.addEventListener('click', function () {
       if (undoStack.length > 1) {
           const currentState = undoStack.pop();
           redoStack.push(currentState);
           applyState(undoStack[undoStack.length - 1]);
           updateButtons();
       }
   });

   redoBtn.addEventListener('click', function () {
       if (redoStack.length > 0) {
           const nextState = redoStack.pop();
           undoStack.push(nextState);
           applyState(nextState);
           updateButtons();
       }
   });

   // Event listener for add text button
   addTextBtn.addEventListener('click', function () {
       const textToAdd = prompt('Enter text:');
       if (textToAdd !== null) {
           textArea.focus();
           document.execCommand('insertHTML', false, textToAdd);
           saveState();
       }
   });

   // Event listener for changes in the text area
   textArea.addEventListener('input', function () {
       saveState();
   });

   // Event listener for font type change
   fontSelect.addEventListener('change', function () {
       textArea.style.fontFamily = fontSelect.value;
       saveState();
   });

   // Event listener for text size change
   textSizeInput.addEventListener('input', function () {
       textArea.style.fontSize = `${textSizeInput.value}px`;
       saveState();
   });

   // Event listener for text color change
   textColorInput.addEventListener('input', function () {
       textArea.style.color = textColorInput.value;
       saveState();
   });

   // Function to apply a state to the text area
   function applyState(state) {
       textArea.innerHTML = state.content;
       textArea.style.fontFamily = state.font;
       textArea.style.fontSize = state.size;
       textArea.style.color = state.color;
   }

   // Initial state
   saveState();
});
