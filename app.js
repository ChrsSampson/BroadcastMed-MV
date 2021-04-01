// TODO
// []Settings Option: Change Layout buttons
// [] at some point fix the many sins committed to get to this point



// Selectors (there are unused things in here...probobly)
const laptopEncoderCont = document.getElementById('laptopEncoderBtn-Container');
const urlInput = document.getElementById("input-address");
const windowCont = document.getElementById("window-container")
const frameCont = document.getElementById("frame-container")
const encoderList = document.getElementById("select-machine")
const menuBtn = document.getElementById("menu-btn")
const collapseBtn = document.getElementById("collapse-btn")
const sidebar = document.getElementById('sidebar');
const desktopEncodersCont = document.getElementById("desktopEncoder-Container");
const importBtn = document.getElementById("import-btn")
const settingBtn = document.getElementById("setting-btn")
const settingPanel = document.getElementById('settings')
const settingCollapse = document.getElementById('setting-collapse')
const config = document.getElementById("config-input")
const successMsg = document.getElementById("success-msg")


// Big Girthy Global Variables
let gIndex = 0;



// Check to see if local storage is empty
CheckFirstRun = () => {
    if(localStorage.getItem('laptops') == null || localStorage.getItem('desktops') == null){
        console.info("First Time Startup Detected")
        console.info('Storage is empty')
        FetchLinks("./link.json")
        // Work around to a fetch bug not showing any data, this works fine for now
        setTimeout(()=>{
            DisplayData('laptops', laptopEncoderCont)
            DisplayData('desktops', desktopEncodersCont)
        }, 3*1000)
    }
    else{
        console.log('Welcome Back')
        // Display data in storage in the side bar
        DisplayData('laptops', laptopEncoderCont)
        DisplayData('desktops', desktopEncodersCont)
    }
}

// function to import links from local file
const FetchLinks = (source) => {
    fetch(source)
      .then((res) => {
        return res.json()
    })
    .then((data) => {
        WriteData(data);
        
    })
}

// Write Fetched Data to Local Storage
WriteData = (data) => {
    console.log("Before Write:", localStorage)
    let laptopArr = data.laptop_encoders
    let desktopArr = data.desktop_encoders
        
    localStorage.setItem('laptops', JSON.stringify(laptopArr));
    localStorage.setItem('desktops', JSON.stringify(desktopArr));
    
    console.info("Writing Storage From JSON...")
    console.log(localStorage)
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
AddWindow = (input) => {
    let url = input
      
    gIndex++
        
    DisplayWindows(url, gIndex)
}

// Display Frame Windows
DisplayWindows = (url, index) => {
    

    let frameContent = `
    <article class="frame" id="frame-container data-link="${index}">
    <img id="del-btn" class="del-btn" src="./img/delete.svg">
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

// Import New JSON config File
ImportConfig = (source) => {
    const fr = new FileReader();

    fr.readAsText(source);
      
    fr.onload = () => {
        console.log(fr.result)
        // parse string as json to be plugged into DisplayData function
        let conf = JSON.parse(fr.result)
        console.info("Parsing new Config....")
        WriteData(conf)
        // clear the sidebar before loading new items
        laptopEncoderCont.innerHTML = ''
        desktopEncodersCont.innerHTML = ''
        DisplayData('laptops', laptopEncoderCont)
        DisplayData('desktops', desktopEncodersCont)
    }
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
    sidebar.style.left = '0'
}

// button for setting menu
settingBtn.onclick = () => {
    settingPanel.style.top = "0px"
}

settingCollapse.onclick = () => {
    settingPanel.style.top = "-400px"
}

// Sidebar button click events
sidebar.onclick = (e) => {
    if(e.target.id == "enc-btn"){
        link = e.target.dataset.link
        AddWindow(link);
    }
    else if(e.target.id == "collapse-btn"){
       sidebar.style.left = "-600px"
    }
    else if(e.target.id == "add-btn"){
        AddWindow(urlInput.value)
    }
    else if(e.target.id = "clear-btn"){
        windowCont.innerHTML = ''
    }

}

// Import new JSON
importBtn.onclick = () => {
    if(config.files[0] != undefined){
        // clear storage so no duplicates or overwrites
        localStorage.clear();
        ImportConfig(config.files[0])
        // show success message for a couple seconds
        successMsg.style.display = "block"
        setTimeout(() => {
            successMsg.style.display = "none"
            config.files = "";
            }, 5*1000)
    }
    // show error if no selection is made
    else{
        alert("cant be empty")
    }
   
}