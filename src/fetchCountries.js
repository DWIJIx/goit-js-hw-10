const BASE_URL = 'https://restcountries.com/v3.1';
import Notiflix from 'notiflix';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            // console.log(resp)
            if (!resp.ok) {
                Notiflix.Notify.failure('Oops, there is no country with that name.')
            }
           return resp.json()
        })
        .catch(err => console.error(err))
    
}
