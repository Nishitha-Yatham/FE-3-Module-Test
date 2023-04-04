let searchForm = document.querySelector("#search-form")
let mainContainer = document.getElementById("main-image-container")
let imgContainer = document.getElementById("current-image-container")
let history = document.getElementById("search-history")
let inputDate = document.getElementById("search-input")
let heading = document.getElementById('heading')

let currentDate = new Date().toISOString().split("T")[0]

let img = document.createElement("img")
let titleHeading = document.createElement("h3")
let description = document.createElement("p")

window.addEventListener("load", () => {
    heading.textContent = `Picture of The Day`
    getCurrentImageOfTheDay()
})

async function getCurrentImageOfTheDay() {
    try {
        // Fetching Data
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
        )
        const data = await response.json()
        console.log(data)

        // Updating Image 
        const imgUrl = data?.url
        
        img.src = imgUrl
        img.classList.add("image")
        mainContainer.appendChild(img)

        // Updating Title
        const title = data?.title
        titleHeading.textContent = title
        imgContainer.appendChild(titleHeading)

        // Updating Content 
        const para = data?.explanation
        description.textContent = para
        imgContainer.appendChild(description)

        mainContainer.appendChild(imgContainer)
    } catch (error) {
        console.log("Error => " + error)
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (inputDate.value) {
        const selectedDate = new Date(inputDate.value)
        currentDate = selectedDate.toISOString().split("T")[0]
        heading.textContent = `Picture of The Day For ${currentDate}`
        getImageOfTheDay()
        saveSearch()
        addSearchToHistory()
    }
})

async function getImageOfTheDay() {
    
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
    )
    const data = await response.json()
    console.log(data)

    const imgUrl = data?.url
    
    img.src = imgUrl
    img.classList.add("image")
    mainContainer.appendChild(img)

    
    const title = data?.title

    titleHeading.textContent = title
    imgContainer.appendChild(titleHeading)

   
    const para = data?.explanation

    description.textContent = para
    imgContainer.appendChild(description)

    mainContainer.appendChild(imgContainer)
}

function saveSearch() {
    let DateArr = []
    DateArr.push(currentDate)
    localStorage.setItem(`Date ${DateArr.length}`, currentDate)
}

function addSearchToHistory() {

    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = currentDate;
    a.appendChild(li)
    history.appendChild(a)

    a.addEventListener("click", (event) => {
        event.preventDefault()
        currentDate = li.textContent
        heading.textContent = `Picture of The Day For ${currentDate}`;
        getImageOfTheDay();
    });
}