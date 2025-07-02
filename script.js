
let form = document.getElementById("task-form");
let input = document.getElementById("task-input");
let taskList = document.getElementById("task-list");

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent from reloading
  if (input.value.trim() === "") {
    alert("Task cannot be empty.");
    return;
  }
  addTask(input.value.trim()); // Add task
  input.value = ""; // Clear input
});

// Add new task
function addTask(taskText) {
  const li = document.createElement("li"); // Create a list item

    const checkbox = document.createElement("input");
     checkbox.type = "checkbox";
    checkbox.onclick = () => {
    li.classList.tooggle("completed");
    };
    li.appendChild(checkbox);

  // Create the text part of the task
  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;

  // Create action buttons
  const actions = document.createElement("span");
    actions.className = "task-actions";

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => startInlineEdit(span, editBtn); // Call edit handler

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();
  // Add buttons to action container
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  // Add to list item
  li.appendChild(span);
  li.appendChild(actions);

  // Add item to task list
  taskList.appendChild(li);
}

// editing task
function startInlineEdit(span, editBtn) {
  const currentText = span.textContent;

  // Create input to replace text
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-input";

  // Replace the text span with the input field
  span.replaceWith(input);
  input.focus(); 
  editBtn.textContent = "Save";

  // Save button/Enter key 
  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText === "") {
      alert("Task cannot be empty.");
      return;
    }

    // Create a new span with updated text
    const newSpan = document.createElement("span");
    newSpan.className = "task-text";
    newSpan.textContent = newText;

    // Replace  input back with new text
    input.replaceWith(newSpan);
    editBtn.textContent = "Edit";

    // Re-attach the edit handler
    editBtn.onclick = () => startInlineEdit(newSpan, editBtn);
  };

  // Save on "Save" button click
  editBtn.onclick = saveEdit;

  // Save on pressing Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      saveEdit();
    }
  });
}