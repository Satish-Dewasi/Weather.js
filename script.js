
//search bar

document.addEventListener('DOMContentLoaded', function () {
    const menuBTN = document.querySelector('.menu');
    const inputBar = document.querySelector('.search');

    menuBTN.addEventListener('click', function () {
        if (inputBar.classList.contains('toggleON')) {
            inputBar.classList.add('toggleOFF');
            inputBar.classList.remove('toggleON');
        } else {
            inputBar.classList.add('toggleON');
            inputBar.classList.remove('toggleOFF');
        }
    });
});



//////////////////////////////////////////////////

const searchBTN = document.querySelector('.searchBTN');
const input = document.querySelector('input');

let cityName = 'jaipur';

input.addEventListener('change', function () {

    cityName = input.value;
});

searchBTN.addEventListener('click', function () {

    input.value = '';
    fetchData();

});


//////////////////////////////////////

const city = document.querySelector("#city");
const temp = document.querySelector(".temp");
const weather = document.querySelector("#weather");
const time = document.querySelector("#time");
const date = document.querySelector("#date");
const humid = document.querySelector("#humidityData");
const wind = document.querySelector("#windData");
const cloud = document.querySelector("#cloudData");
const image = document.querySelector('#image');






async function fetchData() {



    const baseUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';


    const url = `${baseUrl}?q=${cityName}&customParam1=value1&customParam2=value2`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a2f3d2abefmsh619576c6176e41ep11e18ajsn0faf743e055e',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();


        humid.innerHTML = result.current.humidity;

        let rowTemp = result.current.temp_c;
        let modTemp = Math.trunc(rowTemp);
        temp.innerHTML = modTemp + '&deg';


        weather.innerHTML = result.current.condition.text;

        cloud.innerHTML = result.current.cloud + "%";
        wind.innerHTML = result.current.wind_kph;
        city.innerHTML = result.location.name;

        const datatime = result.location.localtime;
        const dt = JSON.stringify(datatime);

        time.innerHTML = dt.slice(11, dt.length - 1);
        date.innerHTML = dt.slice(1, 10);

        // image Change  According to Weather 


        // sunny

        // partly cloud 

        // clear

        // mist


        // overcast 

        // light rain shower


        if (result.current.condition.text == 'Sunny') {
            image.src = './image/sun.png'
        }

        else if (result.current.condition.text == 'Partly cloudy') {
            if (result.current.is_day) {
                image.src = './image/sun-cloud.png'
            }
            else {
                image.src = './image/night+cloud.png'
            }
        }

        else if (result.current.condition.text == 'Clear') {
            if (result.current.is_day) {
                image.src = './image/sun.png'
            }
            else {
                image.src = './image/night.png'
            }
        }

        else if (result.current.condition.text == 'Mist') {

            image.src = './image/mist.png'

        }

        else if (result.current.condition.text == 'Overcast') {

            if (result.current.is_day) {
                image.src = './image/overcast.png'
            }
            else {
                image.src = './image/night-rain.png'
            }
        }

        else if (result.current.condition.text == 'Light rain shower') {
            if (result.current.is_day) {
                image.src = './image/light-rain.png'
            }
            else {
                image.src = './image/night-rain.png'
            }
        }











        console.log(result);
        console.log(result.current.is_day);


    } catch (error) {
        alert("City Not Found !")
        console.error(error);
    }
}

fetchData();
