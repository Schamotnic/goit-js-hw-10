
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries';
const inputElement = document.querySelector("#search-box");
const listElement = document.querySelector(".country-list");
const infoElement = document.querySelector('.country-info');
import countryInfo from '../templates/country-info.hbs';
import countryList from '../templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

inputElement.addEventListener('input',debounce(findCountryName, DEBOUNCE_DELAY));
let countryName =''

 function findCountryName(evt){
   countryName = evt.target.value.trim()
   clearInput()

   fetchCountries(countryName).then(data => {
     let amount = data.length;
    //  console.log(data);
     /* если в массиве больше чем 10 стран, появляется уведомление */
     if (amount > 10) {
      return Notify.info(`😔 Too many matches found. Please enter a more specific name`);
  }
/* если в массиве от 2-х до 10-х стран, отображаем список найденных стран */
  else if (amount >= 2 && amount <= 10) {
    countryListRender(data);
  }
/* если массив с 1 страной, то отображаются данные этой страны */
  else if (amount === 1) {
    countryInfoRender(data);
  }
    }).catch(onFetchError);
  }

  function onFetchError(error) {
    console.log(error);

    if (countryName !== '') {
        Notify.failure(`😱 Oops, there is no country with that name`);
    }
} 

  function clearInput() {
    listElement.innerHTML = '';
    infoElement.innerHTML = '';
}


function countryInfoRender(data){
  infoElement.insertAdjacentHTML('beforeend', countryInfo(data))
  console.log(infoElement)
};

function countryListRender(data){
  listElement.insertAdjacentHTML('beforeend', countryList(data))
  console.log(listElement)
};