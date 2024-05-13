// use .draggable for elemnent you want to drag, use .container for their containers
function dragndrop(){
const draggables = document.querySelectorAll('.draggable')
const container = document.querySelectorAll('.container')


draggables.forEach(d=>{
    d.addEventListener('dragstart',()=>{
        d.classList.add("dragging")
    })
    d.addEventListener("dragend",()=>{
        d.classList.remove("dragging")
    })
})

container.forEach(c=>{

    c.addEventListener('dragover',e=>{
        const after = getDAfter(c,e.clientY)
        const draggable = document.querySelector('.dragging');
        console.log(draggable)
        if (after == null){
            c.appendChild(draggable)
        }
        else{
            c.insertBefore(draggable,after)
        }
    })
})
function getDAfter(container,y){
    const draggables = container.querySelectorAll('.draggable:not(.dragging)')
    let min_offset = Number.NEGATIVE_INFINITY
    let toreturn = null;
    draggables.forEach(drag=>{
        const box = drag.getBoundingClientRect()
        offset = y - box.top - box.height/2
        if (offset < 0){
            if(offset > min_offset){
                min_offset = offset;                
                toreturn=drag;
            }
        }
    })
    return toreturn;
}
}