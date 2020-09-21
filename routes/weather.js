var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var client = require('../utils/weather-api-client');

const weatherfetchroute = "fetch";

/* render weather page */
router.get('/', function(req, res, next) {
    res.render('weather', { title: 'Wetterabfrage', formtarget: weatherfetchroute, labelname: "Stadt", inputplaceholder: "Paderborn", submitvalue: "Wetterauskunft starten" });
});


/* get data from api  */
router.get('/' + weatherfetchroute, (request, response, next) => {
    client(request.query).then((apiresponse) => {
        response.send(`Das aktuelle Wetter in ${apiresponse.city}: ${apiresponse.mood} und die Temperatur beträgt ${apiresponse.temperature} Grad`);
    }).catch((err) => {
        if (err === "Insufficient data provided") {
            next(createError(400));
        } else {
            next(createError(500));
        }
    });
});




module.exports = router;