
//Color api doc: https://www.thecolorapi.com/docs#schemes
//Base URL: https://www.thecolorapi.com
//End point: /scheme



const generateScheme = document.getElementById('scheme-btn-el')
const schemeContainer = document.getElementById('scheme-container-el')

const colorHexArray = []




generateScheme.addEventListener("click", () => {
    //clears array on button press
    colorHexArray.splice(0, colorHexArray.length)

    //formats color picker value to work with api query
    const colorPicker = document.getElementById('color-picker-el').value
    const colorPickerHex = colorPicker.slice(1,colorPicker.length)
    console.log(colorPickerHex)

    //
    const schemeSelect = document.getElementById('scheme-select-el').value
    console.log(schemeSelect.value)


    fetch(`https://www.thecolorapi.com/scheme?count=5&hex=${colorPickerHex}&mode=${schemeSelect}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        data.colors.forEach(element => {
            colorHexArray.push(element.hex.value)
        });
        console.log(colorHexArray)
        renderAllColors()
    })
    
})

function colorStripeHtml(hex) {
    return `
    <div class="color-container">
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
