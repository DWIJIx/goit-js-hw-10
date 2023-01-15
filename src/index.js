import './css/styles.css';




import fetchCountries from './fetchCountries'

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(evt) {
    
    const inputValue = evt.target.value
    if (inputValue === '') {
        console.log('пусто, треба очистити дані')
        
        
    } else {
        fetchCountries(inputValue)
            .then(data => {
                if (data.length === 1) {
                    console.log('перший варіант', data.length)
                    console.log(data)
                
            }
                if (data.length > 2 & data.length <= 10) {
                    console.log('Другий варіант', data.length)
                    console.log(data)
                
                } else {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    console.log(data)
                }
                    
        })
    }
    
}


