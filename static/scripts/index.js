let category="home";/* 
a global variable that reffers to the categories 
when tasks are added thier category will be whatevere this variable is 
only tasks with the name inside this variable is shown on the  screen
this variable is changed when the user choose another  category from the menu
*/
class Todo{//a class to create the todo object
    constructor(title,desc,category,done=false){
        this.title = title;
        this.desc = desc;
        this.done = done;
        this.category = category;
    }

}

function add(todo){
    let todos = JSON.parse(localStorage.getItem("todos")) 
    if(todos == null){
        todos=[]
    }
    
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))

}

function removeTodo(index){
    if (confirm("are you sure you want to delete this?")){
        let todos = JSON.parse(localStorage.getItem("todos")) 
        todos.splice(index,1)
        localStorage.setItem('todos',JSON.stringify(todos))
        render()
    }
    
}
function makeDone(index){
    let todos=JSON.parse(localStorage.getItem('todos'));
    todos[index].done = !todos[index].done;

    localStorage.setItem('todos',JSON.stringify(todos))
    render()

}

let todosContainer = document.getElementById("todos")
let form = document.getElementById("form")
let asideCloser = document.getElementById("aside-closer")
let formOpener= document.getElementById("form-opener")



let title = document.getElementById("title")
let desc = document.getElementById("desc")

let button  = document.getElementById("add-todo-button")//the button clicked to add the todo

button.onclick = ()=>{//the function that handles the click
    if (title.value && desc.value){
    let todo = new Todo(title.value,desc.value,category)
    add(todo)
    formOpener.classList.remove("clicked")
    form.classList.add("n-active")
    }else{
        alert("you cann't add an empty task ")
    }


    //those two lines are to clear the input areas after pressing the button
    title.value=''
    desc.value=''
    
    render()//running the function that renders the todos to update the screen with the latest added todos
}




function renderTodos(todos,category){//the function that renders todos

    todosContainer.innerHTML=`
    <h2>${category}</h2>`
    let index = 0;
    todos.forEach(todo => {
        if (todo.category === category){
        todosContainer.innerHTML+=`
        <div class="todo draggable" draggable="true" >
            <div class="content" onclick=makeDone(${index})>
                <div class="title ${todo.done}" > ${todo.title}</div><hr>
                <p class="desc ${todo.done}" >${todo.desc}</p>
            </div>
            
            <div class="state">
                <div class="delete" onclick="removeTodo(${index})" id="delete" data-id=${index} >
                    <img src="../static/icons/trash.svg" width="64px" height="64">
                </div>
            </div>
        </div>`
        } 
        
        index++;

    }); 
}
function render(){ 

    renderTodos( JSON.parse(localStorage.getItem('todos' )),category)
    dragndrop()
}
onload = ()=>{
    colorChanger(localStorage.getItem('color'))
    render()
}

function setCategory(cat){//the function that changes the category variable 
    category=cat;
    menu.classList.remove("opened")
    aside.classList.remove("menu-active")
    asideCloser.classList.remove("aside-closer")
    render()
}

if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("/serviceWorker.js")
}