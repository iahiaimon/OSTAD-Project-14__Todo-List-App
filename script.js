
document.addEventListener('DOMContentLoaded', loadTask);

addEventListener("keypress", function(event , task_input) {
    if (event.key === "Enter") {
        add_task(this.value);
        task_input = ""
    }
});

// window.onload = function() {
//     document.getElementById("taskInput").value = ""; 
//     loadTask(); // 
// };

function loadTask() {

    let todos = JSON.parse(localStorage.getItem("todos")) || []
    todos.forEach(todo => add_task_dom(todo));
}


function add_task() {
    let task_input = document.getElementById("search").value

    add_task_dom(task_input);
    // add_time_dom(task_input);
    // const time = new Date().getHours()
    // console.log(time);
    // document.getElementById("search").value == " "

    save_local_storage(task_input);
}

function add_task_dom(task_input, time) {
    let ul = document.getElementById("task_list");
    let li = document.createElement("li");
    li.innerHTML = `
        <span>${task_input}</span>
        
        <div>
            <button class="update_button" onclick="update_task(this)"><i class="fa-solid fa-pen"></i></button>
            <button class="trush_button" onclick="delete_task(this)"><i class="fa-solid fa-trash-can" ></i></button>
        </div>
        `
    ul.prepend(li)

}

function save_local_storage(task_input) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []
    todos.push(task_input);
    localStorage.setItem("todos", JSON.stringify(todos))
    task_input.value = "";

}


function delete_task(element) {
    let child = element.parentElement.parentElement;
    let task_text = child.firstElementChild.textContent.trim();

    child.remove();

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos = todos.filter(todo => todo != task_text)

    localStorage.setItem("todos", JSON.stringify(todos));
}

function update_task(element) {
    let child = element.parentElement.parentElement;
    let old_task = child.firstElementChild.textContent.trim();


    let new_task = prompt("Edit your task:", old_task);

    if (new_task === null || new_task.trim() === "")
        return;

    child.firstElementChild.textContent = new_task.trim();

    let todos = JSON.parse(localStorage.getItem("todos")) || [];


    let updated_tasks = todos.map(todo => todo === old_task ? new_task.trim() : todo);


    localStorage.setItem("todos", JSON.stringify(updated_tasks));
}


