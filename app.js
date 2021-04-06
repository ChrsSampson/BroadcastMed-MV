// TODO
// [X]Impement Firebase Sync
// [] Add loading overlay while firebase query runs
// [X] Settings: Add Sync Button
// []Settings Option: Add Change Layout buttons
// [X]Fix CSS



// Selectors (there are unused things in here...probobly)
const laptopEncoderCont = document.getElementById('laptopEncoderBtn-Container');
const urlInput = document.getElementById("input-address");
const windowCont = document.getElementById("window-container")
const frameCont = document.getElementById("frame-container")
const encoderList = document.getElementById("select-machine")
const menuBtn = document.getElementById("menu-btn")
const collapseBtn = document.getElementById("collapse-btn")
const sidebar = document.getElementById('sidebar');
const desktopEncoderCont = document.getElementById("desktopEncoder-Container");
const importBtn = document.getElementById("import-btn")
const settingBtn = document.getElementById("setting-btn")
const settingPanel = document.getElementById('settings')
const msg = document.getElementById("status-message")



// Check to see if local storage is empty
CheckFirstRun = () => {
    if(localStorage.getItem('laptopEncoders') == null || localStorage.getItem('desktopEncoders') == null){
        LoadData();
    }
    else{
        console.log("Welcome Back")
        DisplayData('laptopEncoders', laptopEncoderCont)
        DisplayData('desktopEncoders', desktopEncoderCont)
    }
}

// Populate Drop down box from link
DisplayData = (type, container) => {
    // Build json object from local storage
    let arr = JSON.parse( localStorage.getItem(`${type}`) )
    // Populates drops down list with values from the the fetch function
    Object.values(arr).forEach((e) => {
        let name = e.name
        let address = e.link
        container.insertAdjacentHTML('beforeend', `<a class="btn" id="enc-btn" data-link=${address}>${name}</a>`)
    });
}

// Add iframe to area, Might add some local storage to thin in the future for local session persisance
// Display Frame Windows
DisplayWindows = (url) => {
    let frameContent = `
    <article class="frame-container" id="frame-container">
    <iframe src="${url}" frameborder="0" width="800" height="500"></iframe>
    </article>`

    windowCont.insertAdjacentHTML('afterbegin', frameContent);

    delbtn = document.getElementsByClassName("del-btn")
    
    Placeholder(windowCont);
}

// create a place holder when area is empty
Placeholder = (element) => {
    if(element.childElementCount == 0){
        element.insertAdjacentHTML('afterbegin', `
        <section class="placeholder" id="placeholder">
        <img src="./img/sad.svg">
        <h3>There is nothing here</h3>
        </section>
        `)

    }
    else{
        element.removeChild(document.getElementById('placeholder'))
    }
}

LoadData = () => {
    document.getElementById('overlay').style.display = "grid"
    ReadData('laptopEncoders')
    ReadData('desktopEncoders')
    setTimeout(() => {
            DisplayData('laptopEncoders', laptopEncoderCont)
            DisplayData('desktopEncoders', desktopEncoderCont)
            document.getElementById('overlay').style.display = "none"
    }, 5.2*1000)
}


// --------------------Event handlers-----------------------------
// Startup Functions
window.onload = () => {
    CheckFirstRun()
    // check if main container is empty and show a placeholder 
    Placeholder(windowCont)
}

// Delete window event listener
windowCont.onclick = (e) => {
    if(e.target.id == "del-btn"){
       let cont = e.target.parentNode;
       windowCont.removeChild(cont);
       Placeholder(windowCont);
    }
}

// menu button for sidebar
menuBtn.onclick = () => {
    sidebar.classList.toggle('sidebar-expanded')
    if(sidebar.classList.contains('sidebar-expanded')){
        menuBtn.src = "/img/leftArrow.svg"
    }
    else{
        menuBtn.src= "/img/menu.svg"
    }
}

// button for setting menu
settingBtn.onclick = () => {
    settingPanel.classList.toggle('setting-expanded')
    if(settingPanel.classList.contains('setting-expanded')){
        settingBtn.src = "/img/leftArrow.svg"
        settingBtn.style.rotate = "90deg"
    }
    else{
        settingBtn.src = "/img/gear.svg"
    }
}

settingPanel.onclick = (e) => {
    if(e.target.id == "fireSync"){
        localStorage.clear()
        laptopEncoderCont.innerHTML = ""
        desktopEncoderCont.innerHTML = ""
        LoadData();
        
    }
}

// Sidebar button click events
sidebar.onclick = (e) => {
    if(e.target.id == "enc-btn"){
        link = e.target.dataset.link
        DisplayWindows(link);
    }
    else if(e.target.id == "add-btn"){
        if(urlInput.value != ""){
            DisplayWindows(urlInput.value)
        }
        else{
            alert('Error:No Input Provided')
        }
    }
    else if(e.target.id = "clear-btn"){
        windowCont.innerHTML = ''
        Placeholder(windowCont);
    }
}

