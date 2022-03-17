//The OMDb API
const keyApi = '32cd3a0c'
const mainContainer = document.querySelector('.main-container')
const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form-input')
const btnH1 = document.querySelector('.header__title')
let inputValue = ''

btnH1.addEventListener('click', returnHomePage)
form.addEventListener('submit', getValueInput)
mainContainer.addEventListener('click', catchSpecButton)

async function getData(name = 'red') {
    const url = `https://www.omdbapi.com/?s=${name}&apikey=${keyApi}&page=1`
    try {
        const res = await fetch(url)
        const data = await res.json()
        transformDataObj(data)
    } catch(err) {
        displayError(err)
    }
}

getData()

function transformDataObj(data) {
    let arr = data.Search
    let elements = arr.map((el) => {
    if (el.Poster === "N/A") {
     el.Poster = './not_found.jpg'
    }
        createElement(el)
    })
}

function createElement(el) {
    const div = document.createElement('div')
    div.classList.add('element')
    const img = document.createElement('img')
    img.classList.add('element-img')
    img.src = el.Poster
    img.alt = el.Title
    const title = document.createElement('h2')
    title.classList.add('element-title')
    title.innerHTML = el.Title
    const year = document.createElement('span')
    year.classList.add('element-year')
    year.innerHTML = el.Year
    const button = `<button class="button-getInfo" data-imdbID="${el.imdbID}">learn more</button>`
    div.append(img)
    div.append(title)
    div.append(year)
    div.insertAdjacentHTML('beforeend', button)
    mainContainer.append(div)
}

function getValueInput(event) {
    event.preventDefault()
    inputValue = input.value
    mainContainer.textContent = ''
    getData(inputValue)
}

function displayError(error) {
    const div = document.createElement('div')
    div.classList.add('error')
    const text = document.createElement('p')
    text.classList.add('error-text')
    text.textContent = `${error}`
    const icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-triangle-exclamation', 'error-icon')
    const message = document.createElement('p')
    message.classList.add('error-message')
    message.textContent = `
    nothing found for your search: "${input.value}",
    please try another movie name (in English)!
    `
    div.append(icon)
    div.append(text)
    div.append(message)
    mainContainer.append(div)
}

function catchSpecButton(event) {
    let elementTarget = event.target
    if (elementTarget.classList.contains('button-getInfo')) {
        let imbId = event.target.dataset.imdbid
        getMoreInform(imbId)
    } else if (elementTarget.classList.contains('container__footer-btn')) {
        mainContainer.textContent = ''
        if (inputValue) {
            getData(inputValue)
        } else {
            getData('red')
        }
    }
}

async function getMoreInform(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${keyApi}`
    try {
        const res2 = await fetch(url)
        const data2 = await res2.json()
        createAndShowMoreInform(data2)
    } catch(error) {
        displayErrorMoreInform(error)
    }
}

function createAndShowMoreInform(el) {
    mainContainer.textContent = ''
    if (el.Poster === "N/A") {
         el.Poster = './not_found.jpg'
    }
    let resulet = `
    <div class="container">
        <div class="container__media">
            <div class="container__media">
                <img class="media-img" src="${el.Poster}" alt="${el.Title}">
            </div>
            <div class="media-inf">
                <ul class="media-inf__list">
                    <li class="media-inf__list-title">Title: ${el.Title}</li>
                    <li class="media-inf__list-text">Year: ${el.Year}</li>
                    <li class="media-inf__list-text">Country: ${el.Country}</li>
                    <li class="media-inf__list-text">Genre: ${el.Genre}</li>
                    <li class="media-inf__list-text">Runtime: ${el.Runtime}</li>
                    <li class="media-inf__list-text">Director: ${el.Director}</li>
                    <li class="media-inf__list-text">Actors: ${el.Actors}</li>
                    <li class="media-inf__list-rating">Rating: ${el.imdbRating}</li>
                </ul>
            </div>
        </div>
        <div class="container__footer">
            <p class="container__footer-text">${el.Plot}</p>
            <button class="container__footer-btn">back</button>
        </div>
    </div>

    `
    mainContainer.insertAdjacentHTML('beforeend', resulet)
}

function displayErrorMoreInform(error) {
    const div = document.createElement('div')
    div.classList.add('error')
    const text = document.createElement('p')
    text.classList.add('error-text')
    text.textContent = `${error}`
    const icon = document.createElement('i')
    icon.classList.add('fa-solid', 'fa-triangle-exclamation', 'error-icon')
    const message = document.createElement('p')
    message.classList.add('error-message')
    message.textContent = `
    We apologize to you, but we cannot provide you with more information about this film.
    `
    div.append(icon)
    div.append(text)
    div.append(message)
    mainContainer.append(div)
}

function returnHomePage() {
    mainContainer.textContent = ''
    getData('red')
}

console.log(`
Ваша отметка - 70 балла(ов)
Отзыв по пунктам ТЗ:
Все пункты выполнены полностью!
`);
