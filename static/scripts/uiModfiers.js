
formOpener.onclick = ()=>{// you see that blue backgrounded button? this is the click handler function of it
                

    if (!('clicked' == formOpener.classList[1])){//if the form to add a todo is not opened it will open it, else it will close it
        formOpener.classList.add("clicked")
        form.classList.remove("n-active")

    }
    else{
        formOpener.classList.remove("clicked")
        form.classList.add("n-active")
    } 
    render()
    
}
let menu = document.getElementById('menu')
let aside = document.getElementById('aside')

menu.onclick = ()=>{//the click handler to open the side menu
    console.log('nf')
    menu.classList.add("opened")
    aside.classList.add("menu-active")
    asideCloser.classList.add("aside-closer")
    render()
}

asideCloser.onclick=()=>{
    menu.classList.remove("opened")
    aside.classList.remove("menu-active")
    asideCloser.classList.remove("aside-closer")
}

function colorChanger(color){
    
    document.body.style = "--main-color:"+color
    document.cookie = color;
}

let settings = document.getElementById("settings")
let colorC = document.getElementById("color-changer")
settings.onclick = ()=>{

    
    if (colorC.classList[1] === 'n-active'){
        colorC.classList.remove("n-active")
    }
    else{
        console.log("shit")

        colorC.classList.add("n-active")
    }
    render()

}