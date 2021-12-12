window.onload = main;

function main() {
    checkCookie()

    swapContents()
    calcSquare(3)
    createForm()

    pushColorInput()
    setBackground(window.localStorage.getItem("color")) // for task forth

    //task 5
    uploadStyles()
    
    let ghg = document.querySelector(".header-inner-rectangle")
    ghg.onclick = task5
}

function uploadStyles() {
    let arr = []
    if(window.localStorage.getItem("tags") != "" && window.localStorage.getItem("tags") != undefined) {
        arr = JSON.parse(window.localStorage["tags"])
    } else {
        arr = []
    }

    for (let i = 0; i < arr.length; i++) {
        let tag = arr[i];
        
        let elems = document.getElementsByTagName(tag)
        for (let i = 0; i < elems.length; i++) {
            if(window.localStorage.getItem(tag) == undefined)  {
                
            } else {
                console.log(window.localStorage.getItem(tag))
                elems[i].style.cssText = window.localStorage.getItem(tag)
            }
        }
    }
}

function task5() {
    let selectText = document.createElement("p")
    selectText.innerText = "Menu: "
    
    let enterTagInput = document.createElement("input")
    enterTagInput.setAttribute("class", "input-tag")
    
    center = document.querySelector(".center-menu")
    center.appendChild(document.createElement("br"))
    center.appendChild(document.createElement("br"))
    
    let enterTagLabel = document.createElement("p")
    enterTagLabel.innerText = "Enter tag and stylesheet: "
    center.appendChild(enterTagLabel)
    center.appendChild(enterTagInput)

    // add area to enter the text
    center.appendChild(document.createElement("br"))
    let styleText = document.createElement("textarea")
    styleText.setAttribute("class", "style-sheet-text")
    styleText.setAttribute("cols", "40")
    styleText.setAttribute("rows", "10")
    center.appendChild(styleText)

    // set button to set style
    center.appendChild(document.createElement("br"))
    let setBtn = document.createElement("button")
    setBtn.innerText = "set"
    setBtn.onclick = () => {
        let tag = document.querySelector('.input-tag').value;
        let styles = document.querySelector(".style-sheet-text").value

        if(tag != "" && styles != "") {
            // get arr from storage
            let arr = []
            if(window.localStorage.getItem("tags") != "" && window.localStorage.getItem("tags") != undefined) {
                arr = JSON.parse(window.localStorage["tags"])
            } else {
                arr = []
            }
            
            // push to arr new elem or not push if it exists
            if(!arr.includes(tag)) {
                arr.push(tag)
            }
            window.localStorage.setItem("tags", JSON.stringify(arr))
            
            // save new styles in storage
            window.localStorage.setItem(tag, styles);

            // set new styles
            let elems = document.getElementsByTagName(tag)
            for (let i = 0; i < elems.length; i++) {
                elems[i].style.cssText = styles
            }
        }

        console.log(tag)
    }
    center.appendChild(setBtn)

    let clearBtn = document.createElement("button")
    clearBtn.innerText = "clear"
    clearBtn.onclick = () => {
        let tag = document.querySelector('.input-tag').value;
        let styles = document.querySelector(".style-sheet-text").value


        let arr = []
        if(window.localStorage["tags"] != "" && window.localStorage["tags"] != undefined) {
            arr = JSON.parse(window.localStorage["tags"])
        } else {
            arr = []
        }
        
        // clear here styles
        for(let i = 0; i < arr.length; i++) {
            let tag = arr[i]
            window.localStorage.removeItem(tag)
            
            let elems = document.getElementsByTagName(tag)
            for (let i = 0; i < elems.length; i++) {
                elems[i].style.cssText = ""
            }
        }
        arr = []

        location.reload()
    }
    center.appendChild(clearBtn)
}

function pushColorInput() {
    let main = document.getElementsByClassName("center-menu")[0]
    
    main.appendChild(document.createElement("br"))

    let input = document.createElement("input")
    input.setAttribute("type", "color")
    input.setAttribute("class", "input-color")
    main.appendChild(input)

    let button = document.createElement("button")
    button.setAttribute("onClick", "changeColor()")
    button.innerText = "push me"
    main.appendChild(button)
}

function changeColor() {
    let ret = document.getElementsByClassName("input-color")[0]
    let color = ret.value.toString()
    
    window.localStorage.setItem("color", color)
    setBackground(color)
}

function setBackground(color) {
    let ret = document.getElementsByClassName("input-color")[0]
    ret.value = color

    document.querySelector(".header").style.border = "5px solid " + color
    document.querySelector(".footer").style.border = "5px solid " + color
    document.querySelector(".left-menu").style.border = "5px solid " + color
    document.querySelector(".right-menu").style.border = "5px solid " + color
    document.querySelector(".top-menu").style.border = "5px solid " + color
    document.querySelector(".down-menu").style.border = "5px solid " + color
    document.querySelector(".center-menu").style.border = "5px solid " + color
}

function checkCookie() {
    if(document.cookie !== "reversed=") {
        let ret = alert("cookie: " + document.cookie + "\nafter pushong OK the cookies will be deleted and for will not be showed")
        document.cookie = "reversed="
        let reload = alert("reload page?")
        location.reload()
    }
}

function swapContents() {
    // swap contents of 2 and 5
    let a = document.querySelector("[class='left-menu']")
    let b = document.querySelector("[class='right-menu']")

    temp = a.innerHTML
    a.innerHTML = b.innerHTML
    b.innerHTML = temp
}

function calcSquare(a) {
    // cals and push to 4 elem
    let s = ((Math.sqrt(25+10*Math.sqrt(5)))/4)*Math.pow(a,2);
    document.querySelector("[class='center-menu']").innerText += "\n\n\n" + s
}

function createForm() {
    let main = document.getElementsByClassName("center-menu")
    let nl = document.createElement("br")
    let form = document.createElement("input")
    form.setAttribute("class", "number-input")

    let convertBtn = document.createElement("input")
    convertBtn.setAttribute("type", "submit")
    convertBtn.setAttribute("value", "Submit")
    convertBtn.setAttribute("onClick", "onSubmitPressed()")
    

    main.item(0).appendChild(nl)
    main.item(0).appendChild(form)
    main.item(0).appendChild(convertBtn)
}

function onSubmitPressed() {
    let input = document.getElementsByClassName("number-input")[0]
    let reversed = input.value.split("").reverse().join("")
    alert("saved to cookie: " + reversed)

    //save to cookie
    document.cookie = "reversed=" + reversed + ";"
}