'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// function getCountry (country) {
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//     request.send();
//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         const [currency] = Object.entries(data.currencies);
//         const [language] = Object.entries(data.languages);
//         console.log(data);
        
//         const html = `
//             <article class="country">
//                 <img class="country__img" src="${data.flags.svg}" />
//                 <div class="country__data">
//                     <h3 class="country__name">${data.name.common}</h3>
//                     <h4 class="country__region">${data.region}</h4>
//                     <p class="country__row"><span>👫</span>${(data.population / 1000000000).toFixed(1)}B people</p>
//                     <p class="country__row"><span>🗣️</span>${language[1]}</p>
//                     <p class="country__row"><span>💰</span>${currency[1].symbol + " " +currency[1].name}</p>
//                 </div>
//             </article>
//         `
//         countriesContainer.insertAdjacentHTML("beforeend", html);
//         countriesContainer.style.opacity = 1;
//     })
// }

// getCountry("india");
// getCountry("pakistan");
// getCountry("usa");

const renderCountry = (data, className="") => {
    const [currency] = Object.entries(data.currencies);
    const [language] = Object.entries(data.languages);
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${language[1]}</p>
                <p class="country__row"><span>💰</span>${currency[1].symbol + " " +currency[1].name}</p>
            </div>
        </article>
    `
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
}

const getCountryData = (country) => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0]
        console.log(data[0]);
        if(!neighbour) return;

        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    })
    .then((response) => response.json())
    .then((data)=>{
        console.log(data);
        
        renderCountry(data[0], "neighbour");
    })

}

getCountryData("nepal")