const storedData = localStorage.getItem('todo');
const parsedData = JSON.parse(storedData);

let todoList = parsedData || [];

showTodoList(); //show todos on page

function getInputValues(){
    const inputElement = document.querySelector('.js-name-input');
    const inputDueDate = document.querySelector('.js-due-date-input');

    return {
        todoName: inputElement.value,
        dueDate: inputDueDate.value,
        inputElement,
        inputDueDate
    }
}

// Get Todos and save in array and show on console
function addTodo(){
    const {todoName, dueDate, inputElement, inputDueDate } = getInputValues();
    todoList.push({
        todoName, 
        dueDate
    }); // add todo in array

    localStorage.setItem('todo',JSON.stringify(todoList));
    inputElement.value = ''; // reset the input field.
    inputDueDate.value = ''; // reset the date field.
    showTodoList(); 
}

// show todos on webpage
function showTodoList(){
    let todoListHTML = '';

    todoList.forEach((todoObj, index)=>{
        const {todoName,dueDate} = todoObj;
        const html = `
        <div>${todoName}</div>
        <div>${dueDate}</div>
        <button class="todo-delete-button js-delete-button">Delete</button>
        `;
        todoListHTML += html;
    });

    document.querySelector('.js-show-todos').innerHTML = todoListHTML; // store the html in tag

    // delete the todo list name
    document.querySelectorAll('.js-delete-button').forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',()=>{
            todoList.splice(index,1);
            localStorage.setItem('todo',JSON.stringify(todoList));
            showTodoList();
        })
    })
}

document.querySelector('.js-add-button').addEventListener('click',()=>{
    const {todoName, dueDate } = getInputValues();

    if(todoName === '' && dueDate === ''){
        alert('Please fill the require fields');
        return
    } else if(todoName === ''){
        alert('Please fill the Todo Name field');
        return
    } else if(dueDate === ''){
        alert('Please fill the Due Date field');
        return
    }
    addTodo();
})

document.body.addEventListener('keyup',(event)=>{
    
    if(event.key == 'Enter'){
        const {todoName, dueDate } = getInputValues();

        if(todoName === '' && dueDate === ''){
            alert('Please fill the require fields');
            return
        }
        if(todoName === ''){
            alert('Please fill the Todo Name field');
            return
        }
        if(dueDate === ''){
            alert('Please fill the Due Date field');
            return
        }
        addTodo();
    }
})