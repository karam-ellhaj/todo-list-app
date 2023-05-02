let category="home";


class Todo{
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

let button  = document.getElementById("add-todo-button")

button.onclick = ()=>{
    if (title.value && desc.value){
    let todo = new Todo(title.value,desc.value,category)
    add(todo)
    formOpener.classList.remove("clicked")
    form.classList.add("n-active")
    }else{
        alert("you cann't add an empty task ")
    }

    title.value=''
    desc.value=''
    

    render()
}




function renderTodos(todos,category){

    todosContainer.innerHTML=`
    <h2>${category}</h2>`
    let index = 0;
    todos.forEach(todo => {
        if (todo.category === category){
        todosContainer.innerHTML+=`
        <div class="todo" >
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
        
        document.body.dataset = document.cookie
        index++;

    }); 
}
function render(){
    renderTodos( JSON.parse(localStorage.getItem('todos' )),category)
}
onload = ()=>{
    render()
}

function setCategory(cat){
    category=cat;
    closeMenu()
    render()
}