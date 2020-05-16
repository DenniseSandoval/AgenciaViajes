const Travel = require('../models/Travels');
const Testimonial = require('../models/Testimonials')
exports.querysHomePage = async (req, res) => {//en el local host
    //res.send('Inicio'); one l send muestra el texto en el dom
    const viajes = await Travel.findAll({
        limit: 3
    })
    const testimoniales = await Testimonial.findAll({
        limit: 3
    })
    res.render('index', {
        page: 'Póximos Viajes',
        clase: 'home',
        viajes,
        testimoniales
    })
}