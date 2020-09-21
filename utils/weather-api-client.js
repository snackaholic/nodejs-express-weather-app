const request = require('request');

const apikey = "f210088931a36f85fd777d38228401fa";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";


async function getCityData(query) {
    return await new Promise(function(resolve, reject) {
        if (query != null && query.city != null && query.city.length > 0) {
            request(buildUrl(query.city), function(error, response, body) {
                if (error) {
                    reject(error);
                }
                if (response && response.statusCode == 200) {
                    let answer = JSON.parse(body);
                    resolve({ city: answer.name, mood: answer.weather[0].description, temperature: kelvinToCelsius(answer.main.temp) });
                }
            });
        } else {
            reject("Insufficient data provided");
        }
    }, query);
};

function buildUrl(query) {
    return url + encodeURIComponent(query) + "&appid=" + apikey + "&lang=de";
}


function kelvinToCelsius(celvin) {
    return Math.floor(celvin - 273.15);
}


module.exports = getCityData;