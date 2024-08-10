
const todoList = [];
renderTodoList();

// Render means to display something in the page
function renderTodoList() {
    let todoListHTML = '';

    // This technique is called Generating the HTMl
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        const { name, dueDate } = todoObject;
        // const dueDate = todoObject.dueDate;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button" onclick="
            todoList.splice(${i}, 1);
            renderTodoList();
        ">Delete</button>
        `;
        // We need to generate a big HTML code
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = 
    todoListHTML;
}


function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    
    todoList.push({
        // name: name,
        // dueDate: dueDate
        name,
        dueDate
    });

    // The text box clean the text after add it
    inputElement.value = '';
    renderTodoList();
}