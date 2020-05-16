const express = require('express');
const router = express.Router();

//CONTROLADORES
const aboutusController = require('../controllers/aboutusController');
const homeController = require('../controllers/homeController');
const travelsController = require('../controllers/travelsController');
const testiomonialsController = require('../controllers/testimonialsController');

module.exports = function () {//exportar
    router.get('/', homeController.querysHomePage);
    router.get('/aboutus', aboutusController.infoAboutus);
    router.get('/travels', travelsController.showTravels);
    router.get('/travels/:id', travelsController.showTravel);

    router.get('/testimonials', testiomonialsController.showTestimonials);
    //Cunado se llena el formulario
    router.post('/testimonials', testiomonialsController.addTestimonial)
    return router;
}
