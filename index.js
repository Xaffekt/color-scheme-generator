
//Color api doc: https://www.thecolorapi.com/docs#schemes
//Base URL: https://www.thecolorapi.com
//End point: /scheme

const generateScheme = document.getElementById('scheme-btn-el')
const schemeContainer = document.getElementById('scheme-container-el')

const colorHexArray = []


document.addEventListener("click", e => {
    if(e.target === generateScheme) {
        callColorApi()
    }
    else if(e.target.dataset.hexValue) {
        copyHex(e.target.dataset.hexValue)
    }
})

function callColorApi() {
        //clears array
        colorHexArray.splice(0, colorHexArray.length)

        //formats color picker value to work with api query
        let colorPicker = document.getElementById('color-picker-el').value
        colorPicker = colorPicker.slice(1,colorPicker.length) //removes # from value
        console.log(colorPicker)
    
        //Scheme value from select menu
        const schemeSelect = document.getElementById('scheme-select-el').value
    
        fetch(`https://www.thecolorapi.com/scheme?count=5&hex=${colorPicker}&mode=${schemeSelect}`)
        .then(res => res.json())
        .then(data => {      
            data.colors.forEach(element => {
                colorHexArray.push(element.hex.value)
            })
            renderAllColors()
        })
}

function colorStripeHtml(hex) {
    return `
    <div class="color-container" id=${hex} data-hex-value="${hex}">
        <!-- Background: color -->
        <div class="color-stripe" style="background-color:${hex}"></div>
        <p class="color-code">${hex}</p>
    </div>
    `
}

function renderAllColors() {
    let html = ""
    colorHexArray.forEach(e => {
        html += colorStripeHtml(e)
    })
    schemeContainer.innerHTML = html
}

function copyHex(hex) {
    navigator.clipboard.writeText(hex);
    alert(`${hex} copied`);
}

callColorApi()