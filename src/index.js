import './css/styles.css';
import fetchCountries from './fetchCountries'
import Notiflix from 'notiflix';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    ulContiner: document.querySelector('.country-list')
}

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
    clearMarkup();
    const inputValue = evt.target.value.trim();
    if (inputValue === '') {
        clearMarkup()
        
    } else {
        fetchCountries(inputValue)
            .then(data => {
                if (data.length <= 10) {
                   createMarkup(data)
                }
                if (data.length > 10) 
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');  
            }          
        )
    }
}

function createMarkup (dataArray) {
    const oneMarkup = obj => {
        if (dataArray.length < 2) {
            const languagesList = Object.values(dataArray[0].languages)
            return `
            <li class = "list_item">
                <h2 class = "list_item_title">
                     <img src="${obj.flags.svg}" alt="${obj.name.common}" width = 70 class = "list_item_img">
                    ${obj.name.common}
                </h2>
                <h3>Capital:   <span class = "list_item_span">${obj.capital}</span></h3>
                <h3>Population:   <span class = "list_item_span">${obj.population}</span></h3>
                <h3>Languages:   <span class = "list_item_span">${languagesList}</span></h3>
            </li>
            `;
        } else {
            return `
             <li class = "list_item">
                <h3>
                    <img src="${obj.flags.svg}" alt="${obj.name.common}" width = 40>
                    ${obj.name.common}
                </h3>
            </li>
            `;
        }
    }
    const markup = dataArray.map(oneMarkup).join('');
    refs.ulContiner.insertAdjacentHTML('afterbegin', markup)
}

function clearMarkup() {
    refs.ulContiner.innerHTML = ''
}






// function createMarkup (arr) {
//     const markup = arr.map(({ population, name: { common } }) => 
//      `
//       <li>
//         <img src="${population}.flags.png" alt="${common}.common">
//         <h2>${common}</h2>
//       </li>
//       `
//     ).join('');  
    
//     ulContiner.insertAdjacentHTML('afterbegin', markup)
// }